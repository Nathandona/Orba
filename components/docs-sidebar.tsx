"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Compass,
  FileText,
  LayoutGrid,
  Users,
  Lock,
  CreditCard,
  Lightbulb,
  Keyboard,
  HelpCircle,
  Wrench,
  ArrowUpRight,
  Github,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const groups: NavGroup[] = [
  {
    label: "Start here",
    items: [
      { href: "/docs", label: "Overview", icon: BookOpen },
      { href: "/docs/getting-started", label: "Getting started", icon: Compass },
    ],
  },
  {
    label: "Guides",
    items: [
      { href: "/docs/user-guide", label: "User guide", icon: FileText },
      { href: "/docs/projects", label: "Projects", icon: LayoutGrid },
      { href: "/docs/collaboration", label: "Collaboration", icon: Users },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/docs/authentication", label: "Authentication", icon: Lock },
      { href: "/docs/subscription", label: "Subscriptions", icon: CreditCard },
    ],
  },
  {
    label: "Reference",
    items: [
      { href: "/docs/tips", label: "Tips & tricks", icon: Lightbulb },
      { href: "/docs/shortcuts", label: "Shortcuts", icon: Keyboard },
      { href: "/docs/faq", label: "FAQ", icon: HelpCircle },
      { href: "/docs/troubleshooting", label: "Troubleshooting", icon: Wrench },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden border-r border-hairline bg-surface-2 md:block">
      <div className="sticky top-0 flex h-dvh flex-col">
        <div className="flex items-center gap-3 border-b border-hairline px-6 py-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-ink-1"
            aria-label="Orba home"
          >
            <span className="font-serif text-xl italic text-brand">O</span>
            <span className="text-sm font-medium tracking-tight">Orba docs</span>
          </Link>
        </div>

        <nav
          className="flex-1 overflow-y-auto px-4 py-6"
          aria-label="Documentation"
        >
          <div className="space-y-7">
            {groups.map((group) => (
              <div key={group.label}>
                <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-3">
                  {group.label}
                </p>
                <ul className="space-y-0.5">
                  {group.items.map((item) => {
                    const active = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <li key={item.href} className="relative">
                        {active && (
                          <span
                            aria-hidden
                            className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-brand"
                          />
                        )}
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors duration-150",
                            active
                              ? "text-ink-1 font-medium"
                              : "text-ink-2 hover:bg-surface-1 hover:text-ink-1",
                          )}
                        >
                          <Icon
                            className={cn(
                              "h-4 w-4",
                              active ? "text-brand" : "text-ink-3",
                            )}
                          />
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        <div className="flex items-center justify-between border-t border-hairline px-5 py-4 text-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-ink-2 transition-colors hover:text-brand"
          >
            Back to site
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-3 transition-colors hover:text-ink-1"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
