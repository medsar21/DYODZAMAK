"use client";

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
    <section className={`relative overflow-hidden bg-white px-4 pt-32 text-[#111111] md:px-8 ${compact ? "pb-20" : "pb-28 md:pb-36"}`}>
      <FadeIn className="relative z-10 mx-auto max-w-7xl">
        <span className="mb-5 inline-flex text-sm font-black uppercase text-[#b88319]">BEST BOUTONS</span>
        <h1 className="max-w-4xl text-5xl font-black leading-none text-[#111111] md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-xl leading-8 text-[#555555] md:text-2xl">{subtitle}</p>
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
