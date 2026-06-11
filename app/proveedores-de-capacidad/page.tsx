import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { CinematicBackground } from "@/components/marketing/Cinematic";

export const dynamic = "force-dynamic";

type Provider = {
  id: string;
  name: string;
  short_name: string | null;
  provider_type: string | null;
  line: string | null;
  line_label: string | null;
  region: string | null;
  territories: string | null;
  capacity_amount: number | null;
  currency: string | null;
  max_line: number | null;
  rating_agency: string | null;
  rating: string | null;
  share_pct: number | null;
  status: string | null;
  contact_name: string | null;
  contact_email: string | null;
  notes: string | null;
  binder_ref: string | null;
  sort_order: number | null;
};

function money(amount?: number | null, currency?: string | null) {
  if (amount == null) return "—";
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: currency || "USD", maximumFractionDigits: 0 }).format(amount);
  } catch {
    return `${currency || "USD"} ${Number(amount).toLocaleString("en-US")}`;
  }
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="min-w-[180px] flex-1">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/[0.48]">{label}</p>
      <p className="mt-1.5 bg-gradient-to-b from-white to-[#9fc4ff] bg-clip-text font-mono text-2xl font-extrabold text-transparent">
        {value}
      </p>
      {sub && <p className="mt-0.5 text-[12px] text-white/[0.52]">{sub}</p>}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-white/[0.12] py-2 last:border-0">
      <span className="text-[12.5px] text-white/[0.52]">{k}</span>
      <span className="text-right text-[13px] font-semibold text-white/90">{v}</span>
    </div>
  );
}

function ProviderCard({ p }: { p: Provider }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.14] bg-white/[0.06] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.09]">
      <div
        aria-hidden
        className="absolute -right-14 -top-14 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.14), transparent 70%)" }}
      />
      <div className="relative">
        <h3 className="text-lg font-bold tracking-tight text-white">{p.name}</h3>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {p.provider_type && (
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-[10px] font-bold tracking-wide text-cyan-300">
              {p.provider_type}
            </span>
          )}
          {p.status === "active" && (
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold tracking-wide text-emerald-300">
              Activo
            </span>
          )}
          {p.rating && (
            <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-[10px] font-bold tracking-wide text-amber-300">
              {p.rating_agency ? `${p.rating_agency} ${p.rating}` : p.rating}
            </span>
          )}
        </div>

        {p.binder_ref && (
          <div className="mt-4 flex items-center gap-2.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/[0.48]">Binder</span>
            <span className="rounded-md border border-white/[0.16] bg-[#102448]/70 px-2.5 py-1 font-mono text-[12px] font-bold tracking-wide text-cyan-200">
              {p.binder_ref}
            </span>
          </div>
        )}

        <div className="mt-4 rounded-xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/[0.07] to-[#1a70f7]/[0.04] px-4 py-3.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300/90">Capacidad por riesgo</p>
          <p className="mt-1 font-mono text-[26px] font-extrabold tracking-tight text-white">
            {money(p.capacity_amount, p.currency)}
          </p>
        </div>

        <div className="mt-4">
          <Row k="Línea" v={p.line_label ?? p.line ?? "—"} />
          <Row k="Región" v={p.region ?? "—"} />
          {p.territories && <Row k="Territorios" v={p.territories} />}
          {p.max_line != null && <Row k="Línea máxima" v={money(p.max_line, p.currency)} />}
          {p.share_pct != null && <Row k="Participación" v={`${p.share_pct}%`} />}
          {p.contact_name && <Row k="Contacto" v={p.contact_name} />}
          {p.contact_email && <Row k="Email" v={p.contact_email} />}
        </div>

        {p.notes && <p className="mt-4 text-[12.5px] leading-relaxed text-white/[0.52]">{p.notes}</p>}
      </div>
    </div>
  );
}

export default async function ProveedoresPage() {
  const supabase = await createSupabaseServerClient();
  let providers: Provider[] = [];
  if (supabase) {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      redirect("/iniciar-sesion?redirect=/proveedores-de-capacidad");
    }
    const { data: rows } = await supabase
      .from("capacity_providers")
      .select("*")
      .eq("status", "active")
      .order("sort_order", { ascending: true });
    providers = (rows ?? []) as Provider[];
  }

  const total = providers.reduce((s, p) => s + (Number(p.capacity_amount) || 0), 0);
  const currency = providers[0]?.currency ?? "USD";
  const lines = Array.from(new Set(providers.map((p) => p.line_label ?? p.line).filter(Boolean)));
  const regions = Array.from(new Set(providers.map((p) => p.region).filter(Boolean)));

  return (
    <div className="relative min-h-screen text-[#f0f4ff]">
      <CinematicBackground />
      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-14">
        <div className="mb-2 flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-cyan-400 to-transparent" />
              <span className="text-[11px] font-bold tracking-[0.3em] text-cyan-400/80">HEATH · CAPACIDAD</span>
            </div>
            <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.1] tracking-[-0.025em] text-white">
              Proveedores de capacidad
            </h1>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/[0.62]">
              Mercados que respaldan la capacidad con la que cotizas. Esta es la capacidad disponible por línea y región.
            </p>
          </div>
          <Link
            href="/inicio"
            className="whitespace-nowrap rounded-lg border border-white/20 bg-white/[0.06] px-5 py-2.5 text-[13px] font-semibold text-cyan-300 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:text-cyan-200"
          >
            ← Volver al inicio
          </Link>
        </div>

        {providers.length === 0 ? (
          <p className="mt-8 text-[15px] text-white/[0.62]">Aún no hay proveedores de capacidad registrados.</p>
        ) : (
          <>
            <div className="mt-6 flex flex-wrap gap-6 rounded-2xl border border-white/[0.14] bg-white/[0.06] px-7 py-6 backdrop-blur-sm">
              <Stat label="Capacidad total disponible" value={money(total, currency)} sub={`${providers.length} proveedores`} />
              <Stat label="Línea" value={lines.join(", ") || "—"} />
              <Stat label="Región" value={regions.join(", ") || "—"} />
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {providers.map((p) => (
                <ProviderCard key={p.id} p={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
