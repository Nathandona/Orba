import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Wrench, AlertCircle } from "lucide-react"

export default function TroubleshootingPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <Wrench className="h-6 w-6 text-primary" />
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Troubleshooting</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Common issues</CardTitle>
          <CardDescription>Quick solutions to help resolve frequent problems.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">I’m not receiving the invitation email</p>
              <p className="text-sm text-muted-foreground">Check your spam. Ensure the email address is correct. Try sending again.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Unable to move a card</p>
              <p className="text-sm text-muted-foreground">Reload the page. Verify you’re a project member. Try another browser.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Slow performance</p>
              <p className="text-sm text-muted-foreground">Close heavy tabs, check your connection, clear cache, then retry.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}