"use client"

import type React from "react"

import { X } from "lucide-react"
import { useState } from "react"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormErrors {
  name?: string
  phone?: string
  date?: string
  time?: string
  room?: string
  players?: string
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
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập họ tên"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Họ tên phải có ít nhất 2 ký tự"
    }

    // Validate phone (Vietnamese format: 10 digits starting with 0)
    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại"
    } else if (!/^0[0-9]{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Số điện thoại không hợp lệ (phải có 10 số, bắt đầu bằng 0)"
    }

    // Validate room
    if (!formData.room) {
      newErrors.room = "Vui lòng chọn phòng chơi"
    }

    // Validate date
    if (!formData.date) {
      newErrors.date = "Vui lòng chọn ngày"
    } else {
      const selectedDate = new Date(formData.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        newErrors.date = "Không thể chọn ngày trong quá khứ"
      }
    }

    // Validate time
    if (!formData.time) {
      newErrors.time = "Vui lòng chọn giờ"
    }

    // Validate players
    if (!formData.players) {
      newErrors.players = "Vui lòng chọn số người chơi"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const sanitizeInput = (value: string): string => {
    return value.trim().replace(/[<>]/g, '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitMessage("")

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Lấy URL từ environment variable
      const googleSheetsUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL

      if (!googleSheetsUrl) {
        throw new Error("Google Sheets URL chưa được cấu hình. Vui lòng xem file GOOGLE_SHEETS_SETUP.md")
      }

      // Sanitize input trước khi gửi
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        phone: sanitizeInput(formData.phone),
        date: formData.date,
        time: formData.time,
        room: formData.room,
        players: formData.players,
      }

      // Gửi data đến Google Sheets
      const response = await fetch(googleSheetsUrl, {
        method: "POST",
        mode: "no-cors", // Cần thiết cho Google Apps Script
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedData),
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
      setErrors({})

      // Đóng modal sau 2 giây
      setTimeout(() => {
        onClose()
        setSubmitMessage("")
      }, 2000)

    } catch (error) {
      // Remove console.error in production - use proper logging service instead
      if (process.env.NODE_ENV === 'development') {
        console.error("Booking error:", error)
      }
      setSubmitMessage("Có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ trực tiếp qua hotline.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl border border-border max-w-md w-full relative max-h-[90vh] overflow-y-auto">
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
              <label className="block text-sm font-semibold text-foreground mb-2">
                Họ tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Nhập họ tên"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value })
                  if (errors.name) setErrors({ ...errors, name: undefined })
                }}
                className={`w-full bg-secondary text-foreground px-4 py-2 rounded-lg border ${
                  errors.name ? 'border-red-500' : 'border-border'
                } placeholder:text-muted-foreground focus:outline-none focus:border-accent`}
                required
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="0xxx xxx xxx"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value })
                  if (errors.phone) setErrors({ ...errors, phone: undefined })
                }}
                className={`w-full bg-secondary text-foreground px-4 py-2 rounded-lg border ${
                  errors.phone ? 'border-red-500' : 'border-border'
                } placeholder:text-muted-foreground focus:outline-none focus:border-accent`}
                required
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Chọn phòng chơi <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.room}
                onChange={(e) => {
                  setFormData({ ...formData, room: e.target.value })
                  if (errors.room) setErrors({ ...errors, room: undefined })
                }}
                className={`w-full bg-secondary text-foreground px-4 py-2 rounded-lg border ${
                  errors.room ? 'border-red-500' : 'border-border'
                } focus:outline-none focus:border-accent`}
                required
              >
                <option value="">-- Chọn phòng --</option>
                <option value="lang-viet-song">Làng Việt Sống</option>
                <option value="lang-nghe-truyen-thong">Làng Nghề Truyền Thống</option>
                <option value="mien-dat-viet">Miền Đất Việt</option>
              </select>
              {errors.room && <p className="text-red-500 text-xs mt-1">{errors.room}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Ngày <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  min={getTodayDate()}
                  onChange={(e) => {
                    setFormData({ ...formData, date: e.target.value })
                    if (errors.date) setErrors({ ...errors, date: undefined })
                  }}
                  className={`w-full bg-secondary text-foreground px-4 py-2 rounded-lg border ${
                    errors.date ? 'border-red-500' : 'border-border'
                  } focus:outline-none focus:border-accent`}
                  required
                />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Giờ <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => {
                    setFormData({ ...formData, time: e.target.value })
                    if (errors.time) setErrors({ ...errors, time: undefined })
                  }}
                  className={`w-full bg-secondary text-foreground px-4 py-2 rounded-lg border ${
                    errors.time ? 'border-red-500' : 'border-border'
                  } focus:outline-none focus:border-accent`}
                  required
                />
                {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Số người chơi <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.players}
                onChange={(e) => {
                  setFormData({ ...formData, players: e.target.value })
                  if (errors.players) setErrors({ ...errors, players: undefined })
                }}
                className={`w-full bg-secondary text-foreground px-4 py-2 rounded-lg border ${
                  errors.players ? 'border-red-500' : 'border-border'
                } focus:outline-none focus:border-accent`}
                required
              >
                <option value="">-- Chọn số người --</option>
                <option value="2-4">2-4 người</option>
                <option value="4-6">4-6 người</option>
                <option value="6-8">6-8 người</option>
              </select>
              {errors.players && <p className="text-red-500 text-xs mt-1">{errors.players}</p>}
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
