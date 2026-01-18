"use client"

import type React from "react"

import { X } from "lucide-react"
import { useState } from "react"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    room: "",
    players: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      // Lấy URL từ environment variable
      const googleSheetsUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL

      if (!googleSheetsUrl) {
        throw new Error("Google Sheets URL chưa được cấu hình. Vui lòng xem file GOOGLE_SHEETS_SETUP.md")
      }

      // Gửi data đến Google Sheets
      const response = await fetch(googleSheetsUrl, {
        method: "POST",
        mode: "no-cors", // Cần thiết cho Google Apps Script
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      // no-cors mode không trả về response, nên giả định thành công
      setSubmitMessage("Đặt phòng thành công! Chúng tôi sẽ liên hệ với bạn sớm.")
      
      // Reset form
      setFormData({
        name: "",
        phone: "",
        date: "",
        time: "",
        room: "",
        players: "",
      })

      // Đóng modal sau 2 giây
      setTimeout(() => {
        onClose()
        setSubmitMessage("")
      }, 2000)

    } catch (error) {
      console.error("Booking error:", error)
      setSubmitMessage("Có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ trực tiếp qua hotline.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl border border-border max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title Section with Background */}
        <div className="bg-gradient-to-r from-red-900 to-red-800 p-6 rounded-t-xl">
          <h2 className="text-3xl font-bold text-yellow-400 text-center">ĐẶT PHÒNG NGAY</h2>
          <p className="text-white/80 text-center text-sm mt-2">Đặt lịch trải nghiệm của bạn ngay hôm nay</p>
        </div>

        <div className="p-8">

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Họ tên</label>
              <input
                type="text"
                placeholder="Nhập họ tên"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-secondary text-foreground px-4 py-2 rounded-lg border border-border placeholder:text-muted-foreground focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Số điện thoại</label>
              <input
                type="tel"
                placeholder="0xxx xxx xxx"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-secondary text-foreground px-4 py-2 rounded-lg border border-border placeholder:text-muted-foreground focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Chọn phòng chơi</label>
              <select
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                className="w-full bg-secondary text-foreground px-4 py-2 rounded-lg border border-border focus:outline-none focus:border-accent"
              >
                <option value="">-- Chọn phòng --</option>
                <option value="lang-viet-song">Làng Việt Sống</option>
                <option value="lang-nghe-truyen-thong">Làng Nghề Truyền Thống</option>
                <option value="mien-dat-viet">Miền Đất Việt</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Ngày</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-secondary text-foreground px-4 py-2 rounded-lg border border-border focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Giờ</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full bg-secondary text-foreground px-4 py-2 rounded-lg border border-border focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Số người chơi</label>
              <select
                value={formData.players}
                onChange={(e) => setFormData({ ...formData, players: e.target.value })}
                className="w-full bg-secondary text-foreground px-4 py-2 rounded-lg border border-border focus:outline-none focus:border-accent"
              >
                <option value="">-- Chọn số người --</option>
                <option value="2-4">2-4 người</option>
                <option value="4-6">4-6 người</option>
                <option value="6-8">6-8 người</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent text-accent-foreground py-3 rounded-lg hover:opacity-90 transition font-semibold mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "ĐANG XỬ LÝ..." : "HOÀN TẤT ĐẶT PHÒNG"}
            </button>

            {/* Success/Error Message */}
            {submitMessage && (
              <div className={`mt-4 p-3 rounded-lg text-center text-sm ${
                submitMessage.includes("thành công") 
                  ? "bg-green-500/20 text-green-300 border border-green-500/50" 
                  : "bg-red-500/20 text-red-300 border border-red-500/50"
              }`}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
