// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './Footer.module.css'

// APIs

// Libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Layouts

// Icons
import { faFacebookF, faLinkedin } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
    return (
        <footer className='bg-primary-white text-primary-black border border-primary-gray'>
            <div className="container flex justify-between items-center">
                <p>Designed & Developed By <span className='font-bold'>@MosabElkalyouby</span></p>
                <ul className='flex items-center gap-xs'>
                    <a href="https://www.facebook.com/mosab.elkalyouby888"><li><button className='btn btn-red size-8 flex items-center justify-center'><FontAwesomeIcon icon={faFacebookF} /></button></li></a>
                    <a href="https://www.linkedin.com/in/mosab-elkalyouby/"><li><button className='btn btn-red size-8 flex items-center justify-center'><FontAwesomeIcon icon={faLinkedin} /></button></li></a>
                </ul>
            </div>
        </footer>
    )
}
