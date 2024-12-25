import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Brands() {
  const [getImg, setgetImg] = useState(null);
  const [getName, setgetName] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  function close() {
    setIsContentVisible(false);
    setIsModalVisible(false);
    setTimeout(() => {
      setgetName(null);
      setgetImg(null);
    }, 150); // Wait for the transition to complete before clearing
  }

  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let { data, isError, isLoading, error } = useQuery({
    queryKey: ["getBrands"],
    queryFn: getBrands,
    select: (data) => data.data.data,
    gcTime: 10000,
    staleTime: 10000,
    retry: 4,
    retryDelay: 4,
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <div className='fixed flex items-center justify-center bg-[rgb(0,0,0,0.5)] top-0 left-0 right-0 bottom-0'>
        <i className="fa-solid fa-spinner fa-spin text-7xl text-white"></i>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-[#f8d7da] text-red-500 text-left p-4 rounded-md mt-2" role="alert">
        <span>{error.message}</span>
      </div>
    );
  }

  function getBrand(img, name) {
    setgetImg(img);
    setgetName(name);
    setTimeout(() => {
      setIsModalVisible(true);
      setTimeout(() => {
        setIsContentVisible(true);
      }, 250); 
    }, 250); 
  }

  return (
    <>
      <section>
        <h2 className='text-4xl text-[#4fa74f] my-10 mt-14 font-semibold'>All Brands</h2>
        <div className="row gap-y-3">
          {data.map((Categorie) => (
            <div key={Categorie._id} className="size-full cursor-pointer md:w-1/4">
              <div onClick={() => getBrand(Categorie.image, Categorie.name)} className='w-[95%] rounded-lg Categorie'>
                <img src={Categorie.image} className='w-[95%] object-cover' alt="" />
                <h2 className='font-semibold bold py-5'>{Categorie.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </section>

      {getName ? (
        <section
          onClick={close}
          className={`fixed z-50 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 transition-opacity duration-150 ${
            isModalVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className='flex justify-center items-start mt-20'>
            <div
              onClick={(e) => e.stopPropagation()}
              className='bg-white w-[75%] md:w-1/3 rounded-lg opacity-100 transition-transform duration-150'
            >
              <div className='text-right size-full border-b-2 py-3'>
                <i
                  onClick={close}
                  className="fa-solid me-5 mt-2 fa-xmark text-2xl transition-[0.5s] cursor-pointer text-gray-500 hover:text-black"
                />
              </div>
              <div className="row border-b-2 justify-between">
                <div className={`w-1/2 size-full text-left my-5 transition-opacity duration-150 ${isContentVisible ? 'opacity-100 relative' : 'opacity-0 absolute'}`}>
                  <div className='ms-10'>
                    <h2 className='text-4xl font-medium text-[#4fa74f] capitalize'>{getName}</h2>
                    <p className='mt-2 text-lg lowercase'>{getName}</p>
                  </div>
                </div>
                <div className={`md:w-1/2 size-full text-left my-5 transition-opacity duration-150 ${isContentVisible ? 'opacity-100 relative' : 'opacity-0 absolute'}`}>
                  <div className='w-[55%] ms-10'>
                    <img src={getImg} alt="" />
                  </div>
                </div>
              </div>
              <div className='w-full flex justify-end ms-auto py-3'>
                <button
                  type="button"
                  onClick={close}
                  className="px-3 me-3 py-3 ms-auto text-base font-medium text-white bg-[#5c636a] focus:outline-none rounded-md text-center dark:hover:bg-[#3b3f43]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
