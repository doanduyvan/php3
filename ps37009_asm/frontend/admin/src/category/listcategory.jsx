import React, { useState, useEffect } from 'react';

const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from API or use static data for now
    const fetchCategories = async () => {
      // Simulate API call
      const data = [
        { id: 1, name: 'Tin Tức', description: 'Các bài viết về tin tức hằng ngày' },
        { id: 2, name: 'Giải Trí', description: 'Các bài viết về giải trí' },
        { id: 3, name: 'Thể Thao', description: 'Các bài viết về thể thao' },
      ];
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <div className="p-6">
      {/* Page Title */}
      <h2 className="text-2xl font-semibold mb-6">Danh Sách Danh Mục</h2>

      {/* Category List Table */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên Danh Mục
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mô Tả
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành Động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {category.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {category.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-4">Sửa</button>
                  <button className="text-red-600 hover:text-red-900">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryListPage;
