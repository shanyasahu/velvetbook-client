import type { Store } from "../types";
import { getStoreHero } from "../lib/getStoreHero";
import HeroActions from "./HeroActions";
import HeroBadges from "./HeroBadges";
import HeroImage from "./HeroImage";
import HeroInfo from "./HeroInfo";
import "./hero.css";

interface Props {
  store: Store;
}

export default function Hero({ store }: Props) {
  const hero = getStoreHero(store);

  return (
    <section className="relative overflow-hidden rounded-[var(--radius-lg)] border border-(--border) shadow-[var(--shadow-card)]">
      <div className="absolute inset-0">
        <HeroImage store={store} />
      </div>

      <div className="store-hero-gradient absolute inset-0" />

      <div className="relative flex min-h-[220px] flex-col justify-center gap-3 p-5 sm:min-h-[260px] sm:p-6 lg:min-h-[300px] lg:gap-4 lg:p-8">
        <HeroBadges hero={hero} />

        <div className="max-w-xl lg:max-w-[34%]">
          <HeroInfo hero={hero} />
          <HeroActions hero={hero} />
        </div>
      </div>
    </section>
  );
}
