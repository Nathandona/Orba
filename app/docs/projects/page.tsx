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
          <CardTitle>Manage your projects</CardTitle>
          <CardDescription>Create, edit, and collaborate efficiently on your projects.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <p className="font-medium">Creation</p>
              <p className="text-sm text-muted-foreground">Create a new project with a name, description, and color.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Collaboration</p>
              <p className="text-sm text-muted-foreground">Invite members, manage roles, and track activity.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Settings</p>
              <p className="text-sm text-muted-foreground">Adjust project preferences and configure columns.</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <Button asChild>
              <Link href="/dashboard">
                View my projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">
                Invite members
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