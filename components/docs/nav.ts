/* Single source for the docs navigation: the sidebar, the mobile sheet and
   the previous / next links all read from here, so they stay in sync. */
export interface DocsNavItem {
  href: string;
  label: string;
}

export interface DocsNavGroup {
  label: string;
  items: DocsNavItem[];
}

export const DOCS_NAV: DocsNavGroup[] = [
  {
    label: "Start here",
    items: [
      { href: "/docs", label: "Overview" },
      { href: "/docs/getting-started", label: "Getting started" },
    ],
  },
  {
    label: "Guides",
    items: [
      { href: "/docs/user-guide", label: "User guide" },
      { href: "/docs/projects", label: "Projects" },
      { href: "/docs/collaboration", label: "Collaboration" },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/docs/authentication", label: "Authentication" },
      { href: "/docs/subscription", label: "Subscriptions" },
    ],
  },
  {
    label: "Reference",
    items: [
      { href: "/docs/tips", label: "Tips" },
      { href: "/docs/shortcuts", label: "Keyboard" },
      { href: "/docs/faq", label: "FAQ" },
      { href: "/docs/troubleshooting", label: "Troubleshooting" },
    ],
  },
];

export const DOCS_PAGES: DocsNavItem[] = DOCS_NAV.flatMap((g) => g.items);

export function isDocsActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  return href === "/docs" ? pathname === "/docs" : pathname === href || pathname.startsWith(href + "/");
}
