import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { ClientWrapper } from "@/components/client-wrapper"
import "./globals.css"

export const metadata: Metadata = {
  title: "Dấu Chân Việt - Monopoly Experience Hub",
  description: "Trải nghiệm dấu chân Việt hấp dẫn tại Đà Nẵng. Giải đố thú vị, đội ngũ thân thiện, giá cả hợp lý."
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        <ClientWrapper />
        <Analytics />
      </body>
    </html>
  )
}
