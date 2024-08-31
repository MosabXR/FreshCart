// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './NotFound.module.css'

// APIs

// Libraries

// Layouts

// Icons

export default function NotFound() {
    return (
        <div className="w-full h-full flex flex-col gap-sm justify-center items-center py-md">
            <h2 className='text-8xl text-primary-red'>404</h2>
            <h3 className="text-6xl">Oopsie!</h3>
            <h4 className="text-4xl">Page Not Found</h4>
        </div>
    )
}
