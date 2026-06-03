"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useI18n } from "@/components/providers/LanguageProvider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { createMockSession } from "@/lib/mockAuth";

const BLUE = "#4a9eff";
const NAVY = "#02091c";
const WHITE = "#f0f4ff";
const MUTED = "rgba(240,244,255,0.6)";
const BORDER = "rgba(74,158,255,0.3)";

function deriveCompanyFromEmail(email: string) {
  const domain = email.split("@")[1] ?? "empresa";
  return domain
    .replaceAll(".", " ")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 10,
  border: `1px solid ${BORDER}`,
  background: "rgba(255,255,255,0.04)",
  padding: "12px 14px",
  fontSize: "0.95rem",
  color: WHITE,
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: 6,
  fontSize: "0.8rem",
  fontWeight: 600,
  color: WHITE,
};

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = useMemo(() => {
    const param = searchParams.get("redirect");
    return param && param.startsWith("/") ? param : "/dashboard?view=operations";
  }, [searchParams]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { dict } = useI18n();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail.includes("@")) {
      setError(dict.forms.login.errors.email);
      return;
    }
    if (!trimmedPassword) {
      setError(dict.forms.login.errors.password);
      return;
    }

    setLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password: trimmedPassword,
      });

      if (signInError || !data.user) {
        setError(dict.forms.login.errors.invalidCredentials);
        setLoading(false);
        return;
      }

      const userEmail = data.user.email ?? trimmedEmail;
      const namePart = userEmail.split("@")[0]?.slice(0, 20) ?? "Usuario";
      const userName = namePart
        .replace(/[._-]+/g, " ")
        .replace(/\b\w/g, (m) => m.toUpperCase());
      createMockSession({
        id: data.user.id,
        email: userEmail,
        name: userName,
        company: deriveCompanyFromEmail(userEmail),
        role: "cliente",
      });

      router.replace(redirect);
      router.refresh();
    } catch {
      setError(dict.forms.login.errors.invalidCredentials);
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        width: "100%",
        maxWidth: 420,
        background: "rgba(7,18,35,0.72)",
        border: `1px solid ${BORDER}`,
        borderRadius: 18,
        padding: "40px 36px",
        boxShadow: "0 24px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(74,158,255,0.08)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <h1 style={{ fontSize: "1.9rem", fontWeight: 800, color: WHITE, margin: 0 }}>
          {dict.forms.login.title}
        </h1>
        <p style={{ marginTop: 10, color: MUTED, fontSize: "0.95rem", lineHeight: 1.6 }}>
          {dict.forms.login.subtitle}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div>
          <label htmlFor="email" style={labelStyle}>
            {dict.forms.login.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            placeholder={dict.forms.login.emailPlaceholder}
          />
        </div>

        <div>
          <label htmlFor="password" style={labelStyle}>
            {dict.forms.login.password}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            placeholder={dict.forms.login.passwordPlaceholder}
          />
        </div>

        {error && (
          <div
            role="alert"
            style={{
              borderRadius: 10,
              border: "1px solid rgba(248,113,113,0.4)",
              background: "rgba(248,113,113,0.08)",
              padding: "10px 14px",
              fontSize: "0.85rem",
              color: "#fca5a5",
            }}
          >
            {error}
          </div>
        )}
      </div>

      <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 14 }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "13px 20px",
            borderRadius: 10,
            border: "none",
            background: BLUE,
            color: NAVY,
            fontSize: "0.95rem",
            fontWeight: 700,
            letterSpacing: "0.02em",
            cursor: loading ? "default" : "pointer",
            opacity: loading ? 0.7 : 1,
            boxShadow: "0 0 18px rgba(74,158,255,0.5)",
            transition: "opacity 0.2s",
          }}
        >
          {loading ? dict.forms.login.submitting : dict.forms.login.submit}
        </button>
        <div style={{ textAlign: "center", fontSize: "0.78rem", color: MUTED }}>
          {dict.forms.login.hint}
        </div>
      </div>
    </form>
  );
}
