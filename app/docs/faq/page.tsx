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
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Quick answers to the most common requests.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium">How do I create my first project?</p>
            <p className="text-sm text-muted-foreground">Go to the dashboard and click “Create project”. Give it a name, color, and description.</p>
          </div>
          <div>
            <p className="font-medium">How do I invite my team?</p>
            <p className="text-sm text-muted-foreground">Open a project and use “Invite members” to send email invitations.</p>
          </div>
          <div>
            <p className="font-medium">Can I customize Kanban columns?</p>
            <p className="text-sm text-muted-foreground">Yes. Add, rename, and reorder via drag-and-drop.</p>
          </div>
          <div>
            <p className="font-medium">Is the app secure?</p>
            <p className="text-sm text-muted-foreground">Secure authentication, protected sessions, and security best practices.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}