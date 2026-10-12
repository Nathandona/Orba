"use client"

import Images from "next/image"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import Link from "next/link"

export function Footer() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <footer className="border-t border-hairline px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[80rem]">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2 transition-opacity hover:opacity-80">
              <div className="flex h-7 w-7 items-center justify-center">
                {mounted && (
                  <Images
                    src={theme === "dark" ? "/logo-light.svg" : "/logo-dark.svg"}
                    alt="Orba"
                    width={24}
                    height={24}
                  />
                )}
              </div>
              <span className="text-lg font-medium tracking-tight text-ink-1">Orba</span>
            </Link>
            <p className="mt-4 max-w-[28rem] text-sm text-ink-2">
              The Kanban your team will actually open on Monday.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
            <div>
              <div className="text-eyebrow font-medium uppercase tracking-[0.18em] text-ink-3">
                Product
              </div>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><Link href="/features" className="text-ink-2 hover:text-ink-1">Features</Link></li>
                <li><Link href="/pricing" className="text-ink-2 hover:text-ink-1">Pricing</Link></li>
                <li><a href="https://docs.orba.work" className="text-ink-2 hover:text-ink-1">Docs</a></li>
              </ul>
            </div>
            <div>
              <div className="text-eyebrow font-medium uppercase tracking-[0.18em] text-ink-3">
                Company
              </div>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><Link href="/login" className="text-ink-2 hover:text-ink-1">Sign in</Link></li>
                <li><Link href="/register" className="text-ink-2 hover:text-ink-1">Create account</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-eyebrow font-medium uppercase tracking-[0.18em] text-ink-3">
                Legal
              </div>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><Link href="/terms" className="text-ink-2 hover:text-ink-1">Terms</Link></li>
                <li><Link href="/privacy" className="text-ink-2 hover:text-ink-1">Privacy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-hairline pt-6 text-xs text-ink-3 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Orba. All rights reserved.</p>
          <a
            href="https://altair-studio.com/en/work/orba"
            className="inline-flex items-center gap-2 transition-colors hover:text-ink-1"
          >
            <svg width="16" height="16" viewBox="0 0 64 64" aria-hidden="true" className="shrink-0 rounded-[4px] dark:ring-1 dark:ring-white/25">
              <rect width="64" height="64" rx="15" fill="#161616" />
              <path d="M28.6 14h6.8L51 50h-7.4L32 22.4 20.4 50H13z" fill="#fff" />
            </svg>
            Designed and built by Altair Studio
          </a>
        </div>
      </div>
    </footer>
  )
}
