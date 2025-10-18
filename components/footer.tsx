import Images from "next/image"

export function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Images
                src="/logo-dark.svg"
                alt="Orba Logo"
                width={24}
                height={24}
                className="text-primary-foreground"
              />
            </div>
            <span className="text-xl font-bold text-primary">
              Orba
            </span>
          </div>
          <p className="text-muted-foreground">
            © 2025 Orba. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
