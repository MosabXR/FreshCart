// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './Navbar.module.css'
import token from '../../APIs/UserToken'

// Libraries
import { NavLink, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Icons
import { faHeart, faCartShopping, faUser, faBars } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {

    let [navState, setNavState] = useState(false)
    let navigate = useNavigate()

    const logOut = () =>{localStorage.removeItem('userToken');navigate('/Login')}

    return (
        <>
            <nav className={`h-[10vh] w-full bg-primary-white z-30 flex items-center shadow-sm ${navState?`fixed`:`relative`}`}>
                <div className="container flex justify-between">
                    <h1 className='text-2xl uppercase font-semibold'><span className='text-primary-red'>Fresh</span>Cart</h1>
                    <ul className='hidden md:flex items-center gap-sm'>
                        <li><NavLink to={`/`}>Home</NavLink></li>
                        <li><NavLink to={`Products`}>Products</NavLink></li>
                        <li><NavLink to={`Categories`}>Categories</NavLink></li>
                        <li><NavLink to={`Brands`}>Brands</NavLink></li>
                    </ul>
                    <ul className='flex items-center gap-sm'>
                        {token ?
                            <>
                                <li className='hidden md:block'><NavLink to={`Wishlist`}><FontAwesomeIcon icon={faHeart} /></NavLink></li>
                                <li onClick={()=>setNavState(!navState)} className=''><NavLink to={`Cart`}><FontAwesomeIcon icon={faCartShopping} /></NavLink></li>
                                <li className='hidden md:block'><NavLink to={`AccountSettings`}><FontAwesomeIcon icon={faUser} /></NavLink></li>
                            </>
                            :
                            <>
                                <li className='hidden md:block'><NavLink to={`/Login`}>Login</NavLink></li>
                                <li className='hidden md:block'><NavLink to={`/Register`}>Register</NavLink></li>
                            </>
                        }
                                                        <li onClick={()=>setNavState(!navState)} className='cursor-pointer md:hidden'><FontAwesomeIcon icon={faBars} /></li>
                    </ul>
                </div>
                <Toaster />
            </nav>
            <div className={`responsive-nav fixed top-[10vh] left-0 w-full h-[90vh] z-30 bg-primary-white md:hidden ${navState?`block`:`hidden`}`}>
                <div className="container h-full flex flex-col justify-around">
                    <ul className='flex flex-col gap-sm'>
                        <li onClick={()=>setNavState(!navState)} className='hover:pl-xs hover:text-primary-red duration-300'><NavLink to={`/`}>Home</NavLink></li>
                        <li onClick={()=>setNavState(!navState)} className='hover:pl-xs hover:text-primary-red duration-300'><NavLink to={`Products`}>Products</NavLink></li>
                        <li onClick={()=>setNavState(!navState)} className='hover:pl-xs hover:text-primary-red duration-300'><NavLink to={`Categories`}>Categories</NavLink></li>
                        <li onClick={()=>setNavState(!navState)} className='hover:pl-xs hover:text-primary-red duration-300'><NavLink to={`Brands`}>Brands</NavLink></li>
                        {localStorage.getItem('userToken')?<li onClick={()=>setNavState(!navState)} className='hover:pl-xs hover:text-primary-red duration-300'><NavLink to={`Wishlist`}>Wishlist</NavLink></li>:null}
                    </ul>
                    <ul className='flex flex-col gap-sm'>
                        {!localStorage.getItem('userToken')?<li onClick={()=>setNavState(!navState)} className='hover:pl-xs hover:text-primary-red duration-300'><NavLink to={`/Login`}>Login</NavLink></li>:null}
                        {!localStorage.getItem('userToken')?<li onClick={()=>setNavState(!navState)} className='hover:pl-xs hover:text-primary-red duration-300'><NavLink to={`/Register`}>Register</NavLink></li>:null}
                        {localStorage.getItem('userToken')?<li onClick={()=>setNavState(!navState)} className='hover:pl-xs hover:text-primary-red duration-300'><NavLink to={`/AccountSettings`}>Account Settings</NavLink></li>:null}
                        {localStorage.getItem('userToken')?<li onClick={()=>{setNavState(!navState);logOut()}} className=' cursor-pointer hover:pl-xs hover:text-primary-red duration-300'>Logout</li>:null}
                    </ul>
                </div>
            </div>
        </>
    )
}
