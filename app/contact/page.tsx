import type { Metadata } from "next";
import { ContactPageClient } from "@/components/pages/SimplePageClients";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez BEST BOUTONS par WhatsApp, telephone ou email pour demander un devis de medailles, trophees, plaques, pins ou badges."
};

export default function ContactPage() {
  return <ContactPageClient />;
}
