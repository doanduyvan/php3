import React, { useState, useEffect } from 'react';
import ContentEditor from './post_components/contentediter';
import Title from './post_components/title';
import ShortDes from './post_components/shortdes';
import CategoryPost from './post_components/category';
import AvatarPost from './post_components/avatar';
import { notification } from "antd";
import api from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import LoaDing from '../components/loading';
const EditPost = () => {

    const [loader, setLoader] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (!id || isNaN(id)) {
            navigate('/post');
        }
    }, [id, navigate]);

  const [title, setTitle] = useState('');
  const [shortDes, setShortDes] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(null);
  const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        setLoader(true);
        api.get(`/admin/news/${id}`)
        .then(res => {
            const data = res.data;
            setTitle(data.title);
            setShortDes(data.shortdes);
            setContent(data.des);
            setCategory(data.idcategory);
            setAvatar(data.img);
        })
        .catch(err => {
            console.log("dv error: ",err);
        })
        .finally(() => {
            setLoader(false);
        });
    }, []);

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

    setLoader(true);
    api.post('/admin/news/' + id , formData, customHeader)
    .then(res => {
      console.log("dv ok: ",res);
      notification.open({
        message: "Thông báo",
        description: "Cập nhật bài viết thành công",
        type: "success",
      });
    })
    .catch(err => {
      console.log("dv error: ",err);

      const statusCodes = err.response?.status;
      const message = err.response?.data?.message || null;
      let des = "Cập nhật bài viết thất bại";
      switch (statusCodes) {
        case 400:
          des = "Dữ liệu không hợp lệ";
          break;
        case 403:
          des = message || "Không có quyền thực hiện thao tác này";
          break;
        case 422:
          const errors = err.response.data.errors;
          des = errors[Object.keys(errors)[0]][0];
          break;
      }
      notification.open({
        message: "Thông báo",
        description: des,
        type: "error",
      });
    })
    .finally(() => {
      setLoader(false);
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Sửa Bài Viết</h2>
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
              Cập Nhật
            </button>
          </div>
        </form>
      </div>
      < LoaDing loader={loader} />
    </div>
  );
};

export default EditPost;
