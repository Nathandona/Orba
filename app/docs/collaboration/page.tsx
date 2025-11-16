import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Users, Mail, Shield } from "lucide-react"

export default function CollaborationPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <Users className="h-6 w-6 text-primary" />
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Collaboration</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Travail en équipe</CardTitle>
          <CardDescription>Invitez des membres, définissez des rôles et collaborez en temps réel.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <p className="font-medium">Invitations</p>
              <p className="text-sm text-muted-foreground">Invitez par email depuis un projet. Les invités reçoivent un lien pour rejoindre.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Rôles</p>
              <p className="text-sm text-muted-foreground">Propriétaire, Administrateur, Membre. Droits adaptés selon les responsabilités.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Activité</p>
              <p className="text-sm text-muted-foreground">Suivez les changements, commentaires et pièces jointes sur les tâches.</p>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Email d’invitation</p>
                <p className="text-sm text-muted-foreground">Contient le nom du projet, l’expéditeur et un bouton pour créer ou connecter un compte.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Permissions</p>
                <p className="text-sm text-muted-foreground">Contrôles d’accès basés sur le rôle pour créer, modifier et commenter.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}