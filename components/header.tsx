"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { useCallback } from "react"

export function Header() {
  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)

    if (element) {
      // Get the header height to offset the scroll position
      const headerHeight = 64 // This is the height of our header (h-16 = 64px)
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="https://www.martinkrejcir.cz/" className="flex items-center">
            <Image src="/logo.svg" alt="Martin Krejčíř logo" width={115} height={20} className="h-5 w-auto" />
          </Link>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#problemy"
              onClick={(e) => scrollToSection(e, "problemy")}
              className="text-gray-700 hover:text-[#0064D2] transition-colors epilogue-medium cursor-pointer"
            >
              Problémy
            </a>
            <a
              href="#reseni"
              onClick={(e) => scrollToSection(e, "reseni")}
              className="text-gray-700 hover:text-[#0064D2] transition-colors epilogue-medium cursor-pointer"
            >
              Řešení
            </a>
            <a
              href="#proces"
              onClick={(e) => scrollToSection(e, "proces")}
              className="text-gray-700 hover:text-[#0064D2] transition-colors epilogue-medium cursor-pointer"
            >
              Proces
            </a>
            <a
              href="#reference"
              onClick={(e) => scrollToSection(e, "reference")}
              className="text-gray-700 hover:text-[#0064D2] transition-colors epilogue-medium cursor-pointer"
            >
              Reference
            </a>
            <a
              href="#faq"
              onClick={(e) => scrollToSection(e, "faq")}
              className="text-gray-700 hover:text-[#0064D2] transition-colors epilogue-medium cursor-pointer"
            >
              FAQ
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-2 border-[#0064D2] text-[#0064D2] hover:bg-[#0064D2] hover:text-white transition-all duration-300 rounded-full epilogue-medium hover:scale-105 transform"
            >
              <Phone className="h-4 w-4" />
              <a className="hidden lg:inline" href="tel:+420776025378">+420 776 025 378</a>
              <span className="lg:hidden">Zavolat</span>
            </Button>
            <Button
              size="sm"
              className="bg-[#0064D2] hover:bg-[#0064D2] text-white rounded-full epilogue-medium transition-all duration-300 hover:scale-105 transform relative overflow-hidden group"
              onClick={() => {
                const element = document.getElementById('objednavkovy-formular');
                if (element) {
                  const headerHeight = 64; // Height of the fixed header
                  const additionalOffset = 164; // Additional offset to scroll higher
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition = elementPosition - headerHeight - additionalOffset;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                  });
                }
              }}
            >
              <span className="relative z-10">Konzultace</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
