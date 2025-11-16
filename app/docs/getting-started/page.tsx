import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Rocket, CheckCircle2, ArrowRight } from "lucide-react"

export default function GettingStartedPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <Rocket className="h-6 w-6 text-primary" />
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Getting Started</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bienvenue sur Orba</CardTitle>
          <CardDescription>Démarrez rapidement avec les fondamentaux d’Orba.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Créer un compte</p>
                <p className="text-sm text-muted-foreground">Inscrivez-vous et accédez à votre tableau de bord.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Créer un projet</p>
                <p className="text-sm text-muted-foreground">Initialisez votre premier projet pour organiser vos tâches.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Configurer le Kanban</p>
                <p className="text-sm text-muted-foreground">Ajoutez des colonnes et personnalisez votre flux.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Collaborer avec l’équipe</p>
                <p className="text-sm text-muted-foreground">Invitez des membres et assignez des tâches.</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <Button asChild>
              <Link href="/register">
                Créer un compte
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">
                Aller au dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}