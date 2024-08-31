// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.module.css'
// Layouts
import Title from '../../Layouts/Title/Title'
import Banner from '../../../assets/img/login-banner.jpg'
// APIs
import { signUpAPI } from '../../APIs/AuthenticationAPI'
// Libraries
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// Icons
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

export default function Register() {

    // Main variables

    let notify;
    const navigate = useNavigate()
    let [registerLoading, setRegisterLoading] = useState(false)

    // Yup validation schema

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(5, 'Name must contain at least 5 characters') // Adjusted the error message to match the validation rule
            .max(15, 'Name must not exceed 15 characters')
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        phone: Yup.string()
            .required('Phone number is required'),
        password: Yup.string()
            .required('Password is required'),
        rePassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match') // Added password confirmation validation
            .required('Password must be confirmed')
    });

    // Calling sign in API

    const onSubmit = async values => {
        setRegisterLoading(true)
        try {
            const data = await signUpAPI(values)
            if (data.message === 'success') {
                setRegisterLoading(false)
                localStorage.setItem('userToken', data.token)
                notify = () => toast.success('Registered successfully!');
                notify(setTimeout(() => navigate('/'), 1500))
            }
        } catch (error) {
            setRegisterLoading(false)
            notify = () => toast.error(error.response.data.message);
            notify()
        }

    }

    // Formik declaration

    const formik = useFormik({
        initialValues: {
            "name": "",
            "email": "",
            "password": "",
            "rePassword": "",
            "phone": "",
        },
        validationSchema,
        onSubmit,
    })

    return (
        <div className="flex flex-wrap lg:flex-nowrap gap-xs h-full">
            <div className="w-full lg:w-2/3 h-1/2 md:h-full">
                <div className="w-full h-[298px] lg:h-[597px] bg-primary-gray rounded overflow-hidden">
                    <img src={Banner} alt="Shopping Banner" className='w-full h-full object-cover' />
                </div>
            </div>
            <div className="w-full lg:w-1/3 flex flex-col justify-center">
                <Title title={`Register`} />
                <form className='flex flex-col gap-xxs' onSubmit={formik.handleSubmit}>
                <div className="form-group">
                        <label htmlFor="name" className='text-sm'>Name:</label>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} id="name" type="text" placeholder='Enter your name' className='w-full border border-primary-gray rounded p-xxs focus:outline-none' />
                        {formik.errors.name && formik.touched.name ? <p className='text-primary-red text-xs'>{formik.errors.name}</p> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className='text-sm'>Email:</label>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id="email" type="email" placeholder='Enter your email' className='w-full border border-primary-gray rounded p-xxs focus:outline-none' />
                        {formik.errors.email && formik.touched.email ? <p className='text-primary-red text-xs'>{formik.errors.email}</p> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className='text-sm'>Phone:</label>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} id="phone" type="name" placeholder='Enter your phone' className='w-full border border-primary-gray rounded p-xxs focus:outline-none' />
                        {formik.errors.phone && formik.touched.phone ? <p className='text-primary-red text-xs'>{formik.errors.phone}</p> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className='text-sm'>Password:</label>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} id="password" type="password" placeholder='Enter your password' className='w-full border border-primary-gray rounded p-xxs focus:outline-none' />
                        {formik.errors.password && formik.touched.password ? <p className='text-primary-red text-xs'>{formik.errors.password}</p> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="rePassword" className='text-sm'>Confirm Password:</label>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} id="rePassword" type="password" placeholder='Enter your rePassword' className='w-full border border-primary-gray rounded p-xxs focus:outline-none' />
                        {formik.errors.rePassword && formik.touched.rePassword ? <p className='text-primary-red text-xs'>{formik.errors.rePassword}</p> : null}
                    </div>
                    <button type='submit' className='bg-primary-red text-primary-white flex-grow p-xxs rounded hover:bg-secondary-red disabled:bg-secondary-red duration-300' disabled={registerLoading ? `disabled` : false}>{registerLoading ? <FontAwesomeIcon icon={faCircleNotch} spin spinReverse /> : `Register`}</button>
                    <p className='text-sm hover:underline cursor-pointer'>Forgot your password?</p>
                </form>
            </div>
        </div>
    )
}