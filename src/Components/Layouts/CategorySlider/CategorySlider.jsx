// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './CategorySlider.module.css'

// APIs
import { getAllCategoriesAPI } from '../../APIs/CategoriesAPI'

// Libraries
import Slider from "react-slick";

// Layouts
import CategoryItem from '../CategoryItem/CategoryItem'
import CategoryItemSkeleton from '../CategoryItemSkeleton/CategoryItemSkeleton';

// Icons

export default function CategorySlider() {

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
    let [categories, setCategories] = useState([]);
    const [categorySkeleton] = useState(['', '', '', '', '', '', '', '', '', ''])

    const getAllCategories = async () => {
        setLoading(true)
        try {
            const { data } = await getAllCategoriesAPI();
            setCategories(data)
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    return (
        <>
            <div className="hidden md:block">
                <Slider {...settings}>
                    {
                        loading ?
                            categorySkeleton.map(category => <CategoryItemSkeleton key={Math.random()}></CategoryItemSkeleton>)
                            :
                            categories.map(category => <CategoryItem key={category._id} category={category}></CategoryItem>)
                    }
                </Slider>
            </div>
            <div className="block md:hidden">
                <Slider {...settings2}>
                    {
                        loading ?
                            categorySkeleton.map(category => <CategoryItemSkeleton key={Math.random()}></CategoryItemSkeleton>)
                            :
                            categories.map(category => <CategoryItem key={category._id} category={category}></CategoryItem>)
                    }
                </Slider>
            </div>
        </>
    )
}
