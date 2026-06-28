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

      <h1 className="mt-1 font-[family-name:var(--font-heading)] text-xl font-bold leading-tight text-(--text-primary) sm:text-3xl lg:text-4xl">
        {hero.titlePrefix}
        <span className="text-(--brand-gold)">{hero.titleHighlight}</span>
        {hero.titleSuffix}
      </h1>

      <p className="mt-2 max-w-md text-[11px] leading-relaxed text-(--text-secondary) sm:text-sm lg:mt-3">
        {hero.description}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2 lg:mt-4 lg:gap-3">
        <StatusBadge
          label={hero.statusLabel}
          status={hero.isOnline ? "online" : "offline"}
        />

        <StatusBadge
          label={hero.location}
          icon={<MapPin size={12} className="text-(--text-muted)" />}
        />
      </div>
    </div>
  );
}
