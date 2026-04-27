"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ArrowRight, BookOpen, LayoutDashboard, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "https://docs.orba.work", label: "Docs", external: true },
];

export function Navbar() {
  const { theme } = useTheme();
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-hairline bg-background/75 backdrop-blur-xl"
          : "border-b border-transparent bg-background/30 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-14 max-w-[80rem] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center">
            {mounted && (
              <Image
                src={theme === "dark" ? "/logo-light.svg" : "/logo-dark.svg"}
                alt="Orba"
                width={26}
                height={26}
                priority
              />
            )}
          </span>
          <span className="text-base font-medium tracking-tight text-ink-1">
            Orba
          </span>
        </Link>

        {/* Center nav — pill */}
        <div className="hidden items-center md:flex">
          <div className="flex items-center gap-1 rounded-full border border-hairline bg-background/40 p-1 backdrop-blur">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              const inner = (
                <span
                  className={cn(
                    "relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm transition-colors",
                    active
                      ? "text-ink-1"
                      : "text-ink-2 hover:text-ink-1",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-brand-tint"
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </span>
              );
              return link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              ) : (
                <Link key={link.href} href={link.href}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                  <Avatar className="h-9 w-9 cursor-pointer ring-1 ring-hairline transition-colors hover:ring-brand/50">
                    <AvatarImage
                      src={session.user?.image || undefined}
                      alt={session.user?.name || "User"}
                    />
                    <AvatarFallback className="bg-brand text-brand-foreground text-xs font-medium">
                      {session.user?.name?.charAt(0).toUpperCase() ||
                        session.user?.email?.charAt(0).toUpperCase() ||
                        "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session.user?.name || "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="hidden text-sm text-ink-2 hover:text-ink-1 sm:inline-flex"
                asChild
              >
                <Link href="/login">Sign in</Link>
              </Button>
              <Button
                size="sm"
                className="h-9 bg-brand pl-3.5 pr-3 text-sm text-brand-foreground shadow-[0_8px_24px_-12px_var(--brand)] hover:bg-brand/90"
                asChild
              >
                <Link href="/register">
                  Get started
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
