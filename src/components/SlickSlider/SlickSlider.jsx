import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';



export default function CategorySlider() {
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(false);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    customPaging: (i) => (
      <div className="custom-dot"></div>
    ),
    appendDots: (dots) => (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
        {dots.slice(0, 2)}
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2, 
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  async function getCategories() {
    setLoading(true)
    try {
      setLoading(false)
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
      setCategories(res.data.data.slice(0, 7));  
    } catch (err) {
      setLoading(false)
      console.error("Error fetching categories:", err);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {categories ? (
        <Slider className='' {...settings}>
          {categories.map((category) => (
            <div  key={category._id}>
            
              <img src={category.image} className='h-[200px] object-cover' alt={category.name} />
              <h3 className='text-2xl font-medium'>{category.name}</h3>
            </div>
          ))}
        </Slider>
      ) : (
        null
      )}
         {loading && (
        <div className='fixed flex items-center justify-center bg-[rgba(0,0,0,0.5)] top-0 left-0 right-0 bottom-0'>
          <i className="fa-solid fa-spinner fa-spin text-7xl text-white"></i>
        </div>
      )}
    </>
  );
}




