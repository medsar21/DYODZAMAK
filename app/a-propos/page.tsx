import type { Metadata } from "next";
import { AboutPageClient } from "@/components/pages/SimplePageClients";

export const metadata: Metadata = {
  title: "A propos",
  description: "Presentation de BEST BOUTONS, entreprise marocaine specialisee en medailles, trophees et creations metalliques personnalisees."
};

export default function AProposPage() {
  return <AboutPageClient />;
}
