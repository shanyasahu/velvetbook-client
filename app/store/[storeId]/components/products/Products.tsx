"use client";

import { SwiperSlide } from "swiper/react";

import type { Product, SectionData } from "../types";
import SectionHeader from "../shared/SectionHeader";
import SharedSlider from "../shared/SharedSlider";
import ProductCard from "./ProductCard";

const PRODUCT_BREAKPOINTS = {
  0: { slidesPerView: 2.4, spaceBetween: 12 },
  640: { slidesPerView: 2.4, spaceBetween: 14 },
  1024: { slidesPerView: 2.5, spaceBetween: 16 },
  1280: { slidesPerView: 3, spaceBetween: 16 },
};

interface Props {
  meta: SectionData<Product>["meta"];
  items: SectionData<Product>["items"];
}

export default function Products({ meta, items }: Props) {
  return (
    <section>
      <SectionHeader
        title={meta.title}
        viewAllLabel={meta.viewAllLabel}
        viewAllHref={meta.viewAllHref}
      />

      <SharedSlider breakpoints={PRODUCT_BREAKPOINTS}>
        {items.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </SharedSlider>
    </section>
  );
}
