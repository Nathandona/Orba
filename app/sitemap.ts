import type { MetadataRoute } from "next";

const SITE = "https://orba.work";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/features", changeFrequency: "monthly", priority: 0.9 },
    { path: "/pricing", changeFrequency: "monthly", priority: 0.9 },
    { path: "/login", changeFrequency: "yearly", priority: 0.3 },
    { path: "/register", changeFrequency: "yearly", priority: 0.5 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.4 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.4 },
    { path: "/docs", changeFrequency: "monthly", priority: 0.8 },
    { path: "/docs/getting-started", changeFrequency: "monthly", priority: 0.8 },
    { path: "/docs/user-guide", changeFrequency: "monthly", priority: 0.7 },
    { path: "/docs/projects", changeFrequency: "monthly", priority: 0.7 },
    { path: "/docs/collaboration", changeFrequency: "monthly", priority: 0.7 },
    { path: "/docs/authentication", changeFrequency: "monthly", priority: 0.6 },
    { path: "/docs/subscription", changeFrequency: "monthly", priority: 0.6 },
    { path: "/docs/tips", changeFrequency: "monthly", priority: 0.5 },
    { path: "/docs/shortcuts", changeFrequency: "monthly", priority: 0.5 },
    { path: "/docs/faq", changeFrequency: "monthly", priority: 0.6 },
    { path: "/docs/troubleshooting", changeFrequency: "monthly", priority: 0.5 },
  ];

  return routes.map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
