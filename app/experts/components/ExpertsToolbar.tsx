"use client";

import { ArrowDownWideNarrow } from "lucide-react";

import type { FilterGroup, SortOption } from "../experts.types";
import { FilterDropdown } from "./FilterDropdown";
import { getIcon } from "./icons";

interface ExpertsToolbarProps {
  filters: FilterGroup[];
  filterValues: Record<string, string>;
  onFilterChange: (filterId: string, value: string) => void;
  sortOptions: SortOption[];
  sortValue: string;
  onSortChange: (value: string) => void;
}

export function ExpertsToolbar({
  filters,
  filterValues,
  onFilterChange,
  sortOptions,
  sortValue,
  onSortChange,
}: ExpertsToolbarProps) {
  return (
    <div
      data-experts-filters
      className="rounded-[var(--radius-md)] border border-(--border) bg-(--bg-card) p-2 shadow-[var(--shadow-card)] lg:p-2.5"
    >
      <div className="flex flex-wrap items-center gap-2 lg:gap-3">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 lg:gap-3">
          {filters.map((filter) => {
            const Icon = getIcon(filter.icon);
            return (
              <FilterDropdown
                key={filter.id}
                options={filter.options}
                value={filterValues[filter.id] ?? filter.defaultValue}
                onChange={(value) => onFilterChange(filter.id, value)}
                icon={<Icon size={14} strokeWidth={1.8} />}
                className="shrink-0"
              />
            );
          })}
        </div>

        <FilterDropdown
          options={sortOptions}
          value={sortValue}
          onChange={onSortChange}
          prefix="Sort by:"
          align="right"
          icon={<ArrowDownWideNarrow size={14} strokeWidth={1.8} />}
          className="shrink-0"
        />
      </div>
    </div>
  );
}
