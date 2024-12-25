import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../CartContext/CartContext'
import img from "../../assets/slider-image-2.jpeg"
import { Link, useNavigate } from 'react-router-dom'


export default function Cart() {
  
 
  let {GetLoggedusercart,RemovespecificcartItem,Updatecartproductquantity,ClearUserCart, setCartLength,CartLength}=useContext(CartContext)
  const [cartdetails, setcartdetails] = useState(null)
  const [isLoading, setisLoding] = useState(false)



 async function GetcartItems(){
  setisLoding(true)
   let res= await GetLoggedusercart()
   if(res.data.status === 'success'){
    setcartdetails(res.data.data)
    setisLoding(false)
   }

  }
 async function ClearCart(){
  setisLoding(true)
   let res= await ClearUserCart()
   if(res.data.message === 'success'){
    setCartLength(0)
    setcartdetails(null)
    setisLoding(false)
   }
   else{
    setisLoding(false)
   }
 
  }
 async function Updatecart(id,count){
  if (count == 0) {
    deletecartItems(id)
   
  }
  else{
  setisLoding(true)
   let res= await Updatecartproductquantity(id,count)
if(res.data.status === 'success' && count == 0){
  setCartLength(CartLength-1)
}

   if(res.data.status === 'success'){
    setcartdetails(res.data.data)
    setisLoding(false)
   }}
  }
 async function deletecartItems(id){
  
  setisLoding(true)
   let {data}= await RemovespecificcartItem(id)
 
   if(data.status === 'success'){
    setCartLength(CartLength-1)
    setcartdetails(data.data)
    setisLoding(false)
   }
  }
  useEffect(()=>{
    GetcartItems()
  },[])

  return (
    <>
     
      {isLoading && (
        <div className='fixed flex items-center justify-center bg-[rgb(0,0,0,0.5)] top-0 left-0 right-0 bottom-0'>
          <i className="fa-solid fa-spinner fa-spin text-7xl text-white"></i>
        </div>
      )}
  
    
    
        <section className='mt-24 bg-[#F8F9FA] p-10'>
          <div className="row justify-between">
            <div>
              <h2 className='text-3xl font-semibold mt-1'>Cart Shop</h2>
              {cartdetails?.products.length > 0 ? (<>  <h5 className='my-4 text-lg font-medium'>Total Price: <span className='text-[#22DB14]'>{cartdetails?.totalCartPrice} EGP</span></h5></>):(null)}
            </div>
            <div>
            {cartdetails?.products.length > 0 ? (<>
             <Link to="/checkout"> <button type="button" className="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Checkout</button></Link></>):(null)}
              <h5 className='my-4 text-lg font-medium'>Total Number of Items: <span className='text-[#22DB14]'>{cartdetails?.products?.length}</span></h5>
              </div>
          </div>
  
          {cartdetails?.products.map((product) => (
            <div key={product._id} className='row justify-between border-b-2 py-7'>
              <div className='row justify-center items-center'>
                <div>
                  <img src={product.product.imageCover} className='w-[200px]' alt={product.product.title} />
                </div>
                <div className='ms-3 text-left'>
                  <h3 className='text-2xl capitalize font-medium'>{product.product.title}</h3>
                  <h6 className='my-2'>{product.price} <span className='ms-2'>EGP</span></h6>
                  <span onClick={() => deletecartItems(product.product.id)} className="font-medium cursor-pointer text-red-600 mb-3 dark:text-red-500 hover:underline">
                    <i className='fa fa-trash text-red-600'></i> Remove
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => Updatecart(product.product.id, product.count - 1)}
                  className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:border-emerald-400"
                  type="button"
                >
                  <span className="sr-only">Decrease Quantity</span>
                  <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                  </svg>
                </button>
                <div>
                  <span className="bg-gray-50 w-14 border border-gray-300 text-sm rounded-lg focus:border-blue-500 block px-2.5 py-1 dark:border-emerald-400 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">{product.count}</span>
                </div>
                <button
                  onClick={() => Updatecart(product.product.id, product.count + 1)}
                  className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:border-emerald-400"
                  type="button"
                >
                  <span className="sr-only">Increase Quantity</span>
                  <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                  </svg>
                </button>
              </div>
            </div>

          ))}
            <Link to="/"><button
            onClick={()=>ClearCart()}
  type="button"
  className="px-6 py-3.5 text-base font-medium focus:ring-4 focus:outline-none rounded-lg text-center border border-spacing-2 border-emerald-500  my-5  "
>
Clear Your Cart
</button></Link>

        </section>
      
    </>
  );
      }  