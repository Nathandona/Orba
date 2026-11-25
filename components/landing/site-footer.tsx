import Link from "next/link";

import { OrbaLogo } from "@/components/landing/logo";

const links = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
];

/* Mirrors the nav: one floating pill. */
export function SiteFooter() {
  return (
    <footer className="flex justify-center px-4 pt-10 pb-12">
      <div className="flex flex-col items-center gap-5 rounded-[28px] bg-background px-6 py-4 shadow-[0_0_0_1px_rgb(17_17_20/0.07),0_10px_30px_rgb(17_17_20/0.06)] sm:flex-row sm:gap-9 sm:rounded-full dark:shadow-[0_0_0_1px_rgb(255_255_255/0.08)]">
        <Link href="/" aria-label="Orba home" className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
          <OrbaLogo className="text-[26px]" />
        </Link>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[15px] font-medium text-foreground-secondary">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href="https://altair-studio.com/en/work/orba"
          className="rounded-sm text-[15px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Designed and built by Altair Studio
        </a>
      </div>
    </footer>
  );
}
