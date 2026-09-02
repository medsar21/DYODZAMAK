"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAdminAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(email, password);
    if (ok) {
      router.push("/admin");
    } else {
      setError("Invalid credentials");
    }
    setLoading(false);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#21070d] px-4 py-10">
      <div className="absolute -top-48 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[#e5bd77]/10 blur-3xl" />
      <div className="relative w-full max-w-md rounded-[28px] border border-white/10 bg-[#13212d] p-7 shadow-2xl md:p-9">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#e5bd77]">DYODZAMAK</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">Administration</h1>
          <p className="mt-2 text-sm text-white/55">Connectez-vous pour gérer le contenu du site.</p>
        </div>
        {error && <p className="mb-4 rounded-xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-200">Identifiants incorrects.</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white/75">Adresse e-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-[#e5bd77]/70 focus:ring-4 focus:ring-[#e5bd77]/10"
              placeholder="admin@dyodzamak.ma"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white/75">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-[#e5bd77]/70 focus:ring-4 focus:ring-[#e5bd77]/10"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#e5bd77] py-3 font-semibold text-[#111111] transition hover:bg-[#f0ce8b] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
