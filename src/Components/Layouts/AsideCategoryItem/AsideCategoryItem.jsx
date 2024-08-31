// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './AsideCategoryItem.module.css'

// APIs

// Libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';

// Layouts

// Icons
import { faMusic, faShirt, faPersonDress, faBagShopping, faBaby, faHouse, faBook, faPlus, faMobile, faPlug } from '@fortawesome/free-solid-svg-icons'

export default function AsideCategoryItem({ category, loading }) {

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
        <Link key={category._id} to={`/Products/category/${category._id}`} className='flex flex-grow'>
            <li className='bg-primary-white rounded p-xxs border border-primary-gray hover:bg-primary-red hover:text-primary-white lg:hover:px-xs duration-300 cursor-pointer flex-grow flex items-center gap-xs w-1/4 lg:w-auto'>
                <p><FontAwesomeIcon icon={categoryIcons[category.name]} /></p>
                <p>{category.name}</p>
            </li>
        </Link>
    )
}
