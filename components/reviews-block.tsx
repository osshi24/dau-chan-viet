"use client"

import { useLanguage } from "@/lib/language-context"

const reviewsData = {
  vi: [
    {
      id: 1,
      name: "Thảo Vy",
      rating: 5,
      text: "Sau khi chơi màn Miền Đất Việt, mình được tiếp xúc với đa dạng văn hoá ở mỗi thành phố, vùng miền. Không phải học văn hoá theo kiểu lý thuyết, mà cảm nhận được bằng trải nghiệm chơi cùng cả nhóm.",
    },
    {
      id: 2,
      name: "Quốc Vinh",
      rating: 5,
      text: "Nhân viên thân thiện, dễ thương và rất nhiệt tình hướng dẫn người chơi, nhất là chịu khó chỉ dẫn những người lần đầu không biết chơi như mình. Mô hình trải nghiệm lạ, rất hay, sẽ quay lại chinh phục trong lần tới.",
    },
    {
      id: 3,
      name: "Thanh Hương",
      rating: 5,
      text: "Mình rất thích chơi Cờ Tỷ Phú với bạn bè, nay lần đầu tiên mình được trải nghiệm trong không gian lớn như thế này, mình rất phấn khích, và ngạc nhiên hơn nữa là được khám phá các văn hoá của Việt Nam. Must try!",
    },
  ],
  en: [
    {
      id: 1,
      name: "Thao Vy",
      rating: 5,
      text: "After playing Lands of Vietnam, I experienced diverse cultures from different cities and regions. It's not just theoretical learning, but true experiential discovery with friends.",
    },
    {
      id: 2,
      name: "Quoc Vinh",
      rating: 5,
      text: "Friendly and enthusiastic staff. They patiently guided even first-time players like me. The game experience is unique and interesting. I'll definitely come back for more themes!",
    },
    {
      id: 3,
      name: "Thanh Huong",
      rating: 5,
      text: "First time experiencing such a large-scale game space. Very exciting and got to explore Vietnamese cultures. The whole experience was amazing. Must try!",
    },
  ],
}

export default function ReviewsBlock() {
  const { language, t } = useLanguage()

  const reviews = language === "vi" ? reviewsData.vi : reviewsData.en

  return (
    <section id="reviews" className="min-h-screen bg-red-900 flex items-center pt-24 pb-12">
      <div className="container mx-auto px-4 relative z-10 w-full">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 text-yellow-400">
          {t("reviews.title")}
        </h2>

        {/* Reviews Cards - 3 static cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-red-800/50 border-2 border-yellow-400 rounded-xl p-8 h-full flex flex-col justify-between hover:bg-red-800/70 transition relative"
            >
              {/* Left border accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 via-yellow-300 to-yellow-400 rounded-l-xl" />

              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">
                    ⭐
                  </span>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-yellow-100 text-base mb-6 italic leading-relaxed flex-grow">
                "{review.text}"
              </p>

              {/* Reviewer Name */}
              <div className="text-yellow-400 font-bold text-lg">- {review.name}</div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <button className="px-8 py-3 border-2 border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400/10 transition font-semibold">
            {t("reviews.view_more")}
          </button>
        </div>
      </div>
    </section>
  )
}
