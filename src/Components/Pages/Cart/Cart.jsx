// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './Cart.module.css'

// APIs
import { getUserCartAPI } from '../../APIs/CartAPI';

// Libraries
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

// Layouts
import Title from '../../Layouts/Title/Title';
import CartItem from '../../Layouts/CartItem/CartItem';
import CartItemSkeleton from '../../Layouts/CartItemSkeleton/CartItemSkeleton';

// Icons

export default function Cart() {

    let [loading, setLoading] = useState(false);
    let [cartData, setCartData] = useState([]);
    let [moreCartData, setMoreCartData] = useState([]);
    let [cart, setCart] = useState([]);
    const [cartSkeleton] = useState(['', '', ''])

    const getLoggedUserCart = async () => {
        setLoading(true)
        try {
            const cartDataAPI = await getUserCartAPI();
            const moreCartDataAPI = cartDataAPI.data;
            const cartProducts = moreCartDataAPI.products;
            setCartData(cartDataAPI);
            setMoreCartData(moreCartDataAPI);
            setCart(cartProducts);
            setLoading(false);

            // console.log(cartDataAPI);
            // console.log(moreCartDataAPI);
            // console.log(cartProducts);

        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        getLoggedUserCart();
    }, [])

    return (
        <>
            <Title title={`My Cart (${cartData.numOfCartItems ? cartData.numOfCartItems : 0})`} />
            <div className="flex flex-col gap-xs pb-sm">
                <div className="flex justify-between border border-primary-gray py-xxs px-xs md:py-xs md:px-sm rounded shadow-sm">
                    <div className="w-1/4 flex justify-start">
                        <h3>Product</h3>
                    </div>
                    <div className="hidden w-1/4 md:flex justify-center">
                        <h3>Price</h3>
                    </div>
                    <div className="w-1/4 justify-end flex md:justify-center">
                        <h3>Quantity</h3>
                    </div>
                    <div className="hidden w-1/4 md:flex md:justify-center">
                        <h3>Subtotal</h3>
                    </div>
                </div>
                {
                    loading ?
                    cartSkeleton.map(()=> <CartItemSkeleton key={Math.random()}></CartItemSkeleton>)
                    :
                        cart.map(product => <CartItem key={product.product.id} product={product} fn={getLoggedUserCart}></CartItem>)
                }
                <div className="flex flex-wrap-reverse md:flex-nowrap gap-xs justify-between items-center">
                    <Link to={`/Products`}><button className='bg-primary-white text-primary-black border border-primary-black hover:bg-primary-black hover:text-primary-white duration-300 p-xxs rounded flex-grow md:flex-grow-0'>Return To Shop</button></Link>
                    <button onClick={getLoggedUserCart} className='bg-primary-white text-primary-black border border-primary-black hover:bg-primary-black hover:text-primary-white duration-300 p-xxs rounded flex-grow md:flex-grow-0'>Update Cart</button>
                </div>
            </div>
            <div className="flex flex-wrap gap-sm md:flex-nowrap flex-grow">
                <div className="w-1/2 flex flex-wrap md:flex-nowrap gap-xs flex-grow items-start">
                    <input className='border border-primary-gray rounded p-xxs flex-grow focus:outline-none' type="text" placeholder='Coupon Code' disabled />
                    <button className='bg-primary-red text-primary-white p-xxs flex-grow sm:flex-grow-0 rounded hover:bg-secondary-red duration-300 disabled:bg-secondary-red' disabled>Apply Coupon</button>
                </div>
                <div className="w-1/2 flex-grow">
                    <div className="w-full bg-primary-white text-primary-black border border-primary-gray rounded p-sm flex flex-col gap-xs flex-grow">
                        <h3 className='font-semibold text-lg pb-xxs'>Cart Total</h3>
                        <div className="flex flex-wrap sm:flex-nowrap justify-between border-b border-primary-gray pb-xxs">
                            <span>Subtotal</span>
                            <span>{moreCartData.totalCartPrice ? moreCartData.totalCartPrice : `0`}.00 EGP</span>
                        </div>
                        <div className="flex flex-wrap sm:flex-nowrap justify-between border-b border-primary-gray pb-xxs">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="flex flex-wrap sm:flex-nowrap justify-between pb-xxs">
                            <span>Total</span>
                            <span>{moreCartData.totalCartPrice ? moreCartData.totalCartPrice : `0`}.00 EGP</span>
                        </div>
                        <Link className='w-full flex-grow' to={`/Checkout/${cartData.cartId}`}><button className='bg-primary-red w-full text-primary-white p-xxs flex-grow sm:flex-grow-0 rounded hover:bg-secondary-red duration-300 disabled:bg-secondary-red' disabled={moreCartData.totalCartPrice ? false : `disabled`}>Proceed To Checkout</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}
