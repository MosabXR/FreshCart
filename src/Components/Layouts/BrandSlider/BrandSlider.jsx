// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './BrandSlider.module.css'

// APIs
import { getAllBrandsAPI } from '../../APIs/BrandsAPI'

// Libraries
import Slider from "react-slick";

// Layouts
import BrandItem from '../BrandItem/BrandItem'
import BrandItemSkeleton from '../BrandItemSkeleton/BrandItemSkeleton';

// Icons

export default function BrandSlider() {

    const settings = {
        dots: false,
        infinite: true,
        speed: 250,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
    }

    const settings2 = {
        dots: false,
        infinite: true,
        speed: 250,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
    }

    let [loading, setLoading] = useState(false);
    let [brands, setBrands] = useState([]);
    const [brandSkeleton] = useState(['', '', '', '', '', '', '', '', '', ''])

    const getAllBrands = async () => {
        setLoading(true)
        try {
            const { data } = await getAllBrandsAPI();
            setBrands(data)
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllBrands();
    }, [])

    return (
        <>
            <div className="hidden md:block">
                <Slider {...settings}>
                    {
                        loading ?
                            brandSkeleton.map(brand => <BrandItemSkeleton key={Math.random()}></BrandItemSkeleton>)
                            :
                            brands.map(brand => <BrandItem key={brand._id} brand={brand}></BrandItem>)
                    }
                </Slider>
            </div>
            <div className="block md:hidden">
                <Slider {...settings2}>
                    {
                        loading ?
                            brandSkeleton.map(brand => <BrandItemSkeleton key={Math.random()}></BrandItemSkeleton>)
                            :
                            brands.map(brand => <BrandItem key={brand._id} brand={brand}></BrandItem>)
                    }
                </Slider>
            </div>
        </>
    )
}
