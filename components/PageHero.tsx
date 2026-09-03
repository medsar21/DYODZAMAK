"use client";

import Image from "next/image";
import { PrimaryButton, WhatsAppButton } from "@/components/Buttons";
import { FadeIn } from "@/components/Motion";
import { useLanguage } from "@/components/LanguageProvider";

export default function PageHero({
  title,
  subtitle,
  compact = false
}: {
  title: string;
  subtitle: string;
  compact?: boolean;
}) {
  const { t } = useLanguage();

  return (
    <section className={`metal-bg relative overflow-hidden px-4 pt-32 text-ivory md:px-8 ${compact ? "pb-20" : "pb-28 md:pb-36"}`}>
      <Image src="/images/hero-awards.png" alt="" fill priority className="hero-image-mask object-cover object-center opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/55 to-ink" />
      <FadeIn className="relative z-10 mx-auto max-w-7xl">
        <span className="mb-5 inline-flex text-sm font-black uppercase text-gold">BEST BOUTONS</span>
        <h1 className="metal-text max-w-4xl text-5xl font-black leading-none md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-xl leading-8 text-ivory/76 md:text-2xl">{subtitle}</p>
        {!compact && (
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton href="/devis">{t.quote}</PrimaryButton>
            <WhatsAppButton>{t.whatsapp}</WhatsAppButton>
          </div>
        )}
      </FadeIn>
    </section>
  );
}
