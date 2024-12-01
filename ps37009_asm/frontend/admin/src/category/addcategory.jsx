import React, { useState } from 'react';
import api from '../api';
const AddCategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/admin/category', { title: categoryName })
      .then((response) => {
        console.log(response.data);
        alert('Thêm danh mục thành công');
        setCategoryName('');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Thêm danh mục thất bại');
      });
  };

  return (
    <div className="p-6">
      {/* Page Title */}
      <h2 className="text-2xl font-semibold mb-6">Thêm Danh Mục Mới</h2>

      {/* Form to Add New Category */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <form>
          {/* Category Name Field */}
          <div className="mb-4">
            <label htmlFor="categoryName" className="block text-lg font-medium text-gray-700">Tên Danh Mục</label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Nhập tên danh mục"
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
              Thêm Danh Mục
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryPage;
