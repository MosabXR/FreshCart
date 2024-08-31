// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './ProductsOnSale.module.css'

// APIs
import { getAllProductsAPI } from '../../APIs/ProductsAPI'

// Libraries
import Slider from "react-slick";

// Layouts
import ProductItem from '../ProductItem/ProductItem'
import ProductItemSkeleton from '../ProductItemSkeleton/ProductItemSkeleton';

// Icons

export default function ProductsOnSale() {

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

    let [products, setProducts] = useState([])
    let [productSkeleton] = useState(['', '', '', '', '', '', '', ''])
    let [loading, setLoading] = useState(false)

    const getAllProducts = async () => {
        setLoading(true)
        try {
            const { data } = await getAllProductsAPI();
            setProducts(data.filter(product => product.priceAfterDiscount))
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }


    useEffect(() => {
        getAllProducts();
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
