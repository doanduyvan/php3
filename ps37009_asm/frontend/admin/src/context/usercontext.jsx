import React, { createContext, useState } from 'react';

// Tạo context
export const UserContext = createContext();

// Tạo provider
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Lưu trữ thông tin người dùng

    // Hàm cập nhật thông tin người dùng
    const updateUser = (userInfo) => {
        setUser(userInfo);
    };

    // Hàm xóa thông tin người dùng (đăng xuất)
    const clearUser = () => {
        const token = localStorage.getItem('token');
        if (token) {
            localStorage.removeItem('token');
        }
        setUser(null);
    };

    const value = { user, updateUser, clearUser };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
