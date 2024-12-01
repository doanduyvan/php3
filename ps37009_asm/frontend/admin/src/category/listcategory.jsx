import React, { useState, useEffect } from 'react';
import api from '/src/api';
const CategoryListPage = () => {


  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Thêm state isLoading
  const [error, setError] = useState(null); // Thêm state error để xử lý lỗi

  useEffect(() => {
    api.get('/admin/category')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setNewTitle(category.title); // Set title of the selected category
    setIsModalOpen(true); // Open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setNewTitle("");
  };

  const handleSave = () => {
    // Call the API to update the category
    api
      .put(`/admin/category/${selectedCategory.id}`, { title: newTitle })
      .then((response) => {
        console.log("Category updated", response.data);
        setCategories((prevCategories) =>
          prevCategories.map((cat) =>
            cat.id === selectedCategory.id
              ? { ...cat, title: newTitle }
              : cat
          )
        );
        handleModalClose(); // Close the modal
      })
      .catch((error) => {
        console.error("Error updating category", error);
      });
  };

  const handleDelete = (category) => {
    const check = window.confirm("Bạn có chắc chắn muốn xóa danh mục này không?");
    if (check) {
      api.delete(`/admin/category/${category.id}`)
        .then((response) => {
          // Cập nhật danh sách danh mục sau khi xóa thành công
          setCategories((prevCategories) =>
            prevCategories.filter((cat) => cat.id !== category.id)
          );
        })
        .catch((error) => {
          console.error("Xóa danh mục thất bại:", error);
          alert("Đã xảy ra lỗi khi xóa danh mục. Vui lòng thử lại sau."); // Xử lý lỗi
        });
    }
  };

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
              <tr key={"category_" + category.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {category.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ...
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEditClick(category)} className="text-indigo-600 hover:text-indigo-900 mr-4">Sửa</button>
                  <button className="text-red-600 hover:text-red-900" onClick={()=> handleDelete(category)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            {/* Overlay */}
            <div
              className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-300 ${isModalOpen ? "opacity-100" : "opacity-0"}`}></div>
            {/* Modal */}
            <div
              className={`bg-white fadeInTopToBottom rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full p-6 duration-300 ${isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
            >
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Sửa Danh Mục
              </h3>
              <div className="mt-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tên Danh Mục
                </label>
                <input
                  type="text"
                  id="title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleModalClose}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md mr-4"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSave}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CategoryListPage;
