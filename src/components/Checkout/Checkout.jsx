import React, { useContext, useState } from 'react'
import style from './Checkout.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CartContext } from '../CartContext/CartContext';
import { useLocation, useParams } from 'react-router-dom';

export default function Checkout() {
  let x=window.location.href
  let {CheckoutSession,CartID}=useContext(CartContext)


  const validationSchema = Yup.object().shape({
    details: Yup.string().min(3,"details min length is 3").required('details is required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Invalid phone number').required('Phone is required'),
    city: Yup.string().required('city is required'),
  
  });

  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    validationSchema,
    onSubmit: ()=>GetCheckout(CartID,`${x}`)
  });


async function GetCheckout(id,url){
 let {data}= await CheckoutSession(id,url,formik.values)
 window.location.href = data.session.url
}


  const hasErrors = Object.keys(formik.errors).length > 0;
  const hasEmptyValues = Object.values(formik.values).some(value => !value);
  return (
    <>
    <form className='w-[90%] mx-auto' onSubmit={formik.handleSubmit}>
    <div className='my-3'>
          <label htmlFor="details" className="block w-full text-left mb-1 capitalize rounded-md">details</label>
          <input
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
            name="details"
            id="details"
            className="block w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-opacity-50 focus:ring-blue-500"
            placeholder=" "
          />
          {formik.errors.details && formik.touched.details ? (
            <div className="bg-[#f8d7da] text-red-500 text-left p-4 rounded-md mt-2" role="alert">
              <span>{formik.errors.details}</span>
            </div>
          ) : null}
        </div>
    <div className='my-3'>
          <label htmlFor="phone" className="block w-full text-left mb-1 capitalize rounded-md">phone</label>
          <input
            type="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            name="phone"
            id="phone"
            className="block w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-opacity-50 focus:ring-blue-500"
            placeholder=" "
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="bg-[#f8d7da] text-red-500 text-left p-4 rounded-md mt-2" role="alert">
              <span>{formik.errors.phone}</span>
            </div>
          ) : null}
        </div>
    <div className='my-3'>
          <label htmlFor="city" className="block w-full text-left mb-1 capitalize rounded-md">city</label>
          <input
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            name="city"
            id="city"
            className="block w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-opacity-50 focus:ring-blue-500"
            placeholder=" "
          />
          {formik.errors.city && formik.touched.city ? (
            <div className="bg-[#f8d7da] text-red-500 text-left p-4 rounded-md mt-2" role="alert">
              <span>{formik.errors.city}</span>
            </div>
          ) : null}
        </div>
        {hasErrors || hasEmptyValues ? (
       <button className="text-[#0DCAF0] cursor-default border w-full duration-[0.5s] border-[#0DCAF0] focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
     pay now
   </button>
   
          ) : (
            <button type="submit" className="text-[#0DCAF0] size-full duration-[0.5s] hover:text-white border border-[#0DCAF0] hover:bg-[#0DCAF0]  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2    ">pay now</button>
          )}
    </form>
    </>
  )
}
