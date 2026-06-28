"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";

import type { FilterOption } from "../experts.types";
import { useClickOutside } from "./lib/useClickOutside";

interface FilterDropdownProps {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  /** Optional leading icon shown in the trigger. */
  icon?: ReactNode;
  /** Prefix label rendered before the selected value (e.g. "Sort by:"). */
  prefix?: string;
  /** Fallback label when no option matches `value`. */
  placeholder?: string;
  align?: "left" | "right";
  className?: string;
}

export function FilterDropdown({
  options,
  value,
  onChange,
  icon,
  prefix,
  placeholder = "Select",
  align = "left",
  className = "",
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useClickOutside(containerRef, () => setOpen(false), open);

  const selected = options.find((option) => option.id === value);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        className="flex h-9 w-full items-center gap-1.5 rounded-full border border-(--border) bg-(--bg-card) px-3 text-[11px] font-medium text-(--text-primary) transition-colors hover:border-(--accent-primary) lg:h-10 lg:px-4 lg:text-xs"
      >
        {icon && <span className="shrink-0 text-(--text-secondary)">{icon}</span>}

        <span className="flex-1 truncate text-left">
          {prefix && <span className="text-(--text-muted)">{prefix} </span>}
          {selected ? selected.label : placeholder}
        </span>

        <ChevronDown
          size={14}
          strokeWidth={1.5}
          className={`shrink-0 text-(--text-secondary) transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          className={`absolute z-30 mt-2 max-h-64 min-w-[180px] overflow-y-auto rounded-xl border border-(--border) bg-(--bg-card) py-1.5 shadow-lg ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {options.map((option) => {
            const isActive = option.id === value;
            return (
              <li key={option.id} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.id);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-xs transition-colors hover:bg-(--bg-secondary) ${
                    isActive
                      ? "font-medium text-(--accent-primary)"
                      : "text-(--text-primary)"
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  {isActive && <Check size={13} strokeWidth={2} className="shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
