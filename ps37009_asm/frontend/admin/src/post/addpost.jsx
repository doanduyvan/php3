import React, { useState } from 'react';
import ContentEditor from './post_components/contentediter';
import Title from './post_components/title';
import ShortDes from './post_components/shortdes';
import CategoryPost from './post_components/category';
import AvatarPost from './post_components/avatar';
import { notification } from "antd";
import api from '../api';
const AddPost = () => {

  const [title, setTitle] = useState('');
  const [shortDes, setShortDes] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const submitHandler = (e) => {
    e.preventDefault();
    const fields = {
       title,
       shortDes, 
       content,
       category,
       avatar
    };
    const missingFields = Object.keys(fields).filter((key) => {
      const value = fields[key];
      if (typeof value === "string") {
        return !value.trim();
      }
      if (key === "avatar") {
        return !value; 
      }
      return !value;
    });

    if(missingFields.length > 0) {
        notification.open({
          message: "Thông báo",
          description: `Vui lòng điền đầy đủ thông tin ${missingFields[0]}`,
          type: "error",
      });
      return;
    }

    const customHeader = { headers: {'Content-Type': 'multipart/form-data'}};
    const formData = new FormData();
    Object.keys(fields).forEach((key) => {
      formData.append(key, fields[key]);
    });

    api.post('/admin/news', formData, customHeader)
    .then(res => {
      console.log("dv ok: ",res);
      notification.open({
        message: "Thông báo",
        description: "Thêm bài viết thành công",
        type: "success",
      });
      setTitle('');
      setShortDes('');
      setContent('');
      setCategory(null);
      setAvatar(null);
    })
    .catch(err => {
      console.log("dv error: ",err);

      const statusCodes = err.response?.status;
      let des = "Thêm bài viết thất bại";
      switch (statusCodes) {
        case 400:
          des = "Dữ liệu không hợp lệ";
          break;
        case 403:
          des = "Không có quyền thực hiện thao tác này";
          break;
        case 422:
          const errors = err.response.data.errors;
          // lấy error đầu tiên
          des = errors[Object.keys(errors)[0]][0];
          break;
      }
      notification.open({
        message: "Thông báo",
        description: des,
        type: "error",
      });
    });

    // notification.open({
    //   message: "Thông báo",
    //   description: "Thêm bài viết thành công",
    //   type: "success",      
    // });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Đăng Bài Mới</h2>
      <div className="bg-white p-6 shadow-md rounded-lg">
        <form action="#" onSubmit={submitHandler}>
          < Title value={title} setTitle={setTitle} />
          < ShortDes  value={shortDes} setShortDes={setShortDes} />
          <ContentEditor content={content} setContent={setContent}/>
          < CategoryPost value={category} setCategory={setCategory} />
          < AvatarPost value={avatar} setAvatar={setAvatar} />
          <div className="flex justify-end mt-4">
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

export default AddPost;
