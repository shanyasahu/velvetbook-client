import type { Store } from "../types";
import { getStoreHero } from "../lib/getStoreHero";
import HeroActions from "./HeroActions";
import HeroBadges from "./HeroBadges";
import HeroImage from "./HeroImage";
import HeroInfo from "./HeroInfo";

interface Props {
  store: Store;
}

export default function Hero({ store }: Props) {
  const hero = getStoreHero(store);

  return (
    <section className="relative overflow-hidden rounded-[var(--radius-lg)] border border-(--border) shadow-[var(--shadow-card)]">
      <HeroImage store={store} />

      <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5 lg:p-6">
        <HeroBadges hero={hero} />

        <div className="mt-auto space-y-4 lg:space-y-5">
          <HeroInfo hero={hero} />
          <HeroActions hero={hero} />
        </div>
      </div>
    </section>
  );
}
