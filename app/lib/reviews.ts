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

// ─────────────────────────────────────────────────────────────
// Curated REAL reviews (owner-provided). Fill this with the real
// Tripadvisor reviews. No placeholders, no invented content.
// ─────────────────────────────────────────────────────────────
const CURATED: ReviewsData | null = null;

// Dino's Apothecary Bar, Wien — Tripadvisor identifiers (from the public profile URL).
const TRIPADVISOR_URL =
  "https://www.tripadvisor.de/Restaurant_Review-g190454-d6210796-Reviews-Dino_s_Apothecary_Bar-Vienna.html";
const LOCATION_ID = "6210796";

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
  const cache = { next: { revalidate: 60 * 60 * 24 } } as const; // refresh daily

  const [details, reviewsRes] = await Promise.all([
    fetch(`${base}/${locationId}/details?language=de&currency=EUR&key=${key}`, cache).then((r) => r.json()),
    fetch(`${base}/${locationId}/reviews?language=de&key=${key}`, cache).then((r) => r.json()),
  ]);

  type RawReview = {
    user?: { username?: string };
    rating?: number | string;
    title?: string;
    text?: string;
    travel_date?: string;
    published_date?: string;
  };
  const reviews: Review[] = (reviewsRes?.data ?? []).map((r: RawReview) => ({
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
