// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './Brands.module.css'

// APIs
import { getAllBrandsAPI } from '../../APIs/BrandsAPI';

// Libraries

// Layouts
import Title from '../../Layouts/Title/Title'
import BrandItem from '../../Layouts/BrandItem/BrandItem'
import BrandItemSkeleton from '../../Layouts/BrandItemSkeleton/BrandItemSkeleton'

// Icons

export default function Brands() {

    let [loading, setLoading] = useState(false);
    let [brands, setBrands] = useState([]);
    const [brandSkeleton] = useState(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''])

    const getAllBrands = async () => {
        setLoading(true)
        try {
            const { data } = await getAllBrandsAPI();
            setBrands(data)
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllBrands();
    }, [])

    return (
        <>
            <Title title={`Brands`} />
            <div className="grid grid-cols-2 gap-xs md:grid-cols-4">
                {
                    loading?
                    brandSkeleton.map(brand => <BrandItemSkeleton key={Math.random()}></BrandItemSkeleton>)
                    :
                brands.map(brand => <BrandItem key={brand._id} brand={brand}></BrandItem>)
                }
            </div>
        </>
    )
}
