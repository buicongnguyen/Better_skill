## Sửa các tham số này
PROJECT_NAME: Frontier Command
GAME_IDEA: RTS 3D nhỏ: thu thập hợp kim, xây căn cứ, huấn luyện quân và phá sở chỉ huy của một đối thủ AI.
V1_SCOPE: Một bản đồ, một phe dùng chung, một tài nguyên, công nhân, một loại quân chiến đấu, sở chỉ huy, một nhà sản xuất quân, thắng/thua/tạm dừng/chơi lại.
EXCLUSIONS: Nhiều người chơi, chiến dịch, tài khoản, dịch vụ trả phí, nhiều phe, sương mù chiến tranh và cây công nghệ lớn.
PLATFORM: DESKTOP_BROWSER
INPUT: MOUSE_KEYBOARD
ENGINE: AUTO
ASSET_TOOL: BLENDER
PROJECT_CONTEXT: EMPTY
REFERENCE: NONE
OUTPUT_LANGUAGE: Tiếng Việt
OUTPUT_MODE: CHAT
OUTPUT_FILE: PLAN.md

## Lựa chọn và tính nhất quán
- PLATFORM: DESKTOP_BROWSER hoặc WINDOWS_DESKTOP.
- ENGINE: AUTO, GODOT hoặc THREE (TypeScript/Vite/Three.js).
  Giữ engine hiện có hoặc đã được chọn rõ.
  Với AUTO và dự án trống, đề xuất một lộ trình tương thích PLATFORM và giải thích ngắn gọn đánh đổi chính.
  Nêu xung đột engine/nền tảng trước các quyết định phụ thuộc; không âm thầm thêm lớp đóng gói native hay đổi đích.
- ASSET_TOOL: BLENDER hoặc PRIMITIVES.
  Lên kế hoạch dùng hình khối tạm trước và kiểm tra nhập asset trước khi làm chi tiết bằng Blender.
- PROJECT_CONTEXT: EMPTY hoặc đường dẫn/tài liệu dự án liên quan được dán vào.
  REFERENCE: NONE hoặc ví dụ đính kèm/đường dẫn có thể truy cập.
  Yêu cầu phải dùng được khi không có tài liệu mẫu; chỉ học cấu trúc từ mẫu, không để mẫu ghi đè yêu cầu ở đây.
- Chọn mô hình thật trong ứng dụng trước khi gửi, ví dụ GPT-6 Astra trong Codex hoặc mô hình Claude có sẵn trong Claude Code.
  Văn bản tham số không cấp công cụ hay đổi mô hình.
- OUTPUT_MODE: CHAT trả Markdown để lưu thành OUTPUT_FILE.
  FILE chỉ ghi tài liệu đó khi có công cụ hệ thống tệp và đúng thư mục dự án.
  Giữ tệp đã có bằng cách dùng tên bản ứng viên chưa tồn tại; nếu không thể ghi, trả tài liệu trong chat và nêu giới hạn.

## Mục tiêu
Tạo toàn bộ nội dung PLAN.md thực tế cho PROJECT_NAME.
Sản phẩm là bản kế hoạch phát triển game, không phải một prompt khác hay game đã triển khai.

## Công việc và ràng buộc
- Dùng tham số và ngữ cảnh dự án liên quan có thể truy cập.
  Nêu rõ tệp/công cụ không truy cập được và phiên bản cài đặt chưa biết; không giả vờ đã kiểm tra.
- Tách yêu cầu, sở thích, giả định, giá trị cần tinh chỉnh và câu hỏi gây trở ngại.
  Soạn với giả định hợp lý được ghi rõ; chỉ hỏi về xung đột khiến kế hoạch không thể nhất quán.
- Giữ V1_SCOPE nhỏ nhưng trọn vẹn.
  Đưa tính năng đề xuất thêm vào danh sách để sau; không lấy toàn bộ tính năng từ một RTS mẫu.
- Chia kế hoạch thành phần đánh số, đoạn ngắn, gạch đầu dòng và bảng khi hữu ích.
  Mỗi phần triển khai cần kết quả, phần phụ thuộc, nhóm công việc và điều kiện hoàn thành quan sát được.
- Bao quát ý tưởng/phạm vi; môi trường và kiểm tra xuất đầu tiên; bản đồ/camera/input; chọn quân/lệnh/di chuyển; kinh tế/xây dựng/sản xuất; chiến đấu/AI đối thủ; trạng thái trận/UI; asset; tích hợp/chơi thử; phát hành và mốc.
  Điều chỉnh hoặc bỏ phần riêng của thể loại nếu GAME_IDEA đổi.
- Xác định phần chịu trách nhiệm cho input, trạng thái mô phỏng và hiển thị, kèm cấu trúc thư mục nhỏ phù hợp engine đã chọn.
  Nêu hành vi quan trọng nhưng không định trước mọi lớp, API hay thuật toán.
- Với RTS mặc định, giải quyết click UI so với lệnh trên bản đồ, mục tiêu lệnh bị phá hủy, đường đi bị chặn, chi/hoàn tài nguyên, hàng đợi sản xuất và cách AI dùng tài nguyên.
  Định nghĩa kết quả trận đồng thời, tạm dừng/mất focus và đặt lại toàn bộ khi chơi lại.
- Gán ID ổn định cho yêu cầu thiết yếu và liên kết với kiểm tra trong bảng nghiệm thu.
  Với tài nguyên, nêu lúc trừ chi phí, hủy có hoàn tiền không và cách ngăn hoàn thành/hoàn tiền trùng.
- Đặt các con số đề xuất trong một bảng tinh chỉnh gồm đơn vị, lý do và cách chơi thử.
  Đánh dấu chưa kiểm chứng; tránh số lặp mâu thuẫn và cam kết hiệu năng bịa đặt.
- Dùng mốc theo kết quả và thứ tự phụ thuộc, bắt đầu bằng cảnh tối thiểu và kiểm tra xuất, rồi một vòng kinh tế/chiến đấu chơi được.
  Thêm rủi ro, thí nghiệm nhỏ cho mỗi điều chưa rõ quan trọng và cách phát hành phù hợp PLATFORM.
- Khi có trình duyệt, xác minh nhận định kỹ thuật phụ thuộc phiên bản bằng tài liệu chính thống hiện hành.
  Gắn từng nhận định với nguồn và ngày kiểm tra hoặc đánh dấu chưa xác minh.
  Lựa chọn thiết kế gốc cần lý do, không cần trích dẫn bịa.
- Rà bản nháp một lượt để tìm tham số mâu thuẫn, phụ thuộc thiếu, yêu cầu không kiểm tra được, phình phạm vi và công cụ không có.
  Sửa lỗi cụ thể và nêu rủi ro chưa giải quyết.
- Yêu cầu này chỉ cho phép lập kế hoạch và xuất tài liệu theo lựa chọn.
  Không cài công cụ, triển khai gameplay, tạo asset, commit, push, deploy hay mua gì.

## Điều kiện hoàn thành
Trả một kế hoạch Markdown nhất quán, gồm bảng nghiệm thu, bảng tinh chỉnh, mốc, nguồn/điều chưa biết và ghi chú rà soát ngắn.
Kết thúc bằng việc triển khai nhỏ nhất mà người đọc có thể cho phép làm tiếp.
Không thực hiện việc đó hay báo kiểm tra mới lên kế hoạch là đã đạt.
