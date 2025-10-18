"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Images from "next/image"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export function Navbar() {
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-background/70 border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                            {mounted && (
                                <Images
                                    src={theme === "dark" ? "/logo-light.svg" : "/logo-dark.svg"}
                                    alt="Orba Logo"
                                    width={24}
                                    height={24}
                                    className="text-primary-foreground"
                                />
                            )}
                        </div>
                        <span className="text-2xl font-bold text-primary">
                            Orba
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4"
                    >
                        <Button variant="ghost" className="hidden sm:inline-flex">
                            Features
                        </Button>
                        <Button variant="ghost" className="hidden sm:inline-flex">
                            Pricing
                        </Button>
                        <ModeToggle />
                        <Button variant="outline" className="hidden sm:inline-flex">
                            Sign In
                        </Button>
                        <Button>
                            Get Started
                        </Button>
                    </motion.div>
                </div>
            </div>
        </nav>
    )
}
