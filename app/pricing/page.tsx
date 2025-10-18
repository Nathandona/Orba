'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  Check,
  X,
  Zap,
  Users,
  Building2,
  ArrowRight,
  Star,
  Shield,
  Headphones
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for small teams getting started",
    price: { monthly: 0, annual: 0 },
    icon: Zap,
    features: [
      { name: "Up to 3 boards", included: true },
      { name: "5 team members", included: true },
      { name: "Basic templates", included: true },
      { name: "Email support", included: true },
      { name: "Advanced analytics", included: false },
      { name: "Custom workflows", included: false },
      { name: "Priority support", included: false },
      { name: "SSO & advanced security", included: false },
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    description: "For growing teams that need more power",
    price: { monthly: 12, annual: 10 },
    icon: Users,
    features: [
      { name: "Unlimited boards", included: true },
      { name: "Unlimited team members", included: true },
      { name: "Premium templates", included: true },
      { name: "Priority email support", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Custom workflows", included: true },
      { name: "Integrations", included: true },
      { name: "SSO & advanced security", included: false },
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Advanced features for large organizations",
    price: { monthly: null, annual: null },
    icon: Building2,
    features: [
      { name: "Everything in Pro", included: true },
      { name: "Unlimited workspaces", included: true },
      { name: "Advanced security & SSO", included: true },
      { name: "Dedicated account manager", included: true },
      { name: "24/7 phone support", included: true },
      { name: "Custom integrations", included: true },
      { name: "On-premise deployment", included: true },
      { name: "SLA guarantee", included: true },
      { name: "Training & onboarding", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const features = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level encryption and SOC 2 Type II certified"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock assistance from our expert team"
  },
  {
    icon: Star,
    title: "99.9% Uptime",
    description: "Reliable service you can count on, guaranteed"
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-muted/30 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="text-foreground">Choose the perfect plan</span>
              <br />
              <span className="text-primary">for your team</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Start free and scale as you grow. All plans include a 14-day free trial with no credit card required.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-16">
              <span className={`text-sm font-medium transition-colors ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch
                checked={billingCycle === 'annual'}
                onCheckedChange={(checked) => setBillingCycle(checked ? 'annual' : 'monthly')}
              />
              <span className={`text-sm font-medium transition-colors ${billingCycle === 'annual' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Annual
                <span className="ml-2 text-xs text-primary font-semibold">Save 20%</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`relative p-8 h-full flex flex-col ${
                  plan.popular 
                    ? 'border-2 border-primary shadow-xl shadow-primary/20 scale-105' 
                    : 'border-2 hover:border-primary/50'
                } transition-all duration-300`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                        <Star className="w-3.5 h-3.5" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <plan.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-card-foreground">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                  </div>

                  <div className="mb-8">
                    {plan.price.monthly === null ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-foreground">Custom</span>
                      </div>
                    ) : plan.price.monthly === 0 ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-foreground">Free</span>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-foreground">
                          ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual}
                        </span>
                        <span className="text-muted-foreground">
                          /user/month
                        </span>
                      </div>
                    )}
                    {billingCycle === 'annual' && plan.price.annual !== null && plan.price.annual !== 0 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Billed annually (${plan.price.annual * 12}/user/year)
                      </p>
                    )}
                  </div>

                  <Button 
                    className={`w-full mb-8 ${
                      plan.popular 
                        ? 'bg-primary hover:bg-primary/90' 
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>

                  <div className="space-y-3 flex-grow">
                    {plan.features.map((feature) => (
                      <div key={feature.name} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground/40 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${
                          feature.included ? 'text-foreground' : 'text-muted-foreground/60'
                        }`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-background pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
              Why teams choose Orba
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enterprise-grade features that scale with your business
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="p-8 text-center hover:shadow-lg transition-shadow border-2 hover:border-primary/50 h-full flex flex-col">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
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

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
              Frequently asked questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about our pricing
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {[
              {
                question: "Can I change plans at any time?",
                answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the charges accordingly."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards (Visa, Mastercard, American Express) and support payments via PayPal for annual subscriptions."
              },
              {
                question: "Is there a free trial?",
                answer: "Absolutely! All paid plans come with a 14-day free trial. No credit card required to start."
              },
              {
                question: "What happens after my trial ends?",
                answer: "If you don't upgrade to a paid plan, your account will automatically convert to our free Starter plan. No data is lost."
              },
              {
                question: "Do you offer discounts for nonprofits?",
                answer: "Yes! We offer a 50% discount for registered nonprofits and educational institutions. Contact our sales team for more information."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6 border-2 hover:border-primary/50 transition-colors">
                <h3 className="text-lg font-semibold mb-2 text-foreground">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-12 bg-primary border-0 text-primary-foreground text-center">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Still have questions?
              </h2>
              <p className="text-xl mb-8 text-primary-foreground/90">
                Our team is here to help you find the perfect plan
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="text-lg h-14 px-8"
                >
                  Contact Sales
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg h-14 px-8 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Schedule a Demo
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
