"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import { usePathname } from "next/navigation";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const { isRtl } = useLanguage();
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const isAdminArea = pathname.startsWith("/admin");

  if (isAdminArea) return <>{children}</>;

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="page-shell bg-white text-[#111111]">
      <Header />
      <main className={`relative z-10 bg-white text-[#111111] pb-8${isLanding ? "" : " pt-[104px] md:pt-[116px]"}`}>{children}</main>
      <Footer />
    </div>
  );
}
