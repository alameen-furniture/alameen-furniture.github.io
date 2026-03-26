import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY");
    if (!apiKey) {
      throw new Error("GOOGLE_PLACES_API_KEY is not configured");
    }

    // Step 1: Find the place using Text Search
    const searchResponse = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "places.id",
        },
        body: JSON.stringify({
          textQuery:
            "Al Ameen Furniture Behari Mondal Road Haltu Kolkata 700078",
        }),
      }
    );

    if (!searchResponse.ok) {
      const errText = await searchResponse.text();
      console.error(`Text Search error [${searchResponse.status}]:`, errText);
      throw new Error(`Text Search failed: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    const placeId = searchData.places?.[0]?.id;

    if (!placeId) {
      throw new Error("Could not find place. No results returned.");
    }

    // Step 2: Get place details with reviews
    const detailsResponse = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "id,displayName,rating,userRatingCount,reviews",
        },
      }
    );

    if (!detailsResponse.ok) {
      const errText = await detailsResponse.text();
      console.error(
        `Place Details error [${detailsResponse.status}]:`,
        errText
      );
      throw new Error(`Place Details failed: ${detailsResponse.status}`);
    }

    const data = await detailsResponse.json();

    // Transform reviews
    const reviews = (data.reviews || []).map(
      (review: any, index: number) => ({
        id: `google-${index}`,
        author: review.authorAttribution?.displayName || "Anonymous",
        rating: review.rating || 5,
        text: review.text?.text || review.originalText?.text || "",
        date: review.relativePublishTimeDescription || "",
        profilePhoto: review.authorAttribution?.photoUri || "",
        source: "Google",
      })
    );

    return new Response(
      JSON.stringify({
        rating: data.rating || 0,
        totalReviews: data.userRatingCount || 0,
        reviews,
        placeId,
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
