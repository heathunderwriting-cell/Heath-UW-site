import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ChipBackground } from "@/components/ChipBackground";
import "@/styles/workbench-product.css";

export const dynamic = "force-dynamic";

export default async function SuscripcionLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      redirect("/iniciar-sesion?redirect=/suscripcion");
    }
  }
  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#eaf1fb" }}>
      <ChipBackground opacity={0.55} tone="light" />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
