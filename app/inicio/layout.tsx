import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { CinematicBackground } from "@/components/marketing/Cinematic";

export const dynamic = "force-dynamic";

export default async function InicioLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      redirect("/iniciar-sesion?redirect=/inicio");
    }
  }
  return (
    <div className="relative min-h-screen text-[#f0f4ff]" style={{ background: "#102448" }}>
      <CinematicBackground />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
