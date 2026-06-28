import { MapPin } from "lucide-react";

import type { HeroViewModel } from "../types";
import { StatusBadge } from "../shared/Badge";

interface Props {
  hero: HeroViewModel;
}

export default function HeroInfo({ hero }: Props) {
  return (
    <div className="max-w-xl">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-(--brand-gold) sm:text-xs">
        {hero.welcomeText}
      </p>

      <h1 className="mt-1 font-[family-name:var(--font-heading)] text-lg font-bold leading-tight text-white sm:text-2xl lg:text-3xl">
        {hero.titlePrefix}
        <span className="text-(--brand-gold)">{hero.titleHighlight}</span>
        {hero.titleSuffix}
      </h1>

      <p className="mt-2 max-w-md text-xs font-medium leading-relaxed text-white/85 sm:text-sm lg:mt-3">
        {hero.description}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2 lg:mt-4 lg:gap-3">
        <StatusBadge
          label={hero.statusLabel}
          status={hero.isOnline ? "online" : "offline"}
          variant="overlay"
        />

        <StatusBadge
          label={hero.location}
          variant="overlay"
          icon={<MapPin size={12} className="text-white/70" />}
        />
      </div>
    </div>
  );
}
