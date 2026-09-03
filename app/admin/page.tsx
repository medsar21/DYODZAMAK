"use client";

import Link from "next/link";
import { ArrowUpRight, FolderTree, Image, Mail, Package, Settings } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

const shortcuts = [
  { label: "Categories", detail: "Organiser le catalogue", href: "/admin/categories", icon: FolderTree, color: "from-blue-600 to-cyan-500" },
  { label: "Products", detail: "Créer et modifier les produits", href: "/admin/products", icon: Package, color: "from-emerald-600 to-teal-500" },
  { label: "Gallery", detail: "Gérer les réalisations", href: "/admin/gallery", icon: Image, color: "from-violet-600 to-fuchsia-500" },
  { label: "Contact messages", detail: "Lire les messages reçus", href: "/admin/contacts", icon: Mail, color: "from-rose-600 to-pink-500" },
  { label: "Settings", detail: "Informations du site", href: "/admin/settings", icon: Settings, color: "from-slate-600 to-slate-500" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl bg-slate-950 px-6 py-8 text-white shadow-xl sm:px-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">BEST BOUTONS · Administration</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Tableau de bord</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">Gérez les produits, le contenu et les demandes clients depuis un seul espace.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {shortcuts.map(({ label, detail, href, icon: Icon, color }) => (
            <Link key={href} href={href} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white shadow-lg`}><Icon size={22} /></div>
              <div className="flex items-start justify-between gap-3">
                <div><h2 className="font-semibold text-slate-900">{label}</h2><p className="mt-1 text-sm text-slate-500">{detail}</p></div>
                <ArrowUpRight className="mt-1 text-slate-400 transition group-hover:text-slate-900" size={19} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </AdminLayout>
  );
}
