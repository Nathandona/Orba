"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { focusRing, inkButton } from "@/lib/ui";
import { DocsNavList } from "@/components/docs-sidebar";

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

/* Docs top bar: same 56px bar, logo and ink button as the site navbar, plus a
   "Docs" label and a full-screen menu holding the docs navigation on mobile. */
export function DocsNavbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const trigger = triggerRef.current;
    const focusables = () => Array.from(sheetRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []);
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

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-hairline bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <nav aria-label="Docs" className="mx-auto flex h-14 max-w-[90rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" aria-label="Orba home" className={cn("flex items-center gap-2 rounded-md", focusRing)}>
            <Image src="/logo-dark.svg" alt="" width={22} height={22} className="h-[22px] w-[22px] dark:hidden" />
            <Image src="/logo-light.svg" alt="" width={22} height={22} className="hidden h-[22px] w-[22px] dark:block" />
            <span className="text-[15px] font-medium tracking-tight text-ink-1">Orba</span>
          </Link>
          <span aria-hidden className="h-4 w-px bg-hairline" />
          <Link href="/docs" className={cn("rounded-sm text-[15px] text-ink-2 transition-colors hover:text-ink-1", focusRing)}>
            Docs
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/"
            className={cn("mr-2 hidden items-center gap-1 rounded-sm text-sm text-ink-2 transition-colors hover:text-ink-1 md:inline-flex", focusRing)}
          >
            Back to site
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <div className="hidden md:block">
            <ThemeButton />
          </div>
          <Link href={session ? "/dashboard" : "/register"} className={cn(inkButton, "h-8 px-3 text-sm")}>
            {session ? "Dashboard" : "Get started"}
          </Link>
          <button
            ref={triggerRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="docs-mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-sm text-ink-1 transition-colors hover:bg-surface-2 md:hidden",
              focusRing,
            )}
          >
            {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
            Menu
          </button>
        </div>
      </nav>
    </header>

      {/* Outside the header: its backdrop-filter would make it the containing
          block of this fixed sheet and collapse it to the bar's height. */}
      {open && (
        <div
          id="docs-mobile-nav"
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-label="Docs menu"
          className="fixed inset-x-0 top-14 bottom-0 z-50 flex flex-col overflow-y-auto bg-background px-4 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 md:hidden"
        >
          <DocsNavList size="lg" onNavigate={() => setOpen(false)} />
          <div className="mt-10 flex items-center justify-between border-t border-hairline pt-5">
            <Link href="/" className={cn("inline-flex items-center gap-1 rounded-sm text-sm text-ink-2", focusRing)}>
              Back to site
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <ThemeButton />
          </div>
        </div>
      )}
    </>
  );
}
