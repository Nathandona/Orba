"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ArrowRight, LayoutDashboard, LogOut, Menu, Moon, Sun, User, X } from "lucide-react";

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
import { easeOutExpo } from "@/lib/motion";
import { focusRing, inkButton } from "@/lib/ui";

const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

/* Both logos render; CSS picks one, so there is no flash and "system" works. */
function Logo() {
  return (
    <>
      <Image src="/logo-dark.svg" alt="" width={22} height={22} priority className="h-[22px] w-[22px] dark:hidden" />
      <Image src="/logo-light.svg" alt="" width={22} height={22} priority className="hidden h-[22px] w-[22px] dark:block" />
    </>
  );
}

function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "relative inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink-1",
        focusRing,
      )}
    >
      <Sun className="h-4 w-4 scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0" />
    </button>
  );
}

function ThemeSegmented() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div role="radiogroup" aria-label="Theme" className="flex rounded-md border border-hairline p-0.5">
      {(["light", "dark", "system"] as const).map((t) => (
        <button
          key={t}
          type="button"
          role="radio"
          aria-checked={mounted && theme === t}
          onClick={() => setTheme(t)}
          className={cn(
            "h-7 rounded-[5px] px-2.5 font-mono text-xs capitalize transition-colors",
            mounted && theme === t ? "bg-surface-2 text-ink-1" : "text-ink-3 hover:text-ink-1",
            focusRing,
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Close when the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Sheet: scroll lock, Escape to close, focus trapped inside, focus returned.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const trigger = triggerRef.current;
    const focusables = () =>
      Array.from(sheetRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []);
    requestAnimationFrame(() => focusables()[0]?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab") return;
      const els = [trigger, ...focusables()].filter(Boolean) as HTMLElement[];
      const i = els.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) {
        e.preventDefault();
        els[els.length - 1]?.focus();
      } else if (!e.shiftKey && i === els.length - 1) {
        e.preventDefault();
        els[0]?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  const solid = scrolled || open;

  // The sheet is a sibling of the header, not a child: backdrop-filter on the
  // header would make it the containing block of the fixed sheet.
  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-200 ease-out",
        solid
          ? "border-hairline bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70"
          : "border-transparent bg-transparent",
        open && "bg-background supports-[backdrop-filter]:bg-background",
      )}
    >
      <nav aria-label="Main" className="mx-auto flex h-14 max-w-[80rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Orba home" className={cn("flex min-w-0 items-center gap-2 rounded-md", focusRing)}>
          <Logo />
          <span className="text-[15px] font-medium tracking-tight text-ink-1">Orba</span>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          {/* Desktop links */}
          <ul className="mr-2 hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-sm text-sm transition-colors",
                      active ? "text-ink-1" : "text-ink-2 hover:text-ink-1",
                      focusRing,
                    )}
                  >
                    {link.label}
                    {active && (
                      <span aria-hidden className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <span aria-hidden className="mr-1 hidden h-4 w-px bg-hairline md:block" />
          <div className="hidden md:block">
            <ThemeButton />
          </div>

          {session ? (
            <>
              <Link href="/dashboard" className={cn(inkButton, "h-8 px-3 text-sm")}>
                Dashboard
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button type="button" aria-label="Account" className={cn("hidden rounded-full md:block", focusRing)}>
                    <Avatar className="h-7 w-7 ring-1 ring-hairline">
                      <AvatarImage src={session.user?.image || undefined} alt={session.user?.name || "User"} />
                      <AvatarFallback className="bg-surface-2 text-xs font-medium text-ink-1">
                        {(session.user?.name || session.user?.email || "U").charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <p className="text-sm font-medium leading-none">{session.user?.name || "User"}</p>
                    <p className="mt-1 text-xs leading-none text-ink-3">{session.user?.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={cn("hidden rounded-sm px-1 text-sm text-ink-2 transition-colors hover:text-ink-1 md:block", focusRing)}
              >
                Sign in
              </Link>
              <Link href="/register" className={cn(inkButton, "group h-8 px-3 text-sm")}>
                Get started
                <ArrowRight className="hidden h-3.5 w-3.5 transition-transform motion-safe:group-hover:translate-x-0.5 md:block" />
              </Link>
            </>
          )}

          <button
            ref={triggerRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-1 transition-colors hover:bg-surface-2 md:hidden",
              focusRing,
            )}
          >
            {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
          </button>
        </div>
      </nav>
    </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.16 } }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            className="fixed inset-x-0 top-14 bottom-0 z-50 flex flex-col bg-background px-4 sm:px-6 md:hidden"
          >
            <ul className="mt-2">
              {NAV_LINKS.map((link, i) => {
                const active = isActive(pathname, link.href);
                return (
                  <motion.li
                    key={link.href}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, delay: reduce ? 0 : i * 0.03, ease: easeOutExpo }}
                    className="border-b border-hairline"
                  >
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn("flex h-14 items-center gap-3 text-2xl font-medium tracking-tight text-ink-1", focusRing)}
                    >
                      {active && <span aria-hidden className="h-1 w-1 rounded-full bg-brand" />}
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <div className="mt-auto space-y-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-ink-3">Theme</span>
                <ThemeSegmented />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {session ? (
                  <>
                    <button
                      type="button"
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className={cn("h-11 rounded-md border border-hairline text-sm font-medium text-ink-1", focusRing)}
                    >
                      Log out
                    </button>
                    <Link href="/dashboard" className={cn(inkButton, "h-11 text-sm")}>
                      Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className={cn("inline-flex h-11 items-center justify-center rounded-md border border-hairline text-sm font-medium text-ink-1", focusRing)}
                    >
                      Sign in
                    </Link>
                    <Link href="/register" className={cn(inkButton, "h-11 text-sm")}>
                      Get started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
