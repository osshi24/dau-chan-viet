"use client"

import type React from "react"
import { useLanguage } from "@/lib/language-context"

export default function Header() {
  const { language, setLanguage, t } = useLanguage()

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const menuItems = [
    { label: t("header.trang_chu"), id: "hero" },
    { label: t("header.booking"), id: "hero" },
    { label: t("header.instructions"), id: "instructions" },
    { label: t("header.reviews"), id: "reviews" },
    { label: t("header.contact"), id: "contact" },
  ]

  return (
    <header className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="text-white font-bold text-xl">DẤU CHÂN VIỆT</div>
          <ul className="hidden md:flex gap-8">
            {menuItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleScroll(e, item.id)}
                  className="text-white hover:text-yellow-300 transition font-semibold"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex gap-3">
            <button
              onClick={() => setLanguage("vi")}
              className={`px-4 py-2 rounded-lg transition font-semibold ${
                language === "vi"
                  ? "bg-yellow-400 text-red-900"
                  : "border border-white text-white hover:bg-white/10"
              }`}
            >
              VI
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-4 py-2 rounded-lg transition font-semibold ${
                language === "en"
                  ? "bg-yellow-400 text-red-900"
                  : "border border-white text-white hover:bg-white/10"
              }`}
            >
              EN
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
