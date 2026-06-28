"use client";

import { ArrowDownWideNarrow, X } from "lucide-react";

import type {
  FilterGroup,
  SortOption,
  TopCategory,
} from "../experts.types";
import { FilterDropdown } from "./FilterDropdown";
import { getIcon } from "./icons";

interface MobileCategoriesPanelProps {
  open: boolean;
  categories: TopCategory[];
  activeId: string;
  onSelect: (id: string) => void;
  onClose: () => void;
  filters: FilterGroup[];
  filterValues: Record<string, string>;
  onFilterChange: (filterId: string, value: string) => void;
  sortOptions: SortOption[];
  sortValue: string;
  onSortChange: (value: string) => void;
}

export function MobileCategoriesPanel({
  open,
  categories,
  activeId,
  onSelect,
  onClose,
  filters,
  filterValues,
  onFilterChange,
  sortOptions,
  sortValue,
  onSortChange,
}: MobileCategoriesPanelProps) {
  return (
    <div
      className={`grid overflow-hidden transition-all duration-300 ease-out lg:hidden ${
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
      aria-hidden={!open}
    >
      <div className="min-h-0">
        <div className="space-y-4 rounded-[var(--radius-md)] border border-(--border) bg-(--bg-card) p-3 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-(--text-muted)">
              Filters
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close filters"
              className="flex h-6 w-6 items-center justify-center rounded-full text-(--text-secondary) transition-colors hover:bg-(--bg-secondary)"
            >
              <X size={14} strokeWidth={1.8} />
            </button>
          </div>

          {/* Filter dropdowns */}
          <div className="grid grid-cols-2 gap-2">
            {filters.map((filter) => {
              const Icon = getIcon(filter.icon);
              return (
                <FilterDropdown
                  key={filter.id}
                  options={filter.options}
                  value={filterValues[filter.id] ?? filter.defaultValue}
                  onChange={(value) => onFilterChange(filter.id, value)}
                  icon={<Icon size={14} strokeWidth={1.8} />}
                  className="w-full"
                />
              );
            })}
          </div>

          {/* Sort */}
          <FilterDropdown
            options={sortOptions}
            value={sortValue}
            onChange={onSortChange}
            prefix="Sort by:"
            icon={<ArrowDownWideNarrow size={14} strokeWidth={1.8} />}
            className="w-full"
          />

          {/* Categories */}
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-(--text-muted)">
              Categories
            </p>
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
              {categories.map((category) => {
                const Icon = getIcon(category.icon);
                const isActive = category.id === activeId;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => onSelect(category.id)}
                    aria-pressed={isActive}
                    className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[11px] font-medium transition-colors ${
                      isActive
                        ? "primary-button text-white"
                        : "border border-(--border) bg-(--bg-secondary) text-(--text-secondary) hover:text-(--text-primary)"
                    }`}
                  >
                    <Icon size={14} strokeWidth={1.8} className="shrink-0" />
                    <span className="truncate">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
