import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { FacebookPixel } from "@/components/facebook-pixel"

export const metadata: Metadata = {
  title: "4x Konzultace - Martin Krejčíř",
  description: "Získejte jasný směr pro vaše podnikání za 30 dní. 4 individuální konzultace s Martinem Krejčířem.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="epilogue-font">
        {children}
        <FacebookPixel />
      </body>
    </html>
  )
}
