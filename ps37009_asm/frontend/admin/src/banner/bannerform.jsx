import React, { useState, useEffect, useRef } from 'react';
import { notification } from 'antd';

function BannerForm({ dataEdit, onSubmit, onShowForm}) {

    const [img, setImg] = useState(null);
    const [link, setLink] = useState('');
    const [status, setStatus] = useState(1);
    const formRef = useRef(null);
    const [PageTitle, setPageTitle] = useState({ title: 'Thêm banner', button: 'Thêm' });

    useEffect(() => {
        if (dataEdit) {
            setImg(dataEdit.img);
            setLink(dataEdit.link);
            setStatus(dataEdit.onoff);
            setPageTitle({ title: 'Sửa banner', button: 'Cập nhật' });
        }
    }, []);


    const handleSubmit = (e) => {
        if(!img || !link) {
            notification.error({
                message: 'Vui lòng nhập đầy đủ thông tin'
            });
            return;
        }
        const formData = new FormData();
        formData.append('img', img);
        formData.append('link', link);
        formData.append('status', parseInt(status));
        if(dataEdit) {
            formData.append('id', dataEdit.id);
        }
        onSubmit(formData);

    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImg(file);
    };

    const handleStatus = (e) => {
        setStatus(parseInt(e.target.value));
    };

    const handleClickOutside = (e) => {
        if (formRef.current && !formRef.current.contains(e.target)) {
            onShowForm(false);
        }
    };

  return (
    <div className="fixed inset-0 bg-gray-400/55 overflow-auto fadeInOpacity" onClick={handleClickOutside}>
        <div>
            <div className="bg-white p-5 w-1/2 mx-auto my-20 rounded-lg fadeInTopToBottom" ref={formRef}>
                <h3 className="text-2xl font-medium mb-5">{PageTitle.title}</h3>
                <form action="" >
                    <div className="mb-5">
                        <label htmlFor="image" className="block">Ảnh</label>
                        {img && <img className='"w-full aspect-video object-cover' src={img.preview || img} alt="" />}
                        <input type="file" name="image" id="image" className="border p-2 w-full" onChange={handleImage} />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="link" className="block">Liên kết</label>
                        <input type="text" name="link" id="link" className="border p-2 w-full" value={link} onChange={e=> setLink(e.target.value)} />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="status" className="block">Trạng thái</label>
                        <select name="status" id="status" className="border p-2 w-full" value={status} onChange={handleStatus}>
                            <option value={1}>Hiển thị</option>
                            <option value={0} >Ẩn</option>
                        </select>
                    </div>
                    <div className="mb-5 text-right">
                        <button type='button' className="bg-blue-500 text-white py-2 px-5 rounded-lg hover:bg-blue-600" onClick={handleSubmit}>{PageTitle.button}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}

export default BannerForm;