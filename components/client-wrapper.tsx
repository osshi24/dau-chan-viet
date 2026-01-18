"use client"

import { LanguageProvider } from "@/lib/language-context"
import Header from "@/components/header"
import HeroBlock from "@/components/hero-block"
import RoomsBlock from "@/components/rooms-block"
import InstructionsBlock from "@/components/instructions-block"
import PricingBlock from "@/components/pricing-block"
import ReviewsBlock from "@/components/reviews-block"
import ContactBlock from "@/components/contact-block"

export function ClientWrapper() {
  return (
    <LanguageProvider>
      <main className="min-h-screen bg-background">
        <Header />
        <section id="hero">
          <HeroBlock />
        </section>
        <section id="rooms">
          <RoomsBlock />
        </section>
        <section id="instructions">
          <InstructionsBlock />
        </section>
        <section id="pricing">
          <PricingBlock />
        </section>
        <section id="reviews">
          <ReviewsBlock />
        </section>
        <section id="contact">
          <ContactBlock />
        </section>
      </main>
    </LanguageProvider>
  )
}
