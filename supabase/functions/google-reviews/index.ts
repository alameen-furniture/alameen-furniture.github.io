import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Al Ameen Furniture, Kolkata - Place ID
// Users can update this if needed
const PLACE_ID = "ChIJYTKAi3H_AjoRkFKMqXcNaRw";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY");
    if (!apiKey) {
      throw new Error("GOOGLE_PLACES_API_KEY is not configured");
    }

    // Use Places API (New) to get place details with reviews
    const url = `https://places.googleapis.com/v1/places/${PLACE_ID}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "id,displayName,rating,userRatingCount,reviews",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Google Places API error [${response.status}]:`, errorText);
      throw new Error(
        `Google Places API returned ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();

    // Transform reviews to a clean format
    const reviews = (data.reviews || []).map(
      (review: any, index: number) => ({
        id: `google-${index}`,
        author: review.authorAttribution?.displayName || "Anonymous",
        rating: review.rating || 5,
        text:
          review.text?.text ||
          review.originalText?.text ||
          "",
        date: review.relativePublishTimeDescription || "",
        profilePhoto:
          review.authorAttribution?.photoUri || "",
        source: "Google",
      })
    );

    return new Response(
      JSON.stringify({
        rating: data.rating || 0,
        totalReviews: data.userRatingCount || 0,
        reviews,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    console.error("Error fetching Google reviews:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
