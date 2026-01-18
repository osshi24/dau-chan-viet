"use client"

import { useLanguage } from "@/lib/language-context"

const pricingData = {
  vi: [
    {
      id: 1,
      name: "MIỀN ĐẤT VIỆT",
      subtitle: "Khám Phá Văn Hoá Các Tỉnh Thành",
      timings: ["60 phút", "120 phút"],
      pricing: {
        regular: [159, 259],
        student: [129, 199],
      },
      schedule: "Thứ 2 - Trước 17:00 Thứ 6\nSau 17:00 Thứ 6, Thứ 7, Chủ nhật",
    },
    {
      id: 2,
      name: "LÀNG VIỆT SỐNG",
      subtitle: "Làng Quê Với Tín Ngưỡng Dân Gian",
      timings: ["60 phút", "120 phút"],
      pricing: {
        regular: [139, 239],
        student: [99, 179],
      },
      schedule: "Thứ 2 - Trước 17:00 Thứ 6\nSau 17:00 Thứ 6, Thứ 7, Chủ nhật",
    },
    {
      id: 3,
      name: "LÀNG NGHỀ TRUYỀN THỐNG",
      subtitle: "Khám Phá Các Làng Nghề Việt Nam",
      timings: ["60 phút", "120 phút"],
      pricing: {
        regular: [149, 249],
        student: [119, 189],
      },
      schedule: "Thứ 2 - Trước 17:00 Thứ 6\nSau 17:00 Thứ 6, Thứ 7, Chủ nhật",
    },
  ],
  en: [
    {
      id: 1,
      name: "LANDS OF VIETNAM",
      subtitle: "Discover Provincial Cultures",
      timings: ["60 minutes", "120 minutes"],
      pricing: {
        regular: [159, 259],
        student: [129, 199],
      },
      schedule: "Mon - Before 17:00 Fri\nFrom 17:00 Fri, Sat, Sun",
    },
    {
      id: 2,
      name: "LIVING VILLAGES",
      subtitle: "Rural Vietnam & Folk Traditions",
      timings: ["60 minutes", "120 minutes"],
      pricing: {
        regular: [139, 239],
        student: [99, 179],
      },
      schedule: "Mon - Before 17:00 Fri\nFrom 17:00 Fri, Sat, Sun",
    },
    {
      id: 3,
      name: "TRADITIONAL CRAFTS",
      subtitle: "Explore Vietnamese Craft Villages",
      timings: ["60 minutes", "120 minutes"],
      pricing: {
        regular: [149, 249],
        student: [119, 189],
      },
      schedule: "Mon - Before 17:00 Fri\nFrom 17:00 Fri, Sat, Sun",
    },
  ],
}

export default function PricingBlock() {
  const { language } = useLanguage()
  const pricing = language === 'vi' ? pricingData.vi : pricingData.en

  return (
    <section
      id="pricing"
      className="min-h-screen bg-red-900 flex items-center py-24 relative overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/pricing-table.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <h2 className="text-4xl lg:text-5xl font-bold text-white text-center mb-12">
          {language === 'vi' ? 'BẢNG GIÁ' : 'PRICING'}
        </h2>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricing.map((item) => (
            <div
              key={item.id}
              className="bg-red-800/80 backdrop-blur-sm border-2 border-yellow-400 rounded-2xl p-6 lg:p-8 hover:transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              {/* Card Header */}
              <div className="text-center mb-6 pb-6 border-b-2 border-yellow-400/30">
                <h3 className="text-2xl lg:text-3xl font-bold text-yellow-400 mb-2">
                  {item.name}
                </h3>
                <p className="text-white/80 text-sm lg:text-base">{item.subtitle}</p>
              </div>

              {/* Pricing Table */}
              <div className="space-y-4 mb-6">
                {/* Header Row */}
                <div className="grid grid-cols-3 gap-2 text-center pb-3 border-b border-yellow-400/30">
                  <div className="text-yellow-400 font-semibold text-sm"></div>
                  <div className="text-yellow-400 font-semibold text-sm">{item.timings[0]}</div>
                  <div className="text-yellow-400 font-semibold text-sm">{item.timings[1]}</div>
                </div>

                {/* Regular Price Row */}
                <div className="grid grid-cols-3 gap-2 text-center items-center">
                  <div className="text-white text-sm font-medium text-left">
                    {language === 'vi' ? 'Thường' : 'Regular'}
                  </div>
                  <div className="text-white text-lg font-bold">{item.pricing.regular[0]}K</div>
                  <div className="text-white text-lg font-bold">{item.pricing.regular[1]}K</div>
                </div>

                {/* Student Price Row */}
                <div className="grid grid-cols-3 gap-2 text-center items-center">
                  <div className="text-white text-sm font-medium text-left">
                    {language === 'vi' ? 'Học sinh' : 'Student'}
                  </div>
                  <div className="text-white text-lg font-bold">{item.pricing.student[0]}K</div>
                  <div className="text-white text-lg font-bold">{item.pricing.student[1]}K</div>
                </div>
              </div>

              {/* Schedule */}
              <div className="bg-red-900/50 rounded-lg p-4 mt-6">
                <p className="text-yellow-400 font-semibold text-sm mb-2">
                  {language === 'vi' ? 'Lịch áp dụng:' : 'Schedule:'}
                </p>
                <p className="text-white text-xs lg:text-sm whitespace-pre-line leading-relaxed">
                  {item.schedule}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="text-center mt-12">
          <p className="text-white/80 text-sm lg:text-base">
            {language === 'vi' 
              ? '* Giá có thể thay đổi vào các dịp lễ và sự kiện đặc biệt'
              : '* Prices may vary during holidays and special events'}
          </p>
        </div>
      </div>
    </section>
  )
}
