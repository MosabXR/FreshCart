// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './Products.module.css'

// APIs
import { getAllProductsAPI } from '../../APIs/ProductsAPI'
import { getUserWishlistAPI } from '../../APIs/WishlistAPI'

// Libraries
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Layouts
import Title from '../../Layouts/Title/Title'
import ProductItem from '../../Layouts/ProductItem/ProductItem'
import AsideCategories from '../../Layouts/AsideCategories/AsideCategories'
import ProductItemSkeleton from '../../Layouts/ProductItemSkeleton/ProductItemSkeleton'

// Icons
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function Products() {

    const { id } = useParams()
    const { type } = useParams()


    let [searchField, setSearchField] = useState(``)

    let [loading, setLoading] = useState(false);
    let [products, setProducts] = useState([]);
    let [productSkeleton] = useState(['', '', '', '', '', '', '', ''])

    const getAllProducts = async (type, id) => {
        setLoading(true)
        try {
            const { data } = await getAllProductsAPI(type, id);
            setProducts(data)
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (searchField === `` && id) {
            getAllProducts(type, id);
        } else if (searchField === `` && !id) {
            getAllProducts(``, ``);
        } else {
            setProducts(products.filter(product => product['title'].toLowerCase().includes(searchField.toLowerCase())))
        }
    }, [searchField])

    useEffect(() => {
        getAllProducts(type, id);
    }, [id])

    useEffect(() => {
        if (type && id) {
            getAllProducts(type, id);
        } else {
            getAllProducts(``, ``);
        }
    }, [])

    return (
        <>
            <Title title={`Products`} />
            <div className="search pb-sm">
                <input onChange={(e) => setSearchField(e.target.value)} value={searchField} className='form-control' type="text" placeholder='Looking for a certain product?' />
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-xxs">
                <div className="w-full md:w-1/6">
                    <AsideCategories />
                </div>
                <div className="w-full md:w-5/6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-xxs">
                        {
                            loading ?
                                productSkeleton.map(() => <ProductItemSkeleton key={Math.random()}></ProductItemSkeleton>)
                                :
                                products.map(product => <ProductItem key={product.id} product={product}></ProductItem>)
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
