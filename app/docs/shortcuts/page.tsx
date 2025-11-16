import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Keyboard } from "lucide-react"

export default function ShortcutsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <Keyboard className="h-6 w-6 text-primary" />
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Shortcuts</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Useful keyboard commands</CardTitle>
          <CardDescription>Speed up your actions in Orba with these shortcuts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="font-medium">Navigation</p>
              <p className="text-sm text-muted-foreground">`g d`: Go to dashboard, `g p`: Go to projects</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Kanban</p>
              <p className="text-sm text-muted-foreground">`n`: New task, `e`: Edit task, `del`: Delete</p>
            </div>
          </div>

          <Separator />

          <p className="text-sm text-muted-foreground">Shortcuts may vary depending on the browser and configuration.</p>
        </CardContent>
      </Card>
    </div>
  )
}