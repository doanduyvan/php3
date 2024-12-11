import { logo, YoutubeIcon, FacebookIcon } from '/src/SvgComponent'

function Footer(){
    return(
        <footer className='bg-gray-800'>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-gray-300">
          <div className='flex gap-4 justify-between flex-wrap md:flex-nowrap'>
            <div className='max-w-[200px]'>
              <div><img className='object-cover' src={logo} alt="logo" /></div>
              <div className='flex mt-3 gap-3 items-center'>
                <a href=""> <YoutubeIcon className='size-9 hover:fill-gray-400' /> </a>
                <a href=""> <FacebookIcon className='size-8 hover:fill-gray-400' /> </a>
              </div>
            </div>
            <div>
              <p>Tổng biên tập: Lê Thế Chữ</p>
              <p>Giấy phép hoạt động báo điện tử tiếng Việt, tiếng Anh Số 561/GP-BTTTT, cấp ngày 25-11-2022.</p>
              <p className='font-bold'>Thông tin tòa soạn - Thành Đoàn TP.HCM</p>
            </div>
            <div>
              <p>Địa chỉ: 60A Hoàng Văn Thụ, P.9, Q.Phú Nhuận, Tp. Hồ Chí Minh</p>
              <p>Hotline: 0918.033.133 - Email: tto@tuoitre.com.vn</p>
              <p>Phòng Quảng Cáo Báo Tuổi Trẻ: 028.39974848</p>
              <a className='font-bold' href="">Liên hệ quản cáo</a>
            </div>
            <div>
              <p className='text-xl font-bold'>Đăng ký email - Mở cổng thông tin</p>
              <p>Luôn cập nhật tin tức, sự kiện mới nhất</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-white py-5 text-center border-t border-gray-500">© 2024 Your Company. All rights reserved.</p>
      </footer>
    )
}

export default Footer;