import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type CTASectionProps = {
  kicker?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  children?: ReactNode;
  className?: string;
};

export function CTASection({
  kicker,
  title,
  titleAccent,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  children,
  className,
}: CTASectionProps) {
  return (
    <section className={cn("relative z-10 px-6 py-20 md:px-8 md:py-24", className)}>
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.16] px-8 py-16 text-center md:px-14 md:py-20">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, #143064 0%, #1a3d7d 50%, #122a55 100%)" }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-80"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(26,112,247,0.35), transparent 60%), radial-gradient(ellipse 50% 50% at 85% 100%, rgba(34,211,238,0.18), transparent 60%)",
            }}
          />
          <div className="home-grid absolute inset-0 opacity-60" aria-hidden />

          <div className="relative">
            {kicker && (
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-cyan-400/25 bg-cyan-400/[0.07] px-4 py-1.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-300/90">{kicker}</span>
              </div>
            )}
            <h2 className="mx-auto max-w-3xl text-[clamp(26px,3.5vw,44px)] font-extrabold leading-[1.12] tracking-[-0.025em] text-white">
              {title}
              {titleAccent && (
                <>
                  {" "}
                  <span className="bg-gradient-to-r from-cyan-300 to-[#4a9eff] bg-clip-text text-transparent">
                    {titleAccent}
                  </span>
                </>
              )}
            </h2>
            {description && (
              <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/[0.68] md:text-lg">
                {description}
              </p>
            )}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={primaryHref}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-[#1a70f7] to-[#2b8af9] px-8 py-4 text-[15px] font-bold text-white shadow-[0_8px_32px_rgba(26,112,247,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_44px_rgba(26,112,247,0.65)]"
              >
                <span className="home-sheen absolute inset-0" aria-hidden />
                <span className="relative">{primaryLabel}</span>
                <svg
                  className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              {secondaryHref && secondaryLabel && (
                <Link
                  href={secondaryHref}
                  className="inline-flex items-center rounded-lg border border-white/20 bg-white/[0.07] px-8 py-4 text-[15px] font-semibold text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:text-white"
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
