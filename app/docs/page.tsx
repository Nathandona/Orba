import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Code, Users, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DocsHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-foreground">
                Orba
              </span>
              <br />
              <span className="text-primary">
                Documentation
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              Everything you need to know about Orba's task management platform.
              Learn how to use our Kanban boards, collaborate with your team, and amplify your results.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/docs/getting-started">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/docs/api">
                  API Reference
                </Link>
              </Button>
            </div>
          </div>

          {/* Documentation Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Getting Started",
                description: "Learn the basics of Orba and get up and running quickly",
                link: "/docs/getting-started"
              },
              {
                icon: Users,
                title: "User Guide",
                description: "Comprehensive guide to using Orba's features",
                link: "/docs/user-guide"
              },
              {
                icon: Code,
                title: "API Reference",
                description: "Technical documentation for developers",
                link: "/docs/api"
              },
              {
                icon: Zap,
                title: "Quick Tips",
                description: "Short guides and best practices",
                link: "/docs/tips"
              }
            ].map((category, index) => (
              <Card key={category.title} className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 group cursor-pointer">
                <Link href={category.link} className="block">
                  <div className="w-12 h-12 rounded-lg bg-foreground flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <category.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-card-foreground">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}