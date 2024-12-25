import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'


export default function useProducts() {

   function getProducts(){
   return  axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }
  let productInfo=useQuery({
    queryKey:["getProducts"],
    queryFn: getProducts,
    select:(data)=>data.data.data,
    retry:4,
    retryDelay:4,
  })
  return (
   productInfo
  )
}
