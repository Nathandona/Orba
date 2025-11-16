import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Lock, Mail } from "lucide-react"

export default function AuthenticationPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <Lock className="h-6 w-6 text-primary" />
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Authentification</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compte et accès</CardTitle>
          <CardDescription>Inscription, connexion et récupération du mot de passe.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <p className="font-medium">Inscription</p>
              <p className="text-sm text-muted-foreground">Créez votre compte avec email/mot de passe ou via un fournisseur OAuth.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Connexion</p>
              <p className="text-sm text-muted-foreground">Accédez à votre espace sécurisé pour gérer projets et tâches.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Mot de passe oublié</p>
              <p className="text-sm text-muted-foreground">Recevez un lien de réinitialisation par email pour définir un nouveau mot de passe.</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <Button asChild>
              <Link href="/register">Créer un compte</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/login">Se connecter</Link>
            </Button>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Assurez-vous de vérifier vos spams si vous ne recevez pas l’email.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}