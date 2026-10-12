"use client"

import Image from "next/image"
import Link from "next/link"

import { ContactSalesDialog } from "@/components/contact-sales-dialog"
import { focusRing } from "@/lib/ui"
import { cn } from "@/lib/utils"

const link = cn("block py-2 text-sm text-ink-2 transition-colors hover:text-ink-1 md:py-1", focusRing)

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-hairline pt-4">
      <p className="text-sm font-medium text-ink-1">{title}</p>
      <ul className="mt-3 md:space-y-1.5">{children}</ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="px-4 pt-14 pb-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[80rem]">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Link href="/" aria-label="Orba home" className={cn("inline-flex items-center gap-2 rounded-md", focusRing)}>
              <Image src="/logo-dark.svg" alt="" width={22} height={22} className="h-[22px] w-[22px] dark:hidden" />
              <Image src="/logo-light.svg" alt="" width={22} height={22} className="hidden h-[22px] w-[22px] dark:block" />
              <span className="text-[15px] font-medium tracking-tight text-ink-1">Orba</span>
            </Link>
            <p className="mt-4 max-w-[28rem] text-sm text-ink-2">
              The Kanban your team will actually open on Monday.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:col-span-7 md:grid-cols-3">
            <Column title="Product">
              <li><Link href="/features" className={link}>Features</Link></li>
              <li><Link href="/pricing" className={link}>Pricing</Link></li>
              <li><Link href="/docs" className={link}>Docs</Link></li>
            </Column>
            <Column title="Account">
              <li><Link href="/login" className={link}>Sign in</Link></li>
              <li><Link href="/register" className={link}>Create account</Link></li>
              <li>
                <ContactSalesDialog
                  trigger={
                    <button type="button" className={cn(link, "text-left")}>
                      Contact
                    </button>
                  }
                />
              </li>
            </Column>
            <Column title="Legal">
              <li><Link href="/terms" className={link}>Terms</Link></li>
              <li><Link href="/privacy" className={link}>Privacy</Link></li>
            </Column>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-hairline pt-6 text-xs text-ink-3 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Orba</p>
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
