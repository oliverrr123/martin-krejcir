"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Users } from "lucide-react"

interface StickyCTAProps {
  show: boolean
  onReserveClick: () => void
}

export function StickyCTA({ show, onReserveClick }: StickyCTAProps) {
  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-[#0064D2] shadow-2xl transform transition-all duration-500 ease-in-out">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left side - Urgency and social proof */}
          <div className="flex items-center gap-4">
            {/* Urgency Badge */}
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-3 py-1">
              <span className="text-sm epilogue-bold text-red-700">
                Zbývají pouze 3 místa!
              </span>
            </div>
          </div>

          {/* Right side - CTA Button */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-2xl epilogue-bold text-[#0064D2]">15.000 Kč</div>
              <div className="text-xs text-gray-500 epilogue-regular">Jednorázová investice do Vašeho úspěchu</div>
            </div>

            <Button
              size="lg"
              className="bg-gradient-to-r from-[#0064D2] to-[#0052A8] hover:from-[#0052A8] hover:to-[#0064D2] text-white text-lg px-8 py-3 rounded-full epilogue-bold transition-all duration-300 hover:scale-105 transform relative overflow-hidden group shadow-lg"
              onClick={onReserveClick}
            >
              <span className="relative z-10 flex items-center">
                Rezervovat místo
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
            </Button>
          </div>
        </div>

        {/* Mobile optimized version */}
        <div className="sm:hidden mt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#0064D2]" />
              <span className="text-xs text-gray-600 epilogue-medium">47 rezervací tento měsíc</span>
            </div>
            <div className="text-right">
              <div className="text-lg epilogue-bold text-[#0064D2]">15.000 Kč</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 