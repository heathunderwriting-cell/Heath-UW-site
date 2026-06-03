import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { UnderwritingWorkbench } from "@/components/dashboard/UnderwritingWorkbench";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Panel de Underwriting | Heath",
  description:
    "Mesa de trabajo operativa de underwriting con submissions, workflow y decisión en pantalla (mock).",
};

export default async function PanelDeSuscripcionDashboardPage() {
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      redirect("/iniciar-sesion?redirect=/panel-de-suscripcion-dashboard");
    }
  }
  return <UnderwritingWorkbench />;
}
