import React, {useState,useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "/src/api";

function SlideBanner() {

    const [banners, setBanners] = useState([]);
    
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await api.get("/banners");
                const banners = response.data;
                setBanners(banners);
                console.log('Banners: ', banners);
            } catch (error) {
                console.error('Failed to fetch banners: ', error);
            }
        }
        fetchBanners();
    }, []);
    
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };

    if (banners.length == 0) return null;

    return (
        <div className="slider-container">
            {
                banners.length > 1 ?
                    <Slider {...settings}>
                        {banners.map((item, index) => <Slide key={'slide_' + index} linkImg={item.img} linkweb={item.link} />)}
                    </Slider>
                    :
                    <Slide linkImg={banners[0]?.img} linkweb={banners[0]?.link} />
            }
        </div>
    )
}

function Slide({ linkImg, linkweb }) {
    return (
        <div className="">
            <a href={linkweb} target="_blank" >
                <img src={linkImg} className="w-full aspect-[16/6] object-cover" alt="" />
            </a>
        </div>
    )
}

export default SlideBanner;