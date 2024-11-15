import React, { useEffect, useState } from "react";
import { HandlTime } from "/src/components/helper";

function NewsDetail() {

    const [data, setData] = useState(null);

    const chitiet = fchitiet();
    const binhluan = fbinhluan();

    useEffect(() => {
        fetch('http://103.118.28.122/data.json')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []); // Mảng rỗng [] để chỉ gọi API một lần khi component mount

    return (
        <div className="grid grid-cols-12 gap-2">
            <div className="col-span-12 md:col-span-8">
                <div className="shadow-lg rounded-md p-3">
                    <h1 className="text-3xl font-bold">{chitiet.title}</h1>
                    <div className="flex justify-between items-center mt-2"><span><span className="font-medium">Thời gian:</span> {HandlTime(chitiet.date)}</span> <span><span className="font-medium">Tác giả:</span> {chitiet.author}</span></div>
                    <h2 className="text-xl font-medium mt-3">{chitiet.shortDes}</h2>
                    <p className="mt-3 text-xl" dangerouslySetInnerHTML={{ __html: chitiet.des }}></p>
                </div>

                <div className="mt-4">
                    {/* comment */}
                    <form className="">
                        <div className="py-2 px-4 mb-2 bg-white rounded-lg rounded-t-lg shadow-[0_0_8px] shadow-gray-400">
                            <textarea id="comment" rows="6"
                                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                                placeholder="Bình luận của bạn..." required></textarea>
                        </div>
                        <div className="text-right">
                            <button type="button" className="inline-block py-2.5 px-4 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500">
                                Gửi bình luận
                            </button>
                        </div>
                    </form>
                </div>

                <div className="flex flex-col gap-3 mt-4">
                    {binhluan && binhluan.map((item, index) => {
                        return <BoxComment key={'comment_' + index} item={item} hr={index !== 0} />
                    })}
                </div>
            </div>

            <div className="col-span-12 md:col-span-4 pl-0 md:pl-2 mt-5 md:mt-0">
                <h3 className="text-2xl font-medium bg-gray-800 text-white text-center py-2"><span>Tin liên quan</span></h3>
                <div className="flex flex-col gap-3 mt-3">
                    {data && data.map((item, index) => {
                        if (!(index >= 0 && index <= 8)) return null;
                        if (index === 7) return null;
                        return <BoxTinRow key={'listTin_' + index} item={item} />
                    })}
                </div>
            </div>
        </div>
    );
}

function BoxTinRow({ item, hr }) {
    return (
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

function BoxComment({item, hr}){
    return (
        <>
        {hr && <hr className="border-t" />}
        <div>
            <div className="flex items-center gap-3">
                <img className="w-10 aspect-square object-cover rounded-[50%]" src={item.img} alt="" />
                <span className="text-lg font-medium">{item.name}</span>
                <span className="text-md">{HandlTime(item.date)}</span>
            </div>
            <p>{item.content}</p>
        </div>
        </>
    )
}

export default NewsDetail;


function fchitiet() {
    return {
        "title": "Bão Usagi giật cấp 12 đổ bộ Biển Đông, trở thành cơn bão số 9",
        "date": 1631251200,
        "author": "VTC News",
        "shortDes": "(VTC News) - Bão Usagi mạnh cấp 9, giật cấp 12 đã đổ bộ Biển Đông trở thành cơn bão số 9 trong năm, dự báo bão suy yếu thành áp thấp nhiệt đới trong 48 giờ tới.",
        "des": `Trung tâm Dự báo khí tượng thuỷ văn quốc gia cho biết, chiều nay (15/11), bão Usagi đã đi vào vùng biển phía Đông Bắc của khu vực Bắc Biển Đông, trở thành cơn bão số 9 trong năm 2024.

Như vậy, chỉ trong 1 tuần, Biển Đông liên tiếp đón 3 cơn bão. Trước đó, ngày 8/11, bão Yinxing mạnh cấp 14 (150-166km/h), giật cấp 17 tiến vào Biển Đông trở thành bão số 7. Tối 11/11, bão Toraji mạnh cấp 11 (103-117km/h), giật cấp 13 đổ bổ Biển Đông trở thành cơn bão số 8 trong năm.
<img src="https://cdn-i.vtcnews.vn/resize/th/upload/2024/11/15/bao-so-9-18211055.jpg" alt="Biển Đông đón cơn bão số 9 trong năm 2024. (Nguồn: NCHMF)" class="w-full object-cover" />
Biển Đông đón cơn bão số 9 trong năm 2024. (Nguồn: NCHMF)
Biển Đông đón cơn bão số 9 trong năm 2024. (Nguồn: NCHMF)

Cụ thể, lúc 16h ngày 15/11, vị trí tâm bão số 9 trên vùng biển phía Đông Bắc của khu vực Bắc Biển Đông. Sức gió mạnh nhất vùng gần tâm bão mạnh cấp 10 (89-102km/h), giật cấp 12. Bão di chuyển theo hướng Bắc Tây Bắc, tốc độ khoảng 15km/h.

Dự báo trong 24 giờ tới, bão số 9 trên vùng biển phía Đông Đài Loan, di chuyển theo hướng Bắc sau chuyển hướng Đông Bắc, mỗi giờ đi được 10-15km và suy yếu dần. Sức gió mạnh nhất vùng gần tâm bão mạnh cấp 8, giật cấp 10.

Dự báo đến 16h ngày 17/11, bão trên vùng biển phía Đông Đài Loan, đổi hướng Đông Đông Bắc, mỗi giờ đi được 5-10km/h và suy yếu thành áp thấp nhiệt đới. Sức gió mạnh nhất vùng gần tâm bão mạnh cấp 6-7, giật cấp 9.

Dự báo thời tiết trên biển, cơ quan khí tượng cho biết, đêm 15/11 và ngày 16/11, vùng biển phía Đông Bắc khu vực Bắc Biển Đông có mưa bão, gió mạnh cấp 6-7, vùng gần tâm bão cấp 8-10, giật cấp 12, biển động rất mạnh, sóng biển cao 2-4m, vùng gần tâm bão 4-6m.

Đêm 16/11 và ngày 17/11, vùng biển phía Đông Bắc khu vực Bắc Biển Đông (phía Bắc vĩ tuyến 21,0N; phía Đông kinh tuyến 119,0E) gió mạnh cấp 6, giật cấp 7-8, sóng biển cao 2-4m.

Tàu thuyền hoạt động trong các vùng nguy hiểm nói trên đều có khả năng chịu tác động của dông, lốc, gió mạnh, sóng lớn.  `
    }
}

function fbinhluan(){
    return [
        {
            img: "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
            name: "Nguyễn Văn A",
            date: 1631251200,
            content: "Bão này mạnh quá, chúc mọi người an toàn"
        },
        {
            img: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
            name: "Nguyễn Văn B",
            date: 1631251200,
            content: "Bão này mạnh quá, chúc mọi người an toàn"
        },
        {
            img: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
            name: "Nguyễn Văn C",
            date: 1631251200,
            content: "Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy."
        },
        {
            img: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
            name: "Nguyễn Văn D",
            date: 1631251200,
            content: "Bão này mạnh quá, chúc mọi người an toàn"
        }
    ]
}