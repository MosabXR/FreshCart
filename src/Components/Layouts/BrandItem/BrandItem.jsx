// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './BrandItem.module.css'

// APIs

// Libraries
import { Link } from 'react-router-dom'

// Layouts

// Icons

export default function BrandItem({ brand }) {
    return (
        <Link to={`/products/brand/${brand._id}`}>
            <div className="col-span-1 h-[12rem]">
                <div className="brand w-full h-full flex flex-col gap-2 p-sm justify-center items-center text-center bg-primary-white text-primary-black hover:bg-primary-red hover:text-primary-white duration-300 cursor-pointer rounded border border-primary-gray shadow-sm">
                    <div className="overflow-hidden rounded">
                        <img src={brand.image} alt={brand.name} className='w-full h-full object-cover' />
                    </div>
                </div>
            </div>
        </Link>
    )
}
