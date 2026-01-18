'use client'

import { useState } from 'react'
import BookingModal from './booking-modal'
import { useLanguage } from '@/lib/language-context'

export default function HeroBlock() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const { language, t } = useLanguage()

  return (
    <>
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center pt-24 pb-12 relative"
        style={{
          backgroundImage: 'url(/dau-chan-viet-building.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-red-900/60 z-10" />
        <div className="container mx-auto px-4 relative z-20 text-center max-w-2xl">
          <h1 className="text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            {language === 'vi' ? 'HÀNH TRÌNH' : 'JOURNEY'}
          </h1>
          <p className="text-2xl lg:text-3xl text-white mb-12 leading-relaxed">
            {language === 'vi'
              ? 'Khám phá văn hoá Việt trong từng bước đi'
              : 'Discover Vietnamese culture in every step'}
          </p>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="px-10 py-4 bg-yellow-400 text-red-900 rounded-lg hover:bg-yellow-300 transition font-bold text-lg"
          >
            {t('hero.button')}
          </button>
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  )
}
