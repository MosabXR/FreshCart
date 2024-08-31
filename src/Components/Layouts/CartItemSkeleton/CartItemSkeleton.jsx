import React from 'react'
import { useState, useEffect } from 'react'
import './CartItemSkeleton.module.css'

export default function CartItemSkeleton() {
    return (
        <>
            <div className="hidden md:flex justify-between items-center border border-primary-gray py-xxs px-xs md:py-xs md:px-sm rounded shadow-sm">
                <div className="w-1/4 flex justify-start items-center gap-xxs">
                    <div className="w-1/6">
                        {/* <img src={productItem.imageCover} alt={productItem.title} className='w-full h-full object-cover' /> */}
                        <div className="w-10 h-10 bg-primary-gray rounded"></div>
                    </div>
                    <div className="w-4/6">
                        {/* <h3 className='line-clamp-1'>{productItem.title}</h3> */}
                        <div className="w-64 h-2 bg-primary-gray rounded"></div>
                    </div>
                </div>
                <div className="w-1/4 flex justify-center">
                    {/* <h3>{cartItemData.price}.00 EGP</h3> */}
                    <div className="w-16 h-2 bg-primary-gray rounded"></div>
                </div>
                <div className="w-1/4 flex justify-center">
                    {/* <h3>{cartItemData.count}</h3> */}
                    <div className="w-8 h-2 bg-primary-gray rounded"></div>
                </div>
                <div className="w-1/4 flex justify-center">
                    {/* <h3>{cartItemData.count * cartItemData.price}.00 EGP</h3> */}
                    <div className="w-16 h-2 bg-primary-gray rounded"></div>
                </div>
            </div>

            <div className="md:hidden flex justify-between items-center border border-primary-gray py-xxs px-xs md:py-xs md:px-sm rounded shadow-sm">
                <div className="flex items-center justify-between gap-xs md:hidden flex-grow">
                    <div className="w-1/4">
                        {/* <img src={productItem.imageCover} alt={productItem.title} className='w-full h-full object-cover' /> */}
                        <div className="w-28 h-28 bg-primary-gray rounded"></div>
                    </div>
                    <div className="w-2/4 flex flex-col gap-xxs">
                        {/* <h2>{productItem.title}</h2> */}
                        <div className="w-28 sm:w-64 h-2 bg-primary-gray rounded"></div>
                        <div className="pricing flex gap-xxs">
                            {/* <p>{cartItemData.count}</p> */}
                            {/* <span>x</span> */}
                            {/* <p className='font-semibold'>{cartItemData.price}.00 EGP</p> */}
                            <div className="w-32 h-2 bg-primary-gray rounded"></div>
                        </div>
                    </div>
                    <div className="w-1/4 flex justify-end">
                        <div className="w-8 h-2 bg-primary-gray rounded"></div>
                    </div>
                </div>
            </div>
        </>
    )
}
