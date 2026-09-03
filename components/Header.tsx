"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, LogIn, Menu, X } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { Lang, navItems, whatsappNumber } from "@/data/site";
import { getProductCategoryLabel, productCategories } from "@/data/product-categories";

const languageOptions: Array<{ code: Lang; label: string }> = [
  { code: "fr", label: "FR" },
  { code: "ar", label: "AR" },
  { code: "en", label: "EN" }
];

const shellCopy = {
  fr: { atelier: "Atelier de reconnaissance sur mesure", categories: "Catégories", openMenu: "Ouvrir le menu", closeMenu: "Fermer le menu", metal: "Atelier métal" },
  ar: { atelier: "ورشة تكريم حسب الطلب", categories: "الفئات", openMenu: "فتح القائمة", closeMenu: "إغلاق القائمة", metal: "ورشة معدنية" },
  en: { atelier: "Custom recognition atelier", categories: "Categories", openMenu: "Open menu", closeMenu: "Close menu", metal: "Metal atelier" }
} as const;

export default function Header() {
  const { lang, t, setLang, isRtl } = useLanguage();
  const [open, setOpen] = useState(false);
  const copy = shellCopy[lang];
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }
      if (e.key !== "Tab" || !drawerRef.current) return;

      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeMenu]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <div className="glass-nav shell-container rounded-[30px] px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-[16px] border border-white/15 bg-white/95 shadow-[0_10px_24px_rgba(0,0,0,0.2)]">
              <Image src="/images/logo.png" alt="BEST BOUTONS logo" fill sizes="48px" className="object-contain p-2" />
            </div>
            <div>
              <span className="block text-[1.02rem] font-semibold tracking-[-0.05em] text-white md:text-[1.2rem]">BEST BOUTONS</span>
              <span className="mt-1 block text-[0.62rem] uppercase tracking-[0.28em] text-white/50">{copy.atelier}</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            <Link href="/catalogue" className="premium-link text-sm font-medium text-white/75">
              {t.nav.catalog}
            </Link>

            <div className="group relative">
              <button
                type="button"
                className="inline-flex items-center gap-2 text-sm font-medium text-white/75 transition hover:text-white"
              >
                {t.nav.products ?? "Produits"}
                <ChevronDown size={16} className="transition group-hover:translate-y-[1px]" />
              </button>

              <div className="pointer-events-none absolute left-0 top-full z-50 pt-4 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                <div className="header-panel min-w-[620px] rounded-[30px] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.32)]">
                  <div className="mb-3 px-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e5bd77]/70">{copy.categories}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {productCategories.map((category) => (
                      <Link
                        key={category.slug}
                        href={category.href}
                        className="rounded-[20px] border border-transparent px-4 py-4 text-sm font-medium text-white/76 transition hover:border-[#e5bd77]/20 hover:bg-white/8 hover:text-[#f3d08b]"
                      >
                        {getProductCategoryLabel(category.slug, lang)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link href="/contact" className="premium-link text-sm font-medium text-white/75">
              {t.nav.contact}
            </Link>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-2 rounded-full border border-white/15 p-1">
              {languageOptions.map((option) => (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => setLang(option.code)}
                  className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                    lang === option.code ? "bg-white text-[#111111]" : "text-white/78 hover:bg-white/10"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <Link href="/devis" className="button-primary">
              {t.quote}
            </Link>
            <Link
              href="/admin/login"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 text-sm font-semibold text-white transition hover:border-[#e5bd77]/60 hover:bg-[#e5bd77]/15 hover:text-[#f3d08b]"
            >
              <LogIn size={16} />
              Login
            </Link>
          </div>

          <button
            ref={hamburgerRef}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white lg:hidden"
            onClick={() => setOpen((value) => !value)}
              aria-label={open ? copy.closeMenu : copy.openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 bg-black/30 px-4 py-4 backdrop-blur-sm lg:hidden" onClick={closeMenu}>
          <div
            ref={drawerRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={copy.categories}
            className={`header-panel ml-auto flex h-full w-full max-w-sm flex-col rounded-[30px] p-6 ${isRtl ? "mr-auto ml-0" : ""}`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 overflow-hidden rounded-[18px] border border-white/15 bg-white shadow-[0_10px_24px_rgba(0,0,0,0.2)]">
                  <Image src="/images/logo.png" alt="BEST BOUTONS logo" fill sizes="56px" className="object-contain p-2" />
                </div>
                <div>
                  <span className="block text-2xl font-semibold tracking-[-0.05em] text-white">BEST BOUTONS</span>
                  <span className="mt-2 block text-[0.65rem] uppercase tracking-[0.24em] text-white/50">{copy.metal}</span>
                </div>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeMenu}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white"
                aria-label={copy.closeMenu}
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-10 grid gap-5">
              <Link onClick={closeMenu} href="/" className="text-2xl font-medium tracking-[-0.04em] text-white">
                {t.nav.home}
              </Link>
              <Link onClick={closeMenu} href="/catalogue" className="text-2xl font-medium tracking-[-0.04em] text-white">
                {t.nav.catalog}
              </Link>

              <div className="grid gap-3 rounded-[24px] border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e5bd77]/70">{t.nav.products ?? "Produits"}</p>
                {productCategories.map((category) => (
                  <Link
                    key={category.slug}
                    onClick={closeMenu}
                    href={category.href}
                    className="text-lg font-medium tracking-[-0.03em] text-white/85"
                  >
                    {getProductCategoryLabel(category.slug, lang)}
                  </Link>
                ))}
              </div>

              {navItems.slice(6).map((item) => (
                <Link key={item.href} onClick={closeMenu} href={item.href} className="text-2xl font-medium tracking-[-0.04em] text-white">
                  {t.nav[item.key]}
                </Link>
              ))}

              <Link onClick={closeMenu} href="/contact" className="text-2xl font-medium tracking-[-0.04em] text-white">
                {t.nav.contact}
              </Link>
            </div>

            <div className="mt-auto grid gap-3 pt-8">
              <div className="grid grid-cols-3 gap-2">
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    onClick={() => setLang(option.code)}
                    className={`button-secondary w-full ${lang === option.code ? "bg-white text-[#111111]" : ""}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="button-whatsapp w-full">
                WhatsApp
              </a>
              <Link onClick={closeMenu} href="/admin/login" className="button-secondary w-full text-center">
                Administration
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
