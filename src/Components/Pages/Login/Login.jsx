// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.module.css'
// Layouts
import Title from '../../Layouts/Title/Title'
import Banner from '../../../assets/img/login-banner.jpg'
// APIs
import { signInAPI, forgotPasswordAPI, resetCodeAPI, updatePasswordAPI } from '../../APIs/AuthenticationAPI'
import token from '../../APIs/UserToken'
// Libraries
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// Icons
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

export default function Login() {

    // Main variables

    let notify;
    const navigate = useNavigate()
    let [loginLoading, setLoginLoading] = useState(false)

    let [toggleForget, setToggleForget] = useState(false);
    let [toggleCode, setToggleCode] = useState(false);
    let [finalStep, setFinalStep] = useState(false);
    let [resetEmail, setResetEmail] = useState('');

    // Yup validation schema

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required'),
    });

    // Calling sign in API

    const onSubmit = async values => {
        setLoginLoading(true)
        try {
            const data = await signInAPI(values)
            if (data.message === 'success') {
                setLoginLoading(false)
                localStorage.setItem('userToken', data.token)
                notify = () => toast.success('Logged In Successfully');
                notify(setTimeout(() => navigate('/'), 1500))
            }
        } catch (error) {
            setLoginLoading(false)
            notify = () => toast.error(error.response.data.message);
            notify()
        }

    }

    // Formik declaration

    const formik = useFormik({
        initialValues: {
            "email": "",
            "password": ""
        },
        validationSchema,
        onSubmit,
    })

    const forgotPasswordSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
    });

    const forgotPassword = async values => {
        setLoginLoading(true)
        try {
            const data = await forgotPasswordAPI(values)
            const { message } = data;
            setLoginLoading(false)
            notify = toast.success(message);
            notify;
            setResetEmail(values.email)
            setToggleCode(!toggleCode);
        } catch (error) {
            setLoginLoading(false)
            notify = toast.error(error.response.data.message);
            notify()
        }
    }

    const formikForgotPassword = useFormik({
        initialValues: {
            "email": "",
        },
        validationSchema: forgotPasswordSchema,
        onSubmit: forgotPassword,
    })

    const resetCodeSchema = Yup.object({
        "resetCode": Yup.string()
            .matches(/^[0-9]{6}$/, 'Reset code must contain only 6 digits')
            .required('Code is required'),
    });

    const resetCode = async values => {
        setLoginLoading(true)
        try {
            const data = await resetCodeAPI(values)
            const { status } = data;
            setLoginLoading(false)
            notify = toast.success(status);
            notify;
            setFinalStep(!finalStep)
        } catch (error) {
            setLoginLoading(false)
            notify = toast.error(error.response.data.message);
            notify()
        }
    }

    const formikResetCode = useFormik({
        initialValues: {
            "resetCode": "",
        },
        validationSchema: resetCodeSchema,
        onSubmit: resetCode,
    })

    // Yup validation schema

    const newPasswordSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        newPassword: Yup.string()
            .min(6, 'Password must contain atleast 6 characters')
            .required('New password is required'),
    });

    // Calling sign in API

    const updatePassword = async values => {
        setLoginLoading(true)
        try {
            const data = await updatePasswordAPI(values)
            const {token} = data;
            if (token) {
                setLoginLoading(false)
                localStorage.setItem('userToken', token)
                notify = () => toast.success('Password changed successfully!');
                notify(setTimeout(() => navigate('/'), 1500))
            }
        } catch (error) {
            setLoginLoading(false)
            notify = () => toast.error(error.response.data.message);
            notify()
        }

    }

    // Formik declaration

    const formikNewPassword = useFormik({
        initialValues: {
            "email": "",
            "newPassword": "",
        },
        validationSchema: newPasswordSchema,
        onSubmit: updatePassword,
    })

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [])

    return (
        <div className="flex flex-wrap lg:flex-nowrap gap-xs h-full">
            <div className="w-full lg:w-2/3 h-1/2 md:h-full">
                <div className="w-full h-[298px] lg:h-[597px] bg-primary-gray rounded overflow-hidden">
                    <img src={Banner} alt="Shopping Banner" className='w-full h-full object-cover' />
                </div>
            </div>
            <div className={`w-full lg:w-1/3 flex-col justify-center ${toggleForget ? `hidden` : `flex`}`}>
                <Title title={`Login`} />
                <form className='flex flex-col gap-xxs' onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email" className='text-sm'>Email:</label>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id="email" type="email" placeholder='Enter your email' className='w-full border border-primary-gray rounded p-xxs focus:outline-none' />
                        {formik.errors.email && formik.touched.email ? <p className='text-primary-red text-xs'>{formik.errors.email}</p> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className='text-sm'>Password:</label>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} id="password" type="password" placeholder='Enter your password' className='w-full border border-primary-gray rounded p-xxs focus:outline-none' />
                        {formik.errors.password && formik.touched.password ? <p className='text-primary-red text-xs'>{formik.errors.password}</p> : null}
                    </div>
                    <button type='submit' className='bg-primary-red text-primary-white flex-grow p-xxs rounded hover:bg-secondary-red disabled:bg-secondary-red duration-300' disabled={loginLoading ? `disabled` : false}>{loginLoading ? <FontAwesomeIcon icon={faCircleNotch} spin spinReverse /> : `Login`}</button>
                    <p onClick={() => setToggleForget(!toggleForget)} className='text-sm hover:underline cursor-pointer'>Forgot your password?</p>
                </form>
            </div>
            <div className={`w-full lg:w-1/3 flex-col justify-center ${toggleForget ? `flex` : `hidden`} ${toggleCode ? `hidden` : `flex`} `} >
                <Title title={`Reset Password`} />
                <form className='flex flex-col gap-xxs' onSubmit={formikForgotPassword.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email" className='text-sm'>Email:</label>
                        <input onBlur={formikForgotPassword.handleBlur} onChange={formikForgotPassword.handleChange} value={formikForgotPassword.values.email} id="email" type="email" placeholder='Enter your email' className='w-full border border-primary-gray rounded p-xxs focus:outline-none' />
                        {formikForgotPassword.errors.email && formikForgotPassword.touched.email ? <p className='text-primary-red text-xs'>{formikForgotPassword.errors.email}</p> : null}
                    </div>
                    <button type='submit' className='bg-primary-red text-primary-white flex-grow p-xxs rounded hover:bg-secondary-red disabled:bg-secondary-red duration-300' disabled={loginLoading ? `disabled` : false}>{loginLoading ? <FontAwesomeIcon icon={faCircleNotch} spin spinReverse /> : `Send Code`}</button>
                </form>
            </div>
            <div className={`w-full lg:w-1/3 flex-col justify-center ${toggleCode ? `flex` : `hidden`} ${finalStep ? `hidden` : `flex`} `} >
                <Title title={`Reset Password`} />
                <form className='flex flex-col gap-xxs' onSubmit={formikResetCode.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="text" className='text-sm'>Reset Code:</label>
                        <input onBlur={formikResetCode.handleBlur} onChange={formikResetCode.handleChange} value={formikResetCode.values.resetCode} id="resetCode" type="text" placeholder='Enter code' className='w-full border border-primary-gray rounded p-xxs focus:outline-none' />
                        {formikResetCode.errors.resetCode && formikResetCode.touched.resetCode ? <p className='text-primary-red text-xs'>{formikResetCode.errors.resetCode}</p> : null}
                    </div>
                    <button type='submit' className='bg-primary-red text-primary-white flex-grow p-xxs rounded hover:bg-secondary-red disabled:bg-secondary-red duration-300' disabled={loginLoading ? `disabled` : false}>{loginLoading ? <FontAwesomeIcon icon={faCircleNotch} spin spinReverse /> : `Confirm`}</button>
                </form>
            </div>
            <div className={`w-full lg:w-1/3 flex-col justify-center ${finalStep ? `flex` : `hidden`} `} >
                <Title title={`Reset Password`} />
                <form className='flex flex-col gap-xxs' onSubmit={formikNewPassword.handleSubmit}>
                    <div className="form-group">
                        <div className="form-group">
                            <label htmlFor="email" className='text-sm'>Email:</label>
                            <input onBlur={formikNewPassword.handleBlur} onChange={formikNewPassword.handleChange} value={formikNewPassword.values.email} id="email" type="email" placeholder='Enter your email' className='w-full border border-primary-gray rounded p-xxs focus:outline-none' />
                            {formikNewPassword.errors.email && formikNewPassword.touched.email ? <p className='text-primary-red text-xs'>{formikNewPassword.errors.email}</p> : null}
                        </div>
                        <label htmlFor="password" className='text-sm'>New Password:</label>
                        <input onBlur={formikNewPassword.handleBlur} onChange={formikNewPassword.handleChange} value={formikNewPassword.values.newPassword} id="newPassword" type="password" placeholder='Enter new password' className='w-full border border-primary-gray rounded p-xxs focus:outline-none' />
                        {formikNewPassword.errors.newPassword && formikNewPassword.touched.newPassword ? <p className='text-primary-red text-xs'>{formikNewPassword.errors.newPassword}</p> : null}
                    </div>
                    <button type='submit' className='bg-primary-red text-primary-white flex-grow p-xxs rounded hover:bg-secondary-red disabled:bg-secondary-red duration-300' disabled={loginLoading ? `disabled` : false}>{loginLoading ? <FontAwesomeIcon icon={faCircleNotch} spin spinReverse /> : `Update Password`}</button>
                </form>
            </div>
        </div>
    )
}