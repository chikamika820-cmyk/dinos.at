import DinosPage from "./components/DinosPage";
import { getReviews } from "./lib/reviews";

export default async function Home() {
  const reviews = await getReviews();
  return <DinosPage reviews={reviews} />;
}
