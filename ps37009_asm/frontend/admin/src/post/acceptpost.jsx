import React, { useState, useEffect, useReducer } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
import LoaDing from '../components/loading';
import { Button, Modal, notification } from "antd";
import { getPost,changePage,changePageSize,chageStatus,setTotalItems} from './post_reducer/action';
import PostReducer, { initialState } from './post_reducer/postreducer';
import FilterPost from './post_components/filterpost';
import TablePost from './post_components/tablepost';


const AcceptPost = () => {

  const [loader, setLoader] = useState(false);
  const [state, dispatch] = useReducer(PostReducer, initialState);
  const {posts, currentPage, totalItems, pageSize, status, statusNames} = state;

  let postUri = '/admin/news/getnewsaccepting' + '?page=' + currentPage + '&limit=' + pageSize + '&status=' + status;
  useEffect(() => {
    setLoader(true);
    api.get(postUri)
      .then(response => {
        const dataResponse = response.data;
        const newdata = dataResponse.data.map((post) => {
          return {
            id: post.id,
            title: post.title,
            category: post.category.title,
            author: post.admin.fullname,
            status: statusNames[post.onoff],
            created_at: post.created_at
          };
        });

        dispatch(changePage(dataResponse.current_page));
        dispatch(setTotalItems(dataResponse.total));
        dispatch(getPost(newdata));
        console.log(newdata);
        
      })
      .catch((e) => {
        console.log('Loading posts failed');
        console.log(e);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [currentPage, pageSize,status]);

  const handlePageChange = (page,pageSize) => {
    dispatch(changePage(page));
    dispatch(changePageSize(pageSize));
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
            // setPosts(posts.filter(post => post.id !== id));
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
      <h2 className="text-2xl font-semibold mb-6">Duyệt Bài Viết</h2>

      < FilterPost status={status} onChangeStatus={dispatch} />


      {/* Post List Table */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <TablePost TablePost posts={posts}>
        {/* <button>action</button>   */}
        </TablePost>            
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

export default AcceptPost;
