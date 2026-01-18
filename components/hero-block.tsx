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
        className="min-h-screen flex items-end justify-center pt-24 pb-32 relative"
        style={{
          backgroundImage: 'url(/dau-chan-viet-building.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* <div className="absolute inset-0 bg-red-900/60 z-10" /> */}
        <div className="container mx-auto px-4 relative z-20 text-center max-w-4xl">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              {language === 'vi'
                ? 'Khám phá văn hoá Việt trong từng bước đi'
                : 'Discover Vietnamese culture in every step'}
            </h1>
            <button
              onClick={() => setIsBookingOpen(true)}
              className="px-10 py-4 bg-yellow-400 text-red-900 rounded-lg hover:bg-yellow-300 transition font-bold text-lg"
            >
              {t('hero.button')}
            </button>
          </div>
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  )
}
