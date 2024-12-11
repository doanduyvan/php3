import React, { createContext, useState } from 'react';
import { user_default } from '/src/SvgComponent'

// Tạo context
export const UserContext = createContext();

// Tạo provider
export const UserProvider = ({ children }) => {

    const userNologin = {
        name: 'anonymous',
        email: '',
        imageUrl: user_default,
        userNavigation: [
            { name: 'Sign In', href: '/signin' },
            { name: 'Sign Up', href: '/signup' }
        ]
    }

    const [user, setUser] = useState(userNologin); // Lưu trữ thông tin người dùng
    const [isLogin, setIsLogin] = useState(false); // Trạng thái đăng nhập

    // Hàm cập nhật thông tin người dùng
    const updateUser = (userInfo) => {
        const {email, username, avatar} = userInfo;
        const user = {
            name: username,
            email: email,
            imageUrl: avatar ?? user_default,
            userNavigation: [
                { name: 'Thông tin cá nhân', href: '/profile' },
                { name: 'Đăng xuất', href: '/logout' }
            ]
        }
        setUser(user);
        setIsLogin(true);
    };

    // Hàm xóa thông tin người dùng (đăng xuất)
    const clearUser = () => {
        const token = localStorage.getItem('userInfo');
        if (token) {
            localStorage.removeItem('userInfo');
        }
        setUser(userNologin);
        setIsLogin(false);
    };

    const value = { user, isLogin, updateUser, clearUser };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
