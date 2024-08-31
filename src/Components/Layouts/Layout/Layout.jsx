// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './Layout.module.css'

// APIs

// Libraries
import { Outlet } from 'react-router-dom'

// Layouts
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

// Icons

export default function Layout() {
    return (
        <div className='parent'>
            <Navbar />
            <div className="container min-h-screen">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}
