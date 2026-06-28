import type { MenuItem, SectionData, SidebarMeta } from "../types";
import { SidebarFooter, SidebarHeader } from "../shared/Badge";
import MenuCard from "./MenuCard";

interface Props {
  meta: SidebarMeta;
  items: SectionData<MenuItem, SidebarMeta>["items"];
}

export default function MenuSidebar({ meta, items }: Props) {
  return (
    <aside className="order-3 xl:order-none">
      <div className="xl:sticky xl:top-24">
        <div className="rounded-[var(--radius-lg)] border border-(--border) bg-(--bg-card) p-4 shadow-[var(--shadow-card)] lg:p-5">
          <SidebarHeader
            title={meta.title}
            actionLabel={meta.actionLabel}
            actionHref={meta.actionHref}
          />

          <div className="space-y-3">
            {items.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>

          <SidebarFooter label={meta.footerLabel} href={meta.footerHref} />
        </div>
      </div>
    </aside>
  );
}
