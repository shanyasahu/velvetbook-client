"use client";

import Link from "next/link";
import { CalendarDays, PlayCircle } from "lucide-react";

import type { HeroViewModel } from "../types";

interface Props {
  hero: HeroViewModel;
}

export default function HeroActions({ hero }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <Link
        href={hero.bookNowHref}
        className="primary-button inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-[11px] font-medium text-white sm:h-10 sm:gap-2 sm:rounded-xl sm:px-5 sm:text-sm lg:h-11 lg:px-6"
      >
        <CalendarDays size={14} className="sm:size-4" />
        {hero.bookNowLabel}
      </Link>

      <Link
        href={hero.videoUrl}
        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-(--border) bg-(--bg-card) px-3 text-[11px] font-medium text-(--text-primary) shadow-[var(--shadow-card)] transition-colors hover:bg-(--bg-card-hover) sm:h-10 sm:gap-2 sm:rounded-xl sm:px-5 sm:text-sm lg:h-11 lg:px-6"
      >
        <PlayCircle size={14} className="sm:size-4" />
        {hero.watchVideoLabel}
      </Link>
    </div>
  );
}
