"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const sendEmails = async () => {
      try {
        // First, get the session data
        const sessionResponse = await fetch(`/api/get-session-data?session_id=${sessionId}`)
        const { customer } = await sessionResponse.json()
        
        if (customer) {
          // Then, send the emails
          const emailResponse = await fetch('/api/send-emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ customer, sessionId }),
          })

          if (!emailResponse.ok) {
            const data = await emailResponse.json();
            if (data.error !== 'Emails already sent for this session') {
              console.error('Failed to send emails:', data.error);
            }
          }
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    if (sessionId) {
      sendEmails()
    } else {
      setLoading(false)
    }
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0064D2]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900">Platba byla úspěšná!</h1>
          
          <p className="text-gray-600">
            Děkujeme Vám za Vaši objednávku. Brzy Vás kontaktujeme s podrobnostmi.
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