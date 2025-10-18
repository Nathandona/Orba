'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  Layers,
  Users,
  Zap,
  Lock,
  BarChart3,
  Workflow,
  Globe,
  Sparkles,
  Clock,
  Target,
  CheckCircle2,
  MessageSquare,
  Bell,
  Shuffle
} from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CTASection } from "@/components/cta-section";

const mainFeatures = [
  {
    icon: Layers,
    title: "Intuitive Kanban Boards",
    description: "Visualize your workflow with drag-and-drop simplicity. Create unlimited boards and customize columns to match your process.",
    color: "from-blue-500 to-cyan-500",
    benefits: [
      "Unlimited boards & columns",
      "Drag & drop interface",
      "Custom workflows",
      "Card templates"
    ]
  },
  {
    icon: Users,
    title: "Real-Time Collaboration",
    description: "Work together seamlessly with your team. See updates instantly, comment on tasks, and stay in sync across all devices.",
    color: "from-purple-500 to-pink-500",
    benefits: [
      "Live updates",
      "Team mentions",
      "Activity feed",
      "Role-based access"
    ]
  },
  {
    icon: Zap,
    title: "Lightning Performance",
    description: "Built with Next.js and optimized for speed. Experience instant loading and smooth interactions, even with thousands of tasks.",
    color: "from-orange-500 to-red-500",
    benefits: [
      "Sub-100ms response",
      "Offline mode",
      "Smart caching",
      "Edge deployment"
    ]
  }
];

const powerFeatures = [
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Track team performance with detailed insights and visualizations"
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-level encryption, SSO, and compliance certifications"
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Stay updated with customizable alerts and digests"
  }
];

const workflow = [
  {
    step: "01",
    title: "Create",
    description: "Start with a template or build from scratch",
    icon: Target
  },
  {
    step: "02",
    title: "Organize",
    description: "Structure your work with boards and cards",
    icon: Shuffle
  },
  {
    step: "03",
    title: "Collaborate",
    description: "Invite team members and work together",
    icon: Users
  },
  {
    step: "04",
    title: "Track",
    description: "Monitor progress and measure success",
    icon: CheckCircle2
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Navbar />

      {/* Hero Section - Clean & Minimal */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              Features that work
              <br />
              <span className="text-muted-foreground">for your team</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Simple, powerful tools designed to help your team stay organized and get more done.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="text-lg h-12 px-8">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg h-12 px-8">
                View Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Features - Clean Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t">
                    {feature.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Power Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
              Even more powerful features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced capabilities designed for modern teams
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {powerFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 group cursor-pointer">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-background pointer-events-none" />
        
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
              How it works
            </h2>
            <p className="text-xl text-muted-foreground">
              Get started in minutes with our simple workflow
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-0 left-1/2 h-full w-0.5 bg-gradient-to-b from-primary/50 via-primary to-primary/50 hidden lg:block" />

            <div className="space-y-16">
              {workflow.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className="flex-1">
                    <Card className={`p-8 border-2 hover:border-primary/50 transition-all duration-300 ${
                      index % 2 === 1 ? 'lg:text-right' : ''
                    }`}>
                      <div className={`inline-flex items-center gap-3 mb-4 ${
                        index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                      }`}>
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-4xl font-bold text-primary/20">
                          {step.step}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </Card>
                  </div>

                  {/* Center dot */}
                  <div className="hidden lg:block">
                    <motion.div
                      className="w-6 h-6 rounded-full bg-primary border-4 border-background"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    />
                  </div>

                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection 
        title="Ready to supercharge"
        titleHighlight="your productivity?"
        description="Join thousands of teams already using Orba to work smarter and achieve more."
        badge="Start your journey today"
        primaryButtonText="Try Orba Free"
        secondaryButtonText="See All Features"
        showBackground3D={true}
      />

      <Footer />
    </div>
  );
}
