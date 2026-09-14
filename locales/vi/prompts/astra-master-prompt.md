# Xây Signal Garden từ đầu với GPT-6 Astra

Làm việc trong thư mục hiện tại như nhà phát triển game. Trước hết xem thư mục, trạng thái Git, chỉ dẫn áp dụng và công cụ sẵn có. Giữ công việc người dùng. Nếu trống, tạo dự án đầy đủ dưới đây.

Bàn giao game 3D nhỏ, nhất quán, chơi được trên trình duyệt máy tính. Triển khai và chạy kiểm tra phù hợp; tiếp tục qua các mốc thay vì chỉ đưa kế hoạch. Tự chọn quyết định thông thường hợp lý, ghi giả định. Chỉ hỏi khi thiếu thông tin ảnh hưởng đáng kể kết quả hoặc cần quyền chưa được cho phép.

TRẢI NGHIỆM
Signal Garden là mái nhà yên tĩnh lúc chạng vạng. Robot bảo trì khôi phục đèn hiệu: thu ba pin, tránh drone và quay về kích hoạt trước khi lượt kết thúc. Thế giới bỏ hoang nhưng có thể hồi sinh, đường rõ, ánh sáng ấm từ máy được phục hồi.

PHẠM VI VÀ LUẬT
- Đấu trường phẳng 24 × 24 đơn vị. Một đơn vị là một mét; Y lên, chuyển động trên X/Z.
- Camera cao cố định, hướng ổn định, không khóa con trỏ. Nhân vật và đường đi dễ thấy.
- WASD hoặc mũi tên di chuyển; chuẩn hóa hướng chéo. E ở lần nhấn mới kích hoạt đèn trong hai đơn vị, chỉ khi đủ ba pin. Escape dừng/tiếp tục. Có nút bắt đầu, dừng, tiếp tục, chơi lại, tắt tiếng.
- Bắt đầu ba máu và 90 giây. Một drone tuần tra xác định, thấy được lộ trình. Tiếp xúc mất một máu rồi bất tử một giây.
- Mỗi pin nhặt một lần. Hiển thị số pin, máu, giờ và đèn sẵn sàng.
- Trạng thái title, playing, paused, won, lost. Tạm dừng đóng băng mô phỏng và giờ. Hết máu hoặc giờ kết thúc. Xét thua trước kích hoạt trong một bước: hết giờ đồng thời kích hoạt thì thua.
- Sau thắng/thua đóng băng gameplay. Chơi lại được từ paused, won, lost: đặt lại vị trí, pin, máu, giờ, tuyến drone, hồi chiêu, hiệu ứng và đầu vào rồi vào playing. Mất tiêu điểm xóa phím giữ và dừng lượt đang chạy; quay lại cần bấm Tiếp tục.
- Loại trừ nhiều người chơi, tài khoản, thế giới sinh tự động, túi đồ, hội thoại và thêm màn.

KỸ THUẬT
Ưu tiên TypeScript, Vite, Three.js trừ khi dự án đã chọn engine khác. Dùng gói ổn định khả dụng, commit lockfile và ghi phiên bản thật. Tra tài liệu chính thức cho API chưa chắc hoặc nhạy phiên bản.

Giữ cấu trúc nhỏ, dễ đọc; phân trách nhiệm đầu vào, mô phỏng/trạng thái, dựng hình/camera và UI. Gom tham số chỉnh được vào một module. Va chạm dùng hình đơn giản cho sân phẳng; giải thích nếu cần thư viện vật lý. Dùng thời gian trôi đúng và tránh bước lớn sau tiếp tục.

Tạo npm script chính xác cho dev, build và kiểm tra cần thiết. Tạo docs/game-brief.md, docs/acceptance.md, docs/progress.md và README ngắn có thiết lập, điều khiển, nền tảng, giới hạn. Thêm quy tắc ignore phù hợp.

