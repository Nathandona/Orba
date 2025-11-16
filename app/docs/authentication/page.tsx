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
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Authentication</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account & Access</CardTitle>
          <CardDescription>Sign up, sign in, and password recovery.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <p className="font-medium">Sign up</p>
              <p className="text-sm text-muted-foreground">Create your account with email/password or an OAuth provider.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Sign in</p>
              <p className="text-sm text-muted-foreground">Access your secure workspace to manage projects and tasks.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Forgot password</p>
              <p className="text-sm text-muted-foreground">Receive a reset link by email to set a new password.</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <Button asChild>
              <Link href="/register">Create an account</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Check your spam folder if you don’t receive the email.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}