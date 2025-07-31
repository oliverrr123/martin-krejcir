"use client"

import { useEffect } from 'react'
import { XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { trackEvent } from '@/lib/facebook-pixel'

export default function CancelPage() {
  useEffect(() => {
    // Track checkout abandonment
    trackEvent('CustomEvent', {
      event_name: 'Checkout Abandonment',
      content_category: 'E-commerce',
      value: 15000,
      currency: 'CZK'
    })
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900">Platba byla zrušena</h1>
          
          <p className="text-gray-600">
            Vaše platba nebyla dokončena. Prosím, zkuste to znovu. Pokud máte jakékoliv dotazy, neváhejte nás kontaktovat.
          </p>

          <div className="pt-4">
            <Link href="/">
              <Button className="bg-[#0064D2] hover:bg-[#0064D2]/90 rounded-full text-white px-8">
                Zpět na hlavní stránku
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 