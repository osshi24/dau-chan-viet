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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Booking submitted:", formData)
    onClose()
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
                <option value="cam-lang">Cắm Lăng</option>
                <option value="loi-thoat">Lời Thoát</option>
                <option value="huyet-ngai">Huyết Ngái</option>
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
              className="w-full bg-accent text-accent-foreground py-3 rounded-lg hover:opacity-90 transition font-semibold mt-6"
            >
              HOÀN TẤT ĐẶT PHÒNG
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
