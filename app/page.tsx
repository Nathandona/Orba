import { SiteNav } from "@/components/landing/site-nav";
import { Hero } from "@/components/landing/hero";
import { WeekBand } from "@/components/landing/week-band";
import { FeaturesBento } from "@/components/landing/features-bento";
import { PricingSection } from "@/components/landing/pricing-section";
import { ClosingCta } from "@/components/landing/closing-cta";
import { SiteFooter } from "@/components/landing/site-footer";

/* Static landing page. Only the week band hydrates (tabs and card motion);
   everything else is server-rendered HTML. */
export default function Home() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <WeekBand />
        <FeaturesBento />
        <PricingSection />
        <ClosingCta />
      </main>
      <SiteFooter />
    </div>
  );
}
