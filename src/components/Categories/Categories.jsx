import React, { useState } from 'react'
import style from './Categories.module.css'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Categories() {
  const [SpecificCategory, setSpecificCategory] = useState(null);
  const [SpecificCategoryName, setSpecificCategoryName] = useState(null)
  const [Loading, setLoading] = useState(false)

  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data, isError, isLoading, error } = useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
    select: (data) => data.data.data,
    gcTime: 10000,
    staleTime: 10000,
    retry: 4,
    retryDelay: 4,
    refetchInterval: 30000,
  });

  console.log(data);

  async function GetSpecificCategory(id, SpecificCategoryName) {
    setLoading(true);
    try {
      const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
      

      setSpecificCategory(res.data.data);
      

      setSpecificCategoryName(SpecificCategoryName);
  
      console.log(res.data.data);
    } catch (err) {
      console.error('Error fetching specific category:', err);
    
    } finally {
      setLoading(false);  
    }
  }
  

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

  return (
    <>
      {Loading == true?  <div className=' fixed flex items-center justify-center bg-[rgb(0,0,0,0.5)] top-0 left-0 right-0 bottom-0'>
           <i className="fa-solid  fa-spinner fa-spin text-7xl text-white"></i>
           </div>: null}
      <section>
        <div className="row pt-5 gap-y-3">
          {data.map((Categorie) => (
            <div onClick={() => GetSpecificCategory(Categorie._id,Categorie.name)} key={Categorie._id} className="size-full cursor-pointer md:w-1/3">
              <div className='w-[95%] overflow-hidden rounded-lg Categorie'>
                <img src={Categorie.image} className='object-cover h-[340px]' alt={Categorie.name} />
                <h2 className='text-[#198754] text-3xl font-bold py-5'>{Categorie.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </section>

      {SpecificCategory && (
        <section>
          <h2 className='text-3xl text-[#4FA74F] font-medium mt-7'>{SpecificCategoryName} Subcategories</h2>
          <div className="row">
            {SpecificCategory.map((category) => (
              <div key={category._id} className='size-full mt-7 md:w-1/3'>
                <div className="p-7 w-[95%] mx-auto border border-gray-300 hoverCart rounded-md">
                  <p className='text-2xl font-medium'>{category.name}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
