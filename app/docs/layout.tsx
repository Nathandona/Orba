import type { Metadata } from "next";
import { DocsNavbar } from "@/components/docs-navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Orba Documentation",
  description: "Complete documentation for Orba's task management platform. Learn how to use Kanban boards, collaborate with your team, and amplify your results.",
  metadataBase: new URL('https://docs.orba.work'),
  alternates: {
    canonical: 'https://docs.orba.work',
  },
  openGraph: {
    title: "Orba Documentation",
    description: "Complete documentation for Orba's task management platform",
    url: "https://docs.orba.work",
    siteName: "Orba Documentation",
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <DocsNavbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}