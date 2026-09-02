"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Award, BadgeCheck, Gem, Palette, Sparkles, Trophy, ChevronLeft, ChevronRight, X } from "lucide-react";
import { FadeIn } from "@/components/Motion";
import { useLanguage } from "@/components/LanguageProvider";
import { usePublicProducts } from "@/lib/hooks";

type CarouselProduct = { image: string; label: { fr: string; ar: string; en: string } };

function mapToCarousel(raw: Record<string, unknown>): CarouselProduct {
  return {
    image: String(raw.image ?? "") + (raw.updatedAt ? `?v=${new Date(raw.updatedAt as string).getTime()}` : ""),
    label: {
      fr: String(raw.nameFr ?? ""),
      ar: String(raw.nameAr ?? ""),
      en: String(raw.nameEn ?? ""),
    },
  };
}

const copy = {
  fr: {
    heroDir: "ltr",
    slides: [
      { eyebrow: "Des details qui font la difference", text: "De la premiere idee a la piece finale, nous concevons des recompenses a la hauteur de l'exploit.", cta: "Commencer votre design", href: "/devis" },
      { eyebrow: "Une identite qui merite d'apparaitre", text: "Nous fabriquons des coupes, medailles et plaques avec des finitions metalliques adaptees a votre marque ou votre evenement.", cta: "Explorer la personnalisation", href: "/personnalisation" },
      { eyebrow: "Pour les grands moments",text: "Des creations precises pour les ecoles, clubs, entreprises, associations et evenements dans tout le Maroc.", cta: "Demander un devis", href: "/devis" }
    ],
    collections: [
      { title: "Trophees sportifs", text: "Coupes et medailles pour championnats et tournois", href: "/trophees", image: "/images/WhatsApp Image 2026-06-03 at 13.39.11.jpeg", icon: Trophy, cta: "Decouvrir la collection" },
      { title: "Recompenses corporate", text: "Pieces premium qui portent l'image de votre marque", href: "/trophees-3d", image: "/images/WhatsApp Image 2026-06-03 at 13.39.10.jpeg", icon: Award, cta: "Decouvrir la collection" },
      { title: "Plaques commemoratives", text: "Plaques et tableaux pour remerciement et ceremonie", href: "/plaques", image: "/images/WhatsApp Image 2026-06-03 at 13.39.10 (1).jpeg", icon: Gem, cta: "Decouvrir la collection" }
    ],
    sectionLabel: "Nos collections remarquables",
    sectionText: "Choisissez une piece, puis nous la personnalisons avec votre logo, votre texte et votre finition preferees.",
    craftEyebrow: "Personnalisation complete",
    craftTitle: "Votre piece raconte votre histoire, pas seulement votre nom.",
    craftText: "Nous transformons l'identite de votre evenement ou de votre institution en details concrets: logo en relief, gravure precise, couleurs, forme speciale et boite de presentation si necessaire.",
    craftLink: "Comment se fait la personnalisation ?",
    stats: [
      { title: "Maquette avant production", text: "Validation du design avant execution", icon: BadgeCheck },
      { title: "Finitions premium", text: "Or, argent, bronze et metal noir", icon: Gem },
      { title: "Pour chaque occasion", text: "Sport, entreprises, ecoles et evenements", icon: Award }
    ],
    processEyebrow: "Un parcours simple et clair",
    processTitle: "De l'idee au moment de la distinction.",
    steps: [
      ["01", "Partagez votre idee", "Envoyez le logo, le texte, la quantite et l'occasion via WhatsApp."],
      ["02", "Nous preparons la maquette", "Nous concevons un visuel clair avant de lancer la production."],
      ["03", "Nous fabriquons et livrons", "Nous realisons la piece avec la finition choisie et nous la livrons."]
    ] as Array<[string, string, string]>,
    finalEyebrow: "DYODZAMAK",
    finalTitle: "Pret a creer une recompense qui eleve la valeur de votre succes ?",
    finalText: "Envoyez les details essentiels, et nous vous proposerons le modele et la finition adaptes.",
    finalCta: "Demander un devis"
  },
  ar: {
    heroDir: "rtl",
    slides: [
      { eyebrow: "تفاصيل تصنع الفرق", title: "جوائز استثنائية لأبطال مميزين.", text: "من الفكرة الأولى إلى القطعة النهائية، نصمم جوائز تليق بقيمة الإنجاز.", cta: "ابدأ تصميمك الآن", href: "/devis" },
      { eyebrow: "هوية تستحق أن تظهر", title: "حوّل شعارك إلى قطعة تترك انطباعاً.", text: "نصنع كؤوساً، ميداليات ودروعاً بتشطيبات معدنية تليق بعلامتك أو مناسبتك.", cta: "استكشف التخصيص", href: "/personnalisation" },
      { eyebrow: "للمناسبات الكبيرة", title: "كل تكريم يبدأ بقطعة لا تُنسى.", text: "تصاميم دقيقة للمدارس، الأندية، الشركات، الجمعيات والفعاليات في كل المغرب.", cta: "اطلب عرض سعر", href: "/devis" }
    ],
    collections: [
      { title: "كؤوس رياضية", text: "كؤوس وميداليات للبطولات والدوريات", href: "/trophees", image: "/images/WhatsApp Image 2026-06-03 at 13.39.11.jpeg", icon: Trophy, cta: "اكتشف المجموعة" },
      { title: "جوائز الشركات", text: "قطع تقدير راقية تحمل هوية مؤسستك", href: "/trophees-3d", image: "/images/WhatsApp Image 2026-06-03 at 13.39.10.jpeg", icon: Award, cta: "اكتشف المجموعة" },
      { title: "دروع تذكارية", text: "دروع ولوحات للشكر والتكريم والمناسبات", href: "/plaques", image: "/images/WhatsApp Image 2026-06-03 at 13.39.10 (1).jpeg", icon: Gem, cta: "اكتشف المجموعة" }
    ],
    sectionLabel: "مجموعاتنا المميزة",
    sectionText: "اختر نوع القطعة، ثم نخصصها بشعارك ونصك وتشطيبك المفضل.",
    craftEyebrow: "تخصيص كامل",
    craftTitle: "قطعتك تحمل قصتك، وليس مجرد اسمك.",
    craftText: "نحوّل هوية الحدث أو المؤسسة إلى تفاصيل ملموسة: شعار بارز، نقش دقيق، ألوان، شكل خاص وعلبة عرض عند الحاجة.",
    craftLink: "كيف يتم التخصيص؟",
    stats: [
      { title: "معاينة قبل الإنتاج", text: "تأكيد التصميم قبل التنفيذ", icon: BadgeCheck },
      { title: "تشطيبات فاخرة", text: "ذهبي، فضي، برونزي وأسود", icon: Gem },
      { title: "لكل مناسبة", text: "رياضة، شركات، مدارس وفعاليات", icon: Award }
    ],
    processEyebrow: "مسار بسيط وواضح",
    processTitle: "من الفكرة إلى لحظة التكريم.",
    steps: [
      ["01", "شاركنا فكرتك", "أرسل الشعار، النص، الكمية والمناسبة عبر واتساب."],
      ["02", "نصمم المعاينة", "نجهز لك تصميماً واضحاً قبل بدء الإنتاج."],
      ["03", "نصنع ونُسلّم", "ننّفذ القطعة بالتشطيب الذي اخترته ونوصلها إليك."]
    ] as Array<[string, string, string]>,
    finalEyebrow: "DYODZAMAK",
    finalTitle: "هل أنت مستعد لصناعة جائزة ترفع قيمة الإنجاز؟",
    finalText: "أرسل التفاصيل الأساسية، وسنقترح عليك النموذج والتشطيب المناسبين.",
    finalCta: "اطلب عرض السعر"
  },
  en: {
    heroDir: "ltr",
    slides: [
      { eyebrow: "Details that make the difference", title: "Exceptional awards for unique champions.", text: "From the first idea to the final piece, we design awards that match the value of the achievement.", cta: "Start your design", href: "/devis" },
      { eyebrow: "An identity worth showing", title: "Turn your logo into a piece that leaves an impression.", text: "We make trophies, medals and plaques with metal finishes that suit your brand or event.", cta: "Explore customization", href: "/personnalisation" },
      { eyebrow: "For big occasions", title: "Every tribute starts with an unforgettable piece.", text: "Precise designs for schools, clubs, companies, associations and events across Morocco.", cta: "Request a quote", href: "/devis" }
    ],
    collections: [
      { title: "Sports trophies", text: "Trophies and medals for championships and tournaments", href: "/trophees", image: "/images/WhatsApp Image 2026-06-03 at 13.39.11.jpeg", icon: Trophy, cta: "Explore the collection" },
      { title: "Corporate awards", text: "Premium pieces that carry your brand identity", href: "/trophees-3d", image: "/images/WhatsApp Image 2026-06-03 at 13.39.10.jpeg", icon: Award, cta: "Explore the collection" },
      { title: "Commemorative plaques", text: "Plaques and boards for thanks and ceremonies", href: "/plaques", image: "/images/WhatsApp Image 2026-06-03 at 13.39.10 (1).jpeg", icon: Gem, cta: "Explore the collection" }
    ],
    sectionLabel: "Our featured collections",
    sectionText: "Choose a piece, then we customize it with your logo, text and preferred finish.",
    craftEyebrow: "Full customization",
    craftTitle: "Your piece tells your story, not just your name.",
    craftText: "We turn your event or institution identity into tangible details: raised logo, precise engraving, colors, special shape and a presentation box when needed.",
    craftLink: "How does customization work?",
    stats: [
      { title: "Mockup before production", text: "Design approval before execution", icon: BadgeCheck },
      { title: "Premium finishes", text: "Gold, silver, bronze and black metal", icon: Gem },
      { title: "For every occasion", text: "Sport, business, schools and events", icon: Award }
    ],
    processEyebrow: "A simple, clear journey",
    processTitle: "From idea to the moment of recognition.",
    steps: [
      ["01", "Share your idea", "Send the logo, text, quantity and occasion via WhatsApp."],
      ["02", "We prepare the mockup", "We create a clear design before production starts."],
      ["03", "We produce and deliver", "We make the piece with the finish you chose and deliver it to you."]
    ] as Array<[string, string, string]>,
    finalEyebrow: "DYODZAMAK",
    finalTitle: "Ready to create an award that elevates the value of your success?",
    finalText: "Send the essential details and we will suggest the right model and finish.",
    finalCta: "Request a quote"
  }
} as const;

const craftTabContent = {
  fr: {
    design: {
      label: "1. Conception 3D",
      title: "Modélisation numérique avant fabrication",
      desc: "Nous concevons une maquette numérique haute fidélité pour que vous puissiez prévisualiser chaque détail de votre trophée avant le lancement de la production."
    },
    metal: {
      label: "2. Finitions Nobles",
      title: "Placages or, argent, bronze ou mat",
      desc: "Choisissez parmi nos traitements de surface haut de gamme : or poli miroir, argent satiné, bronze patiné ou noir mat profond pour refléter le prestige de votre marque."
    },
    engrave: {
      label: "3. Marquage & Relief",
      title: "Gravure laser de précision micro-millimétrique",
      desc: "Intégrez vos logos complexes, textes nominatifs et blasons avec une netteté absolue grâce à nos lasers de gravure de dernière génération."
    },
    base: {
      label: "4. Socle & Écrin",
      title: "Bases massives et écrin sur mesure",
      desc: "Stabilité et prestige assurés par des socles en marbre noir, bois précieux ou acrylique optique, présentés dans un coffret de luxe personnalisé."
    }
  },
  ar: {
    design: {
      label: "1. التصميم ثلاثي الأبعاد",
      title: "معاينة رقمية قبل بدء التصنيع",
      desc: "نصمم لك نموذجاً رقمياً عالي الدقة لتتمكن من معاينة كل تفاصيل جائزتك قبل إرسالها لخط الإنتاج."
    },
    metal: {
      label: "2. اللمسات النهائية",
      title: "طلاء ذهبي، فضي، برونزي أو مطفأ",
      desc: "اختر من بين تشطيباتنا الفاخرة: ذهبي لامع، فضي ناعم، برونزي كلاسيكي أو أسود مطفأ ليعكس قيمة علامتك التجارية."
    },
    engrave: {
      label: "3. النقش والبروز",
      title: "نقش ليزر فائق الدقة",
      desc: "أضف شعاراتك، أسماء الفائزين ونصوصك التقديرية بدقة متناهية بفضل تقنيات النقش بالليزر الحديثة."
    },
    base: {
      label: "4. القاعدة والعلبة",
      title: "قواعد رخامية فاخرة وعلب تقديم مخصصة",
      desc: "ثبات وأناقة مع قواعد من الرخام الأسود الطبيعي، الخشب النبيل، أو الأكريليك المصقول، مع علبة قطيفة مخصصة."
    }
  },
  en: {
    design: {
      label: "1. 3D Conception",
      title: "Digital mockup before fabrication",
      desc: "We design a high-fidelity digital mockup so you can preview every single detail of your award before production starts."
    },
    metal: {
      label: "2. Noble Finishes",
      title: "Gold, silver, bronze or matte plating",
      desc: "Choose from our high-end surface treatments: polished mirror gold, satin silver, patinated bronze, or deep matte black to reflect your brand's prestige."
    },
    engrave: {
      label: "3. Engraving & Relief",
      title: "Micro-millimetric precision laser engraving",
      desc: "Integrate your complex logos, individual recipient names, and crests with absolute clarity using our latest generation laser systems."
    },
    base: {
      label: "4. Base & Bespoke Box",
      title: "Solid bases and custom presentation case",
      desc: "Ensured stability and prestige with bases in black marble, precious wood, or optical acrylic, presented in a custom luxury gift box."
    }
  }
} as const;

export default function HomeClient() {
  const { lang } = useLanguage();
  const current = copy[lang];
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeTooltip, setActiveTooltip] = useState<"metal" | "engrave" | "base" | null>(null);
  const { products: apiProducts } = usePublicProducts();

  const allProducts: CarouselProduct[] = apiProducts.length
    ? apiProducts.map(mapToCarousel)
    : [];

  const total = allProducts.length;

  const goPrev = () => setActiveIdx((prev) => (prev - 1 + total) % total);
  const goNext = () => setActiveIdx((prev) => (prev + 1) % total);

  const getOffset = (index: number) => {
    if (total === 0) return index;
    let diff = index - activeIdx;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const safeActiveIdx = total > 0 ? activeIdx : 0;

  return (
    <div dir={current.heroDir} className="awards-home">
      <section className="awards-hero">
        <video
          src="/images/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover z-[-2]"
        />
      </section>

      <section className="products-carousel-section">
        <div className="awards-container">
          <div className="carousel-header">
            <div className="section-heading" style={{ marginBottom: 0 }}>
              <span>{current.sectionLabel}</span>
              <h2>{lang === "fr" ? "Tous nos produits" : lang === "ar" ? "جميع منتجاتنا" : "All our products"}</h2>
            </div>
          </div>
        </div>

        <div className="coverflow-wrapper">
          <button className="coverflow-arrow coverflow-arrow--left" onClick={goPrev} aria-label="Précédent">
            <ChevronLeft size={28} />
          </button>

          <div className="coverflow-stage">
            {allProducts.map((product, i) => {
              const offset = getOffset(i);
              if (offset < -2 || offset > 2) return null;

              let className = "coverflow-item";
              if (offset === 0) className += " coverflow-item--center";
              else if (offset === -1) className += " coverflow-item--left1";
              else if (offset === 1) className += " coverflow-item--right1";
              else if (offset === -2) className += " coverflow-item--left2";
              else if (offset === 2) className += " coverflow-item--right2";

              return (
                <div key={i} className={className} onClick={() => setActiveIdx(i)}>
                  <div className="coverflow-img-wrap">
                    {product.image ? (
                    <img
                      src={product.image}
                      alt={product.label[lang]}
                      className="coverflow-img absolute inset-0 h-full w-full"
                    />
                    ) : (
                    <div className="absolute inset-0 grid place-items-center text-white/20 text-xs">Image</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button className="coverflow-arrow coverflow-arrow--right" onClick={goNext} aria-label="Suivant">
            <ChevronRight size={28} />
          </button>
        </div>

        <div className="coverflow-info">
          <h3 className="coverflow-title">{total > 0 ? allProducts[safeActiveIdx].label[lang] : ""}</h3>
          <p className="coverflow-desc">{current.sectionText}</p>
        </div>
      </section>


      <section className="craft-section">
        <div className="awards-container craft-grid">
          <FadeIn className="craft-copy">
            <span className="gold-kicker"><Palette size={15} /> {current.craftEyebrow}</span>
            <h2 className="craft-title-smaller">{current.craftTitle}</h2>
            <p style={{ marginBottom: "1.5rem" }}>{current.craftText}</p>

            <Link href="/personnalisation" className="outline-button">
              {current.craftLink} <ArrowLeft size={18} />
            </Link>
          </FadeIn>

          <div className="craft-visual-column">
            <div className={`configurator-lens configurator-lens--${activeTooltip || "design"}`}>
              {/* Premium Vector Award Blueprint */}
              <svg viewBox="0 0 320 420" className="trophy-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF2D4" />
                    <stop offset="30%" stopColor="#E5BD77" />
                    <stop offset="70%" stopColor="#B38A3E" />
                    <stop offset="100%" stopColor="#F5DCA3" />
                  </linearGradient>
                  <linearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.01)" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="10" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                <ellipse cx="160" cy="390" rx="90" ry="12" fill="rgba(0,0,0,0.6)" filter="url(#glow)" />

                {/* 1. Design & Maquette overall wireframe blueprint */}
                <g className={`svg-part svg-part--design ${activeTooltip === null ? "active" : ""}`}>
                  <path d="M 80,60 L 240,60 L 260,240 L 160,310 L 60,240 Z" fill="none" stroke="#e5bd77" strokeWidth="1" strokeDasharray="4,4" opacity="0.4" />
                  <line x1="80" y1="60" x2="160" y2="310" stroke="#e5bd77" strokeWidth="0.5" opacity="0.2" />
                  <line x1="240" y1="60" x2="160" y2="310" stroke="#e5bd77" strokeWidth="0.5" opacity="0.2" />
                </g>

                {/* 2. Metal/Finitions (Plates & main trophy form) */}
                <g className={`svg-part svg-part--metal ${activeTooltip === "metal" ? "active" : ""}`}>
                  <path d="M 80,60 L 240,60 L 260,240 L 160,310 L 60,240 Z" fill="url(#glassGrad)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                  <path d="M 110,80 L 210,80 L 225,215 L 160,265 L 95,215 Z" fill="url(#goldGrad)" />
                  <path d="M 110,80 L 140,80 L 110,215 Z" fill="rgba(255,255,255,0.25)" />
                </g>

                {/* 3. Gravure/Laser (Engraving details) */}
                <g className={`svg-part svg-part--engrave ${activeTooltip === "engrave" ? "active" : ""}`}>
                  <path d="M 130,120 L 190,120 L 200,200 L 160,230 L 120,200 Z" fill="rgba(33,7,13,0.8)" stroke="#fff" strokeWidth="1" opacity="0.8" />
                  <path d="M 160,135 L 170,155 L 190,155 L 175,168 L 180,188 L 160,175 L 140,188 L 145,168 L 130,155 L 150,155 Z" fill="none" stroke="#e5bd77" strokeWidth="1.5" />
                  <line x1="140" y1="205" x2="180" y2="205" stroke="#fff" strokeWidth="1.5" opacity="0.9" />
                  <line x1="145" y1="215" x2="175" y2="215" stroke="#fff" strokeWidth="1" opacity="0.6" />
                </g>

                {/* 4. Base & Socle */}
                <g className={`svg-part svg-part--base ${activeTooltip === "base" ? "active" : ""}`}>
                  <path d="M 140,310 L 180,310 L 185,330 L 135,330 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <path d="M 80,330 L 240,330 L 255,380 L 65,380 Z" fill="#2a0a12" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                  <rect x="105" y="348" width="110" height="20" rx="1.5" fill="url(#goldGrad)" />
                  <line x1="120" y1="358" x2="200" y2="358" stroke="#16120b" strokeWidth="2" opacity="0.8" />
                </g>

                {/* Hotspots */}
                <g className="configurator-hotspots">
                  {/* Top/Metal Hotspot */}
                  <circle cx="160" cy="140" r="14" className="hotspot-trigger" onClick={() => setActiveTooltip("metal")} />
                  <circle cx="160" cy="140" r="5" className="hotspot-dot" />

                  {/* Middle/Engraving Hotspot */}
                  <circle cx="160" cy="210" r="14" className="hotspot-trigger" onClick={() => setActiveTooltip("engrave")} />
                  <circle cx="160" cy="210" r="5" className="hotspot-dot" />

                  {/* Bottom/Base Hotspot */}
                  <circle cx="160" cy="358" r="14" className="hotspot-trigger" onClick={() => setActiveTooltip("base")} />
                  <circle cx="160" cy="358" r="5" className="hotspot-dot" />
                </g>
              </svg>
            </div>

            {/* Explanatory overlay tooltip with close (X) button */}
            {activeTooltip && (
              <div className="hotspot-tooltip">
                <button
                  className="hotspot-tooltip-close"
                  onClick={() => setActiveTooltip(null)}
                  aria-label="Fermer"
                >
                  <X size={16} />
                </button>
                <h3>{craftTabContent[lang][activeTooltip].title}</h3>
                <p>{craftTabContent[lang][activeTooltip].desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="awards-container process-section">
        <div className="section-heading centered"><span>{current.processEyebrow}</span><h2>{current.processTitle}</h2></div>
        <div className="process-grid">
          {current.steps.map(([number, title, text]) => <FadeIn key={number} className="process-item"><b>{number}</b><h3>{title}</h3><p>{text}</p></FadeIn>)}
        </div>
      </section>
    </div>
  );
}
