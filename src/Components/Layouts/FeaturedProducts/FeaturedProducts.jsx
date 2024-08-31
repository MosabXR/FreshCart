// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './FeaturedProducts.module.css'

// APIs
import { getAllProductsCustomAPI } from '../../APIs/ProductsAPI'

// Libraries

// Layouts
import ProductItem from '../ProductItem/ProductItem'
import ProductItemSkeleton from '../ProductItemSkeleton/ProductItemSkeleton'

// Icons

export default function FeaturedProducts() {

    let [products, setProducts] = useState([])
    let [productSkeleton] = useState(['', '', '', '', '', '', '', ''])
    let [loading, setLoading] = useState(false)

    const getAllProducts = async () => {
        setLoading(true)
        try {
            const { data } = await getAllProductsCustomAPI(`/products?category[in]=6439d2d167d9aa4ca970649f&limit=8`);
            setProducts(data)
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-xxs">
            {
                loading ?
                    productSkeleton.map(() => <ProductItemSkeleton key={Math.random()}></ProductItemSkeleton>)
                    :
                    products.map(product => <ProductItem key={product.id} product={product}></ProductItem>)
            }
        </div>
    )
}
