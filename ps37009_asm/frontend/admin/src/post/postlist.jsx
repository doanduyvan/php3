import React, { useState, useEffect } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
import LoaDing from '../components/loading';
import { Button, Modal, notification } from "antd";
const statusNames = {
  0: 'Chờ duyệt',
  1: 'Đã duyệt',
  2: 'Từ chối',
  3: 'Bị hủy'
}

const PostListPage = () => {

  const [loader, setLoader] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  console.log(posts);
  let postUri = '/admin/news/' + '?page=' + currentPage + '&limit=' + pageSize;
  useEffect(() => {
    setLoader(true);
    api.get(postUri)
      .then(response => {
        const dataResponse = response.data;
        console.log(dataResponse);
        setCurrentPage(dataResponse.current_page);
        setTotalItems(dataResponse.total);
        setPageSize(dataResponse.per_page);
        const newdata = dataResponse.data.map((post) => {
          return {
            id: post.id,
            title: post.title,
            category: post.category.title,
            author: post.admin.fullname,
            status: statusNames[post.onoff],
            statusNumber: post.onoff
          };
        });
        setPosts(newdata);
      })
      .catch(() => {
        console.log('Loading posts failed');
      })
      .finally(() => {
        setLoader(false);
      });
  }, [currentPage, pageSize]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Xác nhận xóa bài viết',
      content: 'Bạn có chắc chắn muốn xóa bài viết này?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: () => {
        api.delete(`/admin/news/${id}`)
          .then(() => {
            notification.open({
              message: "Thông báo",
              description: "Xóa bài viết thành công",
              type: "success",
            })
            setPosts(posts.filter(post => post.id !== id));
          })
          .catch((err) => {
            const statusCodes = err.response?.status;
            const message = err.response?.data?.message || "Lỗi Hệ Thống";
            notification.open({
              message: "Thông báo",
              description: message,
              type: "error",
            })
          });
      }
    });
  };

  return (
    <div className="p-6">
      {/* Page Title */}
      <h2 className="text-2xl font-semibold mb-6">Danh Sách Bài Viết</h2>

      {/* Post List Table */}
      <div className="bg-white p-6 shadow-md rounded-lg">
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
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {post.statusNumber !== 1 && post.statusNumber !== 3 &&
                    <Link to={`/post/edit/${post.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">Sửa</Link>
                  }
                  {post.statusNumber !== 1 &&
                    <button className="text-red-600 hover:text-red-900" onClick={() => { handleDelete(post.id) }}>Xóa</button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalItems > pageSize &&
        <div className='mt-5 text-center'>
          <Pagination defaultCurrent={currentPage} total={totalItems} pageSize={pageSize} onChange={handlePageChange} align='center' />
        </div>
      }

      <LoaDing loader={loader} />

    </div>
  );
};

export default PostListPage;
