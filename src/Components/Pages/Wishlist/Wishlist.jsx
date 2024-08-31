// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './Wishlist.module.css'

// APIs
import { getUserWishlistAPI } from '../../APIs/WishlistAPI'

// Libraries

// Layouts
import Title from '../../Layouts/Title/Title'
import ProductItem from '../../Layouts/ProductItem/ProductItem'
import ProductItemSkeleton from '../../Layouts/ProductItemSkeleton/ProductItemSkeleton'

// Icons

export default function Wishlist() {

    let [loading, setLoading] = useState(false);
    let [wishlist, setWishlist] = useState([]);
    const [wishlistSkeleton] = useState(['', '', '', '', '', '', '', '', '', ''])

    const getLoggedUserWishlist = async () => {
        setLoading(true)
        try {
            const { data } = await getUserWishlistAPI();
            setWishlist(data)
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        getLoggedUserWishlist();
    }, [])

    return (
        <>
            <Title title={`My Wishlist (${wishlist ? wishlist.length : 0})`} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-xxs">
                {
                    loading ?
                        wishlistSkeleton.map(() => <ProductItemSkeleton key={Math.random()}></ProductItemSkeleton>)
                        :
                        wishlist.map(product => <ProductItem key={product.id} product={product} favorite={true} fn={getLoggedUserWishlist}></ProductItem>)
                }
            </div>
        </>
    )
}
