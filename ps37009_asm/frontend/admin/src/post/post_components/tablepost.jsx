
import React from "react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../components/helper";

function TablePost({ posts, children }) {
    console.log(posts);
  return (
    <table className="w-full max-w-full divide-y divide-gray-200">
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
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Ngày Đăng
        </th>
        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          Hành Động
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {posts.map((post) => (
        <tr key={post.id}>
          <td className="px-6 py-4 text-sm font-medium text-gray-900">
            <Link to={`/post/view/${post.id}`} className="hover:text-indigo-600">
              {post.title}
            </Link>
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
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {timeAgo(post.created_at)}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {typeof children === "function" ? children(post) : children}
          </td>
        </tr>
      ))}
      {posts.length === 0 &&  
      <tr>
        <td colSpan={5}>
            <p className="text-center mt-5 text-lg">Không có bài viết nào</p>
        </td>
      </tr>
      }
    </tbody>
  </table>
  );
}

export default TablePost;