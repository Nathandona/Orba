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
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Subscriptions</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Plans & Billing</CardTitle>
          <CardDescription>Choose a plan that fits and manage your subscription.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <p className="font-medium">Free</p>
              <p className="text-sm text-muted-foreground">Essential features to get started.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Premium</p>
              <p className="text-sm text-muted-foreground">Advanced templates, extended collaboration, detailed analytics.</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Security</p>
              <p className="text-sm text-muted-foreground">Secure payments, customer portal management, synchronization.</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <Button asChild>
              <Link href="/pricing">
                View plans
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">
                Manage my subscription
              </Link>
            </Button>
          </div>

          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Reliable, secure billing aligned with best practices.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}