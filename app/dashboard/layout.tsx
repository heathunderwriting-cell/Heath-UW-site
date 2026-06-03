import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ChipBackground } from "@/components/ChipBackground";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      redirect("/iniciar-sesion?redirect=/dashboard");
    }
  }
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Subtle chip+H wallpaper behind the (light) dashboard content */}
      <ChipBackground opacity={0.4} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
