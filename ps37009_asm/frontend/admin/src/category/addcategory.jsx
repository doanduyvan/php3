import React, { useState } from 'react';

const AddCategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle adding a new category (e.g., API call to save category)
    console.log('Category Added:', { categoryName, categoryDescription });
    // Reset form fields
    setCategoryName('');
    setCategoryDescription('');
  };

  return (
    <div className="p-6">
      {/* Page Title */}
      <h2 className="text-2xl font-semibold mb-6">Thêm Danh Mục Mới</h2>

      {/* Form to Add New Category */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <form onSubmit={handleSubmit}>
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

          {/* Category Description Field */}
          <div className="mb-4">
            <label htmlFor="categoryDescription" className="block text-lg font-medium text-gray-700">Mô Tả Danh Mục</label>
            <textarea
              id="categoryDescription"
              name="categoryDescription"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              rows="4"
              placeholder="Nhập mô tả danh mục"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end">
            <button type="reset" className="mr-4 px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
              Hủy
            </button>
            <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Thêm Danh Mục
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryPage;
