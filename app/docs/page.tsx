import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BookOpen, LayoutGrid, Users, Lock, CreditCard, Lightbulb, Keyboard, HelpCircle, Wrench } from "lucide-react"

export default function DocsOverviewPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="h-6 w-6 text-primary" />
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Documentation Orba</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bienvenue</CardTitle>
          <CardDescription>Explorez les guides pour démarrer, collaborer et optimiser votre flux de travail.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/docs/getting-started" className="block">
              <div className="border rounded-md p-4 hover:bg-muted transition">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="font-medium">Getting Started</span>
                </div>
                <p className="text-sm text-muted-foreground">Créer un compte, premier projet, colonnes, tâches.</p>
              </div>
            </Link>
            <Link href="/docs/user-guide" className="block">
              <div className="border rounded-md p-4 hover:bg-muted transition">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="font-medium">Guide Utilisateur</span>
                </div>
                <p className="text-sm text-muted-foreground">Prise en main avancée des fonctionnalités.</p>
              </div>
            </Link>
            <Link href="/docs/projects" className="block">
              <div className="border rounded-md p-4 hover:bg-muted transition">
                <div className="flex items-center gap-2 mb-2">
                  <LayoutGrid className="h-4 w-4 text-primary" />
                  <span className="font-medium">Projects</span>
                </div>
                <p className="text-sm text-muted-foreground">Créer, configurer et gérer vos projets.</p>
              </div>
            </Link>
            <Link href="/docs/collaboration" className="block">
              <div className="border rounded-md p-4 hover:bg-muted transition">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="font-medium">Collaboration</span>
                </div>
                <p className="text-sm text-muted-foreground">Invitations, rôles et travail en équipe.</p>
              </div>
            </Link>
            <Link href="/docs/authentication" className="block">
              <div className="border rounded-md p-4 hover:bg-muted transition">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-4 w-4 text-primary" />
                  <span className="font-medium">Authentification</span>
                </div>
                <p className="text-sm text-muted-foreground">Inscription, connexion, récupération de mot de passe.</p>
              </div>
            </Link>
            <Link href="/docs/subscription" className="block">
              <div className="border rounded-md p-4 hover:bg-muted transition">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="h-4 w-4 text-primary" />
                  <span className="font-medium">Abonnements</span>
                </div>
                <p className="text-sm text-muted-foreground">Plans, facturation et gestion de l’abonnement.</p>
              </div>
            </Link>
            <Link href="/docs/tips" className="block">
              <div className="border rounded-md p-4 hover:bg-muted transition">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <span className="font-medium">Tips & Tricks</span>
                </div>
                <p className="text-sm text-muted-foreground">Conseils pratiques pour gagner en efficacité.</p>
              </div>
            </Link>
            <Link href="/docs/shortcuts" className="block">
              <div className="border rounded-md p-4 hover:bg-muted transition">
                <div className="flex items-center gap-2 mb-2">
                  <Keyboard className="h-4 w-4 text-primary" />
                  <span className="font-medium">Raccourcis</span>
                </div>
                <p className="text-sm text-muted-foreground">Commandes clavier pour accélérer les actions.</p>
              </div>
            </Link>
            <Link href="/docs/faq" className="block">
              <div className="border rounded-md p-4 hover:bg-muted transition">
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  <span className="font-medium">FAQ</span>
                </div>
                <p className="text-sm text-muted-foreground">Réponses aux questions les plus fréquentes.</p>
              </div>
            </Link>
            <Link href="/docs/troubleshooting" className="block">
              <div className="border rounded-md p-4 hover:bg-muted transition">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="h-4 w-4 text-primary" />
                  <span className="font-medium">Dépannage</span>
                </div>
                <p className="text-sm text-muted-foreground">Solutions aux problèmes courants.</p>
              </div>
            </Link>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <Button asChild>
              <Link href="/docs/getting-started">Commencer</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Aller au dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}