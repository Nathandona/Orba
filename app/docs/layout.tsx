import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DocsSidebar } from "@/components/docs-sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, LayoutGrid, FileText, Lightbulb, Users, Lock, CreditCard, Keyboard, HelpCircle, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Orba Documentation",
  description:
    "Documentation complète de la plateforme de gestion de tâches Orba. Apprenez à utiliser les tableaux Kanban, collaborez avec votre équipe et amplifiez vos résultats.",
  metadataBase: new URL("https://docs.orba.work"),
  alternates: {
    canonical: "https://docs.orba.work",
  },
  openGraph: {
    title: "Orba Documentation",
    description: "Complete documentation for Orba's task management platform",
    url: "https://docs.orba.work",
    siteName: "Orba Documentation",
  },
};

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-dvh bg-background">

      <div className="grid h-full grid-cols-1 md:grid-cols-[240px_1fr]">
          <DocsSidebar>
            <div className="space-y-1">
              <div className="px-2 text-xs font-medium text-muted-foreground">Introduction</div>
              <Button variant="ghost" className="w-full justify-start h-9 text-sm" asChild>
                <Link href="/docs">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Overview
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-9 text-sm" asChild>
                <Link href="/docs/getting-started">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Getting Started
                </Link>
              </Button>
              <div className="px-2 mt-3 text-xs font-medium text-muted-foreground">Guides</div>
              <Button variant="ghost" className="w-full justify-start h-9 text-sm" asChild>
                <Link href="/docs/user-guide">
                  <FileText className="mr-2 h-4 w-4" />
                  User Guide
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-9 text-sm" asChild>
                <Link href="/docs/projects">
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  Projects
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-9 text-sm" asChild>
                <Link href="/docs/collaboration">
                  <Users className="mr-2 h-4 w-4" />
                  Collaboration
                </Link>
              </Button>
              <div className="px-2 mt-3 text-xs font-medium text-muted-foreground">Compte</div>
              <Button variant="ghost" className="w-full justify-start h-9 text-sm" asChild>
                <Link href="/docs/authentication">
                  <Lock className="mr-2 h-4 w-4" />
                  Authentification
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-9 text-sm" asChild>
                <Link href="/docs/subscription">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Abonnements
                </Link>
              </Button>
              <div className="px-2 mt-3 text-xs font-medium text-muted-foreground">Ressources</div>
              <Button variant="ghost" className="w-full justify-start h-9 text-sm" asChild>
                <Link href="/docs/tips">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Tips & Tricks
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-9 text-sm" asChild>
                <Link href="/docs/shortcuts">
                  <Keyboard className="mr-2 h-4 w-4" />
                  Raccourcis
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-9 text-sm" asChild>
                <Link href="/docs/faq">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  FAQ
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-9 text-sm" asChild>
                <Link href="/docs/troubleshooting">
                  <Wrench className="mr-2 h-4 w-4" />
                  Dépannage
                </Link>
              </Button>
            </div>
          </DocsSidebar>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <main className="min-w-0">{children}</main>
          </div>
      </div>
    </div>
  );
}