"use client";

import {
  CalendarDays,
  ChevronDown,
  ChevronRight,
  MapPin,
  Star,
  X,
} from "lucide-react";

import { Button } from "@/components/Button";

const serviceCategories = [
  "Barber",
  "Salon",
  "Spa",
  "Massage",
  "Tattoo",
  "Nails",
  "Makeup",
];

const priceRanges = [
  "Any Price",
  "Rs 0 - Rs 999",
  "Rs1000 - Rs1999",
  "Rs2000 - Rs3999",
  "Rs4000 & above",
];

const ratings = [
  "Any Rating",
  "4.5 & above",
  "4.0 & above",
  "3.5 & above",
  "3.0 & above",
];

const availability = ["Anytime", "Today", "Tomorrow"];

interface HomeFilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HomeFilterSidebar({
  isOpen,
  onClose,
}: HomeFilterSidebarProps) {
  return (
    <aside
      className={`
        hidden min-w-0 overflow-hidden transition-[opacity,transform] duration-300 ease-out lg:block
        ${isOpen ? "opacity-100" : "pointer-events-none -translate-x-2 opacity-0"}
      `}
      aria-hidden={!isOpen}
    >
      <div
        className={`
          w-[252px] rounded-xl border border-(--border) bg-(--bg-card)
          p-4 shadow-(--shadow-card) transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[22px] font-semibold text-(--text-primary)">
            Filter
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="flex h-8 w-8 items-center justify-center rounded-full text-(--text-primary) transition-colors duration-200 hover:bg-(--bg-card-hover)"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="space-y-5">
          <section>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11px] font-medium uppercase text-(--text-primary)">
                Select Location
              </p>

              <button
                type="button"
                className="text-[10px] font-semibold text-(--accent-secondary)"
              >
                Reset
              </button>
            </div>

            <button
              type="button"
              className="flex h-9 w-full items-center gap-2 rounded-[6px] border border-(--border) bg-(--bg-card) px-3 text-left text-[11px] text-(--text-primary)"
            >
              <MapPin size={13} strokeWidth={1.5} />
              <span className="min-w-0 flex-1 truncate">Indore, India</span>
              <ChevronDown size={14} strokeWidth={1.5} />
            </button>
          </section>

          <section>
            <p className="mb-3 text-[11px] font-medium uppercase text-(--text-primary)">
              Service Category
            </p>

            <div className="space-y-2">
              {serviceCategories.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 text-[11px] text-(--text-primary)"
                >
                  <input
                    type="checkbox"
                    className="h-3 w-3 rounded border-(--border) accent-(--accent-primary)"
                  />
                  <span>{category}</span>
                </label>
              ))}

              <button
                type="button"
                className="flex items-center gap-2 text-[11px] text-(--text-primary)"
              >
                <ChevronRight size={13} strokeWidth={1.5} />
                <span>More</span>
              </button>
            </div>
          </section>

          <section className="border-t border-(--border) pt-4">
            <p className="mb-3 text-[11px] font-medium uppercase text-(--text-primary)">
              Price Range
            </p>

            <div className="space-y-2">
              {priceRanges.map((range, index) => (
                <label
                  key={range}
                  className="flex items-center gap-2 text-[11px] text-(--text-primary)"
                >
                  <input
                    type="radio"
                    name="price-range"
                    defaultChecked={index === 0}
                    className="h-3 w-3 accent-(--accent-primary)"
                  />
                  <span>{range}</span>
                </label>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <input
                type="text"
                placeholder="Min Price"
                className="h-8 min-w-0 flex-1 rounded-[6px] border border-(--border) bg-transparent px-3 text-[11px] text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none"
              />
              <span className="text-(--text-secondary)">-</span>
              <input
                type="text"
                placeholder="Max Price"
                className="h-8 min-w-0 flex-1 rounded-[6px] border border-(--border) bg-transparent px-3 text-[11px] text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none"
              />
            </div>
          </section>

          <section className="border-t border-(--border) pt-4">
            <p className="mb-3 text-[11px] font-medium uppercase text-(--text-primary)">
              Rating
            </p>

            <div className="space-y-2">
              {ratings.map((rating, index) => (
                <label
                  key={rating}
                  className="flex items-center gap-2 text-[11px] text-(--text-primary)"
                >
                  <input
                    type="radio"
                    name="rating"
                    defaultChecked={index === 0}
                    className="h-3 w-3 accent-(--accent-primary)"
                  />
                  {index > 0 && (
                    <Star
                      size={12}
                      className="fill-(--brand-gold) text-(--brand-gold)"
                    />
                  )}
                  <span>{rating}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="border-t border-(--border) pt-4">
            <p className="mb-3 text-[11px] font-medium uppercase text-(--text-primary)">
              Availability
            </p>

            <div className="space-y-2">
              {availability.map((item, index) => (
                <label
                  key={item}
                  className="flex items-center gap-2 text-[11px] text-(--text-primary)"
                >
                  <input
                    type="radio"
                    name="availability"
                    defaultChecked={index === 0}
                    className="h-3 w-3 accent-(--accent-primary)"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>

            <button
              type="button"
              className="mt-3 flex h-8 w-full items-center gap-2 rounded-[6px] border border-(--border) px-3 text-[11px] text-(--text-secondary)"
            >
              <span className="min-w-0 flex-1 text-left">Select Date</span>
              <CalendarDays size={14} strokeWidth={1.5} />
            </button>
          </section>

          <Button
            type="button"
            fullWidth
            className="rounded-[6px] py-3 text-[12px] font-semibold"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </aside>
  );
}
