"use client";

import { useMemo, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import { CategorySlug, Finish, Usage, Product, categories, categoryRoutes, products as staticProducts } from "@/data/site";
import { useLanguage } from "@/components/LanguageProvider";
import { usePublicProducts } from "@/lib/hooks";

type FilterState = {
  category: "all" | CategorySlug;
  finish: "all" | Finish;
  usage: "all" | Usage;
  type: "all" | "custom" | "3d" | "classic";
};

const finishes: Finish[] = ["bronze", "gold", "silver", "black"];
const usages: Usage[] = ["sport", "corporate", "event", "school", "association"];

const catalogCopy = {
  fr: { finish: "Finition", usage: "Usage", type: "Type", ok: "OK", filterLabel: "Filtres de Catalogue" },
  ar: { finish: "التشطيب", usage: "الاستعمال", type: "النوع", ok: "حسنا", filterLabel: "مرشحات الكتالوج" },
  en: { finish: "Finish", usage: "Usage", type: "Type", ok: "OK", filterLabel: "Catalog Filters" }
} as const;

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
    finishes: (raw.finishes as Finish[]) ?? [],
    usage: (raw.usage as Usage[]) ?? [],
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

export default function CatalogClient({ initialCategory = "all" }: { initialCategory?: "all" | CategorySlug }) {
  const { lang, t } = useLanguage();
  const copy = catalogCopy[lang];
  const [filters, setFilters] = useState<FilterState>({ category: initialCategory, finish: "all", usage: "all", type: "all" });
  const { products: apiProducts } = usePublicProducts();

  const allProducts = useMemo(() => {
    if (Array.isArray(apiProducts) && apiProducts.length > 0) {
      const mapped = apiProducts.map(mapApiProduct);
      if (mapped.some((p) => p.fr.name || p.ar.name || p.en.name)) {
        return mapped;
      }
    }
    return staticProducts;
  }, [apiProducts]);

  const visible = useMemo(() => {
    return allProducts.filter((product) => {
      if (filters.category !== "all" && product.category !== filters.category) return false;
      if (filters.finish !== "all" && !product.finishes.includes(filters.finish)) return false;
      if (filters.usage !== "all" && !product.usage.includes(filters.usage)) return false;
      if (filters.type === "custom" && !product.customizable) return false;
      if (filters.type === "3d" && !product.is3d) return false;
      if (filters.type === "classic" && product.is3d) return false;
      return true;
    });
  }, [filters, allProducts]);

  return (
    <section className="px-4 py-12 md:px-6 md:py-20">
      <div className="section-frame">
        {/* Catalog title & Results count */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="eyebrow">{t.nav.catalog}</span>
            <h1 className="mt-4 text-4xl font-medium tracking-[-0.03em] text-[#fffdf8] md:text-6xl">
              {filters.category === "all" ? t.nav.catalog : categories[filters.category][lang].title}
            </h1>
          </div>
          <p className="text-sm font-semibold tracking-wider text-[#e5bd77]/70 uppercase">
            {visible.length} {t.results}
          </p>
        </div>

        {/* Horizontal Filters in a single row/line */}
        <div className="section-surface rounded-[24px] border border-white/8 bg-[#2a0a12]/45 backdrop-blur-md p-5 mb-10 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Category Selector */}
          <div>
            <label htmlFor="filter-category" className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#e5bd77]/60 mb-2">
              {lang === "fr" ? "1. Catégorie" : lang === "ar" ? "1. الفئة" : "1. Category"}
            </label>
            <select
              id="filter-category"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value as any })}
              className="w-full h-[46px] px-3.5 rounded-[12px] bg-[#21070d]/85 border border-white/10 text-xs font-semibold text-white/80 focus:border-[#e5bd77]/50 focus:bg-[#21070d] outline-none transition-colors"
            >
              <option value="all">{t.all} ({t.nav.catalog})</option>
              {categoryRoutes.map((slug) => (
                <option key={slug} value={slug}>{categories[slug][lang].title}</option>
              ))}
            </select>
          </div>

          {/* Finish Selector */}
          <div>
            <label htmlFor="filter-finish" className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#e5bd77]/60 mb-2">
              {lang === "fr" ? "2. Finition" : lang === "ar" ? "2. التشطيب" : "2. Finish"}
            </label>
            <select
              id="filter-finish"
              value={filters.finish}
              onChange={(e) => setFilters({ ...filters, finish: e.target.value as any })}
              className="w-full h-[46px] px-3.5 rounded-[12px] bg-[#21070d]/85 border border-white/10 text-xs font-semibold text-white/80 focus:border-[#e5bd77]/50 focus:bg-[#21070d] outline-none transition-colors"
            >
              <option value="all">{t.all} ({copy.finish})</option>
              {finishes.map((finish) => (
                <option key={finish} value={finish}>{t.finishes[finish]}</option>
              ))}
            </select>
          </div>

          {/* Usage Selector */}
          <div>
            <label htmlFor="filter-usage" className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#e5bd77]/60 mb-2">
              {lang === "fr" ? "3. Usage" : lang === "ar" ? "3. الاستعمال" : "3. Usage"}
            </label>
            <select
              id="filter-usage"
              value={filters.usage}
              onChange={(e) => setFilters({ ...filters, usage: e.target.value as any })}
              className="w-full h-[46px] px-3.5 rounded-[12px] bg-[#21070d]/85 border border-white/10 text-xs font-semibold text-white/80 focus:border-[#e5bd77]/50 focus:bg-[#21070d] outline-none transition-colors"
            >
              <option value="all">{t.all} ({copy.usage})</option>
              {usages.map((usage) => (
                <option key={usage} value={usage}>{t.usages[usage]}</option>
              ))}
            </select>
          </div>

          {/* Type Selector */}
          <div>
            <label htmlFor="filter-type" className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#e5bd77]/60 mb-2">
              {lang === "fr" ? "4. Type de produit" : lang === "ar" ? "4. نوع المنتج" : "4. Product Type"}
            </label>
            <select
              id="filter-type"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value as any })}
              className="w-full h-[46px] px-3.5 rounded-[12px] bg-[#21070d]/85 border border-white/10 text-xs font-semibold text-white/80 focus:border-[#e5bd77]/50 focus:bg-[#21070d] outline-none transition-colors"
            >
              <option value="all">{t.all} ({copy.type})</option>
              {(["custom", "3d", "classic"] as const).map((type) => (
                <option key={type} value={type}>
                  {type === "custom" ? t.custom : type === "3d" ? t.model3d : t.classic}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Collection Grid */}
        <ProductGrid products={visible} />
      </div>
    </section>
  );
}
