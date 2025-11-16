import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { LayoutGrid, Users, Settings, ArrowRight } from "lucide-react"

export default function ProjectsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <LayoutGrid className="h-6 w-6 text-primary" />
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Projects</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gérer vos projets</CardTitle>
          <CardDescription>Créez, modifiez et collaborez efficacement sur vos projets.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <p className="font-medium">Création</p>
              <p className="text-sm text-muted-foreground">Créez un nouveau projet avec un nom, une description et une couleur.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Collaboration</p>
              <p className="text-sm text-muted-foreground">Invitez des membres, gérez les rôles et suivez l’activité.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Paramètres</p>
              <p className="text-sm text-muted-foreground">Ajustez les préférences du projet et configurez les colonnes.</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <Button asChild>
              <Link href="/dashboard">
                Voir mes projets
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">
                Inviter des membres
                <Users className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/docs/getting-started">
                Getting Started
                <Settings className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}