// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './ProductItemSkeleton.module.css'

// APIs

// Libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Layouts

// Icons
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function ProductItemSkeleton() {
    return (
        <div className="col-span-1">
            <div className="product-item w-full h-full border border-primary-gray group rounded p-xs animate-pulse">
                <div className="product-header relative overflow-hidden rounded">
                    <div className="bg-primary-gray py-lg"></div>
                </div>
                <div className="product-body text-sm flex flex-col gap-xxs py-xxs">
                    {/* <h3 className='font-semibold text-primary-black line-clamp-1'>Woman Shawl</h3> */}
                    <div className="w-32 h-2 bg-primary-gray rounded"></div>
                    <div className="pricing flex items-center gap-xxs">
                        {/* <p className='font-semibold text-primary-red'>149.00 EGP</p> */}
                        <div className="w-16 h-2 bg-primary-gray rounded"></div>
                    </div>
                    <div className="rating text-primary-gray flex items-center gap-xxs">
                        <ul className='text-xs flex gap-xxs'>
                            <li><FontAwesomeIcon icon={faStar} /></li>
                            <li><FontAwesomeIcon icon={faStar} /></li>
                            <li><FontAwesomeIcon icon={faStar} /></li>
                            <li><FontAwesomeIcon icon={faStar} /></li>
                            <li><FontAwesomeIcon icon={faStar} /></li>
                        </ul>
                        {/* <span>{`(18)`}</span> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
