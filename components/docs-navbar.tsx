'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Home, Github } from "lucide-react";
import { usePathname } from "next/navigation";

export function DocsNavbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/docs" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl">Orba Docs</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/docs/getting-started"
            className={`text-sm font-medium transition-colors hover:text-foreground ${
              pathname?.includes("getting-started") ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Getting Started
          </Link>
          <Link
            href="/docs/user-guide"
            className={`text-sm font-medium transition-colors hover:text-foreground ${
              pathname?.includes("user-guide") ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            User Guide
          </Link>
          <Link
            href="/docs/api"
            className={`text-sm font-medium transition-colors hover:text-foreground ${
              pathname?.includes("api") ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            API Reference
          </Link>
          <Link
            href="/docs/tips"
            className={`text-sm font-medium transition-colors hover:text-foreground ${
              pathname?.includes("tips") ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Tips & Tricks
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="https://orba.work" target="_blank" rel="noopener noreferrer">
              <Home className="h-4 w-4 mr-2" />
              Back to App
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}