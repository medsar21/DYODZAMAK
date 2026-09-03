"use client";

import Image from "next/image";
import CatalogClient from "@/components/CatalogClient";
import ProductGrid from "@/components/ProductGrid";
import QuoteForm from "@/components/QuoteForm";
import SectionTitle from "@/components/SectionTitle";
import { PrimaryButton, WhatsAppButton } from "@/components/Buttons";
import { emailDisplay, phoneDisplay, products, whatsappNumber } from "@/data/site";
import { useLanguage } from "@/components/LanguageProvider";

const simpleCopy = {
  fr: {
    customizationTitle: "Personnalisation",
    customizationOptions: ["Logo en relief ou grave", "Texte, date et nom d'evenement", "Choix de finitions metalliques", "Forme speciale ou decoupe sur mesure", "Ruban, attache ou support adaptes", "Boite cadeau et presentation premium", "Serie numerotee ou edition limitee", "Maquette avant production"],
    customizationEyebrow: "Personnalisation",
    customizationSectionTitle: "Chaque detail de personnalisation est la pour renforcer la valeur percue du produit.",
    collectionsEyebrow: "Collections",
    collectionsTitle: "Une gamme large, mais presentee avec coherence et exigence.",
    quoteEyebrow: "Devis",
    quoteTitle: "La demande doit etre simple, rassurante et directement exploitable.",
    aboutStatements: ["Catalogue multi-categories", "Production sur devis", "Accompagnement maquette", "Livraison partout au Maroc"],
    aboutEyebrow: "Atelier",
    aboutTitle: "BEST BOUTONS se positionne comme un atelier de fabrication personnalisee, pas comme un simple catalogue.",
    aboutNext: "Passez de l'inspiration a une demande claire, rapide et bien cadree.",
    aboutSuite: "Suite",
    contactTitle: "Contact",
    contactText: "WhatsApp reste le canal le plus rapide pour demander un devis, envoyer un logo ou preciser votre besoin.",
    contactLabel: "Localisation",
    contactCity: "Maroc",
    contactWhatsApp: "WhatsApp",
    contactPhone: "Telephone",
    contactEmail: "Email",
    contactLocation: "Localisation"
  },
  ar: {
    customizationTitle: "التخصيص",
    customizationOptions: ["شعار بارز أو منقوش", "نص وتاريخ واسم المناسبة", "اختيار التشطيبات المعدنية", "شكل خاص أو قص حسب الطلب", "شريط أو تثبيت أو حامل مناسب", "علبة هدية وعرض راق", "سلسلة مرقمة أو إصدار محدود", "معاينة التصميم قبل الإنتاج"],
    customizationEyebrow: "التخصيص",
    customizationSectionTitle: "كل تفصيل في التخصيص موجود ليعزز القيمة المتصورة للمنتج.",
    collectionsEyebrow: "المجموعات",
    collectionsTitle: "مجموعة واسعة، لكنها معروضة بتناسق واحترافية.",
    quoteEyebrow: "عرض السعر",
    quoteTitle: "يجب أن يكون الطلب بسيطاً، مطمئناً وقابلاً للاستعمال مباشرة.",
    aboutStatements: ["كتالوج متعدد الفئات", "إنتاج حسب الطلب", "مواكبة التصميم", "توصيل في جميع أنحاء المغرب"],
    aboutEyebrow: "ورشة",
    aboutTitle: "BEST BOUTONS ليست مجرد كتالوج، بل ورشة تصنيع مخصصة.",
    aboutNext: "انتقل من الإلهام إلى طلب واضح وسريع ومضبوط.",
    aboutSuite: "متابعة",
    contactTitle: "اتصال",
    contactText: "واتساب يبقى القناة الأسرع لطلب عرض السعر أو إرسال الشعار أو توضيح الحاجة.",
    contactLabel: "الموقع",
    contactCity: "المغرب",
    contactWhatsApp: "واتساب",
    contactPhone: "الهاتف",
    contactEmail: "البريد الإلكتروني",
    contactLocation: "الموقع"
  },
  en: {
    customizationTitle: "Customization",
    customizationOptions: ["Raised or engraved logo", "Text, date and event name", "Choice of metal finishes", "Special shape or custom cut", "Ribbon, clasp or suitable stand", "Gift box and premium presentation", "Numbered series or limited edition", "Mockup before production"],
    customizationEyebrow: "Customization",
    customizationSectionTitle: "Every customization detail is there to increase the perceived value of the product.",
    collectionsEyebrow: "Collections",
    collectionsTitle: "A wide range, presented with consistency and high standards.",
    quoteEyebrow: "Quote",
    quoteTitle: "The request should be simple, reassuring and immediately usable.",
    aboutStatements: ["Multi-category catalog", "Quote-based production", "Mockup support", "Delivery across Morocco"],
    aboutEyebrow: "Workshop",
    aboutTitle: "BEST BOUTONS is a custom manufacturing workshop, not just a catalog.",
    aboutNext: "Move from inspiration to a clear, fast and well-scoped request.",
    aboutSuite: "Next step",
    contactTitle: "Contact",
    contactText: "WhatsApp remains the fastest channel to request a quote, send a logo or clarify your needs.",
    contactLabel: "Location",
    contactCity: "Morocco",
    contactWhatsApp: "WhatsApp",
    contactPhone: "Phone",
    contactEmail: "Email",
    contactLocation: "Location"
  }
} as const;

