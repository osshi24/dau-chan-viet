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
  return (
    <section
      id="pricing"
      className="min-h-screen bg-cover bg-center flex items-center py-12"
      style={{
        backgroundImage: 'url(/pricing-table.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/30" />
    </section>
  )
}
