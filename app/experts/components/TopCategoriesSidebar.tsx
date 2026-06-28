"use client";

import Image from "next/image";
import Link from "next/link";
import { Headset } from "lucide-react";

import type { TopCategory } from "../experts.types";
import { getIcon } from "./icons";

interface TopCategoriesSidebarProps {
  categories: TopCategory[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function TopCategoriesSidebar({
  categories,
  activeId,
  onSelect,
}: TopCategoriesSidebarProps) {
  return (
    <aside className="hidden w-[200px] shrink-0 lg:block">
      <div className="sticky top-24 space-y-4">
        <nav
          aria-label="Expert categories"
          className="rounded-[var(--radius-md)] border border-(--border) bg-(--bg-card) p-3 shadow-[var(--shadow-card)]"
        >
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-(--text-muted)">
            Categories
          </p>

          <ul className="space-y-0.5">
            {categories.map((category) => {
              const Icon = getIcon(category.icon);
              const isActive = category.id === activeId;

              return (
                <li key={category.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(category.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium transition-colors ${
                      isActive
                        ? "primary-button text-white"
                        : "text-(--text-secondary) hover:bg-(--bg-secondary) hover:text-(--text-primary)"
                    }`}
                  >
                    <Icon size={16} strokeWidth={1.8} className="shrink-0" />
                    <span className="truncate">{category.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="overflow-hidden rounded-[var(--radius-md)] border border-(--border) bg-(--bg-card) p-4 shadow-[var(--shadow-card)]">
          <div className="relative mb-3 h-24 w-full overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=70"
              alt="Become an expert"
              fill
              sizes="200px"
              className="object-cover"
            />
          </div>
          <h3 className="text-sm font-semibold text-(--text-primary)">
            Become an Expert
          </h3>
          <p className="mt-1 text-[11px] leading-relaxed text-(--text-secondary)">
            Join our community of professionals and grow your business.
          </p>
          <Link
            href="/auth"
            className="primary-button mt-3 flex h-9 w-full items-center justify-center rounded-lg text-xs font-semibold text-white"
          >
            Join Now
          </Link>
        </div>

        <div className="rounded-[var(--radius-md)] border border-(--border) bg-(--bg-card) p-4 shadow-[var(--shadow-card)]">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-(--bg-secondary) text-(--accent-secondary)">
            <Headset size={18} strokeWidth={1.6} />
          </span>
          <h3 className="mt-3 text-sm font-semibold text-(--text-primary)">
            Need Help?
          </h3>
          <p className="mt-1 text-[11px] leading-relaxed text-(--text-secondary)">
            We&apos;re here to help you find the right expert.
          </p>
          <Link
            href="/help"
            className="mt-3 flex h-9 w-full items-center justify-center rounded-lg border border-(--border) text-xs font-medium text-(--text-primary) transition-colors hover:border-(--accent-primary)"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </aside>
  );
}
