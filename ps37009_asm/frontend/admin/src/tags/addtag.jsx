import React, { useState } from 'react';
import api from '../api';
import { notification } from 'antd';
const AddTag = () => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/admin/tags', { title: categoryName })
      .then((response) => {
        console.log(response.data);
        setCategoryName('');
        notification.open({
          message: 'Thông báo',
          description: 'Thêm tag thành công',
          type: 'success',
        });
      })
      .catch((error) => {
        const message = error.response?.data?.message || 'Thêm tag thất bại';
        console.error('Error:', error);
        notification.open({
          message: 'Thông báo',
          description: message,
          type: 'error',
        });
      });
  };

  return (
    <div className="p-6">
      {/* Page Title */}
      <h2 className="text-2xl font-semibold mb-6">Thêm Tags</h2>

      {/* Form to Add New Category */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <form>
          {/* Category Name Field */}
          <div className="mb-4">
            <label htmlFor="categoryName" className="block text-lg font-medium text-gray-700">Tên Tag</label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Nhập tên tag"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>


          {/* Action Buttons */}
          <div className="flex justify-end">
            <button type="reset" className="mr-4 px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
              Hủy
            </button>
            <button type="button" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={handleSubmit}>
              Thêm Tag
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTag;
