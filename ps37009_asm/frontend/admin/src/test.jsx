import React from 'react';

const Test = () => {
  return (
    <div className="p-6">
      {/* Phần tiêu đề */}
      <h2 className="text-2xl font-semibold mb-6">Đăng Bài Mới</h2>

      {/* Form đăng bài */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <form action="#" method="POST">
          {/* Tiêu đề bài viết */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-lg font-medium text-gray-700">Tiêu đề bài viết</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Nhập tiêu đề bài viết"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Nội dung bài viết */}
          <div className="mb-4">
            <label htmlFor="content" className="block text-lg font-medium text-gray-700">Nội dung bài viết</label>
            <textarea
              id="content"
              name="content"
              rows="10"
              placeholder="Nhập nội dung bài viết..."
              className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>

          {/* Danh mục */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-lg font-medium text-gray-700">Danh mục</label>
            <select
              id="category"
              name="category"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Chọn danh mục</option>
              <option value="tin_tuc">Tin tức</option>
              <option value="giai_tri">Giải trí</option>
              <option value="the_thao">Thể thao</option>
              {/* Thêm các danh mục khác tùy thuộc vào dự án */}
            </select>
          </div>

          {/* Ảnh đại diện */}
          <div className="mb-4">
            <label htmlFor="thumbnail" className="block text-lg font-medium text-gray-700">Ảnh đại diện</label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              className="mt-1 block w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              accept="image/*"
            />
          </div>

          {/* Các tùy chọn đăng bài */}
          <div className="mb-4 flex items-center">
            <input type="checkbox" id="publish" name="publish" className="mr-2" />
            <label htmlFor="publish" className="text-lg text-gray-700">Đăng bài ngay lập tức</label>
          </div>

          {/* Nút hành động */}
          <div className="flex justify-end">
            <button type="reset" className="mr-4 px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
              Hủy
            </button>
            <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Đăng Bài
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Test;
