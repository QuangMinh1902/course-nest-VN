Trong JSON Web Token (JWT), payload là phần chứa dữ liệu mà bạn muốn truyền tải và lưu trữ trong token. JWT thường được sử dụng để xác thực và truyền thông tin giữa các bên một cách an toàn.

### Cấu trúc của JWT

JWT có ba phần chính :

- Header: Chứa thông tin về thuật toán mã hóa và loại token.
- Payload: Chứa dữ liệu, thường là các claims (yêu cầu) mà bạn muốn truyền tải.
- Signature: Được tạo ra bằng cách mã hóa kết hợp giữa header, payload và một secret key. Phần này đảm bảo tính toàn vẹn của token.
- JWT có định dạng là header.payload.signature, trong đó mỗi phần được mã hóa theo Base64Url.

### Payload

Payload là phần quan trọng nhất trong JWT vì nó chứa thông tin mà bạn muốn gửi đi.

Nội dung của Payload
Claims: Đây là các yêu cầu hoặc thông tin về một thực thể (thường là người dùng) và các meta-data liên quan. Claims có thể được chia thành ba loại chính:
Registered claims: Các claims được định nghĩa trước bởi JWT như iss (issuer), exp (expiration time), sub (subject), và aud (audience). Chúng không bắt buộc nhưng thường được sử dụng.
Public claims: Các claims do bạn xác định mà được sử dụng rộng rãi, như username, role, email.
Private claims: Các claims tùy chỉnh do bạn tự định nghĩa và sử dụng giữa các bên mà bạn kiểm soát.
