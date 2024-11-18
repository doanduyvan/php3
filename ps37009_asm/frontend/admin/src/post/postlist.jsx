import React, { useState, useEffect } from 'react';

const PostListPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from API or use static data for now
    const fetchPosts = async () => {
      // Simulate API call
      const data = [
        { id: 1, title: 'Bài viết về Tin Tức', category: 'Tin Tức', author: 'Nguyễn Văn A', status: 'Đã duyệt' },
        { id: 2, title: 'Bài viết về Giải Trí', category: 'Giải Trí', author: 'Trần Thị B', status: 'Chờ duyệt' },
        { id: 3, title: 'Bài viết về Thể Thao', category: 'Thể Thao', author: 'Lê Văn C', status: 'Đã duyệt' },
      ];
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="p-6">
      {/* Page Title */}
      <h2 className="text-2xl font-semibold mb-6">Danh Sách Bài Viết</h2>

      {/* Post List Table */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tiêu Đề
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Danh Mục
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tác Giả
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
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {post.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {post.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {post.author}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {post.status}
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

export default PostListPage;
