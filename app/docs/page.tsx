import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BookOpen, LayoutGrid, Users, Lock, CreditCard, Lightbulb, Keyboard, HelpCircle, Wrench } from "lucide-react"

export default function DocsOverviewPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="h-6 w-6 text-primary" />
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Orba Documentation</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>Explore guides to get started, collaborate, and optimize your workflow.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/docs/getting-started" className="block">
              <div className="border rounded-md p-4 hover:bg-muted transition">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="font-medium">Getting Started</span>
                </div>
                <p className="text-sm text-muted-foreground">Create an account, first project, columns, tasks.</p>
              </div>
            </Link>
            <Link href="/docs/user-guide" className="block">
              <div className="border rounded-md p-4 hover:bg-muted transition">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="font-medium">User Guide</span>
                </div>
                <p className="text-sm text-muted-foreground">Advanced walkthrough of core features.</p>
              </div>
            </Link>
            <Link href="/docs/projects" className="block">
              <div className="border rounded-md p-4 hover:bg-muted transition">
                <div className="flex items-center gap-2 mb-2">
                  <LayoutGrid className="h-4 w-4 text-primary" />
                  <span className="font-medium">Projects</span>
                </div>
                <p className="text-sm text-muted-foreground">Create, configure, and manage your projects.</p>
              </div>
            </Link>
            <Link href="/docs/collaboration" className="block">
              <div className="border rounded-md p-4 hover:bg-muted transition">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="font-medium">Collaboration</span>
                </div>
                <p className="text-sm text-muted-foreground">Invitations, roles, and teamwork.</p>
              </div>
            </Link>
            <Link href="/docs/authentication" className="block">
              <div className="border rounded-md p-4 hover:bg-muted transition">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-4 w-4 text-primary" />
                  <span className="font-medium">Authentication</span>
                </div>
                <p className="text-sm text-muted-foreground">Sign up, sign in, password recovery.</p>
              </div>
            </Link>
            <Link href="/docs/subscription" className="block">
              <div className="border rounded-md p-4 hover:bg-muted transition">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="h-4 w-4 text-primary" />
                  <span className="font-medium">Subscriptions</span>
                </div>
                <p className="text-sm text-muted-foreground">Plans, billing, and subscription management.</p>
              </div>
            </Link>
            <Link href="/docs/tips" className="block">
              <div className="border rounded-md p-4 hover:bg-muted transition">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <span className="font-medium">Tips & Tricks</span>
                </div>
                <p className="text-sm text-muted-foreground">Practical tips to boost efficiency.</p>
              </div>
            </Link>
            <Link href="/docs/shortcuts" className="block">
              <div className="border rounded-md p-4 hover:bg-muted transition">
                <div className="flex items-center gap-2 mb-2">
                  <Keyboard className="h-4 w-4 text-primary" />
                  <span className="font-medium">Shortcuts</span>
                </div>
                <p className="text-sm text-muted-foreground">Keyboard commands to speed up actions.</p>
              </div>
            </Link>
            <Link href="/docs/faq" className="block">
              <div className="border rounded-md p-4 hover:bg-muted transition">
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  <span className="font-medium">FAQ</span>
                </div>
                <p className="text-sm text-muted-foreground">Answers to common questions.</p>
              </div>
            </Link>
            <Link href="/docs/troubleshooting" className="block">
              <div className="border rounded-md p-4 hover:bg-muted transition">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="h-4 w-4 text-primary" />
                  <span className="font-medium">Troubleshooting</span>
                </div>
                <p className="text-sm text-muted-foreground">Solutions to common problems.</p>
              </div>
            </Link>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <Button asChild>
              <Link href="/docs/getting-started">Get Started</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}