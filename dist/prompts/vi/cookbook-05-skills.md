## Sửa các tham số này
PROJECT_FOLDER: thư mục game đang chọn
AGENT: Codex
MODEL: GPT-6 Astra

## Lựa chọn và tính nhất quán
- AGENT: chọn Codex hoặc Claude Code. Chọn MODEL trong ứng dụng trước khi gửi; dùng mô hình Claude có sẵn với Claude Code. Những dòng này không tự đổi mô hình hay cấp công cụ.
- Chỉ làm trong PROJECT_FOLDER. Kiểm tra công cụ thực tế và chỉ dẫn dự án liên quan; giải quyết khác biệt quan trọng trước phần việc phụ thuộc.

## Mục tiêu
Quyết định skill có thêm giá trị cho công việc cụ thể kế tiếp không.

## Công việc và ràng buộc
- Kiểm tra công cụ và danh mục skill thực sự có trong phiên.
- Với mốc game tiếp theo, xác định skill nào bổ sung kiểm tra hoặc khả năng liên quan ngoài mô tả và công cụ hiện tại.
- Ưu tiên không cài thêm nếu chưa có khoảng trống cụ thể.
- Với skill GitHub đề xuất, đọc đúng đường dẫn, chỉ dẫn, script, phụ thuộc, giấy phép và revision trước khi khuyên dùng.
- So không dùng skill, tự chọn và gọi đích danh trên cùng một tác vụ nhỏ nếu phép so có thể đổi quyết định.
- Ghi việc chọn thực tế, kết quả và chi phí phụ.
- Không cài cả bộ chỉ vì nổi tiếng; không coi có sẵn là chắc chắn được gọi.
- Lưu quyết định và giả thuyết chưa thử vào docs/decisions.md.

## Điều kiện hoàn thành
Lựa chọn có lý do: công cụ hiện tại, skill có sẵn hoặc khả năng còn thiếu cụ thể.
