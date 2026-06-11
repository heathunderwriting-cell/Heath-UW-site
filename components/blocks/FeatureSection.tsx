import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

type FeatureSectionProps = {
  kicker?: string;
  title: string;
  description?: string;
  bullets?: readonly string[];
  children?: ReactNode;
  className?: string;
};

export function FeatureSection({
  kicker,
  title,
  description,
  bullets,
  children,
  className,
}: FeatureSectionProps) {
  return (
    <section
      className={cn(
        "relative z-10 border-y border-white/[0.06] bg-[#0c1d3f]/60 px-6 py-20 backdrop-blur-sm md:px-8 md:py-24",
        className
      )}
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          {kicker && (
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-400" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-400/80">{kicker}</span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-400" />
            </div>
          )}
          <h2 className="text-[clamp(24px,3vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-white">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg leading-relaxed text-white/55">{description}</p>
          )}
        </div>

        {bullets && bullets.length > 0 && (
          <ul className="mx-auto mt-10 grid max-w-2xl gap-3 text-left">
            {bullets.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-[15px] leading-relaxed text-white/70 backdrop-blur-sm transition-colors duration-300 hover:border-cyan-400/25"
              >
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/80" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {children}
      </Container>
    </section>
  );
}