HÌNH VÀ ÂM
Bắt đầu khối thô dễ hiểu, rồi robot hình học nguyên bản, đá/bồn xanh dịu, pin hổ phách, đèn xanh ngọc, drone dáng riêng. Đường rõ; tránh quá nhiều bloom, hạt hay rung camera. Hình và chữ bổ trợ màu. Tôn trọng giảm chuyển động với trang trí và hiệu ứng trúng đòn.

Dùng tài nguyên nguyên bản hoặc được phép; ghi nguồn và ghi công. Phản hồi vừa phải cho thu thập, sát thương, sẵn sàng, thắng, thua. Chỉ bắt đầu âm sau tương tác và có mute. Menu thích ứng và dùng bàn phím được. Bản đầu cho bàn phím máy tính; chỉ nói hỗ trợ chơi trên điện thoại khi đã làm và kiểm tra.

CÁC MỐC KẾT QUẢ
Theo dõi hoàn thành; đổi thứ tự khi phụ thuộc hoặc dự án yêu cầu.
M0: Tạo khung, ghi cách chạy, build đạt và cảnh tối thiểu.
M1: Chuyển động, biên, camera, tạm dừng đáng tin.
M2: Pin, kích hoạt, HUD, hiển thị giờ, thắng, chơi lại đầy đủ từ dừng/thắng. Thua còn ở M3.
M3: Drone, hồi sát thương, thua vì giờ và máu.
M4: Hình/âm nhất quán; xem độ rõ và phản hồi.
M5: Thử production dưới /signal-garden/, sửa lỗi quan trọng, chuẩn bị workflow phát hành.

Mỗi mốc giữ dự án chạy được, cập nhật tiến độ, rà diff và kiểm tra liên quan trước commit cục bộ. Prompt này cho phép commit cục bộ. Mốc là điểm kiểm tra; tiếp tục không xin phép lại không cần thiết.

KIỂM TRA
Kiểm tra tập trung: nhặt một lần, chuẩn hóa chuyển động, hồi sát thương, tạm dừng, loại trừ thắng/thua đồng thời, biên thời gian và đặt lại toàn bộ. Nếu có công cụ trình duyệt, dùng điều khiển thật cho hành trình chính. Xem ảnh cho camera/UI và trạng thái cho luật. Hàm chuẩn bị cảnh không thay thế kiểm tra bằng đầu vào người chơi.

Thử bắt đầu, nhặt, thắng, hai loại thua, dừng/tiếp tục, chơi lại nhiều lần. Build và thử production đúng đường dẫn con; kiểm tra tải tài nguyên và lỗi runtime. Nêu trình duyệt, thiết bị thật. Đo hiệu năng thì ghi thiết bị, viewport, cảnh, làm nóng, thời gian mẫu; không bịa fps.

Thiếu công cụ thì làm phần độc lập, nêu chưa chạy gì và các bước kiểm tra tay còn lại ngắn nhất. Không đánh dấu phần chưa thử là đạt. Sau sửa, chạy lại kiểm tra được thay đổi biện minh; tránh lặp rộng khi phần cần đã đạt.

THỎA THUẬN
Trao đổi ngắn, gắn thay đổi với kết quả người chơi thấy. Nếu chỉ dẫn mâu thuẫn, nêu tệp/quy tắc và xử lý theo thứ bậc áp dụng. Dùng skill phù hợp; không bắt buộc skill mới. Nếu phiên cho phép chuyên gia song song, chỉ dùng cho việc độc lập, quyền sở hữu rõ và một người tích hợp; nếu không, dùng một tác nhân.

HOÀN THÀNH
Giao game chạy cục bộ, mã và lockfile, thiết lập đúng, kết quả nghiệm thu, ghi công tài nguyên, commit đã rà soát và workflow Pages chuẩn bị sẵn. Nêu phần xong, điều thực sự đã thử và cần người chơi thử gì. Chỉ công bố nếu phiên đã cho phép đúng tài khoản/kho và phát hành công khai; nếu chưa, hoàn thiện bản chuẩn bị có thể rà soát rồi xin quyền cuối đó.
