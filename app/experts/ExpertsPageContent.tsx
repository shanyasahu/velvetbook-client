"use client";

import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";
import { Map } from "lucide-react";

import { SearchBar } from "@/components/header/SearchBar";

import type { Expert, ExpertsPageData } from "./experts.types";
import { CategoryCircles } from "./components/CategoryCircles";
import { CategoryPills } from "./components/CategoryPills";
import { ExpertSection } from "./components/ExpertSection";
import type { ExpertSliderHandle } from "./components/ExpertSlider";
import { ExpertsHeader } from "./components/ExpertsHeader";
import { ExpertsToolbar } from "./components/ExpertsToolbar";
import { FeaturedExpertCard } from "./components/FeaturedExpertCard";
import { MobileCategoriesPanel } from "./components/MobileCategoriesPanel";
import { SubCategoriesSidebar } from "./components/SubCategoriesSidebar";
import { TopCategoriesSidebar } from "./components/TopCategoriesSidebar";

interface ExpertsPageContentProps {
  data: ExpertsPageData;
}

const MOBILE_ALL_PILL = "All";

function parseDistance(distance: string): number {
  const match = distance.match(/[\d.]+/);
  return match ? Number.parseFloat(match[0]) : Number.POSITIVE_INFINITY;
}

function sortExperts(experts: Expert[], sortValue: string): Expert[] {
  const sorted = [...experts];
  switch (sortValue) {
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "nearest":
      return sorted.sort(
        (a, b) => parseDistance(a.distance) - parseDistance(b.distance),
      );
    case "popular":
    default:
      return sorted.sort((a, b) => b.reviews - a.reviews);
  }
}

function matchesPrice(expert: Expert, priceFilter: string): boolean {
  if (!priceFilter || priceFilter === "any") return true;
  if (priceFilter === "0-50") return expert.price <= 50;
  if (priceFilter === "50-100") return expert.price > 50 && expert.price <= 100;
  if (priceFilter === "100-plus") return expert.price > 100;
  return true;
}

function matchesPill(expert: Expert, pill: string): boolean {
  if (!pill || pill === MOBILE_ALL_PILL) return true;
  const haystack = [expert.specialty, ...expert.tags].join(" ").toLowerCase();
  return haystack.includes(pill.toLowerCase());
}

