# Cleanup Report

## 1) Tổng quan
- Chuẩn hóa đường dẫn href/src về dạng relative để chạy đúng trên macOS và mọi môi trường tĩnh.
- Giữ nguyên logic, chỉ chỉnh sửa tham chiếu tài nguyên, comment mô tả flow, và cập nhật tài liệu bàn giao.
- Không thay đổi cấu trúc thư mục hay thêm tính năng mới.

## 2) Thay đổi theo file
- `index.html`: Chuyển tất cả href/src về đường dẫn tương đối (favicon, navbar, scripts), bổ sung header comment mô tả vai trò trang.
- `index.css`: Sửa `@import` sang relative (`./footer.css`) để khớp cấu trúc hiện tại.
- `Navbar/navbar.js`: Chuẩn hóa path bằng `document.currentScript` (fetch navbar + asset links hoạt động ở mọi depth), thêm JSDoc/ghi chú, set active link ngay khi navbar inject để mobile menu luôn highlight trang hiện tại, và sắp xếp lại việc gán src/href trước khi inject DOM.
- `breadcrumbs.js`: Tính toán breadcrumb theo root của script thay vì `/`, thêm comment giải thích để chạy đúng khi serve từ subfolder/file URL.
- `PEOPLE/people.html`: Chuyển toàn bộ asset/script/css sang đường dẫn tương đối, thêm header comment, thay placeholder modal bằng logo có sẵn để tránh 404.
- `PEOPLE/member.html`: Bổ sung thẻ `<html>`, chuyển asset/script/css sang relative, thêm header comment.
- `PEOPLE/people.css`, `PEOPLE/member.css`: Sửa `@import` footer về `../footer.css`.
- `bio-modal.js`: Cập nhật đường dẫn ảnh mẫu sang relative (`../assets/...`) cho modal hoạt động khi gọi từ trang People.
- `.env.example`: Thêm file placeholder khẳng định dự án tĩnh chưa cần biến môi trường.
- `README.md`: Viết lại đầy đủ overview, stack, cấu trúc, module, setup, deploy, troubleshooting.

## 3) Những thứ đã xóa
- Không xóa file/mã nguồn nào.

## 4) Nghi ngờ nhưng giữ nguyên (cần xác minh thêm)
- `index.html` hiện vừa import `footer.css` trong `<head>` vừa `@import` trong `index.css`; giữ nguyên để không thay đổi thứ tự load, có thể hợp nhất sau khi kiểm thử giao diện.
- `Navbar/navbar.html` vẫn chứa href/src tuyệt đối nhưng đã được `normalizeNavbarAssets` ghi đè trước khi inject; giữ nguyên để tránh thay đổi markup gốc, có thể dọn nếu xác nhận không dùng trực tiếp.

## 5) File đã thêm comment / quy ước comment
- Header/bối cảnh thêm ở: `index.html`, `PEOPLE/people.html`, `PEOPLE/member.html`, `Navbar/navbar.js`, `breadcrumbs.js`.
- Ngôn ngữ comment: English ngắn gọn, tập trung mô tả intent/flow, không lặp lại code hiển nhiên.

## 6) Kết quả lint/test/build
- Không có script lint/test/build trong repo; chưa chạy kiểm thử tự động. Đã kiểm tra thủ công cấu trúc đường dẫn và tham chiếu tài nguyên.
