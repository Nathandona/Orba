import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FileText, LayoutGrid, Users, Keyboard } from "lucide-react"

export default function UserGuidePage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="h-6 w-6 text-primary" />
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">User Guide</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting the most out of Orba</CardTitle>
          <CardDescription>Learn to create projects, manage tasks, and collaborate effectively.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <p className="font-medium">Projects</p>
              <p className="text-sm text-muted-foreground">Create a project, configure columns, and invite members.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Tasks</p>
              <p className="text-sm text-muted-foreground">Add tasks, assign owners, and track progress.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Collaboration</p>
              <p className="text-sm text-muted-foreground">Work as a team with comments, attachments, and activity.</p>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <LayoutGrid className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Kanban board</p>
                <p className="text-sm text-muted-foreground">Move tasks between columns to visualize progress.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Keyboard className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Helpful shortcuts</p>
                <p className="text-sm text-muted-foreground">Speed up with navigation and editing shortcuts.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild>
              <Link href="/docs/projects">Go to Projects</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/collaboration">See Collaboration</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}