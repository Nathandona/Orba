import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DocsSidebar } from "@/components/docs-sidebar";

export const metadata: Metadata = {
  title: {
    default: "Docs · Orba",
    template: "%s · Orba Docs",
  },
  description:
    "Set up Orba, run a sprint, invite your team. Plain-English guides for the Kanban your team will actually open on Monday.",
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
    <div className="min-h-dvh bg-background text-ink-1 antialiased">
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr]">
        <DocsSidebar />
        <main className="min-w-0 px-6 sm:px-10 lg:px-16">{children}</main>
      </div>
    </div>
  );
}
