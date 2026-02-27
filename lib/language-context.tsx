"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type Language = "vi" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  vi: {
    "header.trang_chu": "TRANG CHỦ ^^",
    "header.booking": "ĐẶT PHÒNG",
    "header.instructions": "CÁCH CHƠI",
    "header.pricing": "BẢNG GIÁ",
    "header.reviews": "FEEDBACK",
    "header.contact": "LIÊN HỆ",
    "hero.title": "HÀNH TRÌNH MIỀN ĐẤT VIỆT",
    "hero.description":
      "Khám phá văn hoá Việt Nam qua trò chơi Monopoly độc đáo. Mỗi tỉnh thành mang đến một lát cắt văn hoá khác nhau, tạo nên trải nghiệm phong phú và sống động.",
    "hero.button": "ĐẶT PHÒNG NGAY",
    "hero.rooms": "Các chủ đề trò chơi:",
    "room1.title": "MIỀN ĐẤT VIỆT",
    "room1.desc": "Khám phá văn hoá các tỉnh thành Việt Nam",
    "room2.title": "LÀNG VIỆT SỐNG",
    "room2.desc": "Trải nghiệm làng quê Việt kết hợp tín ngưỡng dân gian",
    "room3.title": "LÀNG NGHỀ TRUYỀN THỐNG",
    "room3.desc": "Khám phá các làng nghề truyền thống Việt Nam",
    "instructions.title": "HƯỚNG DẪN CÁCH CHƠI",
    "instructions.step1": "BƯỚC 1: CHỌN CHỦ ĐỀ BÀN CHƠI",
    "instructions.step1_desc":
      "Mỗi lần chơi, bạn có thể chọn 1 trong 3 chủ đề: Miền Đất Việt, Làng Việt Sống, hoặc Làng Nghề Truyền Thống.",
    "instructions.step2": "BƯỚC 2: LẬP ĐỘI & NGHE HƯỚNG DẪN",
    "instructions.step2_desc":
      "Người chơi được chia thành các đội, mỗi đội 2-3 người. Quản trò sẽ trực tiếp hướng dẫn chi tiết luật chơi.",
    "instructions.step3": "BƯỚC 3: CHINH PHỤC MỤC TIÊU",
    "instructions.step3_desc":
      "Các đội phối hợp giải quyết thử thách để thu thập tiền và phát triển tài sản. Đội đạt được số tiền cao nhất sẽ trở thành nhà tỷ phú.",
    "instructions.button": "ĐẶT PHÒNG NGAY",
    "pricing.title": "BẢNG GIÁ",
    "pricing.person": "Người/1 pax",
    "pricing.button": "ĐẶT PHÒNG NGAY",
    "reviews.title": "FEEDBACK KHÁCH HÀNG",
    "reviews.view_more": "XEM TẤT CẢ",
    "review1.name": "Thảo Vy",
    "review1.text": "Sau khi chơi màn Miền Đất Việt, mình được tiếp xúc với đa dạng văn hoá ở mỗi thành phố, vùng miền. Không phải học văn hoá theo kiểu lý thuyết, mà cảm nhận được bằng trải nghiệm.",
    "review2.name": "Quốc Vinh",
    "review2.text": "Nhân viên thân thiện, dễ thương và rất nhiệt tình hướng dẫn. Mô hình trải nghiệm lạ, rất hay, sẽ quay lại chinh phục trong lần tới.",
    "review3.name": "Thanh Hương",
    "review3.text": "Lần đầu tiên trải nghiệm trong không gian lớn như thế này, rất phấn khích. Được khám phá các văn hoá của Việt Nam. Must try!",
    "contact.title": "THÔNG TIN LIÊN HỆ",
    "contact.address1": "Địa chỉ: Phường Hải Châu, Thành Phố Đà Nẵng",
    "contact.address2": "Hoạt động từ Thứ 2 - Chủ nhật, khung giờ 09:00 - 22:00",
    "contact.hotline": "HOTLINE: 0905316737",
    "contact.whatsapp": "Whatsapp: 0905316737",
    "contact.zalo": "ZALO: 0905316737",
    "contact.email": "Email: dauchanviet.official@gmail.com",
    "contact.fanpage": "Facebook: Dấu Chân Việt - Monopoly Experience Hub",
    "modal.name": "Họ và tên",
    "modal.phone": "Số điện thoại",
    "modal.email": "Email",
    "modal.date": "Ngày chơi",
    "modal.time": "Giờ chơi",
    "modal.room": "Chọn chủ đề",
    "modal.people": "Số người",
    "modal.submit": "ĐẶT PHÒNG",
    "modal.cancel": "ĐÓNG",
  },
  en: {
    "header.trang_chu": "HOME",
    "header.booking": "BOOKING",
    "header.instructions": "HOW TO PLAY",
    "header.reviews": "FEEDBACK",
    "header.contact": "CONTACT",
    "hero.title": "JOURNEY THROUGH VIETNAMESE LANDS",
    "hero.description":
      "Explore Vietnamese culture through a unique Monopoly game experience. Each province brings a different cultural perspective, creating a rich and vibrant experience.",
    "hero.button": "BOOK NOW",
    "hero.rooms": "Game themes:",
    "room1.title": "LANDS OF VIETNAM",
    "room1.desc": "Discover Vietnamese culture across provinces",
    "room2.title": "LIVING VIETNAMESE VILLAGES",
    "room2.desc": "Experience rural Vietnam with folk traditions",
    "room3.title": "TRADITIONAL CRAFTS",
    "room3.desc": "Explore traditional crafts villages of Vietnam",
    "instructions.title": "HOW TO PLAY",
    "instructions.step1": "STEP 1: CHOOSE A THEME",
    "instructions.step1_desc":
      "Each time you play, choose one of 3 themes: Lands of Vietnam, Living Villages, or Traditional Crafts.",
    "instructions.step2": "STEP 2: FORM YOUR TEAM",
    "instructions.step2_desc":
      "Players are divided into teams of 2-3 people each. Our staff will guide you through the game rules.",
    "instructions.step3": "STEP 3: CONQUER THE OBJECTIVES",
    "instructions.step3_desc":
      "Teams collaborate to solve challenges, earn money, and develop assets. The team with the most money becomes the tycoon.",
    "instructions.button": "BOOK NOW",
    "pricing.title": "PRICE LIST",
    "pricing.person": "Person/1 pax",
    "pricing.button": "BOOK NOW",
    "reviews.title": "CUSTOMER FEEDBACK",
    "reviews.view_more": "VIEW ALL",
    "review1.name": "Thao Vy",
    "review1.text": "After playing Lands of Vietnam, I experienced diverse cultures from different cities and regions. It's not just theoretical learning, but experiential discovery.",
    "review2.name": "Quoc Vinh",
    "review2.text": "Friendly and enthusiastic staff. This game experience is unique and interesting. I'll definitely come back to try other themes!",
    "review3.name": "Thanh Huong",
    "review3.text": "First time experiencing such a large-scale game space. Very exciting and got to explore Vietnamese cultures. Must try!",
    "contact.title": "CONTACT INFORMATION",
    "contact.address1": "Address: Hai Chau Ward, Da Nang City",
    "contact.address2": "Open Monday - Sunday, 09:00 - 22:00",
    "contact.hotline": "HOTLINE: 0905316737",
    "contact.whatsapp": "Whatsapp: 0905316737",
    "contact.zalo": "ZALO: 0905316737",
    "contact.email": "Email: dauchanviet.official@gmail.com",
    "contact.fanpage": "Fanpage: Dấu Chân Việt - Monopoly Experience Hub",
    "modal.name": "Full Name",
    "modal.phone": "Phone Number",
    "modal.email": "Email",
    "modal.date": "Game Date",
    "modal.time": "Time",
    "modal.room": "Select Theme",
    "modal.people": "Number of People",
    "modal.submit": "BOOK NOW",
    "modal.cancel": "CLOSE",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("vi")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null
    if (savedLanguage) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["vi"]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
