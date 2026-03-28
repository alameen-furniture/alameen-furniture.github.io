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
    const { name, phone, email, requirement } = await req.json();

    if (!name || !phone) {
      return new Response(JSON.stringify({ error: "Name and phone are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Store in database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase.from("enquiries").insert({
      name,
      phone,
      email: email || null,
      requirement: requirement || null,
    });

    if (dbError) {
      console.error("DB insert error:", dbError);
      return new Response(JSON.stringify({ error: "Failed to save enquiry" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send email notification using Lovable API
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    if (lovableApiKey) {
      try {
        const emailBody = `
          <h2>New Furniture Enquiry</h2>
          <table style="border-collapse:collapse;width:100%;max-width:500px;">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${name}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #ddd;">${phone}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${email || "Not provided"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Requirement</td><td style="padding:8px;border:1px solid #ddd;">${requirement || "Not specified"}</td></tr>
          </table>
          <p style="margin-top:16px;color:#666;">This enquiry was submitted from your website.</p>
        `;

        await fetch(`${supabaseUrl}/functions/v1/send-transactional-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${supabaseKey}`,
          },
          body: JSON.stringify({
            to: "akbarkhan891071@gmail.com",
            subject: `New Enquiry from ${name} - Al Ameen Furniture`,
            html: emailBody,
          }),
        });
      } catch (emailErr) {
        console.error("Email notification error:", emailErr);
        // Don't fail the request if email fails
      }
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
