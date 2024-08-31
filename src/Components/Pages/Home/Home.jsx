// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './Home.module.css'

// APIs

// Libraries
import { Link } from 'react-router-dom'
import Slider from "react-slick";

// Layouts
import Title from '../../Layouts/Title/Title'
import AsideCategories from '../../Layouts/AsideCategories/AsideCategories'
import ProductsOnSale from '../../Layouts/ProductsOnSale/ProductsOnSale'
import CategorySlider from '../../Layouts/CategorySlider/CategorySlider'
import FeaturedProducts from '../../Layouts/FeaturedProducts/FeaturedProducts'
import BrandSlider from '../../Layouts/BrandSlider/BrandSlider'

// Icons

// Images
import Banner1 from '../../../assets/img/home-banner-1.jpg'
import Banner2 from '../../../assets/img/home-banner-2.jpg'
import Banner3 from '../../../assets/img/home-banner-3.jpg'
import Banner4 from '../../../assets/img/home-banner-4.jpg'

export default function Home() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    let [ads] = useState([
        {
            title: 'Limited-Time Flash Sale!',
            desc: 'Hurry—our flash sale is on for 24 hours only! Enjoy incredible discounts on top products. Don’t miss out on these one-day-only savings!',
            image: Banner1,
        },
        {
            title: 'Your Cart Awaits',
            desc: 'Discover the convenience of online shopping. Add your must-have items to your cart and enjoy a smooth checkout process with special offers just for you.',
            image: Banner2,
        },
        {
            title: 'Innovate Your Tech Collection',
            desc: 'Explore our diverse range of electronics designed for every need. Featuring everything from premium headsets to advanced gadgets—find your next tech upgrade here!',
            image: Banner3,
        }
    ])


    return (
        <>
            <div className="flex flex-wrap lg:flex-nowrap gap-xxs pb-sm">
                <div className="w-full lg:w-1/6">
                    <AsideCategories />
                </div>
                <div className="w-full lg:w-5/6">
                    <Slider {...settings}>
                        {ads.map(ad =>
                            <div key={Math.random()} className="ad-banner bg-primary-gray overflow-hidden rounded h-[440px] relative">
                                <div className="overlay absolute left-0 top-0 w-full h-full text-primary-white flex flex-col justify-center px-md bg-primary-black bg-opacity-60">
                                    <h2 className='text-6xl font-bold'>{ad.title}</h2>
                                    <p className='text-xl'>{ad.desc}</p>
                                </div>
                                <img src={ad.image} alt="Banner" className='w-full h-full object-cover rounded' />
                            </div>
                        )}
                    </Slider>
                </div>
            </div>
            <div className="py-sm flex flex-col gap-sm">
                <Title title={`Flash Sales`} />
                <ProductsOnSale />
                <div className="flex justify-center">
                    <button className="btn btn-red"><Link to={'/Products'}>View All Products</Link></button>
                </div>
            </div>

            <div className="py-sm flex flex-col gap-sm">
                <Title title={`Categories`} />
                <CategorySlider />
            </div>

            <div className="py-sm flex flex-col gap-sm">
                <div className="ad-banner bg-primary-gray overflow-hidden rounded h-[440px] relative">
                    <div className="overlay absolute left-0 top-0 w-full h-full text-primary-white flex flex-col justify-center px-md bg-primary-black bg-opacity-60">
                        <h2 className='text-6xl font-bold py-xs'>Shop Happy, Live Happy</h2>
                        <p className='text-xl'>Celebrate shopping bliss with exclusive offers and fresh arrivals. Discover your next favorite item and enjoy a shopping experience that’s as exciting as it is rewarding.</p>
                    </div>
                    <img src={Banner4} alt="Banner" className='w-full h-full object-cover object-top rounded' />
                </div>
            </div>

            <div className="py-sm flex flex-col gap-sm">
                <Title title={`Our Products`} />
                <FeaturedProducts />
                <div className="flex justify-center">
                    <button className="btn btn-red"><Link to={'/Products'}>View All Products</Link></button>
                </div>

            </div>

            <div className="py-sm flex flex-col gap-sm">
                <Title title={`Brands`} />
                <BrandSlider />
            </div>
        </>
    )
}
