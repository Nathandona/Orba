import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DocsSidebar } from "@/components/docs-sidebar";
import { DocsNavbar } from "@/components/docs-navbar";
import { DocToc } from "@/components/docs/doc-toc";

export const metadata: Metadata = {
  title: {
    default: "Docs · Orba",
    template: "%s · Orba Docs",
  },
  description:
    "Set up Orba, plan a sprint and invite your team. Plain-English guides for the Kanban your team will actually open on Monday.",
  metadataBase: new URL("https://orba.work"),
  alternates: {
    canonical: "/docs",
  },
  openGraph: {
    title: "Orba Documentation",
    description:
      "Set up Orba, run a sprint, invite your team. Plain-English guides.",
    url: "https://orba.work/docs",
    siteName: "Orba",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-background text-ink-1">
      <DocsNavbar />
      <div className="mx-auto grid max-w-[90rem] grid-cols-1 px-4 sm:px-6 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-8 lg:px-8 xl:grid-cols-[15rem_minmax(0,1fr)_13rem] xl:gap-10">
        <DocsSidebar />
        <main className="min-w-0">{children}</main>
        <aside className="hidden xl:block">
          <DocToc />
        </aside>
      </div>
    </div>
  );
}
