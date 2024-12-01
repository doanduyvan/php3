
import React from 'react';
import { ChevronRight } from './SvgComponent';
import { Route, Routes, Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './dashboard/dashboard';
import AddCategoryPage from './category/addcategory';
import CategoryListPage from './category/listcategory';
import PostListPage from './post/postlist';
import AddPost from './post/addpost';
import TodoList from './todos/todo';
import EditPost from './post/editpost';
import Tags from './tags/listtags';
import AddTags from './tags/addtag';

// const user = {
//     name: 'Tom Cook',
//     email: 'tom@example.com',
//     imageUrl:
//         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// }

// menu dành cho trang webtin tức

const menu = [
    {
        name: "Dashboard",
        link: "/",
        submenu: null
    },
    {
        name: "Tags",
        link: "/tags",
        submenu: [
            { name: "Thêm Tags", link: "/tags/add" },
            { name: "Danh sách Tags", link: "/tags" }
        ]
    },
    {
        name: "Danh mục",
        link: "/category",
        submenu: [
            { name: "Thêm danh mục", link: "/category/add" },
            { name: "Danh sách danh mục", link: "/category" }
        ]
    },
    {
        name: "Bài viết",
        link: "/post",
        submenu: [
            { name: "Thêm bài viết", link: "/post/add" },
            { name: "Danh sách bài viết", link: "/post" }
        ]
    },
    {
        name: "Người dùng",
        link: "/user",
        submenu: null
    },
    {
        name: "Quảng cáo",
        link: "/ads",
        submenu: null
    },
    {
        name: "Thiết lập",
        link: "/setting",
        submenu: null
    },
    {
        name: "Đăng xuất",
        link: "/",
        submenu: null,
        action: "logout"
    },
    {
        name: "Todos",
        link: "/todo",
        submenu: null
    }
]

const roleName = {
    1: "Phóng viên",
    2: "Kiểm duyệt viên",
    3: "Admin"
}

function Layout({ setIsLogin, user }) {

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLogin(false);
    };

    const AllLayout = () => {
        return (
            <Outlet />
        )
    };

    return (
        <>
            <div className="flex">
                <div className="sidebar_hidden min-h-dvh"></div>
                <div className="sidebar bg-gray-800">
                    {/* start sidebar */}
                    <div className="mt-4 flex flex-col justify-center items-center gap-1">
                        <img className="w-[80px] rounded-[50%] aspect-square object-cover" src={user.avatar} alt="" />
                        <span className="text-sm text-gray-300">{roleName[user.role]}</span>
                        <p className="text-white font-medium">{user.username}</p>
                    </div>
                    <div className="mt-4">
                        <div className="flex flex-col text-white">
                            {menu.map((item, index) => {
                                return (
                                    <ItemMenu key={'z1' + index} menu={item} hr={index !== 0} onLogOut={handleLogout} />
                                )
                            })}
                        </div>
                    </div>
                    {/* end sidebar */}
                </div>
                <div className="flex-1">
                    {/* noi dung */}
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/todo" element={<TodoList />} />

                        <Route path="/category" element={<AllLayout />}>
                            <Route index element={<CategoryListPage />} />
                            <Route path="add" element={<AddCategoryPage />} />
                        </Route>

                        <Route path="/post" element={<AllLayout />}>
                            <Route index element={<PostListPage />} />
                            <Route path="add" element={<AddPost />} />
                            <Route path='edit/:id' element={<EditPost />} />
                        </Route>

                        <Route path="/tags" element={<AllLayout />}>
                            <Route index element={<Tags />} />
                            <Route path="add" element={<AddTags />} />
                        </Route>
                        

                    </Routes>
                </div>
            </div>
        </>
    );
}

function ItemMenu({ menu, hr, onLogOut }) {
    const submenu = menu.submenu;
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        if (menu.action === "logout") {
            onLogOut();
            console.log('logout');
        }
    };

    return (
        <>
            {hr && <hr className='border-gray-500' />}
            <div className={`flex items-center px-4 py-2 hover:bg-gray-900 cursor-pointer ${open ? "active" : ''}`}>
                {!submenu ?
                    <Link to={menu.link} className="text-lg flex-1" onClick={handleClick}>{menu.name}</Link>
                    :
                    <a to={menu.link} className="text-lg flex-1" onClick={() => { setOpen(!open) }}>{menu.name}</a>
                }
                {submenu && <span className='block w-[40px] text-right itemchevronright'> <ChevronRight className='inline-block w-5 cursor-pointer' /> </span>}
            </div>

            {submenu &&
                <div className={`itemsubmenu ${open ? "active" : ""}`}>
                    {submenu.map((item, index) => { return <ItemSubMenu key={'z2' + index} submenu={item} hr={index !== 0} /> })}
                </div>
            }
        </>
    )
}

function ItemSubMenu({ submenu, hr }) {
    return (
        <div className='pl-4'>
            {hr && <hr className='border-gray-500' />}
            <div className="flex items-center py-2 pl-3 hover:bg-gray-900 cursor-pointer">
                <Link to={submenu.link} className="text-lg flex-1">{submenu.name}</Link>
            </div>
        </div>
    )
}

export default Layout;