"use client"

import { useState, useEffect } from "react"
import BookingModal from "./booking-modal"
import { useLanguage } from "@/lib/language-context"

const stepsData = {
  vi: [
    {
      id: 1,
      title: "BƯỚC 1: CHỌN CHỦ ĐỀ BÀN CHƠI",
      description:
        "Mỗi lần chơi, bạn có thể chọn 1 trong 3 chủ đề: Miền Đất Việt, Làng Việt Sống, hoặc Làng Nghề Truyền Thống. Cùng luật chơi nhưng khác bối cảnh và thử thách.",
      details: [
        "Miền Đất Việt: Hành trình khám phá các vùng đất và tỉnh thành nổi bật",
        "Làng Việt Sống: Trải nghiệm làng quê Việt xưa với tín ngưỡng dân gian",
        "Làng Nghề: Khám phá các làng nghề truyền thống Việt Nam",
      ],
    },
    {
      id: 2,
      title: "BƯỚC 2: LẬP ĐỘI & NGHE HƯỚNG DẪN",
      description:
        "Người chơi được chia thành các đội, mỗi đội 2-3 người. Quản trò sẽ trực tiếp hướng dẫn chi tiết luật chơi, cách sử dụng tiền trong game.",
      details: [
        "Chia thành các đội cạnh tranh nhau",
        "Mỗi đội gồm 2-3 người, có 3-4 đội cùng lúc",
        "Quản trò hướng dẫn luật chơi tổng quát",
      ],
    },
    {
      id: 3,
      title: "BƯỚC 3: CHINH PHỤC MỤC TIÊU",
      description:
        "Các đội phối hợp giải quyết thử thách để thu thập tiền, từ đó mua, sở hữu và phát triển tài sản. Đội đạt được số tiền cao nhất sẽ trở thành nhà tỷ phú.",
      details: [
        "Hoàn thành thử thách để thu thập tiền",
        "Mua và phát triển tài sản trên bàn cờ",
        "Đội có số tiền cao nhất thắng cuộc",
      ],
    },
  ],
  en: [
    {
      id: 1,
      title: "STEP 1: CHOOSE A THEME",
      description:
        "Each time you play, choose one of 3 themes: Lands of Vietnam, Living Villages, or Traditional Crafts. Same rules but different settings and challenges.",
      details: [
        "Lands of Vietnam: Explore provinces and cultural regions",
        "Living Villages: Experience rural Vietnam with folk traditions",
        "Traditional Crafts: Discover traditional craft villages",
      ],
    },
    {
      id: 2,
      title: "STEP 2: FORM YOUR TEAM & LEARN RULES",
      description:
        "Players are divided into teams of 2-3 people. Our staff will guide you through the game rules, money system, and gameplay mechanics.",
      details: [
        "Form competitive teams",
        "Each team has 2-3 people, 3-4 teams play together",
        "Staff explains the complete rules",
      ],
    },
    {
      id: 3,
      title: "STEP 3: CONQUER THE OBJECTIVES",
      description:
        "Teams work together to solve challenges and earn money. Use money to buy and develop assets. The team with the most money wins!",
      details: [
        "Solve challenges to earn money",
        "Buy and develop assets on the board",
        "Highest money team wins",
      ],
    },
  ],
}

export default function InstructionsBlock() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const { language, t } = useLanguage()

  const steps = language === "vi" ? stepsData.vi : stepsData.en

  return (
    <>
      <section id="instructions" className="min-h-screen bg-red-900 flex items-center pt-24 pb-12 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Title */}
            <div>
              <h2 className="text-5xl lg:text-6xl font-bold text-yellow-400 leading-tight">
                {language === "vi" ? "HƯỚNG DẪN" : "HOW TO"}
                <br />
                {language === "vi" ? "CÁCH CHƠI" : "PLAY"}
              </h2>
            </div>

            {/* Right - Content Slider */}
            <div className="space-y-8">
              <div className="bg-red-800/50 border-2 border-yellow-400 rounded-xl p-10 min-h-screen">
                <h3 className="text-4xl font-bold text-yellow-400 mb-6">{steps[currentStep].title}</h3>
                <p className="text-white text-xl leading-relaxed mb-8">{steps[currentStep].description}</p>

                {/* Details List */}
                <ul className="space-y-4">
                  {steps[currentStep].details.map((detail, idx) => (
                    <li key={idx} className="flex gap-3 text-white text-lg">
                      <span className="text-yellow-400 font-bold">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length)}
                  className="p-3 rounded-full bg-yellow-400 text-red-900 hover:bg-yellow-300 transition"
                >
                  ←
                </button>

                <div className="flex gap-2">
                  {steps.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentStep(idx)}
                      className={`w-3 h-3 rounded-full transition ${
                        idx === currentStep ? "bg-yellow-400" : "bg-yellow-400/40"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setCurrentStep((prev) => (prev + 1) % steps.length)}
                  className="p-3 rounded-full bg-yellow-400 text-red-900 hover:bg-yellow-300 transition"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isBookingOpen && <BookingModal onClose={() => setIsBookingOpen(false)} />}
    </>
  )
}
