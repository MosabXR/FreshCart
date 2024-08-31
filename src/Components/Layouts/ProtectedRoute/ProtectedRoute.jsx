// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './ProtectedRoute.module.css'

// APIs
import token from '../../APIs/UserToken'
import { Navigate } from 'react-router-dom'

// Libraries

// Layouts

// Icons

export default function ProtectedRoute({children}) {
    if(token)
        return children
    else
        return <Navigate to={'/Login'}/>
}
