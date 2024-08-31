import React from 'react'
import { useState, useEffect } from 'react'
import './CategoryItemSkeleton.module.css'

export default function CategoryItemSkeleton() {
    return (
        <div className="col-span-1 h-[12rem]">
            <div className="category w-full h-full flex flex-col gap-2 p-sm justify-center items-center text-center bg-primary-white text-primary-black rounded border border-primary-gray animate-pulse shadow-sm">
                <div className="w-8 h-8 bg-primary-gray rounded"></div>
                <div className="w-32 h-2 bg-primary-gray rounded"></div>
            </div>
        </div>
    )
}