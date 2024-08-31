// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './ProductItem.module.css'

// APIs

// Libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

// Layouts
import AddToCart from '../AddToCart/AddToCart'
import ToggleFavorite from '../ToggleFavorite/ToggleFavorite'

// Icons
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faEye } from '@fortawesome/free-regular-svg-icons'

export default function ProductItem({ product, favorite, fn, wishlist }) { 
    
    return (
        <div className="col-span-1">
            <div className="box box-col group gap-xxs">
                <div className="product-header relative overflow-hidden rounded">
                    <div className="product-overlay absolute top-0 left-0 w-full h-full">
                        <div className="h-full flex flex-col justify-between">
                            <div className="p-xxs text flex justify-between items-start">
                                {product.priceAfterDiscount ?
                                    <div className="sale bg-primary-red text-primary-white w-10 h-6 rounded flex justify-center items-center">
                                        -{Math.round((product.price - product.priceAfterDiscount) / product.price * 100)}%
                                    </div>
                                    : <div></div>
                                }
                                <div className="product-options flex flex-col gap-xxs relative left-16 group-hover:left-0 duration-300">
                                    <ToggleFavorite productId={product.id} color={`black`} favorite={favorite} fn={fn}></ToggleFavorite>
                                    <Link to={`/ProductDetails/${product.id}`}><button className='btn btn-black'><FontAwesomeIcon icon={faEye} /></button></Link>
                                </div>
                            </div>
                            <div className="flex relative top-20 group-hover:top-0 duration-300">
                                <AddToCart productId={product.id} color={`black`}></AddToCart>
                            </div>
                        </div>
                    </div>
                    <img src={product.imageCover} alt={product.title} className='' />
                </div>
                <div className="product-body text-sm flex flex-col gap-xxs py-xxs">
                    <h3 className='font-semibold text-primary-black line-clamp-1'>{product.title}</h3>
                    <div className="pricing flex gap-xxs text-xs">
                        <p className='font-semibold text-primary-red'>{product.priceAfterDiscount ? product.priceAfterDiscount.toFixed(2) : product.price.toFixed(2)} LE</p>
                        {product.priceAfterDiscount ? <p className='font-semibold text-primary-gray line-through'>{product.price.toFixed(2)} LE</p> : null}
                    </div>
                    <div className="text-primary-gray flex items-center gap-xxs text-xs">
                        <ul className='flex gap-xxs'>
                            {product.ratingsAverage >= 1 ? <li className='text-primary-yellow'><FontAwesomeIcon icon={faStar} /></li> : product.ratingsAverage >= 0.5 ? <li className='text-primary-yellow'><FontAwesomeIcon icon={faStarHalfStroke} /></li> : <li><FontAwesomeIcon icon={faStar} /></li>}
                            {product.ratingsAverage >= 2 ? <li className='text-primary-yellow'><FontAwesomeIcon icon={faStar} /></li> : product.ratingsAverage >= 1.5 ? <li className='text-primary-yellow'><FontAwesomeIcon icon={faStarHalfStroke} /></li> : <li><FontAwesomeIcon icon={faStar} /></li>}
                            {product.ratingsAverage >= 3 ? <li className='text-primary-yellow'><FontAwesomeIcon icon={faStar} /></li> : product.ratingsAverage >= 2.5 ? <li className='text-primary-yellow'><FontAwesomeIcon icon={faStarHalfStroke} /></li> : <li><FontAwesomeIcon icon={faStar} /></li>}
                            {product.ratingsAverage >= 4 ? <li className='text-primary-yellow'><FontAwesomeIcon icon={faStar} /></li> : product.ratingsAverage >= 3.5 ? <li className='text-primary-yellow'><FontAwesomeIcon icon={faStarHalfStroke} /></li> : <li><FontAwesomeIcon icon={faStar} /></li>}
                            {product.ratingsAverage >= 5 ? <li className='text-primary-yellow'><FontAwesomeIcon icon={faStar} /></li> : product.ratingsAverage >= 4.5 ? <li className='text-primary-yellow'><FontAwesomeIcon icon={faStarHalfStroke} /></li> : <li><FontAwesomeIcon icon={faStar} /></li>}
                        </ul>
                        <span>{`(${product.ratingsQuantity})`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
