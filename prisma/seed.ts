import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

const categories = [
  {
    slug: "medailles",
    href: "/medailles",
    icon: "medal",
    image: "/images/WhatsApp Image 2026-06-03 at 13.38.31.jpeg",
    sortOrder: 1,
    navLabelFr: "Medailles",
    navLabelAr: "ميداليات",
    navLabelEn: "Medals",
    heroTitleFr: "Medailles personnalisees",
    heroTitleAr: "ميداليات مخصصة",
    heroTitleEn: "Custom medals",
    heroDescFr: "Medailles sur mesure pour sport, ecoles, associations et ceremonies.",
    heroDescAr: "ميداليات حسب الطلب للرياضة والمدارس والجمعيات والاحتفالات.",
    heroDescEn: "Custom medals for sport, schools, associations and ceremonies.",
    summaryFr: "Medailles metalliques avec gravure, ruban et finition au choix.",
    summaryAr: "ميداليات معدنية مع نقش وشريط وتشطيب حسب الطلب.",
    summaryEn: "Metal medals with engraving, ribbon and finish of your choice.",
  },
  {
    slug: "trophees",
    href: "/trophees",
    icon: "trophy",
    image: "/images/WhatsApp Image 2026-06-03 at 13.39.10.jpeg",
    sortOrder: 2,
    navLabelFr: "Trophees",
    navLabelAr: "كؤوس",
    navLabelEn: "Trophies",
    heroTitleFr: "Trophees metalliques",
    heroTitleAr: "كؤوس معدنية",
    heroTitleEn: "Metal trophies",
    heroDescFr: "Trophees premium pour competitions, galas et remise de prix.",
    heroDescAr: "كؤوس راقية للمسابقات والحفلات وتسليم الجوائز.",
    heroDescEn: "Premium trophies for competitions, gala and award ceremonies.",
    summaryFr: "Formats corporate, sportifs et institutionnels.",
    summaryAr: "نماذج للشركات والرياضة والمؤسسات.",
    summaryEn: "Corporate, sports and institutional formats.",
  },
  {
    slug: "trophees-3d",
    href: "/trophees-3d",
    icon: "box",
    image: "/images/WhatsApp Image 2026-06-03 at 13.39.11.jpeg",
    sortOrder: 3,
    navLabelFr: "Trophees 3D",
    navLabelAr: "كؤوس 3D",
    navLabelEn: "3D Trophies",
    heroTitleFr: "Trophees 3D sur mesure",
    heroTitleAr: "كؤوس ثلاثية الأبعاد",
    heroTitleEn: "Custom 3D trophies",
    heroDescFr: "Pieces fortes avec logo en relief et formes speciales.",
    heroDescAr: "قطع مميزة بشعار بارز وأشكال خاصة.",
    heroDescEn: "Impact pieces with raised logos and special shapes.",
    summaryFr: "Conceptions uniques pour marques et evenements.",
    summaryAr: "تصاميم فريدة للعلامات والمناسبات.",
    summaryEn: "Unique concepts for brands and events.",
  },
  {
    slug: "plaques",
    href: "/plaques",
    icon: "panel",
    image: "/images/WhatsApp Image 2026-06-03 at 13.39.10 (1).jpeg",
    sortOrder: 4,
    navLabelFr: "Plaques",
    navLabelAr: "لوحات",
    navLabelEn: "Plaques",
    heroTitleFr: "Plaques honorifiques",
    heroTitleAr: "لوحات تكريمية",
    heroTitleEn: "Honor plaques",
    heroDescFr: "Plaques pour inauguration, hommage, remerciement et partenariat.",
    heroDescAr: "لوحات للافتتاح والتكريم والشكر والشراكة.",
    heroDescEn: "Plaques for inauguration, tribute, thanks and partnership.",
    summaryFr: "Gravure nette et presentation soignee.",
    summaryAr: "نقش واضح وعرض أنيق.",
    summaryEn: "Clean engraving and polished presentation.",
  },
  {
    slug: "pins-badges",
    href: "/pins-badges",
    icon: "badge",
    image: "/images/WhatsApp Image 2026-06-03 at 13.39.13 (4).jpeg",
    sortOrder: 5,
    navLabelFr: "Pins & Badges",
    navLabelAr: "دبابيس وشارات",
    navLabelEn: "Pins & Badges",
    heroTitleFr: "Pins et badges metalliques",
    heroTitleAr: "دبابيس وشارات معدنية",
    heroTitleEn: "Metal pins and badges",
    heroDescFr: "Supports de marque, d'identite et d'evenement.",
    heroDescAr: "وسائل للهوية والعلامة والمناسبات.",
    heroDescEn: "Branding, identity and event pieces.",
    summaryFr: "Formats email, decoupe libre et petites series.",
    summaryAr: "نماذج بالمينا وقص حر وكميات مرنة.",
    summaryEn: "Enamel, custom-cut and flexible quantities.",
  },
  {
    slug: "porte-cles",
    href: "/porte-cles",
    icon: "key",
    image: "/images/WhatsApp Image 2026-06-03 at 13.39.12.jpeg",
    sortOrder: 6,
    navLabelFr: "Porte-cles",
    navLabelAr: "حاملات مفاتيح",
    navLabelEn: "Keychains",
    heroTitleFr: "Porte-cles metalliques",
    heroTitleAr: "حاملات مفاتيح معدنية",
    heroTitleEn: "Metal keychains",
    heroDescFr: "Pieces pratiques et premium pour cadeaux clients et marques.",
    heroDescAr: "قطع عملية وراقية لهدايا العملاء والعلامات.",
    heroDescEn: "Practical premium pieces for client gifts and brands.",
    summaryFr: "Logo, forme et finition selon le projet.",
    summaryAr: "الشكل والشعار والتشطيب حسب المشروع.",
    summaryEn: "Shape, logo and finish adapted to your project.",
  },
  {
    slug: "pins",
    href: "/pins",
    icon: "pin",
    image: "/images/WhatsApp Image 2026-06-03 at 13.39.14.jpeg",
    sortOrder: 7,
    navLabelFr: "Pins",
    navLabelAr: "دبابيس",
    navLabelEn: "Pins",
    heroTitleFr: "Pins personnalises",
    heroTitleAr: "دبابيس مخصصة",
    heroTitleEn: "Custom pins",
    heroDescFr: "Pins metalliques pour clubs, equipes et identite visuelle.",
    heroDescAr: "دبابيس معدنية للأندية والفرق والهوية البصرية.",
    heroDescEn: "Metal pins for clubs, teams and visual identity.",
    summaryFr: "Finitions emaillees et relief logo.",
    summaryAr: "تشطيبات بالمينا وشعارات بارزة.",
    summaryEn: "Enamel finishes and raised logos.",
  },
  {
    slug: "badges",
    href: "/badges",
    icon: "badge",
    image: "/images/WhatsApp Image 2026-06-03 at 13.39.13.jpeg",
    sortOrder: 8,
    navLabelFr: "Badges",
    navLabelAr: "شارات",
    navLabelEn: "Badges",
    heroTitleFr: "Badges sur mesure",
    heroTitleAr: "شارات حسب الطلب",
    heroTitleEn: "Custom badges",
    heroDescFr: "Badges d'accueil, staff, salon et accreditation.",
    heroDescAr: "شارات للاستقبال والطاقم والمعارض والاعتماد.",
    heroDescEn: "Reception, staff, trade fair and accreditation badges.",
    summaryFr: "Lecture claire et fixation adaptee.",
    summaryAr: "قراءة واضحة وتثبيت مناسب.",
    summaryEn: "Clear reading and suitable fastening.",
  },
  {
    slug: "macarons",
    href: "/macarons",
    icon: "circle",
    image: "/images/WhatsApp Image 2026-06-03 at 13.39.14 (1).jpeg",
    sortOrder: 9,
    navLabelFr: "Macarons",
    navLabelAr: "ماكارون",
    navLabelEn: "Car badges",
    heroTitleFr: "Macarons de voiture",
    heroTitleAr: "ماكارون سيارات",
    heroTitleEn: "Car badges",
    heroDescFr: "Macarons metalliques pour communication mobile et convois.",
    heroDescAr: "ماكارون معدني للتواصل المتنقل والمواكب.",
    heroDescEn: "Metal car badges for mobile branding and convoys.",
    summaryFr: "Fixation forte et bonne visibilite.",
    summaryAr: "تثبيت قوي ورؤية واضحة.",
    summaryEn: "Strong fixing and clear visibility.",
  },
  {
    slug: "trophees-classiques",
    href: "/trophees-classiques",
    icon: "trophy",
    image: "/images/WhatsApp Image 2026-06-03 at 13.39.13 (1).jpeg",
    sortOrder: 10,
    navLabelFr: "Trophees classiques",
    navLabelAr: "كؤوس كلاسيكية",
    navLabelEn: "Classic trophies",
    heroTitleFr: "Trophees classiques",
    heroTitleAr: "كؤوس كلاسيكية",
    heroTitleEn: "Classic trophies",
    heroDescFr: "References intemporelles pour championnats, ecoles et galas.",
    heroDescAr: "نماذج كلاسيكية للبطولات والمدارس والحفلات.",
    heroDescEn: "Timeless references for championships, schools and galas.",
    summaryFr: "Coupe, etoile et formats ceremoniels.",
    summaryAr: "كؤوس ونجوم ونماذج احتفالية.",
    summaryEn: "Cup, star and ceremonial formats.",
  },
] as const;

