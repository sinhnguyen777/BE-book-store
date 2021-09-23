export const transErrors = {
    account_existed:"Thiết bị đã tồn tại",
    account_not_exist:"Tài khoản không tồn tại",
    account_email_existed:"Email hoặc password không hợp lệ",
    account_login_failed:"Tài khoản hoặc mật khẩu không chính xác",
    contact_add_existed:"Tên danh bạ đã tồn tại"
}
export const transSuccess = {
    login_success_mobile: (username)=> `hello ${username}, bạn đã đăng nhập thành công`,
    register_success_mobile:(username)=>`hi ${username}, bạn đã đăng kí tài khoản thành công`,
    add_contact_success:'Bạn đã thêm một danh sách danh bạ thành công',
    add_assignment_success:'Bạn đã thêm một assignment thành công'

}