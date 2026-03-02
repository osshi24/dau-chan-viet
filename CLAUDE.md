# dau-chan-viet — Business Context

## Dự án là gì

Landing page cho escape room (phòng thoát hiểm) theo chủ đề văn hóa Việt Nam, được xây dựng với Next.js và deploy trên Vercel. Ứng dụng đồng bộ tự động với v0.app.

## Tech Stack

- **Framework:** Next.js 16.0.10 (App Router)
- **UI Library:** Radix UI, Tailwind CSS
- **State Management:** React Context (language-context.tsx)
- **Booking:** Google Sheets integration (no-cors POST)
- **Deployment:** Vercel
- **Analytics:** @vercel/analytics

## Cấu trúc dự án

```
app/
  layout.tsx            ← Root layout
  page.tsx              ← Home page (empty, delegates to RootContent)
components/
  root-content.tsx      ← Main content orchestrator
  booking-modal.tsx     ← Form đặt phòng, POST to Google Sheets
  hero-block.tsx        ← Hero section
  pricing-block.tsx     ← Bảng giá
  rooms-block.tsx       ← Giới thiệu các phòng
  reviews-block.tsx     ← Review khách hàng
  contact-block.tsx     ← Thông tin liên hệ
  instructions-block.tsx ← Hướng dẫn chơi
  header.tsx            ← Navigation + language toggle
  footer.tsx            ← Footer
  client-wrapper.tsx    ← Client-side wrapper
  theme-provider.tsx    ← Dark/light theme context
lib/
  utils.ts              ← Tailwind class merger (cn)
  language-context.tsx  ← i18n context (vi/en)
public/images/          ← Static assets
```

## Domain Logic

### Booking Flow
1. User mở BookingModal từ CTA buttons
2. Nhập: name, phone, date, time, room (3 options), players
3. Submit → POST JSON to `process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL`
4. Mode: `no-cors` → không validate response
5. Giả định success → show message → auto close modal sau 2s
6. Error → console.error + user message

### Rooms (3 phòng)
- **Làng Việt Sống** (lang-viet-song)
- **Làng Nghề Truyền Thống** (lang-nghe-truyen-thong)
- **Miền Đất Việt** (mien-dat-viet)

### Language Support
- Vietnamese (default)
- English
- Context: `lib/language-context.tsx`

## Quan trọng

- **Google Sheets URL** phải được cấu hình trong `.env.local`: `NEXT_PUBLIC_GOOGLE_SHEETS_URL`
- Xem `GOOGLE_SHEETS_SETUP.md` để setup webhook
- **no-cors mode** → không thể validate response thực tế từ Google Sheets
- Tất cả components dùng "use client" do có tương tác
- Sync tự động với v0.app — không chỉnh sửa trực tiếp trừ khi cần thiết

## Security Notes

- ⚠️ **NEXT_PUBLIC_** prefix → env var exposed to browser
- ⚠️ **no-cors** → blind POST, không verify thành công thật
- Console.log error vẫn leak sang production
- Không có validation phía server (Google Sheets script phải tự validate)
- Không có rate limiting cho booking form

## Known Issues

- Không có form validation bắt buộc (required fields)
- Không có phone number format validation
- Không có CAPTCHA → dễ spam
- Error handling giả định → user không biết thật sự thành công hay fail
