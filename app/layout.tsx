import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import SiteChrome from "@/components/SiteChrome";
import "./globals.css";

// The shared chrome reads runtime-backed content and navigation state. Rendering
// it dynamically avoids attempting to statically pre-render pages that depend
// on request-scoped APIs.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL("https://dyodzamak.ma"),
  title: {
    default: "BEST BOUTONS | Medailles, trophees et creations metalliques au Maroc",
    template: "%s | BEST BOUTONS"
  },
  description:
    "BEST BOUTONS cree des medailles, trophees, plaques, pins, badges et objets metalliques personnalises au Maroc. Prix sur devis et commande via WhatsApp.",
  keywords: [
    "BEST BOUTONS",
    "medailles personnalisees Maroc",
    "trophees Maroc",
    "plaques honorifiques",
    "pins metalliques",
    "badges personnalises",
    "prix sur devis"
  ],
  openGraph: {
    title: "BEST BOUTONS",
    description: "Medailles, trophees et creations metalliques personnalisees. Prix sur devis.",
    images: ["/images/hero-awards.png"],
    locale: "fr_MA",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" dir="ltr" data-scroll-behavior="smooth">
      <body>
        <LanguageProvider>
          <SiteChrome>{children}</SiteChrome>
        </LanguageProvider>
      </body>
    </html>
  );
}
