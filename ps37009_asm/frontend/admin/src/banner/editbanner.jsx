import React, {useState} from 'react';
import api from '../api';
import { notification } from 'antd';
import BannerForm from './bannerform';
import LoaDing from '../components/loading';
function EditBanner({dataold, onShowForm, onSetBanners}) {

    const [loading, setLoading] = useState(false);
    const handleSubmit = (data) => {
        const id = data.get('id');

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
        api.post(`admin/banners/${id}`, data, options)
        .then(response => {
            notification.success({
                message: 'Cập nhật banner thành công'
            });
            const newBanner = response.data.banner;
            onSetBanners(banners => {
                const newBanners = banners.map(banner => {
                    if(banner.id === newBanner.id) {
                        return newBanner;
                    }
                    return banner;
                });
                return newBanners;
            });
            onShowForm(false);
        })
        .catch(error => {
            const errorMessage = error.response.data.error;
            notification.error({
                message: errorMessage || 'Có lỗi xảy ra'
            });
            console.log(error);
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <>
        <BannerForm dataEdit={dataold} onShowForm={onShowForm} onSubmit={handleSubmit} />
        <LoaDing loader={loading} />
        </>
    )
}

export default EditBanner;