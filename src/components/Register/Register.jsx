import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../UserContext/UserContext';


const validationSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Min length is 3').max(10, 'Max length is 10').required('Name is required'),
  phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Invalid phone number').required('Phone is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().matches(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/, 'Password must contain at least one letter and one number')
    .min(6, 'Min length is 6').max(10, 'Max length is 10').required('Password is required'),
  rePassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Repassword is required')
});

export default function Register() {
  let {pathname}=useLocation()

  let {setUserToken,UserToken}= useContext(UserContext)
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false)
  const [reisterError, setreisterError] = useState(null)
  if(pathname=='/register'&& localStorage.getItem("token")){
    localStorage.removeItem("token")
    setUserToken(null)
  }
  async function handleRegister(values) {

    console.log(values);
    try {
      setisLoading(true)
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
      console.log(data);
      if (data.message === 'success') {
        navigate('/');
        setisLoading(false)
        localStorage.setItem("token",data.token)
        setUserToken(data.token)
      }
    } catch (error) {
      console.error( error.
      response.data.message
  
      );
      setisLoading(false)
      setreisterError(error.
        response.data.message)
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema,
    onSubmit: handleRegister
  });

  const hasErrors = Object.keys(formik.errors).length > 0;
  const hasEmptyValues = Object.values(formik.values).some(value => !value);

  return (
    <>

      <form onSubmit={formik.handleSubmit}>
     
        <h2 className='text-left text-2xl font-semibold'>Register Now</h2>
        {reisterError ? (
            <div className="bg-[#f8d7da] text-red-500 text-left p-4 rounded-md mt-2" role="alert">
              <span>{reisterError}</span>
            </div>
          ) : null}
        <div className='my-3'>
          <label htmlFor="name" className="block w-full text-left mb-1 rounded-md">Enter Your Name:</label>
          <input
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            name="name"
            id="name"
            className="block w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-opacity-50 focus:ring-blue-500"
            placeholder=" "
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="bg-[#f8d7da] text-red-500 text-left p-4 rounded-md mt-2" role="alert">
              <span>{formik.errors.name}</span>
            </div>
          ) : null}
        </div>

        <div className='my-3'>
          <label htmlFor="phone" className="block w-full text-left mb-1 rounded-md">Enter Your Phone:</label>
          <input
            type="tel"
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
          <label htmlFor="email" className="block w-full text-left mb-1 rounded-md">Enter Your Email:</label>
          <input
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            name="email"
            id="email"
            className="block w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-opacity-50 focus:ring-blue-500"
            placeholder=" "
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="bg-[#f8d7da] text-red-500 text-left p-4 rounded-md mt-2" role="alert">
              <span>{formik.errors.email}</span>
            </div>
          ) : null}
        </div>

        <div className='my-3'>
          <label htmlFor="password" className="block w-full text-left mb-1 rounded-md">Enter Your Password:</label>
          <input
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            name="password"
            id="password"
            className="block w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-opacity-50 focus:ring-blue-500"
            placeholder=" "
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="bg-[#f8d7da] text-red-500 text-left p-4 rounded-md mt-2" role="alert">
              <span>{formik.errors.password}</span>
            </div>
          ) : null}
        </div>

        <div className='my-3'>
          <label htmlFor="rePassword" className="block w-full text-left mb-1 rounded-md">Enter Your RePassword:</label>
          <input
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            name="rePassword"
            id="rePassword"
            className="block w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-opacity-50 focus:ring-blue-500"
            placeholder=" "
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="bg-[#f8d7da] text-red-500 text-left p-4 rounded-md mt-2" role="alert">
              <span>{formik.errors.rePassword}</span>
            </div>
          ) : null}
        </div>

        <div className='size-full mb-20 bg-black relative'>
          {hasErrors || hasEmptyValues ? (
            <span className="cursor-pointer absolute right-0 mt-5 border border-black focus:ring-4 bg-white focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-3.5 text-center">
              Register Now
            </span>
          ) : (
            <button
              type="submit"
              className="text-white absolute right-0  mt-5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-3.5 text-center"
              style={{
                backgroundColor: '#3FA43F',
                borderColor: '#3FA43F',
              }}
            >
             {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i>: "Register Now"} 
            </button>
            
          )}
    
        </div>
      </form>
      {isLoading == true?  <div className=' fixed flex items-center justify-center bg-[rgb(0,0,0,0.5)] top-0 left-0 right-0 bottom-0'>
           <i className="fa-solid  fa-spinner fa-spin text-7xl text-white"></i>
           </div>: null}
     
    </>
  );
}


