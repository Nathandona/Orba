import Link from "next/link";

import { OrbaLogo } from "@/components/landing/logo";
import { StickyButton } from "@/components/landing/sticky-button";

const links = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
];

const linkClass =
  "rounded-full px-1 text-[15px] font-medium text-foreground/80 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

/* A floating pill, centred over the page. It stays on screen while scrolling
   and keeps the sticky-note button as the only filled action. */
export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6">
      <nav
        aria-label="Main"
        className="flex w-full max-w-fit items-center gap-5 rounded-full bg-background/85 py-2 pr-2 pl-5 shadow-[0_0_0_1px_rgb(17_17_20/0.07),0_10px_30px_rgb(17_17_20/0.07)] backdrop-blur-md sm:gap-8 dark:shadow-[0_0_0_1px_rgb(255_255_255/0.08)]"
      >
        <Link href="/" aria-label="Orba home" className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
          <OrbaLogo className="text-[30px]" />
        </Link>
        <ul className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkClass}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <Link href="/login" className={linkClass}>
            Log in
          </Link>
          <StickyButton href="/register" className="mr-1">
            Start free
          </StickyButton>
        </div>
      </nav>
    </header>
  );
}
