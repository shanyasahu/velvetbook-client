import Image from "next/image";

import type { Store } from "../types";

import "./hero.css";

interface Props {
  store: Store;
}

export default function HeroImage({ store }: Props) {
  return (
    <div className="relative h-[320px] w-full sm:h-[380px] lg:h-[420px]">
      <Image
        src={store.coverImage}
        alt={store.name}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 60vw"
        className="object-cover"
      />
      <div className="store-hero-overlay absolute inset-0" />
    </div>
  );
}
