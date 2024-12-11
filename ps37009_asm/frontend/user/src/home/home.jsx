import React, { useEffect, useState } from "react";
import SlideBanner from "./SlideBanner";
import { HandlTime } from "/src/components/helper";
import { Link } from "react-router-dom";
import api from "/src/api";
import { truncateText } from "../helper/helper";
import LoaDing from "../components/loading";
import { convertToSlug } from "../helper/helper";
import { timeAgo } from "../helper/helper";
function Home() {

    const [data, setData] = useState(null);
    const [DataSection, setDataSection] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        api.get('/home')
        .then(response => { 
            const data = response.data;
            setData(data.news1);
            setDataSection(data.danhmuc);
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <>
            <section className="grid grid-cols-12 gap-3">
                <div className="col-span-12 row-span-1 md:col-span-8"> {data && <Tinnoibat item={data[0]} />} </div>
                <div className="col-span-12 row-span-1 md:col-span-8 flex justify-between gap-3">
                    {data && data.map((item, index) => {
                        if (!(index >= 1 && index <=3)) return null;
                        return <ThreeTinMoiNhat key={'threeTin_' + index} item={item} />
                    })}
                </div>
                <div className="flex flex-col gap-3 col-span-12 md:col-span-4 md:row-start-1 md:row-span-3 md:col-start-9 md:-col-end-1">
                    {data && data.map((item, index) => {
                        if (!(index >= 4)) return null;
                        return <Listin key={'listTin_' + index} item={item} />
                    })}
                </div>
            </section>

            <section className="mt-6">
                <SlideBanner />
            </section>

            {DataSection.map((item, index) => <SectionTinTuc key={'sectionTin_' + index} title={item.title} data={item.news} />)}
            <LoaDing loader={loading} />
        </>
    )
}

function Tinnoibat({ item }) {
    const slug = convertToSlug(item.title);
    const href = '/chitiet/' + item.id + '/' + slug;
    return (
        <div className="">
            <div><img className="w-full object-cover aspect-video" src={item.img} alt="" /></div>
            <Link to={href} className="block text-3xl mt-2 hover:text-gray-700">{truncateText(item.title)}</Link>
            <p className="text-sm">{timeAgo(item.created_at)}</p>
        </div>
    )
}

function ThreeTinMoiNhat({ item }) {
    const slug = convertToSlug(item.title);
    const href = '/chitiet/' + item.id + '/' + slug;
    return (
        <div className="flex-1 flex flex-col gap-2">
            <div className="basis-1/3 object-cover"><img className="w-full aspect-video object-cover" src={item.img} alt="" /></div>
            <div className="basis-2/3">
                <Link to={href} className="hover:text-gray-700">{truncateText(item.title,100)}</Link>
                <p className="text-sm">{timeAgo(item.created_at)}</p>
            </div>
        </div>
    )
}

function Listin({ item }) {
    const slug = convertToSlug(item.title);
    const href = '/chitiet/' + item.id + '/' + slug;
    return (
        <div className="flex gap-2">
            <div className="basis-1/3"><img className="aspect-[16/11] object-cover" src={item.img} alt="" /></div>
            <div className="basis-2/3">
                <Link to={href} className="hover:text-gray-700">{truncateText(item.title,100)}</Link>
                <p className="text-sm">{timeAgo(item.created_at)}</p>
            </div>
        </div>
    )
}

function SectionTinTuc({ title, data = [] }) {
    if(data.length === 0) return null;
    return (
        <section className="mt-6">
        <h3 className="flex"><span className="text-2xl font-medium bg-gray-800 text-white p-2">{title}</span> <span className="flex-1 border-b-4 border-gray-800"></span></h3>
        <div className="grid grid-cols-12 gap-0 mt-5">
            { data.map((item, index) => {
                return <BoxTin key={'sectionTin_' + index} item={item} />
            })}
        </div>
    </section>
    )
}

function BoxTin({ item }) {
    const slug = convertToSlug(item.title);
    const href = '/chitiet/' + item.id + '/' + slug;
    return (
        <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 flex-1 flex flex-col gap-2 p-3 hover:shadow-[0px_0px_10px_gray] shadow-slate-800 hover:rounded-lg transition-all">
            <div className="basis-1/3 object-cover"><img className="w-full aspect-video object-cover" src={item.img} alt="" /></div>
            <div className="basis-2/3">
                <Link to={href} className="hover:text-gray-700 text-xl font-medium">{truncateText(item.title,100)}</Link>
                <p className="text-sm">{timeAgo(item.created_at)}</p>
            </div>
        </div>
    )
}




export default Home;