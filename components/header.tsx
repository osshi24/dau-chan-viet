"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { Menu, X } from "lucide-react"

export default function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setIsMobileMenuOpen(false)
  }

  const menuItems = [
    { label: t("header.trang_chu"), id: "hero" },
    { label: t("header.booking"), id: "rooms" },
    { label: t("header.instructions"), id: "instructions" },
    { label: t("header.pricing"), id: "pricing" },
    { label: t("header.reviews"), id: "reviews" },
    { label: t("header.contact"), id: "contact" },
  ]

  return (
    <header className={`fixed top-0 w-full z-50 bg-black/20 backdrop-blur-sm transition-all duration-300 ${
      isScrolled ? "py-2" : "py-4"
    }`}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <div className="text-white font-bold text-xl">
            <img 
              src="/Logo.jpg" 
              alt="Dấu Chân Việt Logo" 
              className={`w-auto object-contain transition-all duration-300 ${
                isScrolled ? "h-12 lg:h-14" : "h-16 lg:h-20"
              }`} 
            />
          </div>

          {/* Desktop Menu */}
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

          {/* Desktop Language Buttons */}
          <div className="hidden md:flex gap-3">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-red-900/95 backdrop-blur-md shadow-lg">
            <ul className="flex flex-col py-4">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleScroll(e, item.id)}
                    className="block px-6 py-3 text-white hover:bg-yellow-400/20 transition font-semibold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex gap-3 px-6 pb-4">
              <button
                onClick={() => setLanguage("vi")}
                className={`flex-1 px-4 py-2 rounded-lg transition font-semibold ${
                  language === "vi"
                    ? "bg-yellow-400 text-red-900"
                    : "border border-white text-white hover:bg-white/10"
                }`}
              >
                VI
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`flex-1 px-4 py-2 rounded-lg transition font-semibold ${
                  language === "en"
                    ? "bg-yellow-400 text-red-900"
                    : "border border-white text-white hover:bg-white/10"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
