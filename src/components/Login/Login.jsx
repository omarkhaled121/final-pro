import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../UserContext/UserContext';



export default function Login() {
let {pathname}=useLocation()



  
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().matches(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/, 'Password must contain at least one letter and one number')
    .min(6, 'Min length is 6').max(10, 'Max length is 10').required('Password is required'),

});
  let {setUserToken,UserToken}= useContext(UserContext)
  if(pathname=='/login'&& localStorage.getItem("token")){
    localStorage.removeItem("token")
    setUserToken(null)
  }
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false)
  const [LoginError, setLoginError] = useState(null)
  async function handleLogin(values) {

    console.log(values);
    try {
      setisLoading(true)
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);

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
      setLoginError(error.
        response.data.message)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin
  });

  const hasErrors = Object.keys(formik.errors).length > 0;
  const hasEmptyValues = Object.values(formik.values).some(value => !value);

  return (
    <>

      <form onSubmit={formik.handleSubmit}>
     
        <h2 className='text-left text-2xl font-semibold'>Login now</h2>
        {LoginError ? (
            <div className="bg-[#f8d7da] text-red-500 text-left p-4 rounded-md mt-2" role="alert">
              <span>{LoginError}</span>
            </div>
          ) : null}
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



        <div className='size-full mb-20 mt-5 flex flex-wrap justify-between'>
          <Link to="/ForgetPassword" className='mt-2 text-lg capitalize hover:text-[#3FA43F] duration-500 font-semibold'>forget your password ?</Link>
          {hasErrors || hasEmptyValues ? (
            <span className="cursor-pointer  right-0  border border-black focus:ring-4 bg-white focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-3.5 text-center">
              Login Now
            </span>
          ) : (
            <button
              type="submit"
              className="text-white  right-0  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-3.5 text-center"
              style={{
                backgroundColor: '#3FA43F',
                borderColor: '#3FA43F',
              }}
            >
             {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i>: "Login Now"} 
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
