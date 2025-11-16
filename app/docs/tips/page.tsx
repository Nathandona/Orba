import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Lightbulb, Timer, LayoutGrid } from "lucide-react"

export default function TipsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="h-6 w-6 text-primary" />
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Tips & Tricks</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Boostez votre productivité</CardTitle>
          <CardDescription>Conseils pratiques pour gérer vos projets efficacement.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <p className="font-medium">Templates de colonnes</p>
              <p className="text-sm text-muted-foreground">Standardisez vos colonnes pour harmoniser l’équipe.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Timeboxing</p>
              <p className="text-sm text-muted-foreground">Fixez des durées pour éviter la dérive des tâches.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Labels parlants</p>
              <p className="text-sm text-muted-foreground">Utilisez des tags cohérents pour filtrer rapidement.</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <Button asChild>
              <Link href="/docs/getting-started">Getting Started</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/projects">Projects</Link>
            </Button>
            <Button variant="ghost" asChild>
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