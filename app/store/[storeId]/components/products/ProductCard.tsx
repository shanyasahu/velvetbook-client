import Image from "next/image";

import type { Product } from "../types";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <article className="group flex h-full w-full flex-col gap-2 overflow-hidden rounded-[var(--radius-md)] border border-(--border) bg-(--bg-card) p-2 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 sm:flex-row sm:items-center sm:gap-3 sm:p-3">
      <div className="relative h-[80px] w-full shrink-0 overflow-hidden rounded-[var(--radius-sm)] sm:h-[72px] sm:w-[88px] lg:h-[80px] lg:w-[96px]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 45vw, 96px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 text-[11px] font-semibold leading-snug text-(--text-primary) lg:text-sm">
          {product.title}
        </h3>
        <span className="mt-1 block text-xs font-bold text-(--text-primary) lg:text-base">
          {product.price}
        </span>
      </div>
    </article>
  );
}
