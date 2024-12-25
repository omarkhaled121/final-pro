import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import useProducts from './../../hooks/useProducts';
import { CartContext } from '../CartContext/CartContext';
import { WishlistContext } from '../WishlistContext/WishlistContext';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const { AddToCart, setCartLength } = useContext(CartContext);
  const { AddProductWishlist, GetLoggedUserwishlist } = useContext(WishlistContext);
  const { data, isError, isLoading, error } = useProducts();

  useEffect(() => {
    async function fetchWishlist() {
      let res = await GetLoggedUserwishlist();
      setWishlist(res.data.data);
    }

    fetchWishlist();
  }, [GetLoggedUserwishlist]);

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

  async function addWishlist(id) {
    setLoading(true);
    try {
      let res = await AddProductWishlist(id);

      if (res.data.status === 'success') {

        toast.success(`❤️${res.data.message}`, {
          duration: 4000,
          position: 'top-right',
          style: { background: '#479647', color: 'white' },
        });

  
        let updatedWishlist = await GetLoggedUserwishlist();
        setWishlist(updatedWishlist.data.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error('Something went wrong while adding to the wishlist.');
    } finally {
      setLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className='fixed flex z-50 items-center justify-center bg-[rgba(0,0,0,0.5)] top-0 left-0 right-0 bottom-0'>
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


  const filteredProducts = data.filter(product =>
    product.slug.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <section>
      {loading && (
        <div className='fixed flex z-50 items-center justify-center bg-[rgba(0,0,0,0.5)] top-0 left-0 right-0 bottom-0'>
          <i className="fa-solid fa-spinner fa-spin text-7xl text-white"></i>
        </div>
      )}
      
      <input 
        type="text"
        value={searchValue} 
        onChange={(e) => setSearchValue(e.target.value)} 
        name="search"
        id="search"
        className="block p-2.5 mt-16 mb-5 w-[70%] mx-auto text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-opacity-50 focus:ring-blue-500"
        placeholder="Search...."
      />

      <div className='flex flex-wrap -mx-4'>
        {filteredProducts.map((product) => (
          <div key={product._id} className="w-full sm:w-1/2 md:w-1/4 px-4 mb-4">
            <div className="hoverCart rounded-lg text-left">
              <Link to={`/productDetails/${product._id}`}>
                <div className='px-3 py-10'>
                  <img src={product.imageCover} className='w-[95%] mx-auto' alt="" />
                  <p className='text-[#4FA74F] capitalize text-lg'>{product.category.name}</p>
                  <h2 className='font-semibold capitalize mb-2'>{product.slug}</h2>
                  <div className='flex justify-between mb-1'>
                    <span>{product.price}</span>
                    <span><i className="fa-solid fa-star text-[#DAA520]"></i> {product.ratingsAverage}</span>
                  </div>
                </div>
              </Link>
              <div className='flex justify-center pb-5'>
                <button onClick={() => {addPro(product._id)}} className='bg-[#479647] text-white btntranslate w-[85%] py-1 rounded-md mt-3'>+ Add</button>
                <i onClick={() => addWishlist(product._id)} className={`fa-solid cursor-pointer fa-heart text-2xl ${wishlist?.some((item) => item._id === product._id) ? 'text-red-600' : 'text-gray-400'}`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
