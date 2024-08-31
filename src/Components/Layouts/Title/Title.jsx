// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './Title.module.css'

// APIs

// Libraries

// Layouts

// Icons

export default function Title({title}) {
    return (
        <div className="pb-sm">
            <h2 className='title'>{title}</h2>
        </div>
    )
}
