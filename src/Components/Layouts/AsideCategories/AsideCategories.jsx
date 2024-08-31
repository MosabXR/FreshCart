// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './AsideCategories.module.css'

// APIs
import { getAllCategoriesAPI } from '../../APIs/CategoriesAPI';

// Libraries

// Layouts
import AsideCategoryItem from '../AsideCategoryItem/AsideCategoryItem'

// Icons

export default function AsideCategories() {

    let [loading, setLoading] = useState(false);
    let [categories, setCategories] = useState([]);
    const [categoriesSkeleton] = useState(['', '', '', '', '', '', '', '', '', ''])

    const getAllCategories = async () => {
        setLoading(true)
        try {
            const { data } = await getAllCategoriesAPI();
            setCategories(data)
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    if (loading) {
        return (
            <ul className='flex flex-wrap lg:flex-col gap-xxs pb-sm lg:pb-0 text-xs text-primary-red'>
                {
                    categoriesSkeleton.map(() =>
                        <li key={Math.random()} className='bg-primary-white rounded p-xxs border border-primary-gray duration-300 flex-grow flex items-center gap-xs w-1/4 lg:w-auto animate-pulse'>
                            <div className="w-4 h-4 bg-primary-gray rounded"></div>
                            <div className="w-[50%] h-2 bg-primary-gray rounded"></div>
                        </li>
                    )
                }
            </ul>
        )
    }

    return (
        <>
            <ul className='flex flex-wrap lg:flex-col gap-xxs pb-sm lg:pb-0 text-xs text-primary-red'>
                {categories.map(category => <AsideCategoryItem key={category._id} category={category} loading={loading}></AsideCategoryItem>)}
            </ul>
        </>
    )
}