function PageIntro({ title, text, videoSrc }: { title: string; text: string; videoSrc?: string }) {
  const { lang } = useLanguage();
  const heroProduct = products[0];

  return (
    <section className="px-4 pb-10 pt-8 md:px-6 md:pb-16 md:pt-10">
      <div className="section-frame">
        <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="section-surface rounded-[34px] p-6 md:p-8 lg:p-10">
            <span className="eyebrow">BEST BOUTONS</span>
            <h1 className="mt-6 max-w-3xl text-5xl font-medium leading-[1.15] tracking-[-0.03em] text-white md:text-7xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/70 md:text-lg">{text}</p>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[34px] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.35)] md:min-h-[520px] bg-black/10">
            {videoSrc ? (
              <video
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <>
                <Image src={heroProduct.image} alt={heroProduct[lang].name} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain p-4" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-black/6 to-transparent" />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CatalogPageClient() {
  return <CatalogClient />;
}

export function CustomizationPageClient() {
  const { lang, t } = useLanguage();
  const copy = simpleCopy[lang];

  return (
    <>
      <PageIntro title={t.pages.customization[0]} text={t.pages.customization[1]} />

      <section className="px-4 py-12 md:px-6 md:py-20">
        <div className="section-frame grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <SectionTitle
            eyebrow={copy.customizationEyebrow}
            title={copy.customizationSectionTitle}
            text={t.pages.customization[1]}
          />
          <div className="grid gap-3 md:grid-cols-2">
            {copy.customizationOptions.map((item) => (
              <div key={item} className="section-surface rounded-[24px] px-5 py-6">
                <p className="text-xl font-medium tracking-[-0.04em] text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-6 md:py-20">
        <div className="section-frame">
          <ProductGrid products={products.filter((product) => product.customizable).slice(0, 6)} compact />
        </div>
      </section>

      <section className="px-4 py-12 md:px-6 md:py-20">
        <div className="section-frame">
          <QuoteForm />
        </div>
      </section>
    </>
  );
}

export function QuotePageClient() {
  const { t } = useLanguage();

  return (
    <main className="quote-page">
      <section className="quote-page__content" aria-label={t.pages.quote[0]}>
        <QuoteForm />
      </section>
    </main>
  );
}

export function AboutPageClient() {
  const { lang, t } = useLanguage();
  const copy = simpleCopy[lang];
  const statements = copy.aboutStatements;

  return (
    <>
      <PageIntro title={t.pages.about[0]} text={t.pages.about[1]} />

      <section className="px-4 py-12 md:px-6 md:py-20">
        <div className="section-frame grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <SectionTitle eyebrow={copy.aboutEyebrow} title={copy.aboutTitle} text={t.footer} />
          <div className="grid gap-3 md:grid-cols-2">
            {statements.map((item) => (
              <div key={item} className="section-surface rounded-[24px] px-5 py-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">Repere</p>
                <p className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section-surface mt-8 rounded-[38px] px-6 py-8 md:px-8 md:py-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="eyebrow">{copy.aboutSuite}</span>
              <h2 className="mt-5 max-w-3xl text-4xl font-medium tracking-[-0.05em] text-white md:text-5xl">
                {copy.aboutNext}
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <PrimaryButton href="/catalogue">{t.nav.catalog}</PrimaryButton>
              <WhatsAppButton>{t.whatsapp}</WhatsAppButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function ContactPageClient() {
  const { lang, t } = useLanguage();
  const copy = simpleCopy[lang];
  return (
    <div className="relative min-h-screen -mt-[104px] md:-mt-[116px] pt-[104px] md:pt-[116px] flex flex-col justify-center">
      {/* Fixed background image covering entire page shell */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/contact.jpg"
          alt="Contact background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#21070d]/25 via-transparent to-[#21070d]/60" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 px-4 py-16 md:px-6 md:py-20 flex-1 flex flex-col justify-center">
        <div className="section-frame">
          {/* Contact title */}
          <div className="mb-12 text-center">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e5bd77]/70 mb-4">BEST BOUTONS</span>
            <h1 className="text-5xl font-medium leading-[1.1] tracking-[-0.04em] text-white md:text-7xl lg:text-8xl">
              {copy.contactTitle}
            </h1>
            <p className="mt-5 mx-auto max-w-xl text-base leading-8 text-white/60 md:text-lg">{copy.contactText}</p>
          </div>

          {/* Contact grid */}
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="grid gap-3">
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="group rounded-[24px] border border-white/20 bg-[#21070d]/85 backdrop-blur-md px-5 py-6 transition hover:border-[#e5bd77]/25 hover:bg-[#21070d]/95">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e5bd77]/50">{copy.contactWhatsApp}</p>
                <p className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white">{copy.contactWhatsApp}</p>
              </a>
              <a href={`tel:${phoneDisplay.replace(/\s/g, "")}`} className="group rounded-[24px] border border-white/20 bg-[#21070d]/85 backdrop-blur-md px-5 py-6 transition hover:border-[#e5bd77]/25 hover:bg-[#21070d]/95">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e5bd77]/50">{copy.contactPhone}</p>
                <p className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white">{phoneDisplay}</p>
              </a>
              <a href={`mailto:${emailDisplay}`} className="group rounded-[24px] border border-white/20 bg-[#21070d]/85 backdrop-blur-md px-5 py-6 transition hover:border-[#e5bd77]/25 hover:bg-[#21070d]/95">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e5bd77]/50">{copy.contactEmail}</p>
                <p className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white">{emailDisplay}</p>
              </a>
              <div className="rounded-[24px] border border-white/20 bg-[#21070d]/85 backdrop-blur-md px-5 py-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e5bd77]/50">{copy.contactLocation}</p>
                <p className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white">{copy.contactCity}</p>
              </div>
            </div>

            <QuoteForm transparent={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
