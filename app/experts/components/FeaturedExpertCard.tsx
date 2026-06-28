import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, MapPin, MessageSquare, Play, Star } from "lucide-react";

import type { FeaturedExpert } from "../experts.types";
import { getIcon } from "./icons";

interface FeaturedExpertCardProps {
  expert: FeaturedExpert;
}

export function FeaturedExpertCard({ expert }: FeaturedExpertCardProps) {
  const profileHref = `/specificexpert/${expert.id}`;

  return (
    <section className="feature-card overflow-hidden rounded-[var(--radius-md)] p-4">
      <div className="flex items-stretch gap-3">
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="flex items-center gap-1.5">
            <h2 className="truncate text-lg font-bold text-(--text-primary)">
              {expert.name}
            </h2>
            {expert.verified && (
              <BadgeCheck size={18} strokeWidth={1.8} className="shrink-0 text-(--brand-gold)" />
            )}
          </div>

          <div className="mt-1.5 flex items-center gap-2 text-xs text-(--text-secondary)">
            <span className="flex items-center gap-1">
              <Star size={13} className="fill-(--brand-gold) text-(--brand-gold)" />
              <span className="font-semibold text-(--text-primary)">
                {expert.rating.toFixed(1)}
              </span>
              ({expert.reviews})
            </span>
            <span className="text-(--text-muted)">|</span>
            <span className="flex items-center gap-1">
              <MapPin size={13} strokeWidth={1.8} className="text-(--brand-gold)" />
              {expert.distance}
            </span>
          </div>

          <p className="mt-2 text-xs leading-relaxed text-(--text-secondary)">
            {expert.tagline}
          </p>
        </div>

        <Link
          href={profileHref}
          className="relative aspect-[16/10] w-2/5 max-w-[200px] shrink-0 self-stretch overflow-hidden rounded-xl"
          aria-label={`Watch ${expert.name}'s intro video`}
        >
          <Image
            src={expert.videoThumbnail}
            alt={`${expert.name} intro`}
            fill
            sizes="(max-width: 640px) 40vw, 200px"
            className="object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/20">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-black/30 text-white backdrop-blur-sm">
              <Play size={15} className="ml-0.5 fill-current" />
            </span>
          </span>
          <span className="absolute bottom-1.5 right-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-medium text-white">
            {expert.videoDuration}
          </span>
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-6 gap-1">
        {expert.services.map((service) => {
          const Icon = getIcon(service.icon);
          return (
            <div key={service.id} className="flex flex-col items-center gap-1">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-(--border) bg-(--bg-card) text-(--accent-secondary)">
                <Icon size={16} strokeWidth={1.7} />
              </span>
              <span className="w-full truncate text-center text-[8px] text-(--text-secondary)">
                {service.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Link
          href={profileHref}
          className="flex h-9 flex-1 items-center justify-center rounded-lg border border-(--border) bg-(--bg-card) text-[11px] font-medium text-(--text-primary) transition-colors hover:border-(--accent-primary)"
        >
          View Profile
        </Link>
        <Link
          href="/booking"
          className="primary-button flex h-9 flex-1 items-center justify-center rounded-lg text-[11px] font-semibold text-white"
        >
          Book Now
        </Link>
        <Link
          href={`/specificexpertmessage/${expert.id}`}
          className="flex h-9 flex-1 items-center justify-center gap-1 rounded-lg border border-(--brand-gold) text-[11px] font-medium text-(--brand-gold) transition-colors hover:bg-(--bg-secondary)"
        >
          <MessageSquare size={13} strokeWidth={1.8} />
          Message
        </Link>
      </div>
    </section>
  );
}
