# Hướng Dẫn Setup Google Sheets để Nhận Data Đặt Phòng

## Bước 1: Tạo Google Sheet

1. Truy cập [Google Sheets](https://sheets.google.com)
2. Tạo một Google Sheet mới
3. Đặt tên Sheet: "Dấu Chân Việt - Đặt Phòng"
4. Tạo header ở dòng đầu tiên với các cột:
   - A1: `Timestamp`
   - B1: `Họ tên`
   - C1: `Số điện thoại`
   - D1: `Phòng chơi`
   - E1: `Ngày`
   - F1: `Giờ`
   - G1: `Số người chơi`

## Bước 2: Tạo Google Apps Script

1. Trong Google Sheet, click **Extensions** → **Apps Script**
2. Xóa code mặc định và paste code sau:

```javascript
function doPost(e) {
  try {
    // Lấy dữ liệu từ request
    const data = JSON.parse(e.postData.contents);
    
    // Lấy sheet đầu tiên
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Thêm dòng mới với dữ liệu
    sheet.appendRow([
      new Date(), // Timestamp
      data.name,
      data.phone,
      data.room,
      data.date,
      data.time,
      data.players
    ]);
    
    // Trả về kết quả thành công
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: 'success', 
        message: 'Đặt phòng thành công!' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Trả về lỗi nếu có
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: 'error', 
        message: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (icon đĩa mềm)

## Bước 3: Deploy Web App

1. Click **Deploy** → **New deployment**
2. Click icon ⚙️ bên cạnh "Select type" → chọn **Web app**
3. Điền thông tin:
   - **Description**: "Booking API v1"
   - **Execute as**: Me (email của bạn)
   - **Who has access**: Anyone
4. Click **Deploy**
5. Click **Authorize access**
6. Chọn tài khoản Google của bạn
7. Click **Advanced** → **Go to [Project name] (unsafe)**
8. Click **Allow**
9. **Copy Web App URL** - URL này sẽ có dạng:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

## Bước 4: Cấu hình trong Website

1. Mở file `.env.local` trong project (nếu chưa có thì tạo mới)
2. Thêm dòng sau với URL bạn vừa copy:

```env
NEXT_PUBLIC_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/AKfycby.../exec
```

3. Save file và restart dev server:
```bash
npm run dev
```

## Kiểm Tra

1. Mở website
2. Click "Đặt Phòng Ngay"
3. Điền form và submit
4. Check Google Sheet xem dữ liệu có xuất hiện không

## Lưu Ý

- Mỗi lần thay đổi code trong Apps Script, cần deploy lại (New deployment)
- URL sẽ thay đổi mỗi lần deploy mới, nhớ update lại trong `.env.local`
- Data sẽ tự động lưu vào Google Sheet khi user submit form

## Troubleshooting

**Lỗi 403 Forbidden:**
- Kiểm tra lại "Who has access" phải là "Anyone"
- Deploy lại web app

**Data không lưu:**
- Kiểm tra URL trong `.env.local` có đúng không
- Mở Console (F12) xem có lỗi gì không
- Kiểm tra tên các cột trong sheet có khớp với code không
