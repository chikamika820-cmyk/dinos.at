// Tripadvisor reviews — data layer.
//
// Two sources, "combined":
//  1) Official Tripadvisor Content API (activates automatically once the env
//     vars below are set — works in production, e.g. on Vercel).
//  2) Curated real reviews provided by the owner (fallback / offline).
//
// NEVER put invented reviews here. Leave CURATED = null to hide the section
// until real data is available.

export type Review = {
  author: string;
  rating: number; // 1..5
  title?: string;
  text: string;
  date?: string; // display string, e.g. "März 2025"
};

export type ReviewsData = {
  rating: number; // average, e.g. 4.5
  count: number; // total number of reviews
  url: string; // link to the Tripadvisor profile
  reviews: Review[];
};

// Dino's Apothecary Bar, Wien — Tripadvisor identifiers (from the public profile URL).
const TRIPADVISOR_URL =
  "https://www.tripadvisor.de/Restaurant_Review-g190454-d6210796-Reviews-Dino_s_Apothecary_Bar-Vienna.html";
const LOCATION_ID = "6210796";

// ─────────────────────────────────────────────────────────────
// Owner-provided aggregate (verifiable via the Tripadvisor link).
// `reviews` stays empty until the owner supplies the actual quotes,
// or the official API is enabled — no scraped/invented review text.
// ─────────────────────────────────────────────────────────────
const CURATED: ReviewsData | null = {
  rating: 4.5,
  count: 61,
  url: TRIPADVISOR_URL,
  reviews: [],
};

export async function getReviews(): Promise<ReviewsData | null> {
  const key = process.env.TRIPADVISOR_API_KEY;
  const locationId = process.env.TRIPADVISOR_LOCATION_ID || LOCATION_ID;

  if (key) {
    try {
      return await fetchFromTripadvisor(key, locationId);
    } catch (err) {
      console.error("Tripadvisor API fetch failed — falling back to curated reviews.", err);
    }
  }
  return CURATED;
}

// Official Tripadvisor Content API (https://developer.tripadvisor.com).
// Requires a free API key + the location id of Dino's Hausapotheke.
async function fetchFromTripadvisor(key: string, locationId: string): Promise<ReviewsData> {
  const base = "https://api.content.tripadvisor.com/api/v1/location";
  // ISR caching: fetch at most every 12h (fresh + stable, and it survives
  // short API outages because the cached copy keeps being served).
  const init = { headers: { accept: "application/json" }, next: { revalidate: 60 * 60 * 12 } } as const;

  const [detailsRes, reviewsRes] = await Promise.all([
    fetch(`${base}/${locationId}/details?language=de&currency=EUR&key=${key}`, init),
    fetch(`${base}/${locationId}/reviews?language=de&key=${key}`, init),
  ]);
  if (!detailsRes.ok || !reviewsRes.ok) {
    throw new Error(`Tripadvisor API responded ${detailsRes.status}/${reviewsRes.status}`);
  }
  const details = await detailsRes.json();
  const reviewsJson = await reviewsRes.json();

  type RawReview = {
    user?: { username?: string };
    rating?: number | string;
    title?: string;
    text?: string;
    travel_date?: string;
    published_date?: string;
  };
  const reviews: Review[] = (reviewsJson?.data ?? []).map((r: RawReview) => ({
    author: r.user?.username ?? "Tripadvisor-Gast",
    rating: Number(r.rating) || 0,
    title: r.title || undefined,
    text: r.text ?? "",
    date: r.travel_date || r.published_date || undefined,
  }));

  return {
    rating: Number(details?.rating) || 0,
    count: Number(details?.num_reviews) || 0,
    url: details?.web_url || TRIPADVISOR_URL,
    reviews,
  };
}
