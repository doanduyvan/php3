import React, { useState, useEffect } from 'react';
import AddBanner from './addbanner';
import api from '../api';
import LoaDing from '../components/loading';
import { notification, Modal } from 'antd';
import EditBanner from './editbanner';
import { timeAgo } from '../components/helper';

function PageBanner() {

  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addBanner, setAddBanner] = useState(false);
  const [editBanner, setEditBanner] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get('/admin/banners')
      .then(response => {
        setBanners(response.data);
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        notification.error({
          message: 'Có lỗi xảy ra, vui lòng thử lại sau'
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleEdit = (data) => {
    setEditBanner(data);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Xác nhận xóa banner',
      content: 'Bạn có chắc chắn muốn xóa banner này?',
      onOk: async () => {
        try {
          setLoading(true);
          await api.delete(`/admin/banners/${id}`);
          setBanners(banners => banners.filter(banner => banner.id !== id));
          notification.success({
            message: 'Xóa banner thành công'
          });
        } catch (error) {
          console.log(error);
          notification.error({
            message: 'Có lỗi xảy ra, vui lòng thử lại sau'
          });
        }
        finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <div className="page-banner p-5">
      <h5 className="text-3xl font-medium">Quản lí Banner quảng cáo</h5>
      <div className="container shadow-lg p-5 rounded-lg">
        <div className="text-right">
          <button className="bg-blue-500 text-lg py-3 px-5 rounded-lg inline-block hover:bg-blue-600 text-white" onClick={e => setAddBanner(true)}>Thêm banner</button>
        </div>
        <table className="w-full min-w-full mt-4 shadow-md rounded-lg">
          <thead>
            <tr className="shadow">
              <th className="text-left px-3 py-4">
                Ảnh
              </th>
              <th className="text-left px-3 py-4">
                Liên kết
              </th>
              <th className="text-left px-3 py-4">
                Trạng thái
              </th>
              <th className="text-left px-3 py-4">
                Ngày tạo
              </th>
              <th className="text-left px-3 py-4">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner, index) => (
              <tr key={`banner_` + index}>
                <td className="p-3">
                  <img className="max-w-[400px] aspect-video object-cover" src={banner.img} alt="" />
                </td>
                <td>
                  <a href={banner.link} target='_blank'>{banner.link}</a>
                </td>
                <td className="p-3">
                  <span className="badge badge-success">{banner.onoff == 1 ? 'Hiển thị' : "Ẩn"}</span>
                </td>
                <td>
                  {timeAgo(banner.created_at)}
                </td>
                <td className="p-3">
                  <div className="flex gap-3">
                    <button className="btn btn-primary bg-blue-500 py-3 px-5 rounded-lg hover:bg-blue-600 text-white" onClick={e => handleEdit(banner)}>Sửa</button>
                    <button className="btn btn-danger bg-red-500 py-3 px-5 rounded-lg hover:bg-red-600 text-white" onClick={e => handleDelete(banner.id)}>Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {addBanner && <AddBanner onShowForm={setAddBanner} onSetBanners={setBanners} />}
      {editBanner && <EditBanner onShowForm={setEditBanner} dataold={editBanner} onSetBanners={setBanners} />}
      <LoaDing loader={loading} />
    </div>
  );
}

export default PageBanner;