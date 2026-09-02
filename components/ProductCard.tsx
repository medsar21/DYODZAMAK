"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowUpRight, X, MessageCircle } from "lucide-react";
import { Product, productWhatsAppMessage } from "@/data/site";
import { useLanguage } from "@/components/LanguageProvider";

export default function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const copy = product[lang];
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeLabel = lang === "fr" ? "Fermer" : lang === "ar" ? "إغلاق" : "Close";

  const closeModal = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeModal();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeModal]);

  return (
    <>
      <article className="product-card group flex h-full flex-col rounded-[24px] overflow-hidden border border-white/8 bg-[#2e0c14] transition-all duration-300 hover:border-[#e5bd77]/25 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          className="relative aspect-square overflow-hidden text-left bg-white/5 p-3 w-full"
        >
          {product.image ? (
            <img
              src={product.image}
              alt={copy.name}
              className="absolute inset-0 h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-white/20 text-xs">Image</div>
          )}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(10,10,10,0.5))]" />
          <div className="absolute top-3 left-3">
            <span className="rounded-full border border-white/15 bg-black/40 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur-sm">
              {product.badge}
            </span>
          </div>
        </button>

        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#e5bd77]/60">{t.price}</span>
              <h3 className="mt-1 line-clamp-2 text-base font-semibold tracking-[-0.02em] text-white leading-snug">
                {copy.name}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition duration-300 group-hover:border-white/30 group-hover:bg-white group-hover:text-[#21070d]"
              aria-label={t.quickView}
            >
              <ArrowUpRight size={15} />
            </button>
          </div>

          <p className="mt-2 line-clamp-2 text-xs leading-6 text-white/55">
            {copy.description}
          </p>

          <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
            {product.finishes.slice(0, 3).map((finish) => (
              <span key={finish} className="rounded-full border border-white/10 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.06em] text-white/50 bg-white/3">
                {t.finishes[finish]}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Product Detail Modal Portal */}
      {open && createPortal(
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          onClick={closeModal}
        >
          <div
            className="product-modal relative w-full max-w-3xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto rounded-[24px] border border-white/10 bg-[#2a0a12] shadow-[0_45px_100px_rgba(0,0,0,0.8)] flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#21070d]/80 text-white/70 backdrop-blur-sm transition hover:bg-white/10 hover:text-white"
              onClick={closeModal}
              aria-label={closeLabel}
            >
              <X size={16} />
            </button>

            {/* Product image (Left/Top) */}
            <div className="w-full md:w-[42%] bg-white/3 flex items-center justify-center p-6 relative border-b md:border-b-0 md:border-r border-white/5 min-h-[240px] md:min-h-[360px] shrink-0">
              <div className="relative w-full h-[180px] md:h-[260px]">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={copy.name}
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-white/20 text-xs">Image</div>
                )}
              </div>
              <div className="absolute bottom-4 left-5">
                <span className="rounded-full border border-[#e5bd77]/30 bg-[#21070d]/80 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#e5bd77]/80 backdrop-blur-sm">
                  {product.badge}
                </span>
              </div>
            </div>

            {/* Product info (Right/Bottom) */}
            <div className="w-full md:w-[58%] p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold tracking-[-0.03em] text-[#fffdf8] leading-snug">
                  {copy.name}
                </h2>

                <div className="mt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#e5bd77]/60 mb-1">Description</p>
                  <p className="text-xs md:text-sm leading-6 text-white/70">{copy.description}</p>
                </div>

                <div className="mt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#e5bd77]/60 mb-2">Caractéristiques</p>
                  <div className="flex flex-wrap gap-1.5">
                    {copy.specs.map((spec: string) => (
                      <span
                        key={spec}
                        className="rounded-full border border-white/8 bg-white/4 px-3 py-1 text-[10px] font-medium tracking-[0.04em] text-white/60"
                      >
                        {spec}
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
                  onClick={closeModal}
                >
                  {t.quote}
                </Link>
                <a
                  href={productWhatsAppMessage(copy.name, lang)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 h-[48px] rounded-[12px] flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#25D366] border border-[#25D366]/30 bg-[#25D366]/8 transition-all duration-200 hover:bg-[#25D366]/15 hover:-translate-y-[2px]"
                >
                  <MessageCircle size={16} />
                  {t.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
