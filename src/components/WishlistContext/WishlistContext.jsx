import React, { createContext, useContext } from 'react'
import style from './WishlistContext.module.css'
import axios from 'axios'
import { UserContext } from '../UserContext/UserContext'
export let WishlistContext =createContext()
export default function WishlistContextProvider(props) {
  let {UserToken}=useContext(UserContext)
  let headers ={token:UserToken}


    function 
    AddProductWishlist(id){
      return  axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` ,   {
           productId: id,
       },
       {headers,})


       .then((res)=>res)
       .catch((err)=>err)
      }
      function GetLoggedUserwishlist (){
        return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist" ,{headers,})
        .then((res)=>res)
        .catch((err)=>err)
      }
      function RemoveProductFromWishlist(id){
        return  axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}` ,
         {headers,})
       
         .then((res)=>res)
         .catch((error)=>error)
       
         }
  
  
    return(
    <WishlistContext.Provider value={{AddProductWishlist,GetLoggedUserwishlist,RemoveProductFromWishlist}}>{props.children}</WishlistContext.Provider>)
  
}
