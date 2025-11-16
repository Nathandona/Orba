import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"

export default function FAQPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="h-6 w-6 text-primary" />
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">FAQ</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Questions fréquentes</CardTitle>
          <CardDescription>Réponses rapides aux demandes les plus courantes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium">Comment créer mon premier projet ?</p>
            <p className="text-sm text-muted-foreground">Allez dans le dashboard et cliquez sur “Créer un projet”. Donnez un nom, une couleur et une description.</p>
          </div>
          <div>
            <p className="font-medium">Comment inviter mon équipe ?</p>
            <p className="text-sm text-muted-foreground">Ouvrez un projet et utilisez “Inviter des membres” pour envoyer des invitations par email.</p>
          </div>
          <div>
            <p className="font-medium">Puis-je personnaliser les colonnes du Kanban ?</p>
            <p className="text-sm text-muted-foreground">Oui. Ajoutez, renommez et réorganisez par glisser-déposer.</p>
          </div>
          <div>
            <p className="font-medium">L’application est-elle sécurisée ?</p>
            <p className="text-sm text-muted-foreground">Authentification sécurisée, sessions protégées, bonnes pratiques de sécurité.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}