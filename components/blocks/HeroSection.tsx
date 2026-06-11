import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

type HeroSectionProps = {
  title: string;
  subtitle?: string;
  kicker?: string;
  align?: "center" | "left";
  children?: ReactNode;
  className?: string;
};

export function HeroSection({
  title,
  subtitle,
  kicker,
  align = "center",
  children,
  className,
}: HeroSectionProps) {
  return (
    <section className={cn("relative z-10 px-6 pb-14 pt-28 md:px-8 md:pt-36", className)}>
      <Container>
        <div
          className={cn(
            "mx-auto max-w-3xl",
            align === "center" ? "text-center" : "text-left"
          )}
        >
          {kicker && (
            <div
              className={cn(
                "mb-6 inline-flex items-center gap-2.5 rounded-full border border-cyan-400/25 bg-cyan-400/[0.06] px-4 py-2 backdrop-blur-sm"
              )}
            >
              <span className="home-pulse-dot h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-300/90">{kicker}</span>
            </div>
          )}
          <h1 className="text-[clamp(34px,4.8vw,60px)] font-extrabold leading-[1.06] tracking-[-0.03em] text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 text-lg leading-relaxed text-white/[0.68] md:text-xl">{subtitle}</p>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}
