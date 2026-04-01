import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function sanitizeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    // Server-side validation
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : null;
    const requirement =
      typeof body.requirement === "string" ? body.requirement.trim() : null;
    const image_url =
      typeof body.image_url === "string" ? body.image_url.trim() : null;

    // Validate required fields
    if (!name || name.length > 200) {
      return new Response(
        JSON.stringify({ error: "Name is required and must be under 200 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate phone format
    const phoneClean = phone.replace(/[\s\-()]/g, "");
    if (!phoneClean || phoneClean.length < 7 || phoneClean.length > 20 || !/^[+]?\d+$/.test(phoneClean)) {
      return new Response(
        JSON.stringify({ error: "Valid phone number is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email if provided
    if (email && (email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate requirement length
    if (requirement && requirement.length > 2000) {
      return new Response(
        JSON.stringify({ error: "Requirement must be under 2000 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate image_url if provided - must be from our own storage
    if (image_url) {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      if (!image_url.startsWith(`${supabaseUrl}/storage/`)) {
        return new Response(
          JSON.stringify({ error: "Invalid image URL" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase.from("enquiries").insert({
      name,
      phone,
      email: email || null,
      requirement: requirement || null,
      image_url: image_url || null,
    });

    if (dbError) {
      console.error("DB insert error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save enquiry" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize values for email HTML
    const safeName = sanitizeHtml(name);
    const safePhone = sanitizeHtml(phone);
    const safeEmail = email ? sanitizeHtml(email) : "Not provided";
    const safeRequirement = requirement ? sanitizeHtml(requirement) : "Not specified";

    // Send email notification
    try {
      const imageSection = image_url
        ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Reference Image</td><td style="padding:8px;border:1px solid #ddd;"><a href="${sanitizeHtml(image_url)}" target="_blank"><img src="${sanitizeHtml(image_url)}" alt="Reference" style="max-width:200px;max-height:200px;border-radius:8px;" /></a></td></tr>`
        : "";

      const emailBody = `
        <h2>🪑 New Furniture Enquiry</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${safeName}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #ddd;"><a href="tel:${safePhone}">${safePhone}</a></td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${safeEmail}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Requirement</td><td style="padding:8px;border:1px solid #ddd;">${safeRequirement}</td></tr>
          ${imageSection}
        </table>
        <p style="margin-top:16px;color:#666;">This enquiry was submitted from your Al Ameen Furniture website.</p>
        <p style="margin-top:8px;"><a href="https://wa.me/${phoneClean}?text=Hi%20${encodeURIComponent(name)}%2C%20thank%20you%20for%20your%20enquiry%20at%20Al-Ameen%20Furniture!" style="background:#25D366;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;display:inline-block;">Reply on WhatsApp</a></p>
      `;

      await fetch(`${supabaseUrl}/functions/v1/send-transactional-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          to: "akbarkhan891071@gmail.com",
          subject: `🪑 New Enquiry from ${safeName} - Al Ameen Furniture`,
          html: emailBody,
        }),
      });
    } catch (emailErr) {
      console.error("Email notification error:", emailErr);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
