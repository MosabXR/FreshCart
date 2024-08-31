// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './ProductSlider.module.css'

// APIs
import { getAllProductsCustomAPI } from '../../APIs/ProductsAPI'

// Libraries
import Slider from "react-slick";

// Layouts
import ProductItem from '../ProductItem/ProductItem'
import ProductItemSkeleton from '../ProductItemSkeleton/ProductItemSkeleton';

// Icons

export default function ProductSlider({ api }) {

    const settings = {
        dots: false,
        infinite: true,
        speed: 250,
        slidesToShow: 5,
        slidesToScroll: 5,
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

    let [products, setProducts] = useState([])
    let [productSkeleton] = useState(['', '', '', '', '', '', '', ''])
    let [loading, setLoading] = useState(false)

    const getAllProducts = async api => {
        setLoading(true)
        try {
            const { data } = await getAllProductsCustomAPI(api);
            setProducts(data)
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllProducts(api);
    }, [])

    return (
        <>
            <div className="hidden md:block">
                <Slider {...settings}>
                    {loading ?
                        productSkeleton.map(() => <ProductItemSkeleton key={Math.random()} />)
                        :
                        products.map(product => <ProductItem key={product.id} product={product} />)
                    }
                </Slider>
            </div>
            <div className="block md:hidden">
                <Slider {...settings2}>
                    {loading ?
                        productSkeleton.map(() => <ProductItemSkeleton key={Math.random()} />)
                        :
                        products.map(product => <ProductItem key={product.id} product={product} />)
                    }
                </Slider>
            </div>
        </>
    )
}
