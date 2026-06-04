import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ChipBackground } from "@/components/ChipBackground";

export const dynamic = "force-dynamic";

export default async function ProveedoresPage() {
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      redirect("/iniciar-sesion?redirect=/proveedores-de-capacidad");
    }
  }
  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#eaf1fb" }}>
      <ChipBackground opacity={0.55} tone="light" />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 640,
          margin: "0 auto",
          padding: "96px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            margin: "0 auto 22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#dbe7fa",
            color: "#2563eb",
          }}
        >
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 9l8-4 8 4" />
            <line x1="4" y1="9" x2="20" y2="9" />
            <line x1="6.5" y1="9" x2="6.5" y2="17" />
            <line x1="12" y1="9" x2="12" y2="17" />
            <line x1="17.5" y1="9" x2="17.5" y2="17" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </div>
        <span
          style={{
            display: "inline-block",
            fontSize: "0.7rem",
            letterSpacing: "0.5px",
            fontWeight: 600,
            color: "#8a5a00",
            background: "#f7e8c8",
            borderRadius: 999,
            padding: "4px 12px",
            marginBottom: 16,
          }}
        >
          EN DESARROLLO
        </span>
        <h1 style={{ fontSize: "1.9rem", fontWeight: 700, color: "#0b1220", margin: 0 }}>
          Proveedores de capacidad
        </h1>
        <p style={{ fontSize: "1.05rem", color: "#475569", marginTop: 12, lineHeight: 1.6 }}>
          Módulo en construcción. Aquí administrarás los capacity providers. Próximamente.
        </p>
        <Link
          href="/inicio"
          style={{
            display: "inline-block",
            marginTop: 28,
            border: "1px solid #cdd9ec",
            background: "#ffffff",
            color: "#2563eb",
            borderRadius: 999,
            padding: "10px 22px",
            fontSize: "0.9rem",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}
