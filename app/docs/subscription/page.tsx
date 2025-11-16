import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Star, Shield } from "lucide-react"

export default function SubscriptionPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="h-6 w-6 text-primary" />
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Abonnements</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Plans et facturation</CardTitle>
          <CardDescription>Choisissez un plan adapté et gérez votre abonnement.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <p className="font-medium">Gratuit</p>
              <p className="text-sm text-muted-foreground">Fonctionnalités essentielles pour démarrer.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Premium</p>
              <p className="text-sm text-muted-foreground">Templates avancés, collaboration étendue, statistiques détaillées.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Sécurité</p>
              <p className="text-sm text-muted-foreground">Paiements sécurisés, gestion via portail client, synchronisation.</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <Button asChild>
              <Link href="/pricing">
                Voir les plans
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">
                Gérer mon abonnement
              </Link>
            </Button>
          </div>

          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Facturation sécurisée et fiable avec conformité aux meilleures pratiques.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}