import React, { useEffect, useState } from "react";
import { HandlTime } from "/src/components/helper";

function Listnews() {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://103.118.28.122/data.json')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []); // Mảng rỗng [] để chỉ gọi API một lần khi component mount

  return (
    <div className="grid grid-cols-12 gap-2">
        <div className="col-span-8">
            <h3 className="flex"><span className="text-2xl font-medium bg-gray-800 text-white p-2">Tieu de</span> <span className="flex-1 border-b-4 border-gray-800"></span></h3>
            <div className="flex flex-col gap-3 mt-3">
            {data && data.map((item, index) => {
                if (!(index >= 0 && index <=8)) return null;
                if (index === 7) return null;
                return <BoxTinRow key={'listTin_' + index} item={item} hr={index!==0} />
            })}
            </div>
        </div>
        
        <div className="col-span-4 border-l border-gray-800 pl-3">
            <h3 className="text-2xl font-medium bg-gray-800 text-white text-center py-2"><span>Tin mới</span></h3>
            <div className="flex flex-col gap-3 mt-3">
            {data && data.map((item, index) => {
                if (!(index >= 0 && index <=8)) return null;
                if (index === 7) return null;
                return <BoxTinRow key={'listTin_' + index} item={item} />
            })}
            </div>
        </div>
    </div>
  );
}


function BoxTinRow({item, hr}){
    return(
        <>
        {hr && <hr className="border-t border-gray-800" />}
        <div className="flex gap-2">
            <div className="basis-1/3"><img className="w-full object-cover" src={item.thumb} alt="" /></div>
            <div className="basis-2/3">
                <a href="#" className="hover:text-gray-700 text-xl font-medium line-clamp-2" title={item.title}>{item.title}</a>
                <p className="text-sm">{HandlTime(item.date)}</p>
            </div>
        </div>
        </>
    )
}

export default Listnews;