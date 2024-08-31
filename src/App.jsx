import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layouts/Layout/Layout'
import ProtectedRoute from './Components/Layouts/ProtectedRoute/ProtectedRoute'
import Login from './Components/Pages/Login/Login'
import Register from './Components/Pages/Register/Register'
import Home from './Components/Pages/Home/Home'
import Categories from './Components/Pages/Categories/Categories'
import Brands from './Components/Pages/Brands/Brands'
import ProductDetails from './Components/Pages/ProductDetails/ProductDetails'
import Products from './Components/Pages/Products/Products'
import Wishlist from './Components/Pages/Wishlist/Wishlist'
import Cart from './Components/Pages/Cart/Cart'
import CheckOut from './Components/Pages/CheckOut/CheckOut'
import AllOrders from './Components/Pages/AllOrders/AllOrders'
import NotFound from './Components/Pages/NotFound/NotFound'

const routes = createBrowserRouter([
  {
    path: '/', element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: '/Login', element: <Login /> },
      { path: '/Register', element: <Register /> },
      { path: '/Categories', element: <Categories /> },
      { path: '/Brands', element: <Brands /> },
      { path: '/Products', element: <Products /> },
      { path: '/Products/:type/:id', element: <Products /> },
      { path: '/ProductDetails/:productId', element: <ProductDetails /> },
      { path: '/Wishlist', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: '/Cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: '/CheckOut/:cartId', element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
      { path: '/AllOrders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
      { path: '*', element: <NotFound/> },

    ]
  }
])

function App() {

  return (
    <RouterProvider router={routes}/>
  )
}

export default App
