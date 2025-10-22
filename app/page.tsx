'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Layers,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { Suspense, lazy, useMemo } from "react";
import { CTASection } from "@/components/cta-section";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ErrorBoundaryWrapper } from "@/components/error-boundary";

// Optimized dynamic imports with chunk splitting
const FloatingCards3D = lazy(() => import("@/components/floating-cards-3d"));

// Memoized loading component to prevent unnecessary re-renders
const LoadingFallback = () => (
  <div className="w-full h-[400px] bg-muted/50 rounded-2xl animate-pulse" />
);

// Memoized feature data to prevent recreation on every render
const features = [
  {
    icon: Layers,
    title: "Kanban Boards",
    description: "Visual task management with drag-and-drop simplicity",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together seamlessly with real-time updates",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built with Next.js for optimal performance",
  }
];

export default function Home() {
  const { data: session } = useSession();

  // Memoize CTA button content to prevent unnecessary re-renders
  const ctaButtonContent = useMemo(() => ({
    href: session ? "/dashboard" : "/register",
    text: session ? "Dashboard" : "Get Started Free"
  }), [session]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 w-full h-full">
          <ErrorBoundaryWrapper>
            <Suspense fallback={<LoadingFallback />}>
              <FloatingCards3D />
            </Suspense>
          </ErrorBoundaryWrapper>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="text-foreground">
                Organize Tasks
              </span>
              <br />
              <span className="text-primary">
                Amplify Results
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              Streamline your workflow with Orba's intuitive Kanban boards.
              Built for teams that value simplicity, speed, and collaboration.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="text-lg h-14 px-8 shadow-lg hover:shadow-xl transition-shadow"
                asChild
              >
                <Link href={ctaButtonContent.href}>
                  {ctaButtonContent.text}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Smooth Transition from Hero to Features */}
      <div className="relative h-48 bg-gradient-to-b from-transparent via-background to-muted/40 overflow-hidden"></div>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/40 to-muted/60 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help your team work smarter, not harder
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 group hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:bg-primary/20">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    {/* Smooth Transition from Features to CTA */}
      <div className="relative h-36 bg-gradient-to-b from-muted/60 via-muted/30 to-background overflow-hidden"></div>

      {/* CTA Section */}
      <CTASection
        badge=""
        title="Ready to"
        titleHighlight="Transform Your Workflow?"
        description="Join thousands of teams boosting their productivity with Orba. Start your free trial today and experience the difference!"
        primaryButtonText="Start Free Trial"
        secondaryButtonText="Schedule Demo"
        showBackground3D={true}
      />

      {/* Smooth Transition from CTA to Footer */}
      <div className="relative h-20 bg-gradient-to-b from-background/95 via-background/90 to-muted/10 overflow-hidden"></div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
