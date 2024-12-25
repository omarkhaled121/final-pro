import React, { createContext, useContext, useEffect, useState } from 'react'
import style from './CartContext.module.css'
import axios from 'axios'
import { UserContext } from '../UserContext/UserContext'
export let CartContext =createContext()
export default function CartContextProvider(props) {
  let {UserToken}=useContext(UserContext)
  const [CartID, setCartID] = useState(null)
  const [CartLength, setCartLength] = useState(0)
  let headers ={token:UserToken}

  function AddToCart(id){
 return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart` ,   {
      productId: id,
  },
  {headers,})

  .then((res)=>res)
  .catch((error)=>error)

  }
  function CheckoutSession(id,url,data){
 return  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${url}` ,   {shippingAddress:data},
 {headers,})

  .then((res)=>res)
  .catch((error)=>error)

  }
  function GetLoggedusercart(){
 return  axios.get(`https://ecommerce.routemisr.com/api/v1/cart` ,
  {headers,})
 

  .then((res)=>{
  
   setCartLength(res.data.numOfCartItems)
 setCartID(res.data.data._id)
  return res})
  .catch((error)=>error)

  }
  function RemovespecificcartItem(id){
 return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` ,
  {headers,})

  .then((res)=>res)
  .catch((error)=>error)

  }
  function Updatecartproductquantity(proid, newcount){
 return  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${proid}` ,
 {count: newcount, },
  {headers,})

  .then((res)=>res)
  .catch((error)=>error)

  }
  function ClearUserCart(){
 return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` ,
  {headers,})

  .then((res)=>res)
  .catch((error)=>error)

  }
  useEffect(()=>GetLoggedusercart,[])
 
  return (
  
    <CartContext.Provider value={{AddToCart,GetLoggedusercart,RemovespecificcartItem,Updatecartproductquantity,ClearUserCart,CheckoutSession,CartID,CartLength,setCartLength}}>{props.children}</CartContext.Provider>
  )
}
