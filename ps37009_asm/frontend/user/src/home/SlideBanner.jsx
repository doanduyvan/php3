import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// const linksImg = [
//     {
//         img: 'https://clickbuy.com.vn/uploads/media/620-SkSDQ.png',
//         link: 'https://clickbuy.com.vn/iphone-16-pro-max'
//     },
//     {
//         img: 'https://clickbuy.com.vn/uploads/media/617-KpqUC.png',
//         link: 'https://clickbuy.com.vn/samsung-galaxy-s24-series'
//     },
//     {
//         img: 'https://clickbuy.com.vn/uploads/media/633-AEmum.png',
//         link: 'https://clickbuy.com.vn/samsung-galaxy-z-fold5-cu-dep'
//     }
// ]

const linksImg = [
    {
        img: 'https://clickbuy.com.vn/uploads/media/620-SkSDQ.png',
        link: 'https://clickbuy.com.vn/iphone-16-pro-max'
    },
    {
        img: 'https://clickbuy.com.vn/uploads/media/633-AEmum.png',
        link: 'https://clickbuy.com.vn/samsung-galaxy-z-fold5-cu-dep'
    }
]

function SlideBanner() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };
    return (
        <div className="slider-container">
            {
                linksImg.length > 1 ?
                    <Slider {...settings}>
                        {linksImg.map((item, index) => <Slide key={'slide_' + index} linkImg={item.img} linkweb={item.link} />)}
                    </Slider>
                    :
                    <Slide linkImg={linksImg[0].img} linkweb={linksImg[0].link} />
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