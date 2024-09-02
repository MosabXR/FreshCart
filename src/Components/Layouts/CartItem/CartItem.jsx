// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './CartItem.module.css'

// APIs
import { updateCartProductQuantityAPI, removeCartItemAPI } from '../../APIs/CartAPI';

// Libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import toast from 'react-hot-toast';

// Layouts

// Icons
import { faCircleNotch, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function CartItem({ product, fn }) {
    let notify;
    const cartItemData = product;
    const productItem = product.product;
    let [loading, setLoading] = useState(false);
    let [textField, setTextField] = useState(cartItemData.count);

    const updateCartProductQuantity = async (quantity) => {
        try {
            const { data } = await updateCartProductQuantityAPI(productItem.id, quantity, localStorage.getItem('userToken'))
            fn()
        } catch (error) {
            console.log(error);
        }
    }

    const removeCartItem = async (quantity) => {
        setLoading(true)
        try {
            const { data } = await removeCartItemAPI(productItem.id,localStorage.getItem('userToken'))
            fn()
            setLoading(false)
            notify = toast.success('Removed successfully');
        } catch (error) {
            console.log(error);
            setLoading(false)
            notify = toast.error('An error occured');
        }
        notify;
    }

    const handleChange = (e) => {
        setTextField(e.target.value);
        updateCartProductQuantity(e.target.value)
    }  

    return (
        <>
            <div className="hidden md:flex justify-between items-center border border-primary-gray py-xxs px-xs md:py-xs md:px-sm rounded shadow-sm relative">
                <button onClick={(productId)=>removeCartItem(productId)} className='btn btn-red absolute right-0 top-0 h-full'>{loading?<FontAwesomeIcon icon={faCircleNotch} spin />:<FontAwesomeIcon icon={faXmark} />}</button>
                <div className="w-1/4 flex justify-start items-center gap-xxs">
                    <div className="w-1/6">
                        <img src={productItem.imageCover} alt={productItem.title} className='w-full h-full object-cover' />
                    </div>
                    <div className="w-4/6">
                        <h3 className='line-clamp-1'>{productItem.title}</h3>
                    </div>
                </div>
                <div className="w-1/4 flex justify-center">
                    <h3>{cartItemData.price.toFixed(2)} EGP</h3>
                </div>
                <div className="w-1/4 flex justify-center">
                    <input type="number" className='form-control w-md' value={textField} onChange={(e) => handleChange(e)} min={1} max={productItem.quantity}/>
                </div>
                <div className="w-1/4 flex justify-center">
                    <h3>{Number(cartItemData.count * cartItemData.price).toFixed(2)} EGP</h3>
                </div>
            </div>

            <div className="md:hidden flex justify-between items-center border border-primary-gray py-xxs px-xs md:py-xs md:px-sm rounded shadow-sm relative">
                <button onClick={(productId)=>removeCartItem(productId)} className='btn btn-red absolute top-1 right-1 w-6 h-6 flex items-center justify-center'>{loading?<FontAwesomeIcon icon={faCircleNotch} spin />:<FontAwesomeIcon icon={faXmark} />}</button>
                <div className="flex items-center gap-xxs md:hidden">
                    <div className="w-1/4">
                        <img src={productItem.imageCover} alt={productItem.title} className='w-full h-full object-cover' />
                    </div>
                    <div className="w-2/4">
                        <h2>{productItem.title}</h2>
                        <div className="pricing flex gap-xxs">
                            <p>{cartItemData.count}</p>
                            <span>x</span>
                            <p className='font-semibold'>{cartItemData.price.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="w-1/4 flex justify-end">
                        <input type="number" className='form-control w-md' value={textField} onChange={(e) => handleChange(e)} min={1} max={productItem.quantity} />
                    </div>
                </div>
            </div>
        </>
    )
}
