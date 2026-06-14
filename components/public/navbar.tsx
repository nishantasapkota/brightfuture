"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

interface NavbarProps {
  details: any
  businessName: string
  firstName: string
}

export function Navbar({ details, businessName, firstName }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about-us" },
    { name: "Services", href: "/services" },
    { name: "Courses", href: "/courses" },
    { name: "Stories", href: "/success-stories" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact", href: "/contact" },
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => setIsMenuOpen(false), [pathname])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) setIsMenuOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isMenuOpen])

  const isHome = pathname === "/"
  const isDark = !isScrolled && isHome

  return (
    <header
      className={cn(
        "w-full fixed top-0 z-[5000] transition-all duration-500",
        isScrolled ? "py-3" : "py-4 md:py-5"
      )}
    >
      <div className="container">
        <nav
          className={cn(
            "flex h-14 md:h-16 items-center justify-between px-4 md:px-6 rounded-2xl border transition-all duration-500",
                isScrolled
                  ? "bg-white/90 backdrop-blur-xl border-slate-200/80 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.12)]"
                  : isHome
                    ? "bg-[#020617]/70 backdrop-blur-sm border-white/[0.06]"
                    : "bg-white/90 backdrop-blur-xl border-slate-200/80 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.08)]"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded-xl"
          >
            {details?.logo ? (
              <Image
                src={details.logo}
                alt={businessName}
                width={140}
                height={40}
                className={cn(
                  "object-contain transition-all duration-300",
                  isDark && "brightness-0 invert"
                )}
              />
            ) : (
              <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg shadow-primary/20 ring-1 ring-white/10">
                {firstName[0]}
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div
            className={cn(
              "hidden lg:flex items-center gap-0.5",
              isDark ? "text-white/85" : "text-slate-600"
            )}
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative group px-3.5 py-2 text-[13px] font-semibold rounded-full transition-all duration-300",
                  pathname === item.href
                    ? (isDark
                        ? "text-white bg-white/12"
                        : "text-primary bg-primary/6")
                    : (isDark
                        ? "text-white/70 hover:text-white hover:bg-white/8"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-100")
                )}
              >
                {item.name}
                {pathname === item.href && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/online-application" className="hidden lg:block">
              <Button
                className={cn(
                  "rounded-full px-5 h-10 text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-300 shadow-lg",
                  isDark
                    ? "bg-white text-primary hover:bg-white/90 shadow-white/10"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/15"
                )}
              >
                Apply Now
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 lg:hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
                isDark
                  ? "border-white/15 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              )}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          id="mobile-navigation"
          className={cn(
            "lg:hidden absolute left-0 right-0 top-full container pt-2.5 transition-all duration-300",
            isMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-3 pointer-events-none"
          )}
        >
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-[0_24px_40px_-12px_rgba(0,0,0,0.12)]">
            <nav className="grid gap-0.5 p-3" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-semibold transition-all",
                    pathname === item.href
                      ? "text-primary bg-primary/5"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 px-4 pb-1">
                <Link href="/online-application">
                  <Button className="h-11 w-full rounded-xl bg-primary text-[12px] font-bold uppercase tracking-[0.08em] text-primary-foreground hover:bg-primary/90">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
