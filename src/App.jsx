import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider, createBrowserRouter, useParams } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Notfound from './components/Notfound/Notfound';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import UserContextProvider from './components/UserContext/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './components/CartContext/CartContext'
import { Toaster } from 'react-hot-toast'
import Wishlist from './components/Wishlist/Wishlist'
import WishlistContextProvider from './components/WishlistContext/WishlistContext'
import ResetCode from './components/ResetCode/ResetCode';
import ResetPassword from './components/ResetPassword/ResetPassword'
import ProtectedRouteResetPassword from './components/ProtectedRouteResetPassword/ProtectedRouteResetPassword'
import Checkout from './components/Checkout/Checkout'
import Allorders from './components/Allorders/Allorders';



function App() {
 
 
  let query= new QueryClient()
 let x=createBrowserRouter([
  {path:"" ,element:<Layout/>,children:[{
    index: true, element:<ProtectedRoute><Home/> </ProtectedRoute>},
    {path:"cart",element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:"products",element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:"wishlist",element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
    {path:"categories",element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:"brands",element:<ProtectedRoute><Brands/></ProtectedRoute>}, 
    {path:"productDetails/:id",element:<ProtectedRoute><ProductDetails/></ProtectedRoute>}, 
    {path:"login",element:<Login/>},
    {path:"register",element:<Register/>},
    {path:"ForgetPassword",element:<ForgetPassword/>},
    {path:"resetcode",element:<ResetCode/>},
    {path:"checkout",element:<ProtectedRoute><Checkout/></ProtectedRoute>},
    {path:"resetpassword",element:<ProtectedRouteResetPassword><ResetPassword/></ProtectedRouteResetPassword>},

    {path:"*",element:<ProtectedRoute><Notfound/></ProtectedRoute>},
  ]}
])
  return (
 <>
 <UserContextProvider>
  <QueryClientProvider client={query}>
   
    <CartContextProvider>
       <WishlistContextProvider>
      <RouterProvider  router={x}></RouterProvider>
      <Toaster />
      </WishlistContextProvider>
     
    </CartContextProvider>
    <ReactQueryDevtools/>
    </QueryClientProvider>
 </UserContextProvider>
 </>
  )
}

export default App
