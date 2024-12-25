import React, { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

export default function ResetCode() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  async function VerifyResetCode(values) {
    setIsLoading(true);
    console.log(values);
    try {
      let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values);
      console.log(data);

      if (data.status === 'Success') {
        navigate("/resetpassword");
        localStorage.setItem("Success","lmdfijei")
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error.response.data.message);
      setIsLoading(false);
      setError(error.response.data.message);
    }
  }

  const validationSchema = Yup.object().shape({
    resetCode: Yup.string()
    .matches(/^\d+$/, "Code must be a number") 
    .min(3, 'Code must be at least 3 ')
    .max(10, 'Code must be at most 10')
    .required('Code is required'),
  });

  const formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    validationSchema,
    onSubmit: VerifyResetCode,
  });

  return (
    <>
      <h2 className='text-left text-3xl font-semibold mt-16 mb-3'>Reset your account password</h2>
      <form className='relative text-left' onSubmit={formik.handleSubmit}>
        <div className="relative">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.resetCode}
            name="resetCode"
            id="floating_outlined"
            className="block px-2.5 border py-2.5 pt-6 w-full text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:border-blue-500 focus:ring-4 focus:ring-opacity-40 focus:ring-blue-500 focus:outline-none peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_outlined"
            className="absolute text-gray-900 text-sm bg-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Code
          </label>
        </div>
        {formik.errors.resetCode && formik.touched.resetCode ? (
          <div className="bg-[#f8d7da] text-red-500 text-left p-4 rounded-md mt-2" role="alert">
            <span>{formik.errors.resetCode}</span>
          </div>
        ) : null}
        {error ? (
          <div className="bg-[#f8d7da] text-red-500 text-left p-4 rounded-md mt-2" role="alert">
            <span>{error}</span>
          </div>
        ) : null}
        <button
          type="submit"
          className="text-green-700 my-5 transition-[0.5s] hover:text-white border border-[#198754] hover:bg-[#198754] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-7 py-3 text-center me-2 mb-2 dark:hover:text-white dark:hover:bg-[#198754] dark:focus:ring-[#198754]"
        >
          Verify
        </button>
      </form>
      {isLoading && (
        <div className='fixed flex items-center justify-center bg-[rgba(0,0,0,0.5)] top-0 left-0 right-0 bottom-0'>
          <i className="fa-solid fa-spinner fa-spin text-7xl text-white"></i>
        </div>
      )}
    </>
  );
}


