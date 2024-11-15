import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { user_default, logo, YoutubeIcon, FacebookIcon } from './SvgComponent'
import { Routes, Route, Link, useLocation  } from "react-router-dom";
import Home from './home/home'
import Listnews from './listnews/listnews'
import Page404 from './components/404'
import NewsDetail from './newsdetail/newsdetail';
import SignIn from './author/signin';
import SignUp from './author/signup';


// const user = {
//   name: 'Tom Cook',
//   email: 'tom@example.com',
//   imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//   userNavigation : [
//     { name: 'Your Profile', href: '#' },
//     { name: 'Sign out', href: '#' }
//   ]
// }

const user = {
  name: 'anonymous',
  email: '',
  imageUrl: user_default,
  userNavigation : [
    { name: 'Sign In', href: '/signin' },
    { name: 'Sign Up', href: '/signup' }
  ]
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Layout() {
  const location = useLocation();

  const navigation = [
    { name: 'Trang chủ', href: '/', current: location.pathname === '/' },
    { name: 'Thời sự', href: '/danhmuc', current: location.pathname === '/danhmuc' },
    { name: 'Thế giới', href: '/chitiet', current: false },
    { name: 'Pháp luật', href: '#', current: false },
    { name: 'Kinh doanh', href: '#', current: false },
    { name: 'Công nghệ', href: '#', current: false },
  ]

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <img
                    alt="Your Company"
                    src={logo}
                    className="size-8 object-cover w-auto"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="size-6" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" title={user.name} />
                        <span className="sr-only" >Open user menu</span>
                        <img alt="" src={user.imageUrl} className="size-8 rounded-full"  />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      {user.userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                          >
                            {item.name}
                          </Link>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  to={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <img alt="" src={user.imageUrl} className="size-10 rounded-full" />
                </div>
                <div className="ml-3">
                  <div className="text-base/5 font-medium text-white">{user.name}</div>
                  <div className="text-sm font-medium text-gray-400">{user.email}</div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {user.userNavigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        {/* <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          </div>
        </header> */}
        <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/danhmuc" element={<Listnews />} />
                <Route path="/chitiet" element={< NewsDetail />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<Page404 />} />
            </Routes>

        </div>
        </main>
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
      </div>
    </>
  )
}