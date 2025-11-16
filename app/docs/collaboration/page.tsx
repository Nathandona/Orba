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
          <CardTitle>Teamwork</CardTitle>
          <CardDescription>Invite members, define roles, and collaborate in real time.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <p className="font-medium">Invitations</p>
              <p className="text-sm text-muted-foreground">Invite by email from a project. Guests receive a link to join.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Roles</p>
              <p className="text-sm text-muted-foreground">Owner, Admin, Member. Permissions aligned with responsibilities.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Activity</p>
              <p className="text-sm text-muted-foreground">Track changes, comments, and attachments on tasks.</p>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Invitation email</p>
                <p className="text-sm text-muted-foreground">Includes project name, sender, and a button to create or sign in.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Permissions</p>
                <p className="text-sm text-muted-foreground">Role-based access controls for create, edit, and comment.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}