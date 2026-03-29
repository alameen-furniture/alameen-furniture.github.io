import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, email, requirement, image_url } = await req.json();

    if (!name || !phone) {
      return new Response(JSON.stringify({ error: "Name and phone are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
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
      return new Response(JSON.stringify({ error: "Failed to save enquiry" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send email notification
    try {
      const imageSection = image_url
        ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Reference Image</td><td style="padding:8px;border:1px solid #ddd;"><a href="${image_url}" target="_blank"><img src="${image_url}" alt="Reference" style="max-width:200px;max-height:200px;border-radius:8px;" /></a></td></tr>`
        : "";

      const emailBody = `
        <h2>🪑 New Furniture Enquiry</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #ddd;"><a href="tel:${phone}">${phone}</a></td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${email || "Not provided"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Requirement</td><td style="padding:8px;border:1px solid #ddd;">${requirement || "Not specified"}</td></tr>
          ${imageSection}
        </table>
        <p style="margin-top:16px;color:#666;">This enquiry was submitted from your Al Ameen Furniture website.</p>
        <p style="margin-top:8px;"><a href="https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(name)}%2C%20thank%20you%20for%20your%20enquiry%20at%20Al-Ameen%20Furniture!" style="background:#25D366;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;display:inline-block;">Reply on WhatsApp</a></p>
      `;

      await fetch(`${supabaseUrl}/functions/v1/send-transactional-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          to: "akbarkhan891071@gmail.com",
          subject: `🪑 New Enquiry from ${name} - Al Ameen Furniture`,
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
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
