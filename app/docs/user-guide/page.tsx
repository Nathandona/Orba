import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FileText, LayoutGrid, Users, Keyboard } from "lucide-react"

export default function UserGuidePage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="h-6 w-6 text-primary" />
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Guide Utilisateur</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Prise en main d’Orba</CardTitle>
          <CardDescription>Apprenez à créer des projets, gérer des tâches et collaborer efficacement.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <p className="font-medium">Projets</p>
              <p className="text-sm text-muted-foreground">Créez un projet, configurez les colonnes et invitez des membres.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Tâches</p>
              <p className="text-sm text-muted-foreground">Ajoutez des tâches, assignez des responsables et suivez leur avancement.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Collaboration</p>
              <p className="text-sm text-muted-foreground">Travaillez en équipe avec commentaires, pièces jointes et activité.</p>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <LayoutGrid className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Tableau Kanban</p>
                <p className="text-sm text-muted-foreground">Déplacez les tâches entre colonnes pour visualiser la progression.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Keyboard className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Raccourcis utiles</p>
                <p className="text-sm text-muted-foreground">Accélérez vos actions avec des raccourcis de navigation et d’édition.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild>
              <Link href="/docs/projects">Aller aux projets</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/collaboration">Voir la collaboration</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}