"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useI18n } from "@/components/providers/LanguageProvider";
import { ChipBackground } from "@/components/ChipBackground";
import { LoginForm } from "@/components/auth/LoginForm";

const NAVY = "#02091c";
const BLUE = "#4a9eff";

export default function IniciarSesionPage() {
  const { dict, t } = useI18n();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: NAVY,
        color: "#f0f4ff",
        fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
        position: "relative",
      }}
    >
      <ChipBackground />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 64px",
        }}
      >
        <Suspense
          fallback={
            <div style={{ color: "rgba(240,244,255,0.6)" }}>{t("common.loading")}</div>
          }
        >
          <LoginForm />
        </Suspense>
        <Link
          href="/"
          style={{ marginTop: 28, color: BLUE, fontSize: "0.85rem", textDecoration: "none" }}
        >
          {dict.marketingLayout.backHome}
        </Link>
      </div>
    </main>
  );
}
