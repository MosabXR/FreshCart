// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './AddToCart.module.css'

// APIs
import { addProductToCartAPI } from '../../APIs/CartAPI'

// Libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import toast from 'react-hot-toast'

// Layouts

// Icons
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

export default function AddToCart({ productId, color }) {

    let notify;
    let [loading, setLoading] = useState(false);
    const addProductToCart = async productId => {
        setLoading(true);
        try {
            const { data } = await addProductToCartAPI(productId)
            setLoading(false);
            notify = toast.success('Added to cart');
        } catch (error) {
            console.log(error);
            setLoading(false);
            notify = toast.error('An error ocurred');
        }
        notify;
    }

    return (
        <button onClick={() => addProductToCart(productId)} className={`btn btn-${color} flex-grow`} disabled={loading}>
            {loading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : `Add To Cart`}
        </button>
    )
}
