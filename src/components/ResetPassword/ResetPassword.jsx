import React, { useContext, useState } from 'react';
import style from './ResetPassword.module.css';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { UserContext } from '../UserContext/UserContext';

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  let {setUserToken} =useContext(UserContext)

  async function resetPass(values) {
    setIsLoading(true);
    try {
      let { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values);
      console.log(data);
      if (data.token!= null) {
       localStorage.setItem("token",data.token)
       setUserToken(data.token)
       navigate("/")
       localStorage.removeItem("Success")
     
      }
    } catch (error) {
      console.error(error.response?.data?.message);
      setIsLoading(false);
      setError(error.response?.data?.message || 'Something went wrong');
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    newPassword: Yup.string().matches(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/, 'Password must contain at least one letter and one number')
    .min(6, 'Min length is 6').max(10, 'Max length is 10').required('Password is required'),

  });

  const formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema,
    onSubmit: resetPass,
  });

  return (
    <>
      <h2 className='text-left text-3xl font-semibold mt-16 mb-3'>Please enter your verification code</h2>
      <form className='relative text-left' onSubmit={formik.handleSubmit}>
        <div className="relative">
          <input
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            name="email"
            id="floating_outlined"
            className="block px-2.5 py-2.5 pt-6 w-full text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:border-blue-500 focus:ring-4 focus:ring-opacity-40 focus:ring-blue-500 border focus:outline-none peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_outlined"
            className="absolute text-gray-900 text-sm bg-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Email
          </label>
        </div>

        <div className="relative mt-4">
          <input
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
            name="newPassword"
            id="newPassword"
            className="block px-2.5 py-2.5 pt-6 w-full text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:border-blue-500 focus:ring-4 focus:ring-opacity-40 focus:ring-blue-500 border focus:outline-none peer"
            placeholder=" "
          />
          <label
            htmlFor="newPassword"
            className="absolute text-gray-900 text-sm bg-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            New Password
          </label>
        </div>

        {formik.errors.email && formik.touched.email && (
          <div className="bg-[#f8d7da] text-red-500 text-left p-4 rounded-md mt-2" role="alert">
            <span>{formik.errors.email}</span>
          </div>
        )}

        {formik.errors.newPassword && formik.touched.newPassword && (
          <div className="bg-[#f8d7da] text-red-500 text-left p-4 rounded-md mt-2" role="alert">
            <span>{formik.errors.newPassword}</span>
          </div>
        )}

        {error && (
          <div className="bg-[#f8d7da] text-red-500 text-left p-4 rounded-md mt-2" role="alert">
            <span>{error}</span>
          </div>
        )}

        <button type="submit" className="text-green-700 my-5 transition-[0.5s] hover:text-white border border-[#198754] hover:bg-[#198754] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-7 py-3 text-center me-2 mb-2 dark:hover:text-white dark:hover:bg-[#198754] dark:focus:ring-[#198754]">
          Verify
        </button>
      </form>

      {isLoading && (
        <div className='fixed flex items-center justify-center bg-[rgb(0,0,0,0.5)] top-0 left-0 right-0 bottom-0'>
          <i className="fa-solid fa-spinner fa-spin text-7xl text-white"></i>
        </div>
      )}
    </>
  );
}


