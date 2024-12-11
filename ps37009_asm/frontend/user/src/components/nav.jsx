import React, { useState, useEffect } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { user_default, logo, YoutubeIcon, FacebookIcon } from '/src/SvgComponent'
import { Link, useLocation } from "react-router-dom";
import api from "/src/api";
import { convertToSlug } from "/src/helper/helper";
import { useContext } from "react";
import { UserContext } from "/src/context/logincontext";
import { Modal } from "antd";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const numberShow = 4;

const Nav = () => {

    const { user, clearUser } = useContext(UserContext);

    const location = useLocation();

    const navigationinit = [
        { name: 'Trang chủ', href: '/', current: location.pathname === '/' }
    ];

    
    const [navigation, setNavigation] = useState(navigationinit);

    useEffect(() => {
        const url = '/nav';
        const fetchNav = async () => {
            try {
                const response = await api.get(url);
                const nav = response.data;
                const newNav = nav.map(item => {
                    const slug = convertToSlug(item.title);
                    return {
                        id: item.id,
                        name: item.title,
                        href: 'danhmuc/' + slug + '/' + item.id,
                        current: location.pathname == slug + '/' + item.id
                    }
                });
                setNavigation([...navigationinit, ...newNav]);
            } catch (error) {
                console.error('Failed to fetch nav: ', error);
            }
        }
        fetchNav();
    }, []);

    const handleButton = (e) => {
        const href = e.target.getAttribute('data-href');
        if(href == '/logout') {
            e.preventDefault();
            Modal.confirm({
                title: 'Bạn có chắc chắn muốn đăng xuất?',
                onOk() {
                    clearUser();
                }
            });
        }
    };

    return (
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
                                {navigation.slice(0, numberShow).map((item) => (
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

                                {navigation.length > numberShow && (
                                    <Menu as="div" className="relative">
                                        <MenuButton className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                            More
                                        </MenuButton>
                                        <MenuItems className="absolute z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                                            {navigation.slice(numberShow).map((item) => (
                                                <MenuItem key={item.name}>
                                                    <Link
                                                        to={item.href}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </MenuItem>
                                            ))}
                                        </MenuItems>
                                    </Menu>
                                )}


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
                                        <img alt="" src={user.imageUrl} className="size-8 rounded-full" />
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
                                                data-href={item.href}
                                                onClick={handleButton}
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
    )

}
export default Nav;