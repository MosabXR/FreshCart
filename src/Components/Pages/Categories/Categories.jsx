// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './Categories.module.css'

// APIs
import { getAllCategoriesAPI } from '../../APIs/CategoriesAPI'

// Libraries

// Layouts
import Title from '../../Layouts/Title/Title'
import CategoryItem from '../../Layouts/CategoryItem/CategoryItem'
import CategoryItemSkeleton from '../../Layouts/CategoryItemSkeleton/CategoryItemSkeleton'

// Icons

export default function Categories() {

    let [loading, setLoading] = useState(false);
    let [categories, setCategories] = useState([]);
    const [categorySkeleton] = useState(['', '', '', '', '', '', '', '', '', ''])

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

    return (
        <>
            <Title title={`Categories`} />
            <div className="grid grid-cols-2 gap-xs md:grid-cols-4">
                {
                    loading ?
                        categorySkeleton.map(category => <CategoryItemSkeleton key={Math.random()}></CategoryItemSkeleton>)
                        :
                        categories.map(category => <CategoryItem key={category._id} category={category}></CategoryItem>)
                }
            </div>
        </>
    )
}
