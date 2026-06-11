"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useI18n } from "@/components/providers/LanguageProvider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { createMockSession } from "@/lib/mockAuth";

function deriveCompanyFromEmail(email: string) {
  const domain = email.split("@")[1] ?? "empresa";
  return domain
    .replaceAll(".", " ")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

const inputClass =
  "w-full rounded-lg border border-white/10 bg-[#0a1733]/70 px-4 py-3 text-[15px] text-white placeholder:text-white/25 outline-none backdrop-blur-sm transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/25";

const labelClass = "mb-2 block text-[12px] font-semibold uppercase tracking-[0.12em] text-white/40";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = useMemo(() => {
    const param = searchParams.get("redirect");
    return param && param.startsWith("/") ? param : "/inicio";
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
      className="relative w-full max-w-[440px] overflow-hidden rounded-2xl border border-white/10 bg-[#0e2147]/85 p-9 shadow-[0_24px_80px_rgba(2,6,18,0.7)] backdrop-blur-xl md:p-10"
    >
      {/* top gradient accent */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-cyan-400 via-[#1a70f7] to-transparent" />
      {/* corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.14), transparent 70%)" }}
      />

      <div className="relative mb-8 text-center">
        <h1 className="text-[26px] font-extrabold tracking-tight text-white">{dict.forms.login.title}</h1>
        <p className="mt-2.5 text-[14px] leading-relaxed text-white/50">{dict.forms.login.subtitle}</p>
      </div>

      <div className="relative flex flex-col gap-5">
        <div>
          <label htmlFor="email" className={labelClass}>
            {dict.forms.login.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder={dict.forms.login.emailPlaceholder}
          />
        </div>

        <div>
          <label htmlFor="password" className={labelClass}>
            {dict.forms.login.password}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            placeholder={dict.forms.login.passwordPlaceholder}
          />
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-400/40 bg-red-400/[0.07] px-4 py-2.5 text-[13px] text-red-300"
          >
            {error}
          </div>
        )}
      </div>

      <div className="relative mt-7 flex flex-col gap-4">
        <button
          type="submit"
          disabled={loading}
          className={`group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-[#1a70f7] to-[#2b8af9] px-8 py-3.5 text-[15px] font-bold text-white shadow-[0_8px_32px_rgba(26,112,247,0.45)] transition-all duration-300 ${
            loading ? "opacity-70" : "hover:-translate-y-0.5 hover:shadow-[0_12px_44px_rgba(26,112,247,0.65)]"
          }`}
        >
          <span className="home-sheen absolute inset-0" aria-hidden />
          <span className="relative">{loading ? dict.forms.login.submitting : dict.forms.login.submit}</span>
        </button>
        <div className="text-center text-[12px] text-white/35">{dict.forms.login.hint}</div>
      </div>
    </form>
  );
}
