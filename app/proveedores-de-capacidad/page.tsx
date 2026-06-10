import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ChipBackground } from "@/components/ChipBackground";

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
    <div style={{ flex: 1, minWidth: 180 }}>
      <p style={{ fontSize: "0.68rem", letterSpacing: "0.12em", fontWeight: 700, color: "#64748b", textTransform: "uppercase", margin: 0 }}>{label}</p>
      <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0b1220", margin: "4px 0 0" }}>{value}</p>
      {sub && <p style={{ fontSize: "0.78rem", color: "#475569", margin: "2px 0 0" }}>{sub}</p>}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "8px 0", borderBottom: "1px solid #eef2f8" }}>
      <span style={{ fontSize: "0.8rem", color: "#64748b" }}>{k}</span>
      <span style={{ fontSize: "0.84rem", fontWeight: 600, color: "#0b1220", textAlign: "right" }}>{v}</span>
    </div>
  );
}

function ProviderCard({ p }: { p: Provider }) {
  return (
    <div style={{ background: "#ffffff", border: "1px solid #d9e2f0", borderRadius: 18, padding: "22px 24px", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0b1220", margin: 0 }}>{p.name}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
            {p.provider_type && <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#2563eb", background: "#dbe7fa", borderRadius: 999, padding: "3px 10px" }}>{p.provider_type}</span>}
            {p.status === "active" && <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#0f6e56", background: "#d6f0e6", borderRadius: 999, padding: "3px 10px" }}>Activo</span>}
            {p.rating && <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#8a5a00", background: "#f7e8c8", borderRadius: 999, padding: "3px 10px" }}>{p.rating_agency ? `${p.rating_agency} ${p.rating}` : p.rating}</span>}
          </div>
        </div>
      </div>

      {p.binder_ref && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14 }}>
          <span style={{ fontSize: "0.68rem", letterSpacing: "0.1em", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Binder</span>
          <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "0.82rem", fontWeight: 700, color: "#0b1220", background: "#eef2f8", border: "1px solid #d9e2f0", borderRadius: 8, padding: "3px 10px", letterSpacing: "0.04em" }}>{p.binder_ref}</span>
        </div>
      )}

      <div style={{ marginTop: 14, padding: "14px 16px", background: "#f4f8fd", border: "1px solid #e2ecf8", borderRadius: 14 }}>
        <p style={{ fontSize: "0.68rem", letterSpacing: "0.12em", fontWeight: 700, color: "#2563eb", textTransform: "uppercase", margin: 0 }}>Capacidad por riesgo</p>
        <p style={{ fontSize: "1.85rem", fontWeight: 800, color: "#0b1220", margin: "4px 0 0", letterSpacing: "-0.01em" }}>{money(p.capacity_amount, p.currency)}</p>
      </div>

      <div style={{ marginTop: 16 }}>
        <Row k="Línea" v={p.line_label ?? p.line ?? "—"} />
        <Row k="Región" v={p.region ?? "—"} />
        {p.territories && <Row k="Territorios" v={p.territories} />}
        {p.max_line != null && <Row k="Línea máxima" v={money(p.max_line, p.currency)} />}
        {p.share_pct != null && <Row k="Participación" v={`${p.share_pct}%`} />}
        {p.contact_name && <Row k="Contacto" v={p.contact_name} />}
        {p.contact_email && <Row k="Email" v={p.contact_email} />}
      </div>

      {p.notes && <p style={{ fontSize: "0.78rem", color: "#475569", lineHeight: 1.5, marginTop: 14 }}>{p.notes}</p>}
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
    <div style={{ position: "relative", minHeight: "100vh", background: "#eaf1fb" }}>
      <ChipBackground opacity={0.55} tone="light" />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1080, margin: "0 auto", padding: "56px 24px 80px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 8 }}>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.18em", fontWeight: 700, color: "#64748b", textTransform: "uppercase", margin: 0 }}>Heath · Capacidad</p>
            <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#0b1220", margin: "6px 0 0" }}>Proveedores de capacidad</h1>
            <p style={{ fontSize: "1rem", color: "#475569", marginTop: 8, lineHeight: 1.5, maxWidth: 620 }}>
              Mercados que respaldan la capacidad con la que cotizas. Esta es la capacidad disponible por línea y región.
            </p>
          </div>
          <Link href="/inicio" style={{ display: "inline-block", border: "1px solid #cdd9ec", background: "#ffffff", color: "#2563eb", borderRadius: 999, padding: "10px 22px", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
            ← Volver al inicio
          </Link>
        </div>

        {providers.length === 0 ? (
          <p style={{ fontSize: "0.95rem", color: "#475569", marginTop: 32 }}>Aún no hay proveedores de capacidad registrados.</p>
        ) : (
          <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 24, background: "#ffffff", border: "1px solid #d9e2f0", borderRadius: 18, padding: "22px 26px", marginTop: 24 }}>
              <Stat label="Capacidad total disponible" value={money(total, currency)} sub={`${providers.length} proveedores`} />
              <Stat label="Línea" value={lines.join(", ") || "—"} />
              <Stat label="Región" value={regions.join(", ") || "—"} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, marginTop: 24 }}>
              {providers.map((p) => (<ProviderCard key={p.id} p={p} />))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
