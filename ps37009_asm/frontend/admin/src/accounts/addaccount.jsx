import React , {useState} from 'react';
import { notification } from 'antd';
import api from '../api';
import LoaDing from '../components/loading';

function AddAccount({onSetAddUser, onSetUsers, arrRole}) {

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !role) {
            notification.error({
                message: 'Vui lòng nhập đầy đủ thông tin'
            });
            return;
        }

        const datareq = {
            fullname : name,
            email,
            rolechose: role
        }

        console.log(datareq);

        setLoading(true);
        try {
            const response = await api.post('/admin/accounts', datareq);
            const newUser = response.data.newAccount;
            onSetUsers(users => [newUser,...users]);
            onSetAddUser(false);
            notification.success({
                message: 'Thêm tài khoản thành công'
            });
            console.log(response);
        } catch (error) {
            console.log(error);
            const errorMessage = error.response.data?.error || 'Có lỗi xảy ra, vui lòng thử lại sau';
            notification.error({
                message: errorMessage
            });
        }
        finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        onSetAddUser(false);
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h3 className="text-lg font-semibold mb-4">Thêm Tài Khoản</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="Nhập tên"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="Nhập email"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Vai Trò</label>
                        <select
                            id="role"
                            value={role}
                            onChange={e => setRole(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                        >
                            <option value="">Chọn vai trò</option>
                            {Object.keys(arrRole).map((key, index) => (
                            <option key={key} value={key}>{arrRole[key]}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 bg-gray-400 text-white rounded-lg mr-2 hover:bg-gray-500"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Thêm
                        </button>
                    </div>
                </form>
            </div>
            <LoaDing loader={loading} />
        </div>
    );
}

export default AddAccount;