import React, {useState} from "react";
import BannerForm from "./bannerform";
import api from "../api";
import LoaDing from "../components/loading";
import { notification } from "antd";

function AddBanner({onShowForm, onSetBanners}) {

    const [loading, setLoading] = useState(false);

    const handleSubmit = (data) => {
        const options = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(percentCompleted);
            }
        }
        setLoading(true);
        api.post('admin/banners', data, options)
        .then(response => {
            console.log(response);
            notification.success({
                message: 'Thêm banner thành công'
            });
            const newBanner = response.data.banner;
            onSetBanners(banners => [newBanner, ...banners]);
           onShowForm(false);
        })
        .catch(error => {
            const errorMessage = error.response.data.error;
            notification.error({
                message: errorMessage || 'Có lỗi xảy ra'
            });
        })
        .finally(() => {
            setLoading(false);
        });
    };

  return (
    <>
      <BannerForm onShowForm={onShowForm} onSubmit={handleSubmit} />
      <LoaDing loader={loading} />
    </>
  );
}

export default AddBanner;