// Essentials
import React from 'react'
import { useState, useEffect } from 'react'
import './CheckOut.module.css'

// APIs
import { addAddressAPI, getAddressesAPI, getSpecificAddress } from '../../APIs/AdressesAPI';
import { createCashOrderAPI, createOnlinePaymentAPI } from '../../APIs/OrdersAPI'
import { getUserCartAPI } from '../../APIs/CartAPI';

// Libraries
import { Formik, Form, Field, useFormik, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import toast from 'react-hot-toast';

// Layouts
import Title from '../../Layouts/Title/Title'

// Icons
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

export default function CheckOut() {

    let navigate = useNavigate();
    let notify;

    // Handling Cart

    const [products, setProducts] = useState([]);
    const [cartData, setCartData] = useState([]);
    let [loading, setLoading] = useState(false);

    const getUserCart = async () => {
        setLoading(true)
        try {
            const { data } = await getUserCartAPI();
            const cartData = data;
            if (cartData._id != cartId) {
                notify = toast.error('Invalid Order!')
                notify;
                navigate('/Cart')
            }
            setCartData(cartData);
            const { products } = data;
            setProducts(products);
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    // Handling Payment Methods

    const { cartId } = useParams()

    let [orderLoading, setOrderLoading] = useState(false)
    const orderValidationSchema = Yup.object().shape({
        payMethod: Yup.string()
            .oneOf(['cashOnDelivery', 'bank'], 'Invalid payment method')
            .required('Pay method is required'),
    });

    const formikOrder = useFormik({
        initialValues: {
            payMethod: '',
        },
        validationSchema: orderValidationSchema,
        onSubmit: values => {
            values.payMethod === 'cashOnDelivery' && confirmedAddress ? createCashOrder(cartId, shippingAddress) : null
            values.payMethod === 'bank' && confirmedAddress ? createOnlinePayment(cartId, shippingAddress) : null
        },
    });

    const createCashOrder = async (cartId, shippingAddress) => {
        setOrderLoading(true);
        try {
            const { data } = await createCashOrderAPI(cartId, shippingAddress);
            setOrderLoading(false);
            notify = toast.success('Order placed successfully');
            setTimeout(() => navigate('/AllOrders'), 1500);
        } catch (error) {
            console.log(error);
            setOrderLoading(false);
            notify = toast.error('Order failed');
        }
        notify;
    }

    const createOnlinePayment = async (cartId, shippingAddress) => {
        setOrderLoading(true);
        try {
            const data = await createOnlinePaymentAPI(cartId, shippingAddress);
            console.log(data);
            setOrderLoading(false);
            notify = toast.success('Order placed successfully');
            setTimeout(1500, window.location.href = data.session.url);
        } catch (error) {
            console.log(error);
            setOrderLoading(false);
            notify = toast.error('Order failed');
        }
        notify;
    }

    // Handling Address

    const validationSchema = Yup.object().shape({
        city: Yup.string('City is required')
            .required('City is required'),
        place: Yup.string('City is required')
            .required('Place is required'),
        address: Yup.string()
            .min(2, 'Address must contain at least 2 characters')
            .max(50, 'Address must not exceed 50 characters')
            .required('Address is required'),
        apartment: Yup.string()
            .min(2, 'Apartment number must contain at least 2 characters')
            .max(5, 'Apartment number must not exceed 5 characters')
            .required('Apartment number is required'),
        phone: Yup.string()
            .matches(/^01[0125][0-9]{8}$/, 'Phone must consist of 11 digits')
            .required('Phone number is required'),
    });

    const [shippingAddress, setShippingAddress] = useState({ name: '', details: '', phone: '', city: '' })
    const [confirmedAddress, setConfirmedAddress] = useState(false)
    const formik = useFormik({
        initialValues: {
            city: '',
            place: '',
            address: '',
            apartment: '',
            phone: ''
        },
        validationSchema,
        onSubmit: values => {
            setShippingAddress(
                {
                    name: values.place,
                    details: values.address + ', Apt No. ' + values.apartment,
                    phone: values.phone,
                    city: values.city,
                }
            )
            // addAddress(shippingAddress)
            setConfirmedAddress(true);
        },
    });

    const addAddress = async shippingAddress => {
        try {
            const data = await addAddressAPI(shippingAddress);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const [addressesIds, setAddressesIds] = useState([]);
    const getAddressesIds = async shippingAddress => {
        try {
            const { data } = await getAddressesAPI();
            setAddressesIds(data)
        } catch (error) {
            console.log(error);
        }
    }

    // const [userAddresses, setUserAddresses] = useState([]);
    // const getAddressesDetails = async addressId => {
    //     try {
    //         const { data } = await getSpecificAddress(addressId);
    //         setUserAddresses([...userAddresses, data])
    //         console.log(userAddresses);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    useEffect(() => {
        // getAddressesIds();
        getUserCart();

    }, [])

    // useEffect(() => {
    //     addressesIds.map(address =>

    //         getAddressesDetails(address._id)
    //     )
    // }, [addressesIds])


    return (
        <>
            <Title title={`Check Out`} />
            <div className="flex flex-wrap md:flex-nowrap gap-xs">
                <div className="w-full md:w-1/2 flex flex-col gap-xs">
                    {/* <div className="box box-col">
                    <p>You currently have no addresses</p>
                    <button className='btn btn-red'>
                        Create New Address
                    </button>
                </div> */}
                    <div className="box box-col">
                        <h3>Shipping Details</h3>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <select onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} className="form-control" id="city" disabled={confirmedAddress ? `disabled` : false}>
                                    <option value={false}>Select City</option>
                                    <option value="Cairo">Cairo</option>
                                    <option value="Alexandria">Alexandria</option>
                                    <option value="Asyut">Asyut</option>
                                </select>
                                {formik.errors.city && formik.touched.city ? <p className='text text-primary-red'>{formik.errors.city}</p> : null}
                            </div>
                            <div className="form-group">
                                <select onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.place} className="form-control" id="place" disabled={confirmedAddress ? `disabled` : false}>
                                    <option value={false}>Select Place</option>
                                    <option value="Home">Home</option>
                                    <option value="Work">Work</option>
                                    <option value="Other">Other</option>
                                </select>
                                {formik.errors.place && formik.touched.place ? <p className='text text-primary-red'>{formik.errors.place}</p> : null}
                            </div>
                            <div className="form-group">
                                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.address} type="text" className="form-control" id="address" placeholder='Address' disabled={confirmedAddress ? `disabled` : false} />
                                {formik.errors.address && formik.touched.address ? <p className='text text-primary-red'>{formik.errors.address}</p> : null}
                            </div>
                            <div className="form-group">
                                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.apartment} type="text" className="form-control" id="apartment" placeholder='Apartment Number' disabled={confirmedAddress ? `disabled` : false} />
                                {formik.errors.apartment && formik.touched.apartment ? <p className='text text-primary-red'>{formik.errors.apartment}</p> : null}
                            </div>
                            <div className="form-group">
                                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="text" className="form-control" id="phone" placeholder='Phone Number' disabled={confirmedAddress ? `disabled` : false} />
                                {formik.errors.phone && formik.touched.phone ? <p className='text text-primary-red'>{formik.errors.phone}</p> : null}
                            </div>
                            <button type='submit' className='btn btn-red' disabled={confirmedAddress}>
                                {confirmedAddress ? `Address Confirmed` : `Confirm Address`}
                            </button>
                        </form>
                    </div>
                    {/* {userAddresses.map(address =>
                    <div key={address._id} className="box box-col">
                        <h2>Home</h2>
                        <p>{`${address.city}, `}</p>
                        <p>{`${address._id}, `}</p>
                        <button className='btn btn-red'>
                            Use Address
                        </button>
                    </div>
                )} */}
                </div>
                <div className="w-full md:w-1/2">
                    <div className="box box-col">
                        {loading ?
                            <h2 className="text-primary-red text-center"><FontAwesomeIcon icon={faCircleNotch} spin /></h2>
                            :
                            products.map(product =>
                                <div key={product?.product?.id} className="flex items-center gap-xs text">
                                    <div className="w-1/12">
                                        <div className="image-container">
                                            <img src={product?.product?.imageCover} alt={product?.product?.title} className='w-full h-full object-cover' />
                                        </div>
                                    </div>
                                    <div className="w-11/12 flex justify-between gap-xs">
                                        <div className="w-2/3">
                                            <p>{product?.product?.title}</p>
                                        </div>
                                        <div className="w-1/3 flex justify-end">
                                            <p>{(product?.price * product?.count).toFixed(2)} EGP</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        <div className="cart-pricing text">
                            <div className="pricing-item flex justify-between border-b border-primary-gray py-xs">
                                <p>Subtotal:</p>
                                <p>{Number(cartData?.totalCartPrice).toFixed(2)} EGP</p>
                            </div>
                            <div className="pricing-item flex justify-between border-b border-primary-gray py-xs">
                                <p>Shipping:</p>
                                <p>Free</p>
                            </div>
                            <div className="pricing-item flex justify-between border-b border-primary-gray py-xs">
                                <p>Total:</p>
                                <p>{Number(cartData?.totalCartPrice).toFixed(2)} EGP</p>
                            </div>
                        </div>
                        <form onSubmit={formikOrder.handleSubmit} className='flex flex-col gap-xs'>
                            <div className="form-group flex items-center gap-xxs">
                                <input value='bank' onBlur={formikOrder.handleBlur} onChange={formikOrder.handleChange} type="radio" className='radio-control' id='bank' name='payMethod' disabled={!confirmedAddress} />
                                <label htmlFor="payMethod">Bank</label>
                            </div>
                            <div className="form-group flex items-center gap-xxs">
                                <input value='cashOnDelivery' onBlur={formikOrder.handleBlur} onChange={formikOrder.handleChange} type="radio" className='radio-control' id='cashOnDelivery' name='payMethod' disabled={!confirmedAddress} />
                                <label htmlFor="payMethod">Cash On Delivery</label>
                            </div>
                            {formik.errors.payMethod ? <p className='text text-primary-red'>{formik.errors.payMethod}</p> : null}
                            <button type='submit' className='btn btn-red' disabled={!confirmedAddress}>
                                {orderLoading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : `Place Order`}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
