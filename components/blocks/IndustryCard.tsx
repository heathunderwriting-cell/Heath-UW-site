import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type IndustryCardProps = {
  title: string;
  description: string;
  /** Detail URL — use `ROUTES.industries.detail(slug)` from `@/lib/routes/marketing` */
  href: string;
  className?: string;
};

export function IndustryCard({ title, description, href, className }: IndustryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1733]",
        className
      )}
    >
      <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:border-cyan-400/30 group-hover:bg-white/[0.04] md:p-7">
        <div
          aria-hidden
          className="absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(circle, rgba(34,211,238,0.16), transparent 70%)" }}
        />
        <div className="relative flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold tracking-tight text-white md:text-2xl">{title}</h3>
          <ArrowUpRight
            className="mt-1 h-5 w-5 shrink-0 text-white/30 transition-colors group-hover:text-cyan-300"
            aria-hidden
          />
        </div>
        <p className="relative mt-3 text-sm leading-relaxed text-white/50 md:text-base">{description}</p>
      </div>
    </Link>
  );
}
