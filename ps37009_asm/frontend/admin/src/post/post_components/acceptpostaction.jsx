import React from 'react';
import { Modal } from "antd"

function AcceptPostAction({onAcceptPost, onNoteChange, onSubmit}) {

    const handleSubmit = (e) => {
        e.preventDefault();
        Modal.confirm({
            title: 'Xác nhận phê duyệt',
            content: 'Bạn có chắc chắn muốn thực hiện hành động này?',
            okText: 'Xác nhận',
            cancelText: 'Hủy',
            onOk: () => {
                onSubmit();
            }
        });
    };

  return (
    <div className='p-5'>
    <p className='text-2xl'>Phê duyệt</p>
    <form action="" className='shadow-lg p-5 rounded-lg'>
        <textarea className='w-full border p-3 rounded-md outline-none' rows="5" name="" id="" placeholder='note' onChange={e=> onNoteChange(e.target.value)}></textarea>
        <div className='mt-4 flex flex-col gap-3'>
            <div className='flex gap-3'>
                <input type="radio" id='pheduyet' name='acceptpost' onChange={e=> onAcceptPost(true)} />
                <label htmlFor="pheduyet">Duyệt Bài</label>
            </div>
            <div className='flex gap-3'>
                <input type="radio" id='tuchoi' name='acceptpost' onChange={e=> onAcceptPost(false)} />
                <label htmlFor="tuchoi">Từ Chối</label>
            </div>
        </div>
        <div className='text-right'>
            <button className='bg-blue-300 text-lg py-2 px-5 rounded-md hover:bg-blue-400 inline-block' onClick={handleSubmit}>Gửi</button>
        </div>
    </form>
    </div>
  );
}

export default AcceptPostAction;