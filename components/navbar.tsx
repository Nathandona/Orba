"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutDashboard, LogOut, User, BookOpen } from "lucide-react"

export function Navbar() {
    const { theme } = useTheme()
    const { data: session, status } = useSession()
    const pathname = usePathname()
    const [mounted, setMounted] = useState(false)

    const isHomePage = pathname === "/"

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <nav className={`fixed top-0 w-full z-50 backdrop-blur-lg ${
            isHomePage
                ? "bg-transparent border-transparent"
                : "bg-background/70 border-b border-border"
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                                {mounted && (
                                    <Image
                                        src={theme === "dark" ? "/logo-light.svg" : "/logo-dark.svg"}
                                        alt="Orba Logo"
                                        width={32}
                                        height={32}
                                        className="text-primary-foreground"
                                        style={{ width: 'auto', height: 'auto' }}
                                    />
                                )}
                            </div>
                            <span className="text-2xl font-bold text-primary">
                                Orba
                            </span>
                        </motion.div>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4"
                    >
                        <Button variant="ghost" className="hidden sm:inline-flex" asChild>
                            <Link href="/features">
                                Features
                            </Link>
                        </Button>
                        <Button variant="ghost" className="hidden sm:inline-flex" asChild>
                            <Link href="/pricing">
                                Pricing
                            </Link>
                        </Button>
                        <Button variant="ghost" className="hidden sm:inline-flex" asChild>
                            <a href="https://docs.orba.work" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                Docs
                            </a>
                        </Button>
                        <ModeToggle />
                        
                        {session ? (
                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                            <Avatar className="h-10 w-10 cursor-pointer border-2 border-primary/20 hover:border-primary/50 transition-colors">
                                                <AvatarImage 
                                                    src={session.user?.image || undefined} 
                                                    alt={session.user?.name || "User"} 
                                                />
                                                <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                                                    {session.user?.name?.charAt(0).toUpperCase() || 
                                                     session.user?.email?.charAt(0).toUpperCase() || 
                                                     "U"}
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">
                                                    {session.user?.name || "User"}
                                                </p>
                                                <p className="text-xs leading-none text-muted-foreground">
                                                    {session.user?.email}
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard" className="cursor-pointer">
                                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                                <span>Dashboard</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/profile" className="cursor-pointer">
                                                <User className="mr-2 h-4 w-4" />
                                                <span>Profile</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem 
                                            className="cursor-pointer text-destructive focus:text-destructive"
                                            onClick={() => signOut({ callbackUrl: '/' })}
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <>
                                <Button variant="outline" className="hidden sm:inline-flex" asChild>
                                    <Link href="/login">
                                        Sign In
                                    </Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/register">
                                        Get Started
                                    </Link>
                                </Button>
                            </>
                        )}
                    </motion.div>
                </div>
            </div>
        </nav>
    )
}
