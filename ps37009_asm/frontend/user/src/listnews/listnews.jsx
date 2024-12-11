import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "/src/api";
import { Pagination } from "antd"
import { timeAgo, convertToSlug } from "../helper/helper";
import LoaDing from "../components/loading";
function Listnews() {

    const { id } = useParams();

    const [data, setData] = useState([]);
    const [newNews, setNewNews] = useState([]);
    const [title, setTitle] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItem, setTotalItem] = useState(0);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const url = '/danhmuc/gettennew';
        const fetchData = async () => {
            try {
                const response = await api.get(url);
                const news = response.data;
                console.log('New news: ', news);
                setNewNews(news);
            } catch (error) {
                console.error('Failed to fetch data: ', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [id]);

    useEffect(() => {
        const url = '/danhmuc/' + id + '?page=' + currentPage;
        const fetchData = async () => {
            setLoader(true);
            try {
                const response = await api.get(url);
                const { news, title } = response.data;
                setTitle(title);
                const { data, total } = news;
                setData(data);
                setTotalItem(total);

            } catch (error) {
                console.error('Failed to fetch data: ', error);
            }
            setLoader(false);
        };
        fetchData();
    }, [currentPage, id]);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="grid grid-cols-12 gap-2">
            <div className="col-span-8">
                <h3 className="flex"><span className="text-2xl font-medium bg-gray-800 text-white p-2">{title}</span> <span className="flex-1 border-b-4 border-gray-800"></span></h3>
                <div className="flex flex-col gap-3 mt-3">
                    {data.map((item, index) => {
                        if (!(index >= 0 && index <= 8)) return null;
                        if (index === 7) return null;
                        return <BoxTinRow key={'listTin_' + index} item={item} hr={index !== 0} />
                    })}
                </div>

                <div className="mt-5">
                    <Pagination
                        current={currentPage} // Trang hiện tại
                        total={totalItem}            // Tổng số mục
                        style={{ justifyContent: 'center' }}
                        pageSize={10}         // Số mục trên mỗi trang
                        onChange={onPageChange} // Hàm xử lý khi trang thay đổi
                    />
                </div>
            </div>

            <div className="col-span-4 border-l border-gray-800 pl-3">
                <h3 className="text-2xl font-medium bg-gray-800 text-white text-center py-2"><span>Tin mới</span></h3>
                <div className="flex flex-col gap-3 mt-3">
                    {newNews.map((item, index) => {
                        return <BoxTinRow key={'listTin_' + index} item={item} />
                    })}
                </div>
            </div>
            <LoaDing loader={loader} />
        </div>
    );
}


function BoxTinRow({ item, hr }) {
    const slug = convertToSlug(item.title);
    const id = item.id;
    const links = '/chitiet/' + id + '/' + slug;
    return (
        <>
            {hr && <hr className="border-t border-gray-800" />}
            <div className="flex gap-2">
                <div className="basis-1/3"><img className="w-full object-cover" src={item.img} alt="" /></div>
                <div className="basis-2/3">
                    <Link to={links} className="hover:text-gray-700 text-xl font-medium line-clamp-2" title={item.title}>{item.title}</Link>
                    <p className="text-sm">{timeAgo(item.created_at)}</p>
                </div>
            </div>
        </>
    )
}

export default Listnews;