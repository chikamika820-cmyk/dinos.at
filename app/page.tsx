import DinosPage from "./components/DinosPage";
import { TRIPADVISOR } from "./lib/reviews";

export default function Home() {
  return <DinosPage reviews={TRIPADVISOR} />;
}
