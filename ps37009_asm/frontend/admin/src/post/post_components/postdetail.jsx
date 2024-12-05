import React from 'react';
import { timeAgo } from '../../components/helper';

function PostDetail({chitiet}){
    return (
        <div className="grid grid-cols-12 gap-2 p-5">
            <div className="col-span-12">
                <div className="shadow-lg rounded-md p-5">
                    <div>
                        <img className='w-full aspect-video object-cover' src={chitiet.img} alt="" />
                    </div>
                    <h1 className="text-3xl font-bold mt-4">{chitiet.title}</h1>
                    <div className="flex justify-between items-center mt-2"><span><span className="font-medium">Thời gian:</span> {timeAgo(chitiet.created_at)}</span> <span><span className="font-medium">Tác giả:</span> {chitiet.admin.fullname}</span></div>
                    <h2 className="text-xl font-medium mt-3">{chitiet.shortDes}</h2>
                    <p className="mt-3 text-xl" dangerouslySetInnerHTML={{ __html: chitiet.des }}></p>
                    <div className='p-3 mt-1 flex flex-wrap gap-3 items-center'>
                        <p className='m-0 text-xl'>Tags:</p>
                        {chitiet.tags.map((tag,index) => <span key={`tag_` + index} className="border p-3 relative">#{tag.title}</span>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;