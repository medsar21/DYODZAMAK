"use client";

import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, MessageCircle } from "lucide-react";
import ProductCard from "@/components/category/ProductCard";
import { useLanguage } from "@/components/LanguageProvider";
import { ProductCategory, getProductCategoryLabel } from "@/data/product-categories";
import { whatsappNumber } from "@/data/site";
import { usePublicProducts } from "@/lib/hooks";

const ITEMS_PER_PAGE = 16;

type PlaceholderItem = {
  image: string;
  title: { fr: string; ar: string; en: string };
  description: { fr: string; ar: string; en: string };
  details: { fr: string; ar: string; en: string }[];
};

export default function CategoryPage({
  category
}: {
  category: ProductCategory;
}) {
  const { lang } = useLanguage();
  const categoryName = getProductCategoryLabel(category.slug, lang);
  const { products: apiProducts } = usePublicProducts(category.slug);

  const placeholders = useMemo(() => {
    if (!Array.isArray(apiProducts) || apiProducts.length === 0) {
      return category.placeholders ?? [];
    }
    return apiProducts.map((p: Record<string, unknown>) => ({
      image: String(p.image ?? "") + (p.updatedAt ? `?v=${new Date(p.updatedAt as string).getTime()}` : ""),
      title: {
        fr: String(p.nameFr ?? ""),
        ar: String(p.nameAr ?? ""),
        en: String(p.nameEn ?? ""),
      },
      description: {
        fr: String(p.descFr ?? ""),
        ar: String(p.descAr ?? ""),
        en: String(p.descEn ?? ""),
      },
      details: (() => {
        const specs = p.specsFr;
        return Array.isArray(specs)
          ? specs.map((s: string) => ({ fr: s, ar: s, en: s }))
          : [];
      })(),
    }));
  }, [apiProducts, category]);
  const [page, setPage] = useState(1);
  const [activeItem, setActiveItem] = useState<PlaceholderItem | null>(null);

  useEffect(() => {
    if (activeItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeItem]);

  const totalPages = Math.max(1, Math.ceil(placeholders.length / ITEMS_PER_PAGE));
  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const visibleItems = placeholders.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const collectionTitle = {
    fr: `Collection ${categoryName} — 100% personnalisable`,
    ar: `مجموعة ${categoryName} — قابلة للتخصيص بالكامل`,
    en: `${categoryName} Collection — Fully Customizable`
  };

  const collectionDesc = {
    fr: "Chaque pièce peut être adaptée à votre projet : logo, texte, finition et forme sur mesure.",
    ar: "كل قطعة peut être adaptée à votre projet : logo, texte, finition et forme sur mesure.",
    en: "Every piece can be tailored to your project: logo, text, finish and shape made to order."
  };

  const btnQuote = { fr: "Demander un devis", ar: "طلب عرض سعر", en: "Request a quote" };
  const btnCatalog = { fr: "Voir le catalogue", ar: "عرض الكتالوج", en: "View the catalog" };
  const pageLabel = lang === "fr" ? "Page" : lang === "ar" ? "صفحة" : "Page";

  // Modal localized strings
  const detailsLabel = lang === "fr" ? "Caractéristiques" : lang === "ar" ? "المواصفات" : "Specifications";
  const descLabel = lang === "fr" ? "Description" : lang === "ar" ? "الوصف" : "Description";
  const waLabel = "WhatsApp";

  const waMessage = activeItem
    ? encodeURIComponent(
        lang === "fr"
          ? `Bonjour, je suis intéressé par le produit "${activeItem.title.fr}" de la catégorie ${categoryName}. Pouvez-vous me donner plus de détails ?`
          : lang === "ar"
          ? `مرحبا، أنا مهتم بالمنتج "${activeItem.title.ar}" من فئة ${categoryName}. هل يمكنكم إعطائي المزيد من التفاصيل؟`
          : `Hello, I'm interested in the product "${activeItem.title.en}" from the ${categoryName} category. Can you give me more details?`
      )
    : "";

  const waUrl = `https://wa.me/${whatsappNumber}?text=${waMessage}`;

  return (
    <div className="px-4 pb-16 pt-8 md:px-6 md:pb-24 md:pt-12">
      <div className="section-frame">
        {/* Collection Header */}
        <div className="section-surface rounded-[var(--radius-lg)] p-8 md:p-12 mb-10 text-center flex flex-col items-center">
          <span className="gold-kicker uppercase tracking-[0.18em] text-xs font-semibold mb-3">
            {lang === "fr" ? "Personnalisation sur mesure" : lang === "ar" ? "تخصيص حسب الطلب" : "Bespoke Customization"}
          </span>
          <h1 className="text-3xl font-medium leading-[1.25] tracking-[-0.03em] text-[#fffdf8] md:text-5xl max-w-4xl">
            {collectionTitle[lang]}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[rgba(255,255,255,0.7)]">
            {collectionDesc[lang]}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/devis" className="gold-button">
              {btnQuote[lang]}
            </Link>
            <Link href="/catalogue" className="outline-button">
              {btnCatalog[lang]}
            </Link>
          </div>
        </div>

        {/* Product Collection Grid — 4 columns */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleItems.map((item) => (
            <ProductCard
              key={item.title.fr}
              item={item}
              lang={lang}
              categoryName={categoryName}
              onViewProduct={(selected) => setActiveItem(selected)}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition ${
                  p === page
                    ? "border border-[#e5bd77]/40 bg-[#e5bd77]/15 text-[#e5bd77]"
                    : "border border-white/8 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>

            <span className="ml-3 text-xs text-white/40">
              {pageLabel} {page}/{totalPages}
            </span>
          </div>
        )}
      </div>

      {/* Central Product Modal Portal */}
      {activeItem && createPortal(
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="product-modal relative w-full max-w-3xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto rounded-[24px] border border-white/10 bg-[#2a0a12] shadow-[0_45px_100px_rgba(0,0,0,0.8)] flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#21070d]/80 text-white/70 backdrop-blur-sm transition hover:bg-white/10 hover:text-white"
              onClick={() => setActiveItem(null)}
              aria-label="Fermer"
            >
              <X size={16} />
            </button>

            {/* Product image (Left/Top) */}
            <div className="w-full md:w-[42%] bg-white/3 flex items-center justify-center p-6 relative border-b md:border-b-0 md:border-r border-white/5 min-h-[240px] md:min-h-[360px] shrink-0">
              <div className="relative w-full h-[180px] md:h-[260px]">
                <Image
                  src={activeItem.image}
                  alt={activeItem.title[lang]}
                  fill
                  sizes="(min-width: 768px) 320px, 100vw"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="absolute bottom-4 left-5">
                <span className="rounded-full border border-[#e5bd77]/30 bg-[#21070d]/80 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#e5bd77]/80 backdrop-blur-sm">
                  {categoryName}
                </span>
              </div>
            </div>

            {/* Product info (Right/Bottom) */}
            <div className="w-full md:w-[58%] p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold tracking-[-0.03em] text-[#fffdf8] leading-snug">
                  {activeItem.title[lang]}
                </h2>

                <div className="mt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#e5bd77]/60 mb-1">{descLabel}</p>
                  <p className="text-xs md:text-sm leading-6 text-white/70">{activeItem.description[lang]}</p>
                </div>

                <div className="mt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#e5bd77]/60 mb-2">{detailsLabel}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeItem.details.map((detail) => (
                      <span
                        key={detail.fr}
                        className="rounded-full border border-white/8 bg-white/4 px-3 py-1 text-[10px] font-medium tracking-[0.04em] text-white/60"
                      >
                        {detail[lang]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons with matching size/height/alignment */}
              <div className="mt-6 flex flex-row gap-3">
                <Link
                  href="/devis"
                  className="flex-1 h-[48px] rounded-[12px] flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16120b] bg-gradient-to-r from-[#d8b16c] via-[#f4d891] to-[#b98b42] shadow-[0_10px_20px_rgba(216,177,108,0.15)] transition-transform duration-200 hover:-translate-y-[2px]"
                  onClick={() => setActiveItem(null)}
                >
                  {btnQuote[lang]}
                </Link>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 h-[48px] rounded-[12px] flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#25D366] border border-[#25D366]/30 bg-[#25D366]/8 transition-all duration-200 hover:bg-[#25D366]/15 hover:-translate-y-[2px]"
                >
                  <MessageCircle size={16} />
                  {waLabel}
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

