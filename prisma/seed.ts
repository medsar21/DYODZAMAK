import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  console.log("Seeding database...");

  // Admin user
  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin123", 10);
  await prisma.adminUser.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@bestboutons.ma" },
    update: { password: adminPassword },
    create: {
      email: process.env.ADMIN_EMAIL || "admin@bestboutons.ma",
      password: adminPassword,
      name: "Admin BEST BOUTONS",
      role: "admin",
    },
  });
  console.log("Admin user created");

  // Site settings
  const settings = [
    { key: "whatsapp_number", value: "0661679774", group: "contact" },
    { key: "phone_display", value: "+212 66 16 79 774", group: "contact" },
    { key: "email", value: "contact@bestboutons.ma", group: "contact" },
    { key: "location_fr", value: "Maroc", group: "contact" },
    { key: "location_ar", value: "المغرب", group: "contact" },
    { key: "location_en", value: "Morocco", group: "contact" },
    { key: "site_name", value: "BEST BOUTONS", group: "general" },
  ];
  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value, group: s.group },
    });
  }
  console.log("Settings seeded");

  // Categories
  const categoryData = [
    {
      slug: "medailles", href: "/medailles", icon: "medal", image: "/images/WhatsApp Image 2026-06-03 at 13.38.31.jpeg", sortOrder: 1,
      navLabelFr: "Medailles", navLabelAr: "ميداليات", navLabelEn: "Medals",
      heroTitleFr: "Medailles personnalisees", heroTitleAr: "ميداليات مخصصة", heroTitleEn: "Custom medals",
      heroDescFr: "Fabrication de medailles sur mesure pour evenements sportifs, entreprises, associations, ecoles et ceremonies.",
      heroDescAr: "تصنيع ميداليات حسب الطلب للمناسبات الرياضية والشركات والجمعيات والمدارس والاحتفالات.",
      heroDescEn: "Custom medals for sports events, companies, associations, schools and ceremonies.",
      summaryFr: "Medailles sportives, institutionnelles et evenementielles avec ruban, gravure et finition au choix.",
      summaryAr: "ميداليات رياضية ومؤسساتية ومناسباتية مع شريط ونقش وتشطيب حسب الطلب.",
      summaryEn: "Sports, institutional and event medals with ribbon, engraving and a finish of your choice.",
      subcategoriesFr: ["Sport", "Institution", "Evenement", "Premium"],
      subcategoriesAr: ["رياضة", "مؤسسة", "مناسبة", "راقي"],
      subcategoriesEn: ["Sport", "Institution", "Event", "Premium"],
      useCasesFr: ["Courses", "Tournois", "Graduations", "Ceremonies"],
      useCasesAr: ["سباقات", "بطولات", "تخرج", "حفلات"],
      useCasesEn: ["Races", "Tournaments", "Graduations", "Ceremonies"],
      metaTitle: "Medailles personnalisees", metaDescription: "Fabrication de medailles personnalisees pour sport, ecoles, entreprises et ceremonies.",
    },
    {
      slug: "trophees", href: "/trophees", icon: "trophy", image: "/images/WhatsApp Image 2026-06-03 at 13.39.10.jpeg", sortOrder: 2,
      navLabelFr: "Trophees", navLabelAr: "كؤوس", navLabelEn: "Trophies",
      heroTitleFr: "Trophees metalliques sur mesure", heroTitleAr: "كؤوس كلاسيكية", heroTitleEn: "Custom metal trophies",
      heroDescFr: "Trophees metalliques personnalises pour remises de prix, competitions, entreprises et institutions.",
      heroDescAr: "كؤوس لحفلات الجوائز والمسابقات الرياضية والشركات والمؤسسات.",
      heroDescEn: "Personalized metal trophies for award ceremonies, competitions, businesses and institutions.",
      summaryFr: "Trophees metalliques personnalises pour remises de prix, competitions, entreprises et institutions.",
      summaryAr: "كؤوس لحفلات الجوائز والمسابقات الرياضية والشركات والمؤسسات.",
      summaryEn: "Personalized metal trophies for award ceremonies, competitions, businesses and institutions.",
      subcategoriesFr: ["Classique", "Entreprise", "Sport", "Premium"],
      subcategoriesAr: ["كلاسيكي", "شركات", "رياضة", "خشب ومعدن"],
      subcategoriesEn: ["Classic", "Corporate", "Sport", "Premium"],
      useCasesFr: ["Remises de prix", "Competitions", "Challenges", "Reconnaissance"],
      useCasesAr: ["جوائز", "مسابقات", "تحديات", "تكريم"],
      useCasesEn: ["Award ceremonies", "Competitions", "Challenges", "Recognition"],
      metaTitle: "Trophees metalliques sur mesure", metaDescription: "Trophees metalliques personnalises haut de gamme pour evenements professionnels, sportifs et institutionnels.",
    },
    {
      slug: "trophees-3d", href: "/trophees-3d", icon: "box", image: "/images/WhatsApp Image 2026-06-03 at 13.39.11.jpeg", sortOrder: 3,
      navLabelFr: "Trophees 3D", navLabelAr: "كؤوس 3D", navLabelEn: "3D Trophies",
      heroTitleFr: "Trophees 3D personnalises", heroTitleAr: "كؤوس ثلاثية الأبعاد", heroTitleEn: "Custom 3D trophies",
      heroDescFr: "Pieces sur mesure avec logo en volume, formes speciales et rendu premium pour marques et evenements.",
      heroDescAr: "قطع حسب الطلب مع شعار بارز وأشكال خاصة ولمسة راقية.",
      heroDescEn: "Tailor-made pieces with raised logos, special shapes and a premium look for brands and events.",
      summaryFr: "Pieces sur mesure avec logo en volume, formes speciales et rendu premium pour marques et evenements.",
      summaryAr: "قطع حسب الطلب مع شعار بارز وأشكال خاصة ولمسة راقية.",
      summaryEn: "Tailor-made pieces with raised logos, special shapes and a premium look for brands and events.",
      subcategoriesFr: ["Logo 3D", "Forme speciale", "Entreprise", "Evenement"],
      subcategoriesAr: ["شعار 3D", "شكل خاص", "شركات", "مناسبة"],
      subcategoriesEn: ["3D logo", "Special shape", "Corporate", "Event"],
      useCasesFr: ["Lancement", "Gala", "Marque", "Distinction"],
      useCasesAr: ["إطلاق", "حفل", "علامة", "تميز"],
      useCasesEn: ["Launch", "Gala", "Brand", "Distinction"],
      metaTitle: "Trophees 3D personnalises", metaDescription: "Trophees 3D sur mesure pour marques et evenements.",
    },
    {
      slug: "plaques", href: "/plaques", icon: "panel", image: "/images/WhatsApp Image 2026-06-03 at 13.39.10 (1).jpeg", sortOrder: 4,
      navLabelFr: "Plaques", navLabelAr: "لوحات", navLabelEn: "Plaques",
      heroTitleFr: "Plaques honorifiques", heroTitleAr: "لوحات تكريمية", heroTitleEn: "Honor plaques",
      heroDescFr: "Plaques de remerciement, inauguration, hommage et reconnaissance avec gravure nette.",
      heroDescAr: "لوحات شكر وافتتاح وتقدير مع نقش واضح وتشطيب احترافي.",
      heroDescEn: "Plaques for thanks, inauguration, tribute and recognition with clean engraving.",
      summaryFr: "Plaques de remerciement, inauguration, hommage et reconnaissance avec gravure nette.",
      summaryAr: "لوحات شكر وافتتاح وتقدير مع نقش واضح وتشطيب احترافي.",
      summaryEn: "Plaques for thanks, inauguration, tribute and recognition with clean engraving.",
      subcategoriesFr: ["Gravee", "Institution", "Remerciement", "Inauguration"],
      subcategoriesAr: ["منقوشة", "مؤسسة", "شكر", "افتتاح"],
      subcategoriesEn: ["Engraved", "Institution", "Thank you", "Inauguration"],
      useCasesFr: ["Hommage", "Don", "Partenariat", "Ceremonie"],
      useCasesAr: ["تكريم", "هبة", "شراكة", "حفل"],
      useCasesEn: ["Tribute", "Gift", "Partnership", "Ceremony"],
      metaTitle: "Plaques honorifiques", metaDescription: "Plaques honorifiques personnalisees.",
    },
    {
      slug: "pins-badges", href: "/pins-badges", icon: "badge", image: "/images/WhatsApp Image 2026-06-03 at 13.39.13 (4).jpeg", sortOrder: 5,
      navLabelFr: "Pins & Badges", navLabelAr: "دبابيس وشارات", navLabelEn: "Pins & Badges",
      heroTitleFr: "Pins & badges metalliques", heroTitleAr: "دبابيس وشارات", heroTitleEn: "Pins & metal badges",
      heroDescFr: "Pins metalliques et badges personnalises pour marques, associations, administrations et evenements.",
      heroDescAr: "دبابيس وشارات معدنية وشعارات قابلة للتخصيص.",
      heroDescEn: "Custom metal pins and badges for brands, associations, organizations and events.",
      summaryFr: "Pins metalliques et badges personnalises pour marques, associations, administrations et evenements.",
      summaryAr: "دبابيس وشارات معدنية وشعارات قابلة للتخصيص.",
      summaryEn: "Custom metal pins and badges for brands, associations, organizations and events.",
      subcategoriesFr: ["Pins", "Badges", "Logo metal", "Evenement"],
      subcategoriesAr: ["دبابيس", "شارات", "شعار معدني", "مناسبة"],
      subcategoriesEn: ["Pins", "Badges", "Metal logo", "Event"],
      useCasesFr: ["Marque", "Association", "Uniforme", "Salon"],
      useCasesAr: ["هوية", "جمعية", "زي رسمي", "معرض"],
      useCasesEn: ["Brand", "Association", "Uniform", "Trade fair"],
      metaTitle: "Pins & badges metalliques", metaDescription: "Pins et badges metalliques personnalises.",
    },
    {
      slug: "porte-cles", href: "/porte-cles", icon: "key", image: "/images/WhatsApp Image 2026-06-03 at 13.39.12.jpeg", sortOrder: 6,
      navLabelFr: "Porte-cles", navLabelAr: "حاملات مفاتيح", navLabelEn: "Keychains",
      heroTitleFr: "Porte-cles metalliques personnalises", heroTitleAr: "حاملات مفاتيح مخصصة", heroTitleEn: "Custom metal keychains",
      heroDescFr: "Porte-cles metalliques personnalises pour entreprises, marques, clubs et evenements promotionnels.",
      heroDescAr: "حاملات مفاتيح معدنية وشعارات مخصصة وأشكال خاصة للشركات والنوادي والمناسبات.",
      heroDescEn: "Custom metal keychains for companies, brands, clubs and promotional events.",
      summaryFr: "Porte-cles metalliques personnalises pour entreprises, marques, clubs et evenements promotionnels.",
      summaryAr: "حاملات مفاتيح معدنية وشعارات مخصصة وأشكال خاصة للشركات والنوادي والمناسبات.",
      summaryEn: "Custom metal keychains for companies, brands, clubs and promotional events.",
      subcategoriesFr: ["Logo metal", "Automobile", "Souvenir", "Corporate"],
      subcategoriesAr: ["شعار معدني", "سيارات", "تذكار", "شركات"],
      subcategoriesEn: ["Metal logo", "Automotive", "Souvenir", "Corporate"],
      useCasesFr: ["Cadeaux clients", "Concessions", "Clubs", "Evenements"],
      useCasesAr: ["هدايا العملاء", "وكالات السيارات", "نوادي", "مناسبات"],
      useCasesEn: ["Client gifts", "Dealerships", "Clubs", "Events"],
      metaTitle: "Porte-cles metalliques personnalises", metaDescription: "Porte-cles metalliques personnalises.",
    },
    {
      slug: "pins", href: "/pins", icon: "pin", image: "/images/WhatsApp Image 2026-06-03 at 13.39.14.jpeg", sortOrder: 7,
      navLabelFr: "Pins", navLabelAr: "دبابيس", navLabelEn: "Pins",
      heroTitleFr: "Pins metalliques personnalises", heroTitleAr: "دبابيس معدنية مخصصة", heroTitleEn: "Custom metal pins",
      heroDescFr: "Nos pins metalliques sont fabriques sur mesure pour representer votre marque.",
      heroDescAr: "دبابيسنا المعدنية مصنوعة حسب الطلب لتمثيل علامتك التجارية.",
      heroDescEn: "Our metal pins are custom-made to represent your brand.",
      summaryFr: "Pins metalliques sur mesure pour entreprises, associations, marques et evenements.",
      summaryAr: "دبابيس معدنية حسب الطلب للشركات والجمعيات والعلامات والمناسبات.",
      summaryEn: "Custom metal pins for companies, associations, brands and events.",
      subcategoriesFr: ["Pins", "Logo", "Club", "Evenement"],
      subcategoriesAr: ["دبابيس", "شعار", "نادي", "مناسبة"],
      subcategoriesEn: ["Pins", "Logo", "Club", "Event"],
      useCasesFr: ["Communication", "Merchandising", "Clubs", "Salons"],
      useCasesAr: ["تواصل", "تسويق", "نوادي", "معارض"],
      useCasesEn: ["Communication", "Merchandising", "Clubs", "Trade fairs"],
      metaTitle: "Pins metalliques personnalises", metaDescription: "Pins metalliques sur mesure.",
    },
    {
      slug: "badges", href: "/badges", icon: "badge", image: "/images/WhatsApp Image 2026-06-03 at 13.39.13.jpeg", sortOrder: 8,
      navLabelFr: "Badges", navLabelAr: "شارات", navLabelEn: "Badges",
      heroTitleFr: "Badges metalliques personnalises", heroTitleAr: "شارات معدنية مخصصة", heroTitleEn: "Custom metal badges",
      heroDescFr: "Nos badges metalliques personnalises sont concus pour repondre aux besoins des entreprises.",
      heroDescAr: "شاراتنا المعدنية مصممة لتلبية احتياجات الشركات.",
      heroDescEn: "Our custom metal badges are designed to meet business needs.",
      summaryFr: "Badges metalliques personnalises pour entreprises, ecoles, administrations et evenements.",
      summaryAr: "شارات معدنية مخصصة للشركات والمدارس والمؤسسات والمناسبات.",
      summaryEn: "Custom metal badges for companies, schools, organizations and events.",
      subcategoriesFr: ["Nominatif", "Salon", "Staff", "Accreditation"],
      subcategoriesAr: ["شخصي", "معرض", "طاقم", "اعتماد"],
      subcategoriesEn: ["Name badge", "Trade fair", "Staff", "Accreditation"],
      useCasesFr: ["Accueil", "Salons", "Conferences", "Equipes"],
      useCasesAr: ["استقبال", "معارض", "مؤتمرات", "فرق"],
      useCasesEn: ["Reception", "Trade fairs", "Conferences", "Teams"],
      metaTitle: "Badges metalliques personnalises", metaDescription: "Badges metalliques sur mesure.",
    },
    {
      slug: "macarons", href: "/macarons", icon: "circle", image: "/images/WhatsApp Image 2026-06-03 at 13.39.14 (1).jpeg", sortOrder: 9,
      navLabelFr: "Macarons", navLabelAr: "ماكرون", navLabelEn: "Car badges",
      heroTitleFr: "Macarons de voiture personnalises", heroTitleAr: "ماكرون سيارات مخصصة", heroTitleEn: "Custom car badges",
      heroDescFr: "Nous concevons et fabriquons des macarons de voiture metalliques personnalises.",
      heroDescAr: "نصمم ونصنع ماكرون سيارات معدنية مخصصة.",
      heroDescEn: "We design and manufacture custom metal car badges.",
      summaryFr: "Macarons de voiture metalliques personnalises pour entreprises, institutions et associations.",
      summaryAr: "ماكرون سيارات معدنية مخصصة للشركات والمؤسسات والجمعيات.",
      summaryEn: "Custom metal car badges for companies, institutions and associations.",
      subcategoriesFr: ["Campagne", "Evenement", "Branding", "Associatif"],
      subcategoriesAr: ["حملة", "مناسبة", "علامة", "جمعوية"],
      subcategoriesEn: ["Campaign", "Event", "Branding", "Association"],
      useCasesFr: ["Communication", "Promotion", "Sensibilisation", "Ceremonie"],
      useCasesAr: ["تواصل", "ترويج", "توعية", "حفل"],
      useCasesEn: ["Communication", "Promotion", "Awareness", "Ceremony"],
      metaTitle: "Macarons de voiture personnalises", metaDescription: "Macarons de voiture metalliques personnalises.",
    },
    {
      slug: "trophees-classiques", href: "/trophees-classiques", icon: "trophy", image: "/images/WhatsApp Image 2026-06-03 at 13.39.13 (1).jpeg", sortOrder: 10,
      navLabelFr: "Trophees classiques", navLabelAr: "كؤوس كلاسيكية", navLabelEn: "Classic trophies",
      heroTitleFr: "Trophees classiques en metal", heroTitleAr: "كؤوس كلاسيكية معدنية", heroTitleEn: "Classic metal trophies",
      heroDescFr: "Trophees classiques en metal pour tous vos evenements et competitions.",
      heroDescAr: "كؤوس كلاسيكية معدنية لجميع مناسباتك ومسابقاتك.",
      heroDescEn: "Classic metal trophies for all your events and competitions.",
      summaryFr: "Trophees classiques pour remises de prix, competitions et ceremonies.",
      summaryAr: "كؤوس كلاسيكية لحفلات الجوائز والمسابقات والاحتفالات.",
      summaryEn: "Classic trophies for award ceremonies, competitions and ceremonies.",
      subcategoriesFr: ["Sport", "Corporate", "Scolaire", "Associatif"],
      subcategoriesAr: ["رياضة", "شركات", "مدرسي", "جمعوي"],
      subcategoriesEn: ["Sport", "Corporate", "School", "Association"],
      useCasesFr: ["Championnats", "Remises", "Gala", "Anniversaire"],
      useCasesAr: ["بطولات", "جوائز", "حفلات", "ذكرى"],
      useCasesEn: ["Championships", "Awards", "Gala", "Anniversary"],
      metaTitle: "Trophees classiques en metal", metaDescription: "Trophees classiques en metal.",
    },
  ];

  for (const cat of categoryData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }
  console.log(`${categoryData.length} categories seeded`);

  // Products
  const categories = await prisma.category.findMany();
  const catMap = Object.fromEntries(categories.map((c) => [c.slug, c.id]));

  const img = {
    medal: "/images/WhatsApp Image 2026-06-03 at 13.38.31.jpeg",
    plaqueBox: "/images/WhatsApp Image 2026-06-03 at 13.39.10 (1).jpeg",
    plaque: "/images/WhatsApp Image 2026-06-03 at 13.39.10 (2).jpeg",
    trophy: "/images/WhatsApp Image 2026-06-03 at 13.39.10.jpeg",
    trophy2: "/images/WhatsApp Image 2026-06-03 at 13.39.11.jpeg",
    pinCancer: "/images/WhatsApp Image 2026-06-03 at 13.39.13 (4).jpeg",
    pinMap: "/images/WhatsApp Image 2026-06-03 at 13.39.14.jpeg",
    pinBadge: "/images/WhatsApp Image 2026-06-03 at 13.39.13.jpeg",
    keyCar: "/images/WhatsApp Image 2026-06-03 at 13.39.12.jpeg",
    keyMetal: "/images/WhatsApp Image 2026-06-03 at 13.39.12 (1).jpeg",
    keyBrand: "/images/WhatsApp Image 2026-06-03 at 13.39.12 (2).jpeg"
  };

  const productsData = [
    {
      slug: "medal-rabat-2025", badge: "Institution", image: img.medal,
      finishes: ["gold", "silver", "bronze"], usage: ["corporate", "event", "association"],
      customizable: true, is3d: false, featured: true, premium: true, sortOrder: 1,
      categoryId: catMap["medailles"],
      nameFr: "Medaille institutionnelle Rabat 2025", nameAr: "ميدالية مؤسساتية الرباط 2025", nameEn: "Rabat 2025 institutional medal",
      descFr: "Medaille ceremonielle premium pour institutions, federations et evenements officiels.",
      descAr: "ميدالية راقية للمؤسسات والاتحادات والمناسبات الرسمية.",
      descEn: "Premium ceremonial medal for institutions, federations and official events.",
      specsFr: ["Logo et texte", "Finition doree", "Support presentoir"],
      specsAr: ["شعار ونص", "تشطيب ذهبي", "حامل عرض"],
      specsEn: ["Logo and text", "Gold finish", "Display stand"],
    },
    {
      slug: "medal-heritage-box", badge: "Premium", image: img.plaqueBox,
      finishes: ["bronze", "gold", "black"], usage: ["corporate", "association", "event"],
      customizable: true, is3d: false, premium: true, sortOrder: 2,
      categoryId: catMap["medailles"],
      nameFr: "Medaille Heritage avec coffret", nameAr: "ميدالية Heritage مع علبة", nameEn: "Heritage medal with box",
      descFr: "Rendu prestigieux pour associations, federations et remises de prix.",
      descAr: "لمسة راقية للجمعيات والاتحادات وحفلات الجوائز.",
      descEn: "A prestigious result for associations, federations and award ceremonies.",
      specsFr: ["Relief logo", "Coffret premium", "Finition antique"],
      specsAr: ["شعار بارز", "علبة راقية", "تشطيب عتيق"],
      specsEn: ["Raised logo", "Premium box", "Antique finish"],
    },
    {
      slug: "trophy-corporate", badge: "Entreprise", image: img.trophy,
      finishes: ["gold", "black", "silver"], usage: ["corporate", "event"],
      customizable: true, is3d: false, featured: true, sortOrder: 3,
      categoryId: catMap["trophees"],
      nameFr: "Trophee corporate metal et socle", nameAr: "كأس شركات معدن وقاعدة", nameEn: "Corporate metal trophy with base",
      descFr: "Trophee metallique professionnel pour remises de prix, challenges internes et partenaires.",
      descAr: "كأس أنيق للجوائز والتحديات الداخلية والشركاء.",
      descEn: "Professional metal trophy for awards, internal challenges and partners.",
      specsFr: ["Plaque gravee", "Socle stable", "Hauteur au choix"],
      specsAr: ["لوحة منقوشة", "قاعدة ثابتة", "ارتفاع حسب الطلب"],
      specsEn: ["Engraved plate", "Stable base", "Custom height"],
    },
    {
      slug: "trophy-sport-cup", badge: "Sport", image: img.trophy2,
      finishes: ["gold", "silver"], usage: ["sport", "association", "school"],
      customizable: true, is3d: false, sortOrder: 4,
      categoryId: catMap["trophees"],
      nameFr: "Coupe sportive classique", nameAr: "كأس رياضي كلاسيكي", nameEn: "Classic sports cup",
      descFr: "Reference fiable pour clubs, championnats, tournois et ceremonies sportives.",
      descAr: "اختيار عملي للأندية والبطولات والدوريات.",
      descEn: "A reliable choice for clubs, championships, tournaments and sports ceremonies.",
      specsFr: ["Coupe metal", "Socle noir", "Etiquette gravee"],
      specsAr: ["كأس معدني", "قاعدة سوداء", "بطاقة منقوشة"],
      specsEn: ["Metal cup", "Black base", "Engraved label"],
    },
    {
      slug: "3d-logo-award", badge: "Sur mesure", image: img.plaque,
      finishes: ["gold", "black", "bronze"], usage: ["corporate", "event"],
      customizable: true, is3d: true, newest: true, premium: true, sortOrder: 5,
      categoryId: catMap["trophees-3d"],
      nameFr: "Trophee logo 3D signature", nameAr: "كأس شعار 3D", nameEn: "Signature 3D logo trophy",
      descFr: "Piece distinctive pour marques, galas et lancements de projets.",
      descAr: "قطعة مميزة للعلامات والحفلات وإطلاق المشاريع.",
      descEn: "A distinctive piece for brands, galas and project launches.",
      specsFr: ["Logo en volume", "Forme speciale", "Maquette avant production"],
      specsAr: ["شعار بارز", "شكل خاص", "تصميم قبل الإنتاج"],
      specsEn: ["3D logo", "Special shape", "Mockup before production"],
    },
    {
      slug: "3d-event-tower", badge: "Nouveau", image: img.pinBadge,
      finishes: ["silver", "black", "gold"], usage: ["corporate", "event", "association"],
      customizable: true, is3d: true, newest: true, sortOrder: 6,
      categoryId: catMap["trophees-3d"],
      nameFr: "Trophee 3D Event Signature", nameAr: "كأس 3D للمناسبات", nameEn: "3D event signature trophy",
      descFr: "Design moderne pour evenements premium et concours.",
      descAr: "تصميم حديث للمناسبات الراقية والمسابقات.",
      descEn: "Modern design for premium events and competitions.",
      specsFr: ["Structure speciale", "Texte grave", "Finition bicolore"],
      specsAr: ["هيكل خاص", "نص منقوش", "تشطيب بلونين"],
      specsEn: ["Special structure", "Engraved text", "Two-tone finish"],
    },
    {
      slug: "plaque-honneur", badge: "Institution", image: img.plaqueBox,
      finishes: ["gold", "bronze", "silver"], usage: ["corporate", "school", "association"],
      customizable: true, is3d: false, featured: true, sortOrder: 7,
      categoryId: catMap["plaques"],
      nameFr: "Plaque honorifique gravee", nameAr: "لوحة تكريمية منقوشة", nameEn: "Engraved honor plaque",
      descFr: "Plaque professionnelle pour hommage, remerciement et ceremonies.",
      descAr: "لوحة احترافية للتكريم والشكر والحفلات.",
      descEn: "Professional plaque for tribute, thanks and ceremonies.",
      specsFr: ["Texte long", "Logo", "Boite presentoir"],
      specsAr: ["نص طويل", "شعار", "علبة عرض"],
      specsEn: ["Long text", "Logo", "Display box"],
    },
    {
      slug: "plaque-opening", badge: "Evenement", image: img.plaque,
      finishes: ["black", "gold", "silver"], usage: ["event", "corporate"],
      customizable: true, is3d: false, sortOrder: 8,
      categoryId: catMap["plaques"],
      nameFr: "Plaque inauguration premium", nameAr: "لوحة افتتاح راقية", nameEn: "Premium inauguration plaque",
      descFr: "Pour ouvertures, partenariats et projets institutionnels.",
      descAr: "للافتتاحات والشراكات والمشاريع المؤسساتية.",
      descEn: "For openings, partnerships and institutional projects.",
      specsFr: ["Metal noir", "Gravure claire", "Fixation possible"],
      specsAr: ["معدن أسود", "نقش واضح", "إمكانية التثبيت"],
      specsEn: ["Black metal", "Clear engraving", "Mounting available"],
    },
    {
      slug: "pin-breast-cancer", badge: "Logo", image: img.pinCancer,
      finishes: ["gold", "silver", "black"], usage: ["corporate", "association", "event"],
      customizable: true, is3d: false, newest: true, sortOrder: 9,
      categoryId: catMap["pins-badges"],
      nameFr: "Pin emaille de sensibilisation", nameAr: "دبوس توعوي بالمينا", nameEn: "Awareness enamel pin",
      descFr: "Pin metallique premium pour campagnes, associations, institutions et evenements.",
      descAr: "دبوس راق للحملات والجمعيات والمناسبات.",
      descEn: "Premium metal pin for campaigns, associations, institutions and events.",
      specsFr: ["Forme speciale", "Email colore", "Attache securisee"],
      specsAr: ["شكل خاص", "ألوان مينا", "تثبيت آمن"],
      specsEn: ["Special shape", "Colored enamel", "Secure clasp"],
    },
    {
      slug: "pin-maroc-map", badge: "Maroc", image: img.pinMap,
      finishes: ["gold", "bronze", "silver"], usage: ["event", "school", "association"],
      customizable: true, is3d: false, sortOrder: 10,
      categoryId: catMap["pins-badges"],
      nameFr: "Pin carte du Maroc emaille", nameAr: "دبوس خريطة المغرب", nameEn: "Morocco map enamel pin",
      descFr: "Pin identitaire pour evenements, associations, cadeaux officiels et communication de marque.",
      descAr: "شارة هوية للمناسبات والجمعيات والهدايا الرسمية.",
      descEn: "An identity pin for events, associations, official gifts and brand communication.",
      specsFr: ["Forme Maroc", "Drapeau emaille", "Finition doree"],
      specsAr: ["شكل المغرب", "علم بالمينا", "تشطيب ذهبي"],
      specsEn: ["Morocco shape", "Enamel flag", "Gold finish"],
    },
    {
      slug: "keychain-auto-logo", badge: "Automobile", image: img.keyCar,
      finishes: ["silver", "black", "gold"], usage: ["corporate", "event"],
      customizable: true, is3d: false, featured: true, newest: true, sortOrder: 11,
      categoryId: catMap["porte-cles"],
      nameFr: "Porte-cles logo automobile", nameAr: "حامل مفاتيح شعار سيارات", nameEn: "Automotive logo keychain",
      descFr: "Porte-cles metallique elegant pour concessions, marques automobiles et cadeaux clients.",
      descAr: "حامل مفاتيح أنيق لوكالات السيارات والعلامات والهدايا.",
      descEn: "An elegant metal keychain for dealerships, car brands and client gifts.",
      specsFr: ["Logo metal", "Anneau premium", "Finition brillante"],
      specsAr: ["شعار معدني", "حلقة راقية", "تشطيب لامع"],
      specsEn: ["Metal logo", "Premium ring", "Gloss finish"],
    },
    {
      slug: "keychain-metal-custom", badge: "Sur mesure", image: img.keyMetal,
      finishes: ["gold", "silver", "black"], usage: ["corporate", "association", "event"],
      customizable: true, is3d: false, premium: true, sortOrder: 12,
      categoryId: catMap["porte-cles"],
      nameFr: "Porte-cles metal personnalise", nameAr: "حامل مفاتيح معدني مخصص", nameEn: "Custom metal keychain",
      descFr: "Accessoire metallique premium pour cadeaux d'entreprise, clubs et campagnes de marque.",
      descAr: "إكسسوار راق لهدايا الشركات والنوادي والحملات.",
      descEn: "A premium metal accessory for corporate gifts, clubs and brand campaigns.",
      specsFr: ["Forme au choix", "Logo grave", "Packaging possible"],
      specsAr: ["شكل حسب الطلب", "شعار منقوش", "تغليف اختياري"],
      specsEn: ["Shape of choice", "Engraved logo", "Optional packaging"],
    },
  ];

  for (const p of productsData) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log(`${productsData.length} products seeded`);

  // Page content
  const pagesData = [
    {
      slug: "a-propos",
      titleFr: "A propos de BEST BOUTONS", titleAr: "من نحن", titleEn: "About BEST BOUTONS",
      subtitleFr: "Un atelier specialise dans les recompenses, plaques et creations metalliques personnalisees au Maroc.",
      subtitleAr: "كتالوج متخصص في الجوائز والمنتجات المعدنية المخصصة في المغرب.",
      subtitleEn: "A workshop specialized in awards, plaques and customized metal creations in Morocco.",
    },
    {
      slug: "catalogue",
      titleFr: "Catalogue BEST BOUTONS", titleAr: "كتالوج BEST BOUTONS", titleEn: "BEST BOUTONS Catalog",
      subtitleFr: "Parcourez les modeles avec une presentation plus claire, des filtres utiles et un acces rapide au devis.",
      subtitleAr: "تصفح النماذج بتجربة واضحة: فلاتر، تشطيبات، استعمالات وطلب سريع.",
      subtitleEn: "Browse the models with clearer presentation, useful filters and fast access to quoting.",
    },
    {
      slug: "personnalisation",
      titleFr: "Personnalisation", titleAr: "التخصيص", titleEn: "Customization",
      subtitleFr: "Logos, textes, dates, formes, quantites et finitions: chaque piece est preparee selon votre besoin reel.",
      subtitleAr: "الشعارات، النصوص، التواريخ، الأشكال، الكميات والتشطيبات حسب حاجتك.",
      subtitleEn: "Logos, text, dates, shapes, quantities and finishes: every piece is prepared for your real needs.",
    },
    {
      slug: "devis",
      titleFr: "Demande de devis", titleAr: "طلب عرض سعر", titleEn: "Quote request",
      subtitleFr: "Renseignez les details essentiels pour recevoir une reponse plus rapide et mieux cadree.",
      subtitleAr: "املأ التفاصيل الأساسية وأرسل طلبا جاهزا عبر واتساب.",
      subtitleEn: "Enter the essential details to receive a faster and better-scoped response.",
    },
    {
      slug: "contact",
      titleFr: "Contact", titleAr: "اتصل بنا", titleEn: "Contact",
      subtitleFr: "WhatsApp reste le canal le plus rapide pour demander un prix, envoyer un logo ou suivre un projet.",
      subtitleAr: "واتساب هو الأسرع لطلب السعر أو التصميم أو متابعة الطلب.",
      subtitleEn: "WhatsApp remains the fastest channel to request a price, send a logo or follow a project.",
    },
  ];

  for (const p of pagesData) {
    await prisma.pageContent.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log(`${pagesData.length} pages seeded`);

  // Home slides
  const slidesData = [
    {
      titleFr: "Medailles & Trophees premium", titleAr: "ميداليات وكؤوس راقية", titleEn: "Premium medals & trophies",
      textFr: "Fabrique au Maroc, personnalisation totale, finitions bronze, doree, argentee et noir metal.",
      textAr: "تصنيع في المغرب، تخصيص كامل، تشطيبات برونزية وذهبية وفضية وسوداء.",
      textEn: "Made in Morocco, full customization, bronze, gold, silver and black metal finishes.",
      image: "/images/WhatsApp Image 2026-06-03 at 13.38.31.jpeg", sortOrder: 1,
    },
    {
      titleFr: "Trophees 3D sur mesure", titleAr: "كؤوس ثلاثية الأبعاد حسب الطلب", titleEn: "Custom 3D trophies",
      textFr: "Logos en volume, formes speciales, maquette avant production.",
      textAr: "شعارات بارزة، أشكال خاصة، تصميم قبل الإنتاج.",
      textEn: "3D logos, special shapes, mockup before production.",
      image: "/images/WhatsApp Image 2026-06-03 at 13.39.11.jpeg", sortOrder: 2,
    },
    {
      titleFr: "Pins, badges et porte-cles", titleAr: "دبابيس وشارات وحاملات مفاتيح", titleEn: "Pins, badges and keychains",
      textFr: "Objets metalliques idenaux pour entreprises, associations et evenements.",
      textAr: "قطع معدنية مثالية للشركات والجمعيات والمناسبات.",
      textEn: "Metal objects ideal for companies, associations and events.",
      image: "/images/WhatsApp Image 2026-06-03 at 13.39.12.jpeg", sortOrder: 3,
    },
  ];

  for (const s of slidesData) {
    const existing = await prisma.homeSlide.findFirst({ where: { titleFr: s.titleFr } });
    if (!existing) await prisma.homeSlide.create({ data: s });
  }
  console.log("Home slides seeded");

  // Process steps
  const stepsData = [
    { titleFr: "Choisir un produit", titleAr: "اختيار المنتج", titleEn: "Choose a product", descFr: "Parcourez nos categories et trouvez le produit qui correspond a votre besoin.", descAr: "تصفح فئاتنا واعثر على المنتج الذي يناسب احتياجك.", descEn: "Browse our categories and find the product that matches your needs.", icon: "search", sortOrder: 1 },
    { titleFr: "Envoyer logo, texte et quantite", titleAr: "إرسال الشعار والنص والكمية", titleEn: "Send logo, text and quantity", descFr: "Envoyez votre logo, le texte a graver et la quantite souhaitee.", descAr: "أرسل شعارك والنص المراد نقشه والكمية المطلوبة.", descEn: "Send your logo, the text to engrave and the desired quantity.", icon: "send", sortOrder: 2 },
    { titleFr: "Recevoir le devis", titleAr: "استلام عرض السعر", titleEn: "Receive the quote", descFr: "Nous vous envoyons un devis detaille avec delai de production.", descAr: "نرسل لك عرض سعر مفصل مع مدة الإنتاج.", descEn: "We send you a detailed quote with production time.", icon: "receipt", sortOrder: 3 },
    { titleFr: "Valider la maquette", titleAr: "تأكيد التصميم", titleEn: "Approve the mockup", descFr: "Validez la maquette avant le lancement de la production.", descAr: "أكد على التصميم قبل بدء الإنتاج.", descEn: "Approve the mockup before starting production.", icon: "check", sortOrder: 4 },
    { titleFr: "Production et livraison", titleAr: "الإنتاج والتوصيل", titleEn: "Production and delivery", descFr: "Production soignee et livraison partout au Maroc.", descAr: "إنتاج دقيق وتوصيل في جميع أنحاء المغرب.", descEn: "Careful production and delivery across Morocco.", icon: "truck", sortOrder: 5 },
  ];

  const existingStep = await prisma.processStep.findFirst();
  if (!existingStep) {
    await prisma.processStep.createMany({ data: stepsData });
    console.log("Process steps seeded");
  }

  // Trust points
  const trustData = [
    { textFr: "Maquette avant production", textAr: "تصميم قبل الإنتاج", textEn: "Mockup before production", icon: "pencil", sortOrder: 1 },
    { textFr: "Finitions bronze, doree, argentee et noir metal", textAr: "تشطيبات برونزية وذهبية وفضية وسوداء", textEn: "Bronze, gold, silver and black metal finishes", icon: "star", sortOrder: 2 },
    { textFr: "Livraison partout au Maroc", textAr: "التوصيل في جميع أنحاء المغرب", textEn: "Delivery across Morocco", icon: "truck", sortOrder: 3 },
    { textFr: "Commande via WhatsApp", textAr: "الطلب عبر واتساب", textEn: "Order via WhatsApp", icon: "message", sortOrder: 4 },
  ];

  const existingTrust = await prisma.trustPoint.findFirst();
  if (!existingTrust) {
    await prisma.trustPoint.createMany({ data: trustData });
    console.log("Trust points seeded");
  }

  // Stats
  const statsData = [
    { value: "500+", labelFr: "Clients satisfaits", labelAr: "عملاء راضون", labelEn: "Satisfied clients", sortOrder: 1 },
    { value: "10K+", labelFr: "Produits livres", labelAr: "منتجات تم تسليمها", labelEn: "Products delivered", sortOrder: 2 },
    { value: "15+", labelFr: "Annees d'experience", labelAr: "سنوات من الخبرة", labelEn: "Years of experience", sortOrder: 3 },
    { value: "24h", labelFr: "Delai de devis", labelAr: "مدة عرض السعر", labelEn: "Quote turnaround", sortOrder: 4 },
  ];

  const existingStat = await prisma.stat.findFirst();
  if (!existingStat) {
    await prisma.stat.createMany({ data: statsData });
    console.log("Stats seeded");
  }

  // Navigation items
  const navData = [
    { href: "/medailles", labelFr: "Medailles", labelAr: "ميداليات", labelEn: "Medals", sortOrder: 1, group: "main" },
    { href: "/trophees", labelFr: "Trophees", labelAr: "كؤوس", labelEn: "Trophies", sortOrder: 2, group: "main" },
    { href: "/trophees-3d", labelFr: "Trophees 3D", labelAr: "كؤوس 3D", labelEn: "3D Trophies", sortOrder: 3, group: "main" },
    { href: "/plaques", labelFr: "Plaques", labelAr: "لوحات", labelEn: "Plaques", sortOrder: 4, group: "main" },
    { href: "/pins-badges", labelFr: "Pins & Badges", labelAr: "دبابيس وشارات", labelEn: "Pins & Badges", sortOrder: 5, group: "main" },
    { href: "/porte-cles", labelFr: "Porte-cles", labelAr: "حاملات مفاتيح", labelEn: "Keychains", sortOrder: 6, group: "main" },
    { href: "/devis", labelFr: "Demande de devis", labelAr: "طلب عرض سعر", labelEn: "Quote request", sortOrder: 7, group: "main" },
  ];

  const existingNav = await prisma.navItem.findFirst();
  if (!existingNav) {
    await prisma.navItem.createMany({ data: navData });
    console.log("Navigation items seeded");
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
