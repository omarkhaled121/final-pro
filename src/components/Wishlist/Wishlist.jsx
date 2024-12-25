import React, { useContext, useEffect, useState } from 'react';
import { WishlistContext } from '../WishlistContext/WishlistContext';
import { CartContext } from '../CartContext/CartContext';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Wishlist() {
  const [Loading, setLoading] = useState(false);
  const [UserWishlist, setUserWishlist] = useState(null);
  const { AddToCart, setCartLength } = useContext(CartContext);
  const { GetLoggedUserwishlist, RemoveProductFromWishlist } = useContext(WishlistContext);

  async function GetUserwishlist() {
    setLoading(true);
    let res = await GetLoggedUserwishlist();
    if (res.data.status === 'success') {
      setUserWishlist(res.data.data);
      setLoading(false);
    }
  }

  async function deletecartItems(id) {
    setLoading(true);
    let res = await RemoveProductFromWishlist(id);
    console.log(res);
    if (res.data.status === 'success') {
      setLoading(false);
      GetUserwishlist();
      toast.success(res.data.message ,{
        duration: 4000,
        position: 'top-right',
        style: { background: '#479647', color: 'white' },
        icon: '✅',
      });
    } else {
      setLoading(false);
      toast.error('Failed to remove item from wishlist');
    }
  }

  async function addPro(id) {
    setLoading(true);
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
      setLoading(false);
    }
  }

  useEffect(() => {
    GetUserwishlist();

  }, []);

 
  return (
    <>
      {Loading ? (
        <div className='fixed flex items-center justify-center bg-[rgba(0,0,0,0.5)] top-0 left-0 right-0 bottom-0'>
          <i className="fa-solid fa-spinner fa-spin text-7xl text-white"></i>
        </div>
      ) : null}

      <section className='mt-24 bg-[#F8F9FA] p-10'>
        <div>
          <h2 className='text-3xl text-left font-semibold mt-1'>My Wishlist</h2>
        </div>

        {UserWishlist?.map((product) => (
          <div key={product._id} className='row justify-between border-b-2 py-7'>
            <div className='row justify-center items-center'>
              <div>
                <img src={product.imageCover} className='w-[200px]' alt={product.slug} />
              </div>
              <div className='ms-3 text-left'>
                <h3 className='text-2xl capitalize font-medium'>{product.slug}</h3>
                <h6 className='my-2 text-[#22DB14] font-semibold'>
                  {product.price}
                  <span className='ms-2'>EGP</span>
                </h6>
                <span
                  onClick={() => deletecartItems(product._id)}
                  className="font-medium cursor-pointer text-red-600 mb-3 dark:text-red-500 hover:underline"
                >
                  <i className='fa fa-trash text-red-600'></i> Remove
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() =>{ addPro(product._id)}}
                className='px-6 py-3.5 font-medium focus:ring-4 focus:outline-none rounded-lg text-center border border-spacing-2 text-lg border-emerald-500 my-5'
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}