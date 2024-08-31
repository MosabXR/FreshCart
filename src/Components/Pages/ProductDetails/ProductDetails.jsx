// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './ProductDetails.module.css'

// APIs
import { getProductAPI } from '../../APIs/ProductsAPI'

// Libraries
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Layouts
import Title from '../../Layouts/Title/Title'
import AddToCart from '../../Layouts/AddToCart/AddToCart'
import ToggleFavorite from '../../Layouts/ToggleFavorite/ToggleFavorite'
import ProductSlider from '../../Layouts/ProductSlider/ProductSlider'

// Icons
import { faStar, faStarHalfStroke, faHeart, faTruck, faRotate } from '@fortawesome/free-solid-svg-icons'

export default function ProductDetails() {

    const { productId } = useParams()
    const [product, setProduct] = useState([]);
    const [productLoading, setProductLoading] = useState(false);

    const getProduct = async productId => {
        setProductLoading(true);
        try {
            const { data } = await getProductAPI(productId)
            setProduct(data);
            setProductLoading(false);
        } catch (error) {
            console.log(error);
            setProductLoading(false);
        }
    }

    useEffect(() => {
        getProduct(productId);
    }, [])

    useEffect(()=>{
        getProduct(productId);
    },[productId]);

    return (
        <>
            <Title title={`Product Details`} />
            <div className="flex flex-wrap md:flex-nowrap gap-xxs pb-sm">
                <div className="w-full md:w-3/6 flex flex-wrap-reverse gap-xxs lg:flex-nowrap">
                    <div className="w-full md:w-full lg:w-1/3">
                        <div className={`grid grid-cols-4 gap-xxs md:grid-cols-4 ${product?.images?.length >= 2 ? `lg:grid-cols-2` : `lg:grid-cols-1`}`}>
                            {product?.images?.map(image =>
                                <div key={Math.random()} className="col-span-1 hover:scale-105 duration-300">
                                    <div className="image-container">
                                        <img src={image} alt={product?.title} className='w-full h-full object-cover' />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full md:w-full lg:w-2/3">
                        <div className="image-container">
                            <img src={product?.imageCover} alt={product?.title} className='w-full h-full object-cover' />
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-3/6">
                    <div className="flex flex-col gap-xxs">
                        <div className="box box-col">
                            <h2>{product?.title}</h2>
                            <div className="flex items-center gap-xxs text-primary-gray">
                                <ul className='text flex gap-xxs'>
                                    {product?.ratingsAverage >= 1 ? <li className='text-primary-yellow'><FontAwesomeIcon icon={faStar} /></li> : product.ratingsAverage >= 0.5 ? <li className='text-primary-yellow'><FontAwesomeIcon icon={faStarHalfStroke} /></li> : <li><FontAwesomeIcon icon={faStar} /></li>}
                                    {product?.ratingsAverage >= 2 ? <li className='text-primary-yellow'><FontAwesomeIcon icon={faStar} /></li> : product.ratingsAverage >= 1.5 ? <li className='text-primary-yellow'><FontAwesomeIcon icon={faStarHalfStroke} /></li> : <li><FontAwesomeIcon icon={faStar} /></li>}
                                    {product?.ratingsAverage >= 3 ? <li className='text-primary-yellow'><FontAwesomeIcon icon={faStar} /></li> : product.ratingsAverage >= 2.5 ? <li className='text-primary-yellow'><FontAwesomeIcon icon={faStarHalfStroke} /></li> : <li><FontAwesomeIcon icon={faStar} /></li>}
                                    {product?.ratingsAverage >= 4 ? <li className='text-primary-yellow'><FontAwesomeIcon icon={faStar} /></li> : product.ratingsAverage >= 3.5 ? <li className='text-primary-yellow'><FontAwesomeIcon icon={faStarHalfStroke} /></li> : <li><FontAwesomeIcon icon={faStar} /></li>}
                                    {product?.ratingsAverage >= 5 ? <li className='text-primary-yellow'><FontAwesomeIcon icon={faStar} /></li> : product.ratingsAverage >= 4.5 ? <li className='text-primary-yellow'><FontAwesomeIcon icon={faStarHalfStroke} /></li> : <li><FontAwesomeIcon icon={faStar} /></li>}
                                </ul>
                                <span>{`(${product?.ratingsQuantity ? product?.ratingsQuantity : 0})`}</span>
                                <span>|</span>
                                {product?.quantity ? <span className='text-primary-green'>In Stock</span> : <span className='text-primary-red'>Out of stock</span>}
                            </div>
                            <p>{Number(product.price).toFixed(2)} EGP</p>
                            <p className='border-b border-primary-gray pb-xs text'>{product.description}</p>
                            <div className="flex gap-xxs">
                                <AddToCart productId={product.id} color={`red`}></AddToCart>
                                <ToggleFavorite productId={product.id} color={`transparent`}></ToggleFavorite>
                            </div>
                        </div>
                        <div className="box box-col text gap-0">
                            <div className="flex items-center gap-xs border-b border-primary-gray pb-xxs">
                                <div className="w-1/12 flex justify-center">
                                    <FontAwesomeIcon icon={faTruck} />
                                </div>
                                <div className="w-11/12">
                                    <h4>Free Delivery</h4>
                                    <p>Enter your postal code for delivery availability</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-xs pt-xxs">
                                <div className="w-1/12 flex justify-center">
                                    <FontAwesomeIcon icon={faRotate} />
                                </div>
                                <div className="w-11/12">
                                    <h4>Return Delivery</h4>
                                    <p>Free 30 days delivery returns.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Title title={`Related Products`} />
            {product?.category?._id?<ProductSlider api={`/products?category[in]=${product?.category?._id}`}/>:null}
        </>
    )
}
