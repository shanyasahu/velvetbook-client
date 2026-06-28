"use client";

import Link from "next/link";
import { CalendarDays, PlayCircle } from "lucide-react";

import type { HeroViewModel } from "../types";

interface Props {
  hero: HeroViewModel;
}

export default function HeroActions({ hero }: Props) {
  return (
    <div className="mt-3 flex flex-nowrap items-center gap-2 sm:mt-4 sm:gap-2.5">
      <Link
        href={hero.bookNowHref}
        className="primary-button inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-3 text-[11px] font-medium text-white sm:h-9 sm:gap-2 sm:rounded-xl sm:px-4 sm:text-xs lg:h-10 lg:px-5 lg:text-sm"
      >
        <CalendarDays size={13} className="sm:size-3.5" />
        {hero.bookNowLabel}
      </Link>

      <Link
        href={hero.videoUrl}
        className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-(--border) bg-(--bg-card) px-3 text-[11px] font-medium text-(--text-primary) shadow-[var(--shadow-card)] transition-colors hover:bg-(--bg-card-hover) sm:h-9 sm:gap-2 sm:rounded-xl sm:px-4 sm:text-xs lg:h-10 lg:px-5 lg:text-sm"
      >
        <PlayCircle size={13} className="text-(--accent-primary) sm:size-3.5" />
        {hero.watchVideoLabel}
      </Link>
    </div>
  );
}
