// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './AllOrders.module.css'

// APIs

// Libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Layouts

// Icons
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

export default function AllOrders() {

    let navigate = useNavigate()

    setTimeout(()=>navigate('/'),3000);

    return (
        <div className="flex flex-col justify-center items-center gap-sm py-lg">
            <FontAwesomeIcon className='text-8xl text-primary-green' icon={faCircleCheck} />
            <h4 className='text-6xl'>Order Success</h4>
        </div>
    )
}
