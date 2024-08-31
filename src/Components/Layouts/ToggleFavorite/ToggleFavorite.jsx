// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './ToggleFavorite.module.css'

// APIs
import { getUserWishlistAPI, addProductToWishlistAPI, removeProductFromWishlistAPI } from '../../APIs/WishlistAPI'

// Libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import toast from 'react-hot-toast'

// Layouts

// Icons
import { faHeart, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons'

export default function ToggleFavorite({ productId, color, favorite, fn }) {

    let notify;

    if (favorite != true)
        favorite = false;

    let [isFavorite, setIsFavorite] = useState(favorite);

    let [loading, setLoading] = useState(false);

    const addProductToWishlist = async productId => {
        setLoading(true);
        try {
            const { data } = await addProductToWishlistAPI(productId)
            setLoading(false);
            notify = toast.success('Added wishlist')
        } catch (error) {
            console.log(error);
            setLoading(false);
            notify = toast.error('An error occurred')
        }
        notify;
    }

    const removeProductFromWishlist = async productId => {
        setLoading(true);
        try {
            const { data } = await removeProductFromWishlistAPI(productId)
            setLoading(false);
            fn()
            notify = toast.success('Removed from wishlist')
        } catch (error) {
            console.log(error);
            setLoading(false);
            notify = toast.error('An error occurred')
        }
        notify;
    }

    return (
        <button onClick={() => { isFavorite ? removeProductFromWishlist(productId) : addProductToWishlist(productId); setIsFavorite(!isFavorite) }} className={`btn btn-${color}`} disabled={loading}>
            {loading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : isFavorite ? <FontAwesomeIcon icon={faHeart} /> : <FontAwesomeIcon icon={faRegularHeart} />}
        </button>
    )
}
