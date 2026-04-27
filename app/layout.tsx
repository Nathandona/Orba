import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { ToastProvider } from "@/components/ui/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const SITE_URL = "https://orba.work";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Orba — The Kanban your team will actually open on Monday",
    template: "%s · Orba",
  },
  description:
    "Orba is a quiet, fast, opinionated Kanban for product teams. Plan the sprint, run the standup, ship the work — without losing an afternoon to the tool.",
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
    title: "Orba — The Kanban your team will actually open on Monday",
    description:
      "A quiet, fast, opinionated Kanban for product teams. Plan, track, ship — without losing an afternoon to the tool.",
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orba — The Kanban your team will actually open on Monday",
    description:
      "A quiet, fast, opinionated Kanban for product teams.",
    creator: "@orba",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <ToastProvider>
              {children}
            </ToastProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
