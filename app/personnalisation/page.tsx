import type { Metadata } from "next";
import { CustomizationPageClient } from "@/components/pages/SimplePageClients";

export const metadata: Metadata = {
  title: "Personnalisation",
  description: "Options de personnalisation BEST BOUTONS: logo, nom, texte, date, evenement, forme, taille, quantite et finitions metal."
};

export default function PersonnalisationPage() {
  return <CustomizationPageClient />;
}
