"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useI18n } from "@/components/providers/LanguageProvider";
import { CinematicBackground } from "@/components/marketing/Cinematic";
import { LoginForm } from "@/components/auth/LoginForm";

export default function IniciarSesionPage() {
  const { dict, t } = useI18n();

  return (
    <main className="relative min-h-screen text-[#f0f4ff]">
      <CinematicBackground />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pb-16 pt-28">
        {/* wordmark */}
        <div className="mb-8 text-center">
          <div className="text-3xl font-black tracking-[-0.03em]">
            HEA<span className="bg-gradient-to-r from-cyan-300 to-[#1a70f7] bg-clip-text text-transparent">TH</span>
          </div>
          <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.32em] text-white/45">
            Underwriting Platform
          </div>
        </div>

        <Suspense fallback={<div className="text-white/[0.62]">{t("common.loading")}</div>}>
          <LoginForm />
        </Suspense>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-[13px] font-medium text-white/[0.52] transition-colors hover:text-cyan-300"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {dict.marketingLayout.backHome}
        </Link>
      </div>
    </main>
  );
}
