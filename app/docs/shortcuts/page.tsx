import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Keyboard } from "lucide-react"

export default function ShortcutsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <Keyboard className="h-6 w-6 text-primary" />
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Raccourcis</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Commandes clavier utiles</CardTitle>
          <CardDescription>Accélérez vos actions dans Orba avec ces raccourcis.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="font-medium">Navigation</p>
              <p className="text-sm text-muted-foreground">`g d`: Aller au dashboard, `g p`: Aller aux projets</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Kanban</p>
              <p className="text-sm text-muted-foreground">`n`: Nouvelle tâche, `e`: Éditer la tâche, `del`: Supprimer</p>
            </div>
          </div>

          <Separator />

          <p className="text-sm text-muted-foreground">Les raccourcis peuvent varier selon le navigateur et la configuration.</p>
        </CardContent>
      </Card>
    </div>
  )
}