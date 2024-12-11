import React, { useState, useEffect } from 'react';
import { notification, Modal } from 'antd';
import api from '../api';
import { use } from 'react';
import AddAccount from './addaccount';

const roleName = {
    1: 'Phóng Viên',
    2: 'Kiểm Duyệt Viên',
    3: 'Quản Trị Viên'
}

const statusName = {
    0: 'Đã Khóa',
    1: 'Đang Hoạt Động'
}

function PageAccount() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addUser, setAddUser] = useState(false);
    const [editUser, setEditUser] = useState(false);

    useEffect(() => {
        const fetData = async () => {
            try {
                setLoading(true);
                const response = await api.get('/admin/accounts');
                setUsers(response.data);
                console.log(response);
            } catch (error) {
                console.log(error);
                notification.error({
                    message: 'Có lỗi xảy ra, vui lòng thử lại sau'
                });
            }
        };
        fetData();

    }, []);

    return (
        <div className="p-6 relative">
            {/* Page Title */}
            <h2 className="text-2xl font-semibold mb-6">Quản Lý Tài Khoản</h2>

            <div className="mb-4 text-right">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={e=>setAddUser(true)}>
                    Thêm Tài Khoản
                </button>
            </div>

            {/* User Management Table */}
            <div className="bg-white p-6 shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tên
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Vai Trò
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Trạng Thái
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Hành Động
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">

                        {users.map((user,index) => {
                            return (
                                <tr key={'user_' + index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {user.fullname}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {roleName[user.role]}
                                </td>
    
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {statusName[user.onoff]}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">Sửa</button>
                                </td>
                            </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
            { addUser && 
            < AddAccount onSetAddUser={setAddUser} onSetUsers={setUsers} arrRole={roleName} />
}
        </div>
    );
}

export default PageAccount;