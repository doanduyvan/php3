import React, { useState, useEffect } from 'react';
import api from '/src/api';
import { notification, Pagination, Modal } from 'antd';
import LoaDing from '../components/loading';

const ListTags = () => {


  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Thêm state isLoading
  const [currentPage, setCurrentPage] = useState(1); // Thêm state currentPage
  const [totalItems, setTotalItems] = useState(0); // Thêm state totalItems
  const [pageSize, setPageSize] = useState(10); // Thêm state pageSize

  const Uri = '/admin/tags/' + '?page=' + currentPage + '&limit=' + pageSize;

  useEffect(() => {
    setIsLoading(true); // Bắt đầu loading
    api.get(Uri)
      .then(response => {
        const dataResponse = response.data;
        console.log(dataResponse);
        setCurrentPage(dataResponse.current_page);
        setTotalItems(dataResponse.total);
        setPageSize(dataResponse.per_page);
        setCategories(dataResponse.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage, pageSize]);

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
    handleModalClose();
    setIsLoading(true);
    api.put(`/admin/tags/${selectedCategory.id}`, { title: newTitle })
      .then((response) => {
        setCategories((prevCategories) =>
          prevCategories.map((cat) =>
            cat.id === selectedCategory.id
              ? { ...cat, title: newTitle }
              : cat
          )
        );
        notification.success({ message: "Cập nhật tags thành công" });
      })
      .catch((error) => {
        const message = error.response?.data?.message || "Cập nhật tags thất bại";
        notification.error({ message });
        console.error("Error updating category", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDelete = (category) => {

      Modal.confirm({
        title: 'Xác nhận xóa danh mục',
        content: 'Bạn có chắc chắn muốn xóa danh mục này?',
        okText: 'Xóa',
        cancelText: 'Hủy',
        onOk: () => {
          setIsLoading(true);
          api.delete(`/admin/tags/${category.id}`)
            .then((response) => {
              setCategories((prevCategories) =>
                prevCategories.filter((cat) => cat.id !== category.id)
              );
              notification.success({ message: "Xóa tag thành công" });
            })
            .catch((error) => {
              console.error("Xóa tag thất bại:", error);
              const message = error.response?.data?.message || "Xóa tag thất bại";
              notification.error({ message });
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      });


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
                Tên Tags
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
                  <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(category)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalItems > pageSize &&
          <div className='mt-5'>
            <Pagination
              current={currentPage}
              total={totalItems}
              pageSize={pageSize}
              align='center'
              onChange={(page, pageSize) => { setCurrentPage(page), setPageSize(pageSize) }}
            />
          </div>
        }
      </div>

      <LoaDing loader={isLoading} />

      {isModalOpen && (
        <div className="fixed z-5 inset-0 overflow-y-auto">
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

export default ListTags;
