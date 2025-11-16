import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Wrench, AlertCircle } from "lucide-react"

export default function TroubleshootingPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <Wrench className="h-6 w-6 text-primary" />
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dépannage</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Problèmes courants</CardTitle>
          <CardDescription>Solutions rapides pour résoudre les soucis fréquents.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Je ne reçois pas l’email d’invitation</p>
              <p className="text-sm text-muted-foreground">Vérifiez vos spams. Assurez-vous que l’adresse email est correcte. Réessayez l’envoi.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Impossible de déplacer une carte</p>
              <p className="text-sm text-muted-foreground">Rechargez la page. Vérifiez que vous êtes membre du projet. Essayez un autre navigateur.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Performance lente</p>
              <p className="text-sm text-muted-foreground">Fermez les onglets lourds, vérifiez la connexion, videz le cache, puis réessayez.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}