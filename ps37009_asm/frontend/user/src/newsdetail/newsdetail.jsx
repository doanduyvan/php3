import React, { useEffect, useState, useContext } from "react";
import { HandlTime } from "/src/components/helper";
import { useParams } from "react-router-dom";
import api from "/src/api";
import { timeAgo } from "/src/helper/helper";
import LoaDing from "../components/loading";
import { UserContext } from "/src/context/logincontext";
import { notification, Pagination } from "antd";
import { user_default } from '/src/SvgComponent'


function NewsDetail() {

    const { id } = useParams();
    const { user,isLogin } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [chitiet, setChitiet] = useState({});
    const [loader, setLoader] = useState(false);
    const [mycomment, setMycomment] = useState('');
    const [binhluan, setBinhluan] = useState([]);
    const [currentPageComment, setCurrentPageComment] = useState(1);
    const [totalItemComment, setTotalItemComment] = useState(0);

    useEffect(() => {
        const url = '/chitiet/' + id;
        const fetchData = async () => {
            setLoader(true);
            try {
                const response = await api.get(url);
                const data = response.data;
                const { chitiet, lienquan, comments } = data;
                setData(lienquan);
                setChitiet(chitiet);
            } catch (error) {
                console.error('Failed to fetch data: ', error);
            }
            setLoader(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const url = '/comments/' + id + '?page=' + currentPageComment;
        const fetchData = async () => {
            setLoader(true);
            try {
                const response = await api.get(url);
                const { data, total } = response.data;
                const dataCommentsNew = data.map(item => {
                    return {
                        img: item.customer.avatar || user_default,
                        name: item.customer.fullname,
                        date: item.created_at,
                        content: item.content
                    }
                });
                setBinhluan(dataCommentsNew);
                setTotalItemComment(total);
            } catch (error) {
                console.error('Failed to fetch data: ', error);
            }
            setLoader(false);
        };
        fetchData();
    }, [currentPageComment]);

    const submitComment = () => {
        if (!isLogin) {
            notification.warning({
                message: 'Thông báo',
                description: 'Vui lòng đăng nhập để bình luận'
            });
            return;
        }

        if (mycomment === '') {
            notification.warning({
                message: 'Thông báo',
                description: 'Vui lòng nhập nội dung bình luận'
            });
            return;
        }

        // Gửi bình luận

        const fetch = async () => {
            const url = '/comments/' + id;
            const datareq = {
                comment: mycomment
            }
            setLoader(true);
            try {
                const response = await api.post(url, datareq);
                const data = response.data;
                const newComment = {
                    img: user.imageUrl,
                    name: user.name,
                    date: data.created_at,
                    content: data.content
                };
                setBinhluan([newComment, ...binhluan]);
                setMycomment('');
            } catch (error) {
                console.error('Failed to fetch data: ', error);
            }
            setLoader(false);
        };
        fetch();
    };

    const onPageCommentChange = (page) => { 
        setCurrentPageComment(page);
    };

    return (
        <div className="grid grid-cols-12 gap-2">
            <div className="col-span-12 md:col-span-8">
                <div className="shadow-lg rounded-md p-3">
                    <h1 className="text-3xl font-bold">{chitiet.title}</h1>
                    <div className="flex justify-between items-center mt-2"><span><span className="font-medium">Thời gian:</span> {timeAgo(chitiet?.created_at)}</span> <span><span className="font-medium">Tác giả:</span> {chitiet?.admin?.fullname}</span></div>
                    <h2 className="text-xl font-medium mt-3">{chitiet.shortdes}</h2>
                    <p className="mt-3 text-xl" dangerouslySetInnerHTML={{ __html: chitiet?.des }}></p>
                </div>

                <div className="mt-4">
                    {/* comment */}
                    <form className="">
                        <div className="py-2 px-4 mb-2 bg-white rounded-lg rounded-t-lg shadow-[0_0_8px] shadow-gray-400">
                            <textarea id="comment" rows="6" value={mycomment} onChange={(e) => setMycomment(e.target.value)}
                                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                                placeholder="Bình luận của bạn..." required></textarea>
                        </div>
                        <div className="text-right">
                            <button type="button" onClick={submitComment} className="inline-block py-2.5 px-4 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500">
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

                <div className="mt-5">
                    <Pagination
                        current={currentPageComment} // Trang hiện tại
                        total={totalItemComment}    
                        pageSize={5}         
                        style={{ justifyContent: 'center' }}
                        onChange={onPageCommentChange} // Hàm xử lý khi trang thay đổi
                    />
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
            <LoaDing loader={loader} />
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
                    <p className="text-sm">{timeAgo(item.date)}</p>
                </div>
            </div>
        </>
    )
}

function BoxComment({ item, hr }) {

    return (
        <>
            {hr && <hr className="border-t" />}
            <div>
                <div className="flex items-center gap-3">
                    <img className="w-10 aspect-square object-cover rounded-[50%] bg-blue-400" src={item.img} alt="" />
                    <span className="text-lg font-medium">{item.name}</span>
                    <span className="text-md">{timeAgo(item.date)}</span>
                </div>
                <p className="">{item.content}</p>
            </div>
        </>
    )
}

export default NewsDetail;


function fbinhluan() {
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