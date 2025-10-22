'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Suspense, lazy, useMemo } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ContactSalesDialog } from "@/components/contact-sales-dialog";
import { ErrorBoundaryWrapper } from "@/components/error-boundary";

// Lazy load the 3D component
const FloatingCards3DStatic = lazy(() => import("@/components/floating-cards-3d-static"));

// Optimized loading fallback
const Fallback3D = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 animate-pulse" />
);

interface CTASectionProps {
  badge?: string;
  title: string;
  titleHighlight: string;
  description: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  showBackground3D?: boolean;
}

export function CTASection({
  badge = "Join 10,000+ teams worldwide",
  title,
  titleHighlight,
  description,
  primaryButtonText = "Start Free Trial",
  secondaryButtonText = "Schedule Demo",
  showBackground3D = true
}: CTASectionProps) {
  const { data: session } = useSession();

  // Memoize CTA button content
  const ctaContent = useMemo(() => ({
    href: session ? "/dashboard" : "/register",
    text: session ? "Dashboard" : primaryButtonText
  }), [session, primaryButtonText]);

  return (
    <section className="pt-40 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Gradient fade from previous section */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background via-background/50 to-transparent pointer-events-none z-10" />
      
      {/* 3D Cards Background */}
      {showBackground3D && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.15, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <ErrorBoundaryWrapper>
            <Suspense fallback={<Fallback3D />}>
              <FloatingCards3DStatic />
            </Suspense>
          </ErrorBoundaryWrapper>
        </motion.div>
      )}
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/70 to-background/80 backdrop-blur-sm pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          {badge && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-foreground">{badge}</span>
            </div>
          )}

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            {title}
            <br />
            <span className="text-primary">{titleHighlight}</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              size="lg"
              className="text-lg h-14 px-10 shadow-lg hover:shadow-xl transition-all group hover:scale-105"
              asChild
            >
              <Link href={ctaContent.href}>
                {ctaContent.text}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <ContactSalesDialog
              trigger={
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg h-14 px-10 border-2 backdrop-blur-md"
                >
                  {secondaryButtonText}
                </Button>
              }
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
