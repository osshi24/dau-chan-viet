'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import BookingModal from './booking-modal'

const roomsData = [
  {
    id: 1,
    titleVi: 'MIỀN ĐẤT VIỆT',
    titleEn: 'LANDS OF VIETNAM',
    descVi: 'Khám phá văn hoá các tỉnh thành Việt Nam',
    descEn: 'Discover Vietnamese culture across provinces',
    image: '/room1-mienn-dat-viet.jpg',
    fullContentVi: `Mô tả: Khám phá văn hoá các tỉnh thành Việt Nam
Số người chơi: 3 - 4 đội, 2 - 3 người/ đội
Khi mỗi vùng đất đều mang trong mình một câu chuyện, liệu bạn có đủ bản lĩnh để chinh phục cả bản đồ Việt Nam?
Một tấm bản đồ đặc biệt đã mở ra hành trình xuyên suốt các tỉnh thành, nơi mỗi bước đi không chỉ là một quyết định chiến thuật mà còn là cơ hội khám phá bản sắc văn hoá đa dạng của đất nước. Mỗi tỉnh thành là một câu chuyện riêng, mỗi lựa chọn đều ảnh hưởng đến cục diện cuộc chơi.

Vì sao bạn nên trải nghiệm chủ đề này?
• Hành trình đầy màu sắc: Mỗi tỉnh thành mang đến một lát cắt văn hoá khác nhau
• Chiến thuật & đồng đội: Trò chơi đề cao sự phối hợp nhóm
• Dễ tiếp cận – dễ cuốn hút: Phù hợp với cả người chơi mới`,
    fullContentEn: `Description: Discover Vietnamese culture across provinces
Players: 3-4 teams, 2-3 people per team
When each land carries its own story, do you have the courage to conquer the entire map of Vietnam?
A special map has opened a journey across provinces, where each step is not just a tactical decision but an opportunity to discover the diverse cultural identity of the country. Each province is a separate story, each choice affects the game.

Why should you experience this theme?
• Colorful journey: Each province brings a different cultural perspective
• Strategy & teamwork: The game emphasizes group cooperation
• Easy to access – Easy to enjoy: Suitable for both new and experienced players`,
  },
  {
    id: 2,
    titleVi: 'LÀNG VIỆT SỐNG',
    titleEn: 'LIVING VILLAGES',
    descVi: 'Khám phá văn hoá làng quê Việt Nam kết hợp tín ngưỡng dân gian',
    descEn: 'Experience rural Vietnam with folk traditions',
    image: '/room2-lang-viet-song.jpg',
    fullContentVi: `Mô tả: Khám phá văn hoá làng quê Việt Nam kết hợp yếu tố tín ngưỡng dân gian
Số người chơi: 3 - 4 đội, 2 - 3 người/ đội
Giữa nhịp sống yên bình của làng quê Việt Nam, không chỉ có mái đình, giếng nước hay những con đường đất quen thuộc, mà còn tồn tại những niềm tin cổ xưa được truyền lại qua nhiều thế hệ.

Vì sao bạn nên trải nghiệm chủ đề này?
• Không gian đậm bản sắc: Tái hiện đời sống làng quê cùng những niềm tin dân gian gần gũi
• Huyền bí vừa đủ: Yếu tố truyền thuyết được lồng ghép tinh tế
• Chiến thuật & gắn kết: Trò chơi đề cao sự phối hợp đội nhóm`,
    fullContentEn: `Description: Experience rural Vietnam with folk traditions
Players: 3-4 teams, 2-3 people per team
In the peaceful rhythm of Vietnamese villages, there is not only communal houses and wells, but also ancient beliefs passed down through generations.

Why should you experience this theme?
• Distinctive space: Recreate village life with folk traditions
• Perfect mystery: Legends and traditions woven subtly
• Strategy & connection: Emphasizes teamwork and cooperation`,
  },
  {
    id: 3,
    titleVi: 'LÀNG NGHỀ TRUYỀN THỐNG',
    titleEn: 'TRADITIONAL CRAFTS',
    descVi: 'Trải nghiệm khám phá văn hoá làng nghề truyền thống Việt Nam',
    descEn: 'Explore traditional crafts villages of Vietnam',
    image: '/room3-lang-nghe.jpg',
    fullContentVi: `Mô tả: Trải nghiệm khám phá văn hoá làng nghề truyền thống Việt Nam
Số người chơi: 3 - 4 đội, 2 - 3 người/ đội
Ẩn sau những con ngõ nhỏ và nhịp sống yên bình của làng quê Việt là những làng nghề truyền thống đã tồn tại qua nhiều thế hệ. Mỗi nghề không chỉ tạo ra sản phẩm thủ công, mà còn lưu giữ câu chuyện về sự khéo léo, sáng tạo và tinh thần lao động bền bỉ.

Vì sao bạn nên trải nghiệm chủ đề này?
• Khám phá sáng tạo: Tiếp cận các giá trị thủ công truyền thống dưới góc nhìn mới mẻ
• Vui tươi – dễ tiếp cận: Không khí nhẹ nhàng, phù hợp với nhiều nhóm người chơi
• Chiến thuật & phối hợp: Trò chơi khuyến khích làm việc nhóm`,
    fullContentEn: `Description: Explore traditional crafts villages of Vietnam
Players: 3-4 teams, 2-3 people per team
Hidden behind small alleys and the peaceful rhythm of villages are traditional craft villages that have existed for generations. Each craft not only creates handmade products but also preserves stories of skill, creativity, and perseverance.

Why should you experience this theme?
• Creative discovery: Approach traditional crafts from a fresh perspective
• Fun and accessible: Light atmosphere suitable for many groups
• Strategy & cooperation: Encourages teamwork and collaboration`,
  },
]

export default function RoomsBlock() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const { language, t } = useLanguage()

  const current = roomsData[currentIndex]

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + roomsData.length) % roomsData.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % roomsData.length)
  }

  return (
    <>
      <section id="rooms" className="min-h-screen bg-red-900 flex items-center pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-yellow-400">
                {language === 'vi' ? current.titleVi : current.titleEn}
              </h2>
              <p className="text-white text-lg leading-relaxed whitespace-pre-line">
                {language === 'vi' ? current.fullContentVi : current.fullContentEn}
              </p>

              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full px-8 py-3 bg-yellow-400 text-red-900 rounded-lg hover:bg-yellow-300 transition font-semibold text-lg"
              >
                {t('hero.button')}
              </button>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-8">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-yellow-400 text-red-900 hover:bg-yellow-300 transition"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="flex gap-2">
                  {roomsData.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-3 h-3 rounded-full transition ${
                        idx === currentIndex ? 'bg-yellow-400' : 'bg-yellow-400/40'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-yellow-400 text-red-900 hover:bg-yellow-300 transition"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Right - Image */}
            <div className="relative h-96 lg:h-full min-h-96">
              <img
                src={current.image || "/placeholder.svg"}
                alt={language === 'vi' ? current.titleVi : current.titleEn}
                className="w-full h-full object-cover rounded-lg border-4 border-yellow-400"
              />
          </div>
        </div>
      </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  )
}
