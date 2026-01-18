import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ClientWrapper } from "@/components/client-wrapper"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Escape Room Locked Danang - Trò Chơi Giải Đố Tuyệt Vời",
  description: "Trải nghiệm escape room hấp dẫn tại Đà Nẵng. Giải đố thú vị, đội ngũ thân thiện, giá cả hợp lý.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={`font-sans antialiased bg-background text-foreground overflow-x-hidden`}>
        <ClientWrapper />
        <Analytics />
      </body>
    </html>
  )
}
