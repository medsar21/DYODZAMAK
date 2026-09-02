"use client";

import Image from "next/image";
import { ProductCategory } from "@/data/product-categories";

export default function ProductCard({
  item,
  lang,
  categoryName,
  onViewProduct
}: {
  item: ProductCategory["placeholders"][number];
  lang: "fr" | "ar" | "en";
  categoryName: string;
  onViewProduct: (item: ProductCategory["placeholders"][number]) => void;
}) {
  const viewLabel = lang === "fr" ? "Voir le produit" : lang === "ar" ? "عرض المنتج" : "View product";

  return (
    <article className="product-card group flex h-full flex-col rounded-[24px] overflow-hidden border border-white/8 bg-[#2e0c14] transition-all duration-300 hover:border-[#e5bd77]/25 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
      <div className="relative overflow-hidden">
        <div className="relative aspect-square bg-white/5 p-3">
          <Image
            src={item.image}
            alt={item.title[lang]}
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 768px) 42vw, 100vw"
            className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(10,10,10,0.5))]" />
        </div>
        <div className="absolute top-3 left-3">
          <span className="rounded-full border border-white/15 bg-black/40 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur-sm">
            {categoryName}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold tracking-[-0.02em] text-white line-clamp-2">{item.title[lang]}</h3>
        <p className="mt-2 text-xs leading-6 text-white/55 line-clamp-2">{item.description[lang]}</p>
        <div className="mt-auto pt-4">
          <button
            onClick={() => onViewProduct(item)}
            className="w-full rounded-[12px] border border-[#e5bd77]/30 bg-[#e5bd77]/8 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#e5bd77] transition-all duration-200 hover:bg-[#e5bd77]/18 hover:border-[#e5bd77]/50"
          >
            {viewLabel}
          </button>
        </div>
      </div>
    </article>
  );
}
