"use client";

import Link from "next/link";
import { useI18n } from "@/components/providers/LanguageProvider";

export function Footer() {
  const { dict } = useI18n();

  return (
    <footer className="relative z-10 border-t border-white/[0.12] bg-[#0d1f42]/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="text-xl font-black tracking-tight text-white md:text-2xl">
              HEA<span className="bg-gradient-to-r from-cyan-300 to-[#1a70f7] bg-clip-text text-transparent">TH</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/[0.52]">{dict.footer.description}</p>
            <Link
              href="/contact"
              className="mt-4 inline-block text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
            >
              {dict.footer.contact}
            </Link>
            <a
              href="mailto:sales@heathuw.com"
              className="mt-2 block font-mono text-sm text-white/[0.48] transition-colors hover:text-white/[0.78]"
            >
              sales@heathuw.com
            </a>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end">
            {(
              [
                ...dict.nav.footerLinks,
                {
                  href: "/contact",
                  label: dict.nav.cta,
                },
              ] as {
                href: string;
                label: string;
              }[]
            ).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/[0.52] transition-colors hover:text-cyan-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.12] pt-8">
          <span className="text-xs text-white/45">{dict.footer.copyright}</span>
          <span className="font-mono text-xs tracking-wider text-white/45">heathuw.com</span>
        </div>
      </div>
    </footer>
  );
}
