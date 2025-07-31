'use client'

import { useEffect } from 'react'
import { initFacebookPixel, trackPageView } from '@/lib/facebook-pixel'

export function FacebookPixel() {
  useEffect(() => {
    // Initialize Facebook Pixel
    initFacebookPixel()
    
    // Track initial page view
    trackPageView()
  }, [])

  return null
} 