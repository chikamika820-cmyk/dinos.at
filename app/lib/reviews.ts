// Tripadvisor — statische Anzeige (keine API, keine externen Dienste, keine Kosten).
//
// ┌──────────────────────────────────────────────────────────┐
// │  HIER die Werte anpassen (in Sekunden erledigt):           │
// │   • rating = aktuelle Durchschnittsbewertung (z. B. 4.5)   │
// │   • count  = Anzahl der Bewertungen (z. B. 61)             │
// │   • url    = Link zum offiziellen Tripadvisor-Eintrag       │
// └──────────────────────────────────────────────────────────┘

export type Review = {
  author: string;
  rating: number; // 1..5
  title?: string;
  text: string;
  date?: string;
};

export type ReviewsData = {
  rating: number; // Durchschnitt, z. B. 4.5
  count: number; // Anzahl der Bewertungen, z. B. 61
  url: string; // Link zum Tripadvisor-Profil
  reviews: Review[]; // optional: einzelne echte Zitate (leer lassen = nur Bewertungsbox)
};

export const TRIPADVISOR: ReviewsData = {
  rating: 4.5,
  count: 61,
  url: "https://www.tripadvisor.de/Restaurant_Review-g190454-d6210796-Reviews-Dino_s_Apothecary_Bar-Vienna.html",
  reviews: [],
};
