import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { ToastProvider } from "@/components/ui/toast";
import { Analytics } from "@vercel/analytics/next";

/* One family for the whole site. Optical sizing keeps the 96px display
   tight and the 13px card labels open. */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://orba.work";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Orba: plan the week on Monday, watch the board empty by Friday",
    template: "%s · Orba",
  },
  description:
    "Orba is a Kanban board for small teams. Name your columns, drag cards to Done, and see where every project stands without asking anyone. Free for three boards.",
  applicationName: "Orba",
  keywords: [
    "Kanban",
    "project management",
    "task management",
    "team collaboration",
    "agile",
    "sprint planning",
    "Orba",
  ],
  authors: [{ name: "Orba" }],
  creator: "Orba",
  publisher: "Orba",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Orba",
    title: "Orba: plan the week on Monday, watch the board empty by Friday",
    description:
      "A Kanban board for small teams. Name your columns, drag cards to Done, and see where every project stands.",
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orba: plan the week on Monday, watch the board empty by Friday",
    description:
      "A Kanban board for small teams. Free for three boards.",
    creator: "@orba",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e11" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${geistMono.variable}`}
    >
      <head />
      <body className="font-sans antialiased">
        {/* Base UI portals (dialogs, menus, popovers) stack above this root. */}
        <div className="isolate">
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="light">
              <ToastProvider>{children}</ToastProvider>
              <Analytics />
            </ThemeProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
