"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { CinematicBackground, Reveal } from "@/components/marketing/Cinematic";
import { useI18n } from "@/components/providers/LanguageProvider";

interface MarketingPageLayoutProps {
  title?: string;
  subtitle?: string;
  titleKey?: string;
  subtitleKey?: string;
  showHeader?: boolean;
  children?: ReactNode;
}

export function MarketingPageLayout({
  title,
  subtitle,
  titleKey,
  subtitleKey,
  showHeader = true,
  children,
}: MarketingPageLayoutProps) {
  const { dict, t } = useI18n();
  const resolvedTitle = titleKey ? t(titleKey) : title ?? "";
  const resolvedSubtitle = subtitleKey ? t(subtitleKey) : subtitle;

  return (
    <main className="relative min-h-screen text-[#f0f4ff]">
      <CinematicBackground />
      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-16 pt-28 md:px-8 md:pt-32">
        {showHeader && (resolvedTitle || resolvedSubtitle) && (
          <Reveal>
            <header className="mb-10 text-center md:mb-12">
              {resolvedTitle && (
                <h1 className="text-[clamp(32px,4.5vw,52px)] font-extrabold leading-[1.08] tracking-[-0.025em] text-white">
                  {resolvedTitle}
                </h1>
              )}
              {resolvedSubtitle && (
                <p className="mt-4 text-lg leading-relaxed text-white/[0.68] md:text-xl">{resolvedSubtitle}</p>
              )}
              <div className="mx-auto mt-7 h-px w-24 bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
            </header>
          </Reveal>
        )}
        {children}
        <p className="mt-12 text-center text-sm">
          <Link
            href="/"
            className="font-medium text-cyan-300 transition-colors hover:text-cyan-200"
          >
            {dict.marketingLayout.backHome}
          </Link>
        </p>
      </div>
      <Footer />
    </main>
  );
}
