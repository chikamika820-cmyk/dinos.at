import { NextResponse } from "next/server";
import { getReviews } from "../../lib/reviews";

// Cached, server-side endpoint for the Tripadvisor data.
// The API key stays server-only; the client never sees it.
export const revalidate = 43200; // 12h

export async function GET() {
  try {
    const data = await getReviews();
    if (!data) {
      return NextResponse.json({ error: "no_reviews_available" }, { status: 503 });
    }
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=43200, stale-while-revalidate=86400",
      },
    });
  } catch {
    return NextResponse.json({ error: "reviews_unavailable" }, { status: 503 });
  }
}