export default function ExpertsPageContent({ data }: ExpertsPageContentProps) {
  const mobilePrimarySliderRef = useRef<ExpertSliderHandle>(null);

  const [topCategoryId, setTopCategoryId] = useState("beauty");
  const [subCategoryId, setSubCategoryId] = useState(data.activeCategory.id);
  const [filterValues, setFilterValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      data.filters.map((filter) => [filter.id, filter.defaultValue]),
    ),
  );
  const [sortValue, setSortValue] = useState(
    data.sortOptions[0]?.id ?? "popular",
  );
  const [headerPill, setHeaderPill] = useState("");
  const [mobileCategoryId, setMobileCategoryId] = useState("beauty");
  const [mobilePill, setMobilePill] = useState(MOBILE_ALL_PILL);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileCategories, setShowMobileCategories] = useState(false);

  const primarySection = useMemo(
    () =>
      data.sections.find((section) => section.id === subCategoryId) ??
      data.sections[0],
    [data.sections, subCategoryId],
  );

  const secondarySections = useMemo(
    () => data.sections.filter((section) => section.id !== primarySection.id),
    [data.sections, primarySection.id],
  );

  const applyFiltersAndSort = useCallback(
    (experts: Expert[]) => {
      let result = [...experts];

      const genderFilter = filterValues.gender;
      if (genderFilter && genderFilter !== "all") {
        result = result.filter((expert) => expert.gender === genderFilter);
      }

      result = result.filter((expert) =>
        matchesPrice(expert, filterValues.price ?? "any"),
      );

      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        result = result.filter(
          (expert) =>
            expert.name.toLowerCase().includes(query) ||
            expert.specialty.toLowerCase().includes(query) ||
            expert.tags.some((tag) => tag.toLowerCase().includes(query)),
        );
      }

      return sortExperts(result, sortValue);
    },
    [filterValues, searchQuery, sortValue],
  );

  const desktopPrimaryExperts = useMemo(
    () =>
      applyFiltersAndSort(
        primarySection.experts.filter((expert) =>
          matchesPill(expert, headerPill),
        ),
      ),
    [applyFiltersAndSort, primarySection.experts, headerPill],
  );

  const mobilePrimaryExperts = useMemo(
    () =>
      applyFiltersAndSort(
        primarySection.experts.filter((expert) =>
          matchesPill(expert, mobilePill),
        ),
      ),
    [applyFiltersAndSort, primarySection.experts, mobilePill],
  );

  const handleFilterChange = useCallback((filterId: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [filterId]: value }));
  }, []);

  const resultsLabel = `${desktopPrimaryExperts.length} Experts Available in ${data.location}`;
  const activeTopLabel =
    data.topCategories.find((category) => category.id === topCategoryId)
      ?.label ?? "Experts";

  const viewOnMap = (
    <button
      type="button"
      onClick={() => {
        /* future: open map view */
      }}
      className="flex shrink-0 items-center gap-1 text-[11px] font-medium text-(--accent-secondary) transition-colors hover:text-(--accent-primary) lg:text-sm"
    >
      <Map size={14} strokeWidth={1.8} />
      View on Map
    </button>
  );

  return (
    <main className="min-h-screen bg-(--bg-primary) pb-24 lg:pb-10">
      <div className="mx-auto max-w-[1600px] space-y-4 px-3 py-4 lg:space-y-5 lg:px-6 lg:py-6">
        <div className="hidden lg:block">
          <ExpertsToolbar
            filters={data.filters}
            filterValues={filterValues}
            onFilterChange={handleFilterChange}
            sortOptions={data.sortOptions}
            sortValue={sortValue}
            onSortChange={setSortValue}
          />
        </div>

        <div className="lg:flex lg:gap-6">
          <TopCategoriesSidebar
            categories={data.topCategories}
            activeId={topCategoryId}
            onSelect={setTopCategoryId}
          />

          <SubCategoriesSidebar
            title="All Categories"
            categories={data.subCategories}
            activeId={subCategoryId}
            onSelect={setSubCategoryId}
            viewAllLabel={`View All ${activeTopLabel} Services`}
          />

          <div className="min-w-0 flex-1">
            {/* Mobile */}
            <div className="lg:hidden">
              <SearchBar
                className="mt-0"
                placeholder="Search services, salons, spas, experts..."
                value={searchQuery}
                onChange={setSearchQuery}
                onFilterClick={() => setShowMobileCategories((prev) => !prev)}
              />

              <div className={showMobileCategories ? "mt-3" : ""}>
                <MobileCategoriesPanel
                  open={showMobileCategories}
                  categories={data.topCategories}
                  activeId={topCategoryId}
                  onSelect={(id) => {
                    setTopCategoryId(id);
                    setShowMobileCategories(false);
                  }}
                  onClose={() => setShowMobileCategories(false)}
                  filters={data.filters}
                  filterValues={filterValues}
                  onFilterChange={handleFilterChange}
                  sortOptions={data.sortOptions}
                  sortValue={sortValue}
                  onSortChange={setSortValue}
                />
              </div>

              <div className="mt-3 space-y-4">
                <FeaturedExpertCard expert={data.featuredExpert} />

              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-(--text-primary)">
                    Explore by Category
                  </h2>
                  <Link
                    href="/experts"
                    className="text-[10px] font-medium text-(--accent-secondary)"
                  >
                    View all
                  </Link>
                </div>
                <CategoryCircles
                  categories={data.mobileCategories}
                  activeId={mobileCategoryId}
                  onSelect={setMobileCategoryId}
                />
              </section>

              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-(--text-primary)">
                    {activeTopLabel}
                  </h2>
                  <button
                    type="button"
                    onClick={() => mobilePrimarySliderRef.current?.slideNext()}
                    className="text-[10px] font-medium text-(--accent-secondary)"
                  >
                    View all
                  </button>
                </div>

                <CategoryPills
                  pills={data.mobilePills.filter((pill) => pill !== "More")}
                  value={mobilePill}
                  onChange={setMobilePill}
                  showMore
                  onMoreClick={() => mobilePrimarySliderRef.current?.slideNext()}
                />

                <ExpertSection
                  title=""
                  experts={mobilePrimaryExperts}
                  compact
                  sliderRef={mobilePrimarySliderRef}
                />
              </section>

              {secondarySections.map((section) => (
                <ExpertSection
                  key={section.id}
                  title={section.title}
                  experts={applyFiltersAndSort(section.experts)}
                  viewAllLabel="View all"
                  compact
                />
              ))}
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden space-y-6 lg:block">
              <ExpertsHeader
                title="Browse All Categories"
                subtitle="Explore services and find the perfect expert for your needs."
                activeCategory={{
                  title: primarySection.title,
                  description: data.activeCategory.description,
                  pills: data.activeCategory.pills,
                }}
                pillValue={headerPill}
                onPillChange={(pill) =>
                  setHeaderPill((prev) => (prev === pill ? "" : pill))
                }
              />

              <ExpertSection
                title={resultsLabel}
                experts={desktopPrimaryExperts}
                headerAction={viewOnMap}
                headingLevel="h2"
              />

              {secondarySections.map((section) => (
                <ExpertSection
                  key={section.id}
                  title={section.title}
                  experts={applyFiltersAndSort(section.experts)}
                  viewAllLabel="View all"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
