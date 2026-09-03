"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { categories, gallery } from "@/data/site";
import { useLanguage } from "@/components/LanguageProvider";
import { FadeIn } from "@/components/Motion";
import Link from "next/link";

export default function GalleryClient({ preview = false }: { preview?: boolean }) {
  const { lang, t } = useLanguage();
  const [active, setActive] = useState<number | null>(null);
  const items = preview ? gallery.slice(0, 4) : gallery;
  const activeItem = active === null ? null : items[active];

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => {
          const category = categories[item.category];
          return (
            <FadeIn key={`${item.category}-${index}`} delay={index * 0.035}>
              <button type="button" onClick={() => setActive(index)} className="premium-card group w-full overflow-hidden text-start">
                <div className={`grid aspect-[1.18] place-items-center bg-gradient-to-br ${item.tone} p-6 text-ivory`}>
                  <div className="grid h-28 w-28 place-items-center border border-white/30 bg-ink/40 text-center text-sm font-black uppercase shadow-premium">
                    BEST BOUTONS
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs font-black uppercase text-bronze">{category[lang].title}</span>
                  <h3 className="mt-2 text-xl font-black text-coal">{t.price}</h3>
                </div>
              </button>
            </FadeIn>
          );
        })}
      </div>

      {activeItem && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-ink/82 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="w-full max-w-3xl overflow-hidden bg-ivory shadow-premium">
            <div className={`grid aspect-[1.9] place-items-center bg-gradient-to-br ${activeItem.tone} text-ivory`}>
              <div className="grid h-36 w-36 place-items-center border border-white/30 bg-ink/45 text-center font-black">BEST BOUTONS</div>
            </div>
            <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-2xl font-black text-coal">{categories[activeItem.category][lang].title}</h3>
                <p className="mt-2 text-coal/62">{t.price}</p>
              </div>
              <div className="flex gap-2">
                <Link href="/devis" className="bg-coal px-5 py-3 font-black text-gold">{t.sameModel}</Link>
                <button type="button" onClick={() => setActive(null)} className="grid h-12 w-12 place-items-center border border-coal/15 text-coal">
                  <X />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
