"use client";

import Link from "next/link";
import { useMemo } from "react";
import ProductGrid from "@/components/ProductGrid";
import { CategorySlug, Product, categories, products as staticProducts } from "@/data/site";
import { useLanguage } from "@/components/LanguageProvider";
import { usePublicProducts } from "@/lib/hooks";

function mapApiProduct(raw: Record<string, unknown>): Product {
  const cat = raw.category;
  let categorySlug: CategorySlug = "medailles";
  if (typeof cat === "string") {
    categorySlug = cat as CategorySlug;
  } else if (cat && typeof cat === "object" && "slug" in cat) {
    categorySlug = (cat as { slug: string }).slug as CategorySlug;
  } else if (typeof raw.categorySlug === "string") {
    categorySlug = raw.categorySlug as CategorySlug;
  }

  const rawFr = (raw.fr ?? {}) as Record<string, unknown>;
  const rawAr = (raw.ar ?? {}) as Record<string, unknown>;
  const rawEn = (raw.en ?? {}) as Record<string, unknown>;

  const nameFr = String(raw.nameFr ?? rawFr.name ?? "");
  const nameAr = String(raw.nameAr ?? rawAr.name ?? "");
  const nameEn = String(raw.nameEn ?? rawEn.name ?? "");

  return {
    id: String(raw.id ?? Math.random()),
    category: categorySlug,
    badge: String(raw.badge ?? ""),
    image: String(raw.image ?? "") + (raw.updatedAt ? `?v=${new Date(raw.updatedAt as string).getTime()}` : ""),
    finishes: (raw.finishes as Product["finishes"]) ?? [],
    usage: (raw.usage as Product["usage"]) ?? [],
    customizable: Boolean(raw.customizable ?? true),
    is3d: Boolean(raw.is3d),
    featured: Boolean(raw.featured),
    newest: Boolean(raw.newest),
    premium: Boolean(raw.premium),
    fr: {
      name: nameFr,
      specs: Array.isArray(raw.specsFr) ? (raw.specsFr as string[]) : Array.isArray(rawFr.specs) ? (rawFr.specs as string[]) : [],
      description: String(raw.descFr ?? rawFr.description ?? ""),
    },
    ar: {
      name: nameAr,
      specs: Array.isArray(raw.specsAr) ? (raw.specsAr as string[]) : Array.isArray(rawAr.specs) ? (rawAr.specs as string[]) : [],
      description: String(raw.descAr ?? rawAr.description ?? ""),
    },
    en: {
      name: nameEn,
      specs: Array.isArray(raw.specsEn) ? (raw.specsEn as string[]) : Array.isArray(rawEn.specs) ? (rawEn.specs as string[]) : [],
      description: String(raw.descEn ?? rawEn.description ?? ""),
    },
  };
}

export default function CategoryPageClient({ slug }: { slug: CategorySlug }) {
  const { lang, t } = useLanguage();
  const category = categories[slug];
  const categoryCopy = category[lang];
  const { products: apiProducts } = usePublicProducts(slug);

  const categoryProducts = useMemo(() => {
    if (Array.isArray(apiProducts) && apiProducts.length > 0) {
      const mapped = apiProducts.map(mapApiProduct);
      const filtered = mapped.filter((p) => p.category === slug);
      if (filtered.length > 0) return filtered;
    }
    return staticProducts.filter((p) => p.category === slug);
  }, [apiProducts, slug]);

  return (
    <div className="px-4 pb-16 pt-24 md:px-6 md:pb-24 md:pt-32">
      <div className="section-frame">
        {/* Header Block */}
        <div className="section-surface rounded-[var(--radius-lg)] p-8 md:p-12 mb-10 text-center flex flex-col items-center">
          <span className="gold-kicker uppercase tracking-[0.18em] text-xs font-semibold mb-3">
            {lang === "fr" ? "Personnalisation sur mesure" : lang === "ar" ? "تخصيص حسب الطلب" : "Bespoke Customization"}
          </span>
          <h1 className="text-4xl font-medium leading-[1.25] tracking-[-0.03em] text-[#fffdf8] md:text-5xl max-w-4xl">
            {lang === "fr" 
              ? `Collection de ${categoryCopy.title} entièrement personnalisables` 
              : lang === "ar" 
              ? `مجموعة ${categoryCopy.title} قابلة للتخصيص بالكامل` 
              : `Fully customizable ${categoryCopy.title} collection`}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[rgba(255,255,255,0.7)]">
            {categoryCopy.summary}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/devis" className="gold-button">
              {t.quote}
            </Link>
            <Link href="/catalogue" className="outline-button">
              {lang === "fr" ? "Voir le catalogue" : lang === "ar" ? "عرض الكتالوج" : "View the catalog"}
            </Link>
          </div>
        </div>

        {/* Collection Grid */}
        <div className="mt-12">
          <ProductGrid products={categoryProducts} />
        </div>
      </div>
    </div>
  );
}
