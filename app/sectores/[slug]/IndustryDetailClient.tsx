"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/blocks";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { useI18n } from "@/components/providers/LanguageProvider";
import { CinematicBackground } from "@/components/marketing/Cinematic";
import { ROUTES } from "@/lib/routes/marketing";

type IndustryDetailClientProps = {
  slug: string;
};

export function IndustryDetailClient({ slug }: IndustryDetailClientProps) {
  const { dict } = useI18n();
  const industry = dict.pages.sectores.industries.find((i) => i.slug === slug);
  const copy = dict.pages.sectores.industryDetail;

  if (!industry) {
    notFound();
  }

  return (
    <main className="relative min-h-screen text-[#f0f4ff]">
      <CinematicBackground />
      <HeroSection
        kicker={copy.upcomingTitle}
        title={industry.title}
        subtitle={industry.description}
      />

      <Section className="relative z-10">
        <Container size="prose">
          <Text className="text-center">{copy.upcomingBody}</Text>
          <div className="mt-10 text-center">
            <Link
              href={ROUTES.industries.list}
              className="text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200"
            >
              {copy.backLink}
            </Link>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}
