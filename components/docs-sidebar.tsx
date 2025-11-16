import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Home, Github } from "lucide-react"

export function DocsSidebar({ children }: { children: ReactNode }) {
  return (
    <aside className="hidden md:block border-r h-dvh">
      <div className="h-full flex flex-col">
        <div className="px-4 py-4 flex items-center gap-3 border-b">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold">Orba Docs</span>
        </div>
        <div className="px-4 py-3 space-y-1">
          {children}
        </div>
      </div>
    </aside>
  )
}