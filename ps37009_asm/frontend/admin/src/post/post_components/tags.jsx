import React, {useState,useEffect} from 'react';
import api from '/src/api';
import { notification } from 'antd';
function Tags({oldTags, addTag}) {
    const [tags, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState(null);

    useEffect(() => {
        const url = '/admin/tags/getalltags';
        api.get(url)
        .then(res => {
            const data = res.data;
            setTags(data);
        })
        .catch(err => {
            console.log("dv error: ",err);
        })
    }, []);

    const handleAddTag = () => {
        if(currentTag === null || currentTag === '') {
            notification.warning({message: 'Chưa chọn tag'});
            return;
        }
        if(oldTags.find(tag => tag.id == currentTag)) {
            notification.warning({message: 'Tag đã tồn tại'});
            return;
        }
        const tag = tags.find(tag => tag.id == currentTag);
        addTag(prev => [...prev, tag]);
    }

    const handleRemoveTag = (tag) => {
        console.log("tag: ",tag);
        addTag(prev => prev.filter(t => t.id != tag));
    };

  return (
    <>
    <div className="mt-4 shadow-lg p-5 rounded-lg">
    <h3 className='text-2xl'>Tags</h3>
        <div className="flex gap-4 flex-wrap">
            {oldTags.map((tag,index) =>  <span key={`tag_` + index } className="border p-3 relative">{tag.title} <button type='button' className="absolute right-[-10px] top-[-10px]" onClick={e=> handleRemoveTag(tag.id)}>X</button></span> )}
        </div>
    </div>

    <div className='flex justify-start gap-4 mt-4 items-center'>
        <select className="p-3 border rounded-lg" onChange={e=> setCurrentTag(e.target.value)}>
            <option value="">Chọn tag</option>
            {tags.map((tag,index) => <option key={`tag1_` + index} value={tag.id}>{tag.title}</option>)}
        </select>
        <button type='button' className='bg-blue-300 hover:bg-blue-400 py-3 px-5' onClick={handleAddTag}>Thêm tag</button>
    </div>
    </>
  );
}

export default Tags;