const products = [
  ["medailles", "medal-rabat-2025", "Institution", "/images/WhatsApp Image 2026-06-03 at 13.38.31.jpeg", "Medaille institutionnelle Rabat 2025", "ميدالية مؤسساتية الرباط 2025", "Rabat 2025 institutional medal"],
  ["medailles", "medal-heritage-box", "Premium", "/images/WhatsApp Image 2026-06-03 at 13.39.10 (1).jpeg", "Medaille Heritage avec coffret", "ميدالية Heritage مع علبة", "Heritage medal with box"],
  ["trophees", "trophy-corporate", "Entreprise", "/images/WhatsApp Image 2026-06-03 at 13.39.10.jpeg", "Trophee corporate metal", "كأس شركات معدني", "Corporate metal trophy"],
  ["trophees", "trophy-sport-cup", "Sport", "/images/WhatsApp Image 2026-06-03 at 13.39.11.jpeg", "Coupe sportive classique", "كأس رياضي كلاسيكي", "Classic sports cup"],
  ["trophees-3d", "3d-logo-award", "Sur mesure", "/images/WhatsApp Image 2026-06-03 at 13.39.10 (2).jpeg", "Trophee logo 3D", "كأس شعار 3D", "3D logo trophy"],
  ["trophees-3d", "3d-event-tower", "Nouveau", "/images/WhatsApp Image 2026-06-03 at 13.39.13.jpeg", "Trophee 3D Event", "كأس 3D للمناسبات", "3D event trophy"],
  ["plaques", "plaque-honneur", "Institution", "/images/WhatsApp Image 2026-06-03 at 13.39.10 (1).jpeg", "Plaque honorifique gravee", "لوحة تكريمية منقوشة", "Engraved honor plaque"],
  ["plaques", "plaque-opening", "Evenement", "/images/WhatsApp Image 2026-06-03 at 13.39.10 (2).jpeg", "Plaque inauguration premium", "لوحة افتتاح راقية", "Premium inauguration plaque"],
  ["pins-badges", "pin-breast-cancer", "Logo", "/images/WhatsApp Image 2026-06-03 at 13.39.13 (4).jpeg", "Pin emaille de sensibilisation", "دبوس توعوي بالمينا", "Awareness enamel pin"],
  ["pins-badges", "pin-maroc-map", "Maroc", "/images/WhatsApp Image 2026-06-03 at 13.39.14.jpeg", "Pin carte du Maroc", "دبوس خريطة المغرب", "Morocco map pin"],
  ["porte-cles", "keychain-auto-logo", "Automobile", "/images/WhatsApp Image 2026-06-03 at 13.39.12.jpeg", "Porte-cles logo automobile", "حامل مفاتيح شعار سيارات", "Automotive logo keychain"],
  ["porte-cles", "keychain-metal-custom", "Sur mesure", "/images/WhatsApp Image 2026-06-03 at 13.39.12 (1).jpeg", "Porte-cles metal personnalise", "حامل مفاتيح معدني مخصص", "Custom metal keychain"],
  ["pins", "pin-club-emblem", "Club", "/images/WhatsApp Image 2026-06-03 at 13.39.14.jpeg", "Pin embleme de club", "دبوس شعار نادي", "Club emblem pin"],
  ["pins", "pin-corporate-identity", "Corporate", "/images/WhatsApp Image 2026-06-03 at 13.39.13.jpeg", "Pin corporate identite", "دبوس هوية شركات", "Corporate identity pin"],
  ["badges", "badge-nameplate-pro", "Staff", "/images/WhatsApp Image 2026-06-03 at 13.39.13.jpeg", "Badge nominatif pro", "شارة اسمية احترافية", "Professional name badge"],
  ["badges", "badge-event-accreditation", "Event", "/images/WhatsApp Image 2026-06-03 at 13.39.13 (4).jpeg", "Badge accreditation evenement", "شارة اعتماد للمناسبات", "Event accreditation badge"],
  ["macarons", "car-badge-fleet", "Fleet", "/images/WhatsApp Image 2026-06-03 at 13.39.14.jpeg", "Macaron flotte entreprise", "ماكارون أسطول شركة", "Corporate fleet car badge"],
  ["macarons", "car-badge-ceremony", "Ceremony", "/images/WhatsApp Image 2026-06-03 at 13.39.14 (1).jpeg", "Macaron ceremonie officiel", "ماكارون رسمي للحفلات", "Official ceremony car badge"],
  ["trophees-classiques", "classic-trophy-gold-cup", "Classic", "/images/WhatsApp Image 2026-06-03 at 13.39.10.jpeg", "Trophee classique coupe or", "كأس كلاسيكي ذهبي", "Classic gold cup trophy"],
  ["trophees-classiques", "classic-trophy-silver-star", "Premium", "/images/WhatsApp Image 2026-06-03 at 13.39.11.jpeg", "Trophee etoile argent", "كأس نجمة فضية", "Silver star trophy"],
] as const;

const pages = [
  { slug: "a-propos", titleFr: "A propos de DYODZAMAK", titleAr: "من نحن", titleEn: "About DYODZAMAK" },
  { slug: "catalogue", titleFr: "Catalogue DYODZAMAK", titleAr: "كتالوج DYODZAMAK", titleEn: "DYODZAMAK Catalog" },
  { slug: "personnalisation", titleFr: "Personnalisation", titleAr: "التخصيص", titleEn: "Customization" },
  { slug: "devis", titleFr: "Demande de devis", titleAr: "طلب عرض سعر", titleEn: "Quote request" },
  { slug: "contact", titleFr: "Contact", titleAr: "اتصل بنا", titleEn: "Contact" },
] as const;

async function main() {
  console.log("Seeding database...");

  const adminEmail = process.env.ADMIN_EMAIL || "admin@dyodzamak.ma";
  const adminPasswordValue = process.env.ADMIN_PASSWORD || "Dyodzamak2026!";
  const accessEmail = process.env.ACCESS_ADMIN_EMAIL || "access@dyodzamak.ma";
  const accessPasswordValue = process.env.ACCESS_ADMIN_PASSWORD || "DyodzamakAccess2026!";

  for (const [email, passwordValue, name] of [
    [adminEmail, adminPasswordValue, "Admin DYODZAMAK"],
    [accessEmail, accessPasswordValue, "Access Manager"],
  ] as const) {
    const password = await bcrypt.hash(passwordValue, 10);
    await prisma.adminUser.upsert({
      where: { email },
      update: { password, name, role: "admin" },
      create: { email, password, name, role: "admin" },
    });
  }
  console.log("Admin users created");

  for (const setting of [
    { key: "whatsapp_number", value: "212642581548", group: "contact" },
    { key: "phone_display", value: "0661679774", group: "contact" },
    { key: "phone_display_secondary", value: "0522331230", group: "contact" },
    { key: "email", value: "contact@bestboutons.com", group: "contact" },
    { key: "location_fr", value: "Maroc", group: "contact" },
    { key: "location_ar", value: "المغرب", group: "contact" },
    { key: "location_en", value: "Morocco", group: "contact" },
    { key: "site_name", value: "DYODZAMAK", group: "general" },
  ]) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value, group: setting.group },
      create: setting,
    });
  }

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }
  console.log(`${categories.length} categories seeded`);

  const categoryRows = await prisma.category.findMany({ select: { id: true, slug: true } });
  const categoryIdBySlug = Object.fromEntries(categoryRows.map((row) => [row.slug, row.id]));

  let sortOrder = 1;
  for (const [categorySlug, slug, badge, image, nameFr, nameAr, nameEn] of products) {
    await prisma.product.upsert({
      where: { slug },
      update: {
        badge,
        image,
        finishes: ["gold", "silver", "black"],
        usage: ["corporate", "event"],
        customizable: true,
        active: true,
        premium: badge === "Premium",
        newest: badge === "Nouveau",
        featured: sortOrder <= 6,
        is3d: categorySlug === "trophees-3d",
        sortOrder,
        categoryId: categoryIdBySlug[categorySlug],
        nameFr,
        nameAr,
        nameEn,
        descFr: `${nameFr} pour projets professionnels, institutionnels et evenements.`,
        descAr: `${nameAr} للمشاريع المهنية والمؤسساتية والمناسبات.`,
        descEn: `${nameEn} for professional, institutional and event projects.`,
        specsFr: ["Personnalisation logo", "Finition soignee", "Production sur mesure"],
        specsAr: ["تخصيص الشعار", "تشطيب أنيق", "إنتاج حسب الطلب"],
        specsEn: ["Logo customization", "Polished finish", "Made to order"],
      },
      create: {
        slug,
        badge,
        image,
        finishes: ["gold", "silver", "black"],
        usage: ["corporate", "event"],
        customizable: true,
        active: true,
        premium: badge === "Premium",
        newest: badge === "Nouveau",
        featured: sortOrder <= 6,
        is3d: categorySlug === "trophees-3d",
        sortOrder,
        categoryId: categoryIdBySlug[categorySlug],
        nameFr,
        nameAr,
        nameEn,
        descFr: `${nameFr} pour projets professionnels, institutionnels et evenements.`,
        descAr: `${nameAr} للمشاريع المهنية والمؤسساتية والمناسبات.`,
        descEn: `${nameEn} for professional, institutional and event projects.`,
        specsFr: ["Personnalisation logo", "Finition soignee", "Production sur mesure"],
        specsAr: ["تخصيص الشعار", "تشطيب أنيق", "إنتاج حسب الطلب"],
        specsEn: ["Logo customization", "Polished finish", "Made to order"],
      },
    });
    sortOrder += 1;
  }
  console.log(`${products.length} products seeded`);

  for (const page of pages) {
    await prisma.pageContent.upsert({
      where: { slug: page.slug },
      update: {
        ...page,
        subtitleFr: `Contenu ${page.titleFr.toLowerCase()} mis a jour.`,
        subtitleAr: `تم تحديث محتوى ${page.titleAr}.`,
        subtitleEn: `Updated content for ${page.titleEn}.`,
      },
      create: {
        ...page,
        subtitleFr: `Contenu ${page.titleFr.toLowerCase()} mis a jour.`,
        subtitleAr: `تم تحديث محتوى ${page.titleAr}.`,
        subtitleEn: `Updated content for ${page.titleEn}.`,
      },
    });
  }

  const slides = [
    { titleFr: "Medailles et trophees premium", titleAr: "ميداليات وكؤوس راقية", titleEn: "Premium medals and trophies", image: "/images/WhatsApp Image 2026-06-03 at 13.38.31.jpeg", sortOrder: 1 },
    { titleFr: "Trophees 3D sur mesure", titleAr: "كؤوس 3D حسب الطلب", titleEn: "Custom 3D trophies", image: "/images/WhatsApp Image 2026-06-03 at 13.39.11.jpeg", sortOrder: 2 },
    { titleFr: "Pins, badges et porte-cles", titleAr: "دبابيس وشارات وحاملات مفاتيح", titleEn: "Pins, badges and keychains", image: "/images/WhatsApp Image 2026-06-03 at 13.39.12.jpeg", sortOrder: 3 },
  ];
  for (const slide of slides) {
    const existing = await prisma.homeSlide.findFirst({ where: { sortOrder: slide.sortOrder } });
    if (existing) {
      await prisma.homeSlide.update({ where: { id: existing.id }, data: slide });
    } else {
      await prisma.homeSlide.create({ data: slide });
    }
  }

  await prisma.processStep.deleteMany();
  await prisma.processStep.createMany({
    data: [
      { titleFr: "Choisir un produit", titleAr: "اختيار المنتج", titleEn: "Choose a product", descFr: "Selectionnez la categorie et l'article qui vous convient.", descAr: "اختر الفئة والمنتج المناسب.", descEn: "Choose the category and the item that fits.", icon: "search", sortOrder: 1, active: true },
      { titleFr: "Envoyer logo et quantite", titleAr: "إرسال الشعار والكمية", titleEn: "Send logo and quantity", descFr: "Transmettez votre logo, texte et nombre d'exemplaires.", descAr: "أرسل شعارك ونصك والكمية المطلوبة.", descEn: "Send your logo, text and required quantity.", icon: "send", sortOrder: 2, active: true },
      { titleFr: "Recevoir le devis", titleAr: "استلام العرض", titleEn: "Receive the quote", descFr: "Nous revenons avec prix, delai et proposition.", descAr: "نرجع إليك بالسعر والمدة والمقترح.", descEn: "We reply with price, timing and proposal.", icon: "receipt", sortOrder: 3, active: true },
      { titleFr: "Valider la maquette", titleAr: "تأكيد التصميم", titleEn: "Approve the mockup", descFr: "Validation avant fabrication.", descAr: "تأكيد التصميم قبل الإنتاج.", descEn: "Approve before production.", icon: "check", sortOrder: 4, active: true },
      { titleFr: "Production et livraison", titleAr: "الإنتاج والتوصيل", titleEn: "Production and delivery", descFr: "Fabrication puis livraison partout au Maroc.", descAr: "إنتاج ثم توصيل في جميع أنحاء المغرب.", descEn: "Production then delivery across Morocco.", icon: "truck", sortOrder: 5, active: true },
    ],
  });

  await prisma.trustPoint.deleteMany();
  await prisma.trustPoint.createMany({
    data: [
      { textFr: "Maquette avant production", textAr: "تصميم قبل الإنتاج", textEn: "Mockup before production", icon: "pencil", sortOrder: 1, active: true },
      { textFr: "Finitions premium", textAr: "تشطيبات راقية", textEn: "Premium finishes", icon: "star", sortOrder: 2, active: true },
      { textFr: "Livraison partout au Maroc", textAr: "التوصيل في جميع أنحاء المغرب", textEn: "Delivery across Morocco", icon: "truck", sortOrder: 3, active: true },
      { textFr: "Commande via WhatsApp", textAr: "الطلب عبر واتساب", textEn: "Order via WhatsApp", icon: "message", sortOrder: 4, active: true },
    ],
  });

  await prisma.stat.deleteMany();
  await prisma.stat.createMany({
    data: [
      { value: "20+", labelFr: "Articles ajoutes", labelAr: "منتجات مضافة", labelEn: "Articles added", sortOrder: 1, active: true },
      { value: "10", labelFr: "Categories actives", labelAr: "فئات نشطة", labelEn: "Active categories", sortOrder: 2, active: true },
      { value: "2", labelFr: "Comptes admin", labelAr: "حسابات إدارة", labelEn: "Admin accounts", sortOrder: 3, active: true },
      { value: "24h", labelFr: "Delai devis", labelAr: "مدة عرض السعر", labelEn: "Quote delay", sortOrder: 4, active: true },
    ],
  });

  await prisma.navItem.deleteMany();
  await prisma.navItem.createMany({
    data: categories.slice(0, 7).map((category, index) => ({
      href: category.href,
      labelFr: category.navLabelFr,
      labelAr: category.navLabelAr,
      labelEn: category.navLabelEn,
      sortOrder: index + 1,
      active: true,
      group: "main",
    })),
  });

  console.log("Seeding complete!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
