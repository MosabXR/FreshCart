// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './CategoryItem.module.css'

// APIs

// Libraries
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Layouts

// Icons
import { faMusic, faShirt, faPersonDress, faBagShopping, faBaby, faHouse, faBook, faPlus, faMobile, faPlug } from '@fortawesome/free-solid-svg-icons'

export default function CategoryItem({ category }) {

    const categoryIcons = {
        'Music': faMusic,
        "Men's Fashion": faShirt,
        "Women's Fashion": faPersonDress,
        'SuperMarket': faBagShopping,
        'Baby & Toys': faBaby,
        'Home': faHouse,
        'Books': faBook,
        'Beauty & Health': faPlus,
        'Mobiles': faMobile,
        'Electronics': faPlug
    };

    return (
        <Link to={`/products/category/${category._id}`}>
            <div className="col-span-1 h-[12rem]">
                <div className="category w-full h-full flex flex-col gap-2 p-sm justify-center items-center text-center bg-primary-white text-primary-red hover:bg-primary-red hover:text-primary-white duration-300 cursor-pointer rounded border border-primary-gray shadow-sm">
                    <FontAwesomeIcon icon={categoryIcons[category.name]} />
                    <h3 className='text-xs'>{category.name}</h3>
                </div>
            </div>
        </Link>
    )
}
