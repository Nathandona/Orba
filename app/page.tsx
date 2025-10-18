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
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Images from "next/image";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { CTASection } from "@/components/cta-section";

// Dynamically import 3D component to avoid SSR issues
const FloatingCards3D = dynamic(() => import("@/components/floating-cards-3d"), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-muted/50 rounded-2xl animate-pulse" />
});

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-background/70 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <Images
                  src="/logo-dark.svg"
                  alt="Orba Logo"
                  width={24}
                  height={24}
                  className="text-primary-foreground"
                />
              </div>
              <span className="text-2xl font-bold text-primary">
                Orba
              </span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <Button variant="ghost" className="hidden sm:inline-flex">
                Features
              </Button>
              <Button variant="ghost" className="hidden sm:inline-flex">
                Pricing
              </Button>
              <ModeToggle />
              <Button variant="outline">Sign In</Button>
              <Button>
                Get Started
              </Button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
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
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Streamline your workflow with Orba's intuitive Kanban boards. 
                Built for teams that value simplicity, speed, and collaboration.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="text-lg h-14 px-8 shadow-lg"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg h-14 px-8 border-2"
                >
                  Watch Demo
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <Suspense fallback={<div className="w-full h-[400px] bg-muted/50 rounded-2xl animate-pulse" />}>
                <FloatingCards3D />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
            {[
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
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 group">
                  <div className={`w-12 h-12 rounded-lg bg-foreground flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        badge="Limited Time Offer"
        title="Ready to"
        titleHighlight="Transform Your Workflow?"
        description="Join thousands of teams boosting their productivity with Orba. Start your free trial today and experience the difference!"
        primaryButtonText="Start Free Trial"
        secondaryButtonText="Schedule Demo"
        showBackground3D={true}
      />

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <Images
                  src="/logo-dark.svg"
                  alt="Orba Logo"
                  width={24}
                  height={24}
                  className="text-primary-foreground"
                />
              </div>
              <span className="text-xl font-bold text-primary">
                Orba
              </span>
            </div>
            <p className="text-muted-foreground">
              © 2025 Orba. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
