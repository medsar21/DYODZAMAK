"use client";

import { FormEvent, useState } from "react";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { whatsappNumber } from "@/data/site";
import { useLanguage } from "@/components/LanguageProvider";
import { getProductCategoryLabel, productCategories } from "@/data/product-categories";
import { submitQuote } from "@/lib/hooks";

export default function QuoteForm({ compact = false, transparent = false }: { compact?: boolean; transparent?: boolean }) {
  const { lang, t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    product: "",
    quantity: "",
    finish: "",
    engraving: "",
    description: ""
  });

  function field(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const f = t.form;
    const intro = lang === "fr" ? "BEST BOUTONS - Demande de devis" : lang === "ar" ? "BEST BOUTONS - طلب عرض سعر" : "BEST BOUTONS - Quote request";
    const message = [
      intro,
      `${f.name}: ${form.name}`,
      `${f.phone}: ${form.phone}`,
      `${f.city}: ${form.city}`,
      `${f.product}: ${form.product}`,
      `${f.quantity}: ${form.quantity}`,
      `${f.finish}: ${form.finish}`,
      `${f.engraving}: ${form.engraving}`,
      `${f.message}: ${form.description}`,
      t.price
    ].join("\n");

    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    submitQuote({
      name: form.name,
      phone: form.phone,
      city: form.city,
      product: form.product,
      quantity: form.quantity,
      finish: form.finish,
      engraving: form.engraving,
      message: form.description,
      whatsappLink: waUrl,
    }).catch(() => {});

    window.open(waUrl, "_blank", "noopener,noreferrer");
  }

  const inputClass = `field ${
    transparent
      ? "bg-[#21070d]/95 border-white/20 text-white placeholder-white/40 focus:border-[#e5bd77]/50 focus:bg-[#21070d]"
      : ""
  }`;

  return (
    <form
      onSubmit={submit}
      className={`quote-form ${
        transparent
          ? "border border-white/10 bg-[#21070d]/75 backdrop-blur-md p-5 md:p-8 rounded-[32px]"
          : "section-surface rounded-[32px] p-5 md:p-8"
      } ${compact ? "grid gap-4" : "grid gap-4 md:grid-cols-2"}`}
      noValidate
    >
      <div className={compact ? "" : "md:col-span-2"}>
        <span className="eyebrow">{t.price}</span>
        <h2 className="mt-5 text-3xl font-medium tracking-[-0.02em] text-white md:text-4xl">{t.pages.quote[0]}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">{t.pages.quote[1]}</p>
      </div>

      <div>
        <label htmlFor="quote-name" className="field-label">{t.form.name}</label>
        <input id="quote-name" className={inputClass} required placeholder={t.form.name} value={form.name} onChange={(e) => field("name", e.target.value)} />
      </div>
      <div>
        <label htmlFor="quote-phone" className="field-label">{t.form.phone}</label>
        <input id="quote-phone" className={inputClass} required placeholder={t.form.phone} value={form.phone} onChange={(e) => field("phone", e.target.value)} />
      </div>
      <div>
        <label htmlFor="quote-city" className="field-label">{t.form.city}</label>
        <input id="quote-city" className={inputClass} required placeholder={t.form.city} value={form.city} onChange={(e) => field("city", e.target.value)} />
      </div>

      <div>
        <label htmlFor="quote-product" className="field-label">{t.form.product}</label>
        <select id="quote-product" className={inputClass} required value={form.product} onChange={(e) => field("product", e.target.value)}>
          <option value="">{t.form.product}</option>
          {productCategories.map((category) => (
            <option key={category.slug} value={getProductCategoryLabel(category.slug, lang)}>
              {getProductCategoryLabel(category.slug, lang)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="quote-quantity" className="field-label">{t.form.quantity}</label>
        <input id="quote-quantity" className={inputClass} required type="number" min="1" placeholder={t.form.quantity} value={form.quantity} onChange={(e) => field("quantity", e.target.value)} />
      </div>
      <div>
        <label htmlFor="quote-finish" className="field-label">{t.form.finish}</label>
        <input id="quote-finish" className={inputClass} placeholder={t.form.finish} value={form.finish} onChange={(e) => field("finish", e.target.value)} />
      </div>
      <div className={compact ? "" : "md:col-span-2"}>
        <label htmlFor="quote-engraving" className="field-label">{t.form.engraving}</label>
        <textarea id="quote-engraving" className={`${inputClass} min-h-28`} placeholder={t.form.engraving} value={form.engraving} onChange={(e) => field("engraving", e.target.value)} />
      </div>
      <div className={compact ? "" : "md:col-span-2"}>
        <label htmlFor="quote-message" className="field-label">{t.form.message}</label>
        <textarea id="quote-message" className={`${inputClass} min-h-36`} required placeholder={t.form.message} value={form.description} onChange={(e) => field("description", e.target.value)} />
      </div>

      <button type="submit" className={`button-whatsapp ${compact ? "" : "md:col-span-2"}`}>
        <WhatsAppIcon size={18} />
        {t.form.button}
      </button>
    </form>
  );
}
