import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from '../CartContext/CartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../WishlistContext/WishlistContext';

export default function ProductDetails() {
  const [Product, setProduct] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const { AddToCart , setCartLength} = useContext(CartContext);
  const { AddProductWishlist, GetLoggedUserwishlist } = useContext(WishlistContext);

  let { id } = useParams();
  async function GetUserwishlist() {
    let res = await GetLoggedUserwishlist();
    setWishlist(res.data.data);
  }
  useEffect(() => {
    GetUserwishlist();
  }, []);
  async function AddWishlist(id) {
    setisLoading(true);
    try {
      let res = await AddProductWishlist(id);

      if (res.data.status === 'success') {
        toast.success(`❤️${res.data.message}`, {
          duration: 4000,
          position: 'top-right',
          style: { background: '#479647', color: 'white' },
        });

       


        GetUserwishlist();
      } else {
        toast.error(res.data.message);
      }
    }  finally {
      setisLoading(false);
    }
  }
  async function addPro(id) {
    setisLoading(true);
    try {
      let { data } = await AddToCart(id);

      if (data.status === 'success') {
        setCartLength(data.numOfCartItems)
        toast.success(`${data.message} 🛺`, {
          duration: 4000,
          position: 'top-right',
          style: { background: '#479647', color: 'white' },
          icon: '✅',
        });
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('Something went wrong while adding to the cart.');
    } finally {
      setisLoading(false);
    }
  }

    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      customPaging: (i) => (
        <div className="custom-dot2 "></div>
      ),
      appendDots: (dots) => (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
          {dots.slice(0, 2)}
        </div>
      )}

  async function getProduct(id) {
    setisLoading(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProduct(data.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    } finally {
      setisLoading(false); 
    }
  }

  useEffect(() => {
    getProduct(id);
  }, [id]);

  return (
    <>
      {isLoading ? (
        <div className='fixed flex items-center justify-center bg-[rgb(0,0,0,0.5)] top-0 left-0 right-0 bottom-0'>
          <i className="fa-solid fa-spinner fa-spin text-7xl text-white"></i>
        </div>
      ) : (
        <div className="container mx-auto py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 flex justify-center items-center">
              <Slider {...settings} className="w-full">
                {Product?.images?.map((src, index) => (
                  <div key={index} className="w-full">
                    <img src={src} alt={`Product Image ${index + 1}`} className="w-full h-auto rounded-lg shadow-md" />
                  </div>
                ))}
              </Slider>
            </div>

            <div className="w-full md:w-2/3 text-left flex flex-col justify-center">
              <h2 className="text-4xl font-medium mb-4">{Product?.slug}</h2>
              <p className="text-gray-700 mb-4">{Product?.description}</p>

              <div className='flex justify-between mb-1'>
                <span className="text-xl font-semibold text-[#22db14] mb-6 block">
                  ${Product?.price} EGP
                </span>
                <span><i className="fa-solid fa-star text-[#DAA520]"></i> {Product?.ratingsAverage}</span>
              </div>

              <div className="flex items-center justify-between">
                <button onClick={() => addPro(Product?._id)} className="bg-[#22db14] text-white w-[80%] mx-auto py-2 rounded-md mt-3 hover:bg-[#16a20c] transition duration-300">
                  + Add
                </button>
                <i onClick={() => AddWishlist(Product?._id)} className={`fa-solid cursor-pointer fa-heart text-2xl ${wishlist?.some((item) => item._id === Product._id) ? 'text-red-600' : 'text-gray-400'}`}></i>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

