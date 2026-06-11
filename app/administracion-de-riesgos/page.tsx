import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { CinematicBackground } from "@/components/marketing/Cinematic";

export const dynamic = "force-dynamic";

export default async function RiesgosPage() {
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      redirect("/iniciar-sesion?redirect=/administracion-de-riesgos");
    }
  }
  return (
    <div className="relative min-h-screen text-[#f0f4ff]">
      <CinematicBackground bright />
      <div className="relative z-10 mx-auto max-w-xl px-6 py-28 text-center">
        <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-400/15 to-[#1a70f7]/15 text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 3l7 3v5c0 4.4-3 7.4-7 9-4-1.6-7-4.6-7-9V6z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>
        <span className="inline-block rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-[10px] font-bold tracking-[0.18em] text-amber-300">
          EN DESARROLLO
        </span>
        <h1 className="mt-5 text-[clamp(26px,3.5vw,38px)] font-extrabold leading-[1.12] tracking-[-0.025em] text-white">
          Administración de riesgos
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-white/[0.62]">
          Módulo en construcción. Aquí monitorearás y controlarás la exposición. Próximamente.
        </p>
        <Link
          href="/inicio"
          className="mt-8 inline-block rounded-lg border border-white/20 bg-white/[0.06] px-6 py-3 text-[14px] font-semibold text-cyan-300 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:text-cyan-200"
        >
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}
