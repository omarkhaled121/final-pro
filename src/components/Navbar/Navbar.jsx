import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';
import { CartContext } from '../CartContext/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { CartLength, GetLoggedusercart } = useContext(CartContext);
  const { setUserToken, UserToken } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (UserToken) {
      GetLoggedusercart();
    }
  }, [UserToken, GetLoggedusercart]);

  const signOut = () => {
    localStorage.removeItem('token');
    setUserToken(null);
    navigate('/login');
  };

  const handleNavbarToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#F8F9FA] fixed z-40 top-0 right-0 left-0 border-gray-200">
      <div className="lg:flex flex-wrap w-[90%] justify-between mx-auto p-4">
        <div className="flex justify-between">
          <Link to="/">
            <div className="flex items-center">
              <i className='fa-solid fa-cart-shopping text-3xl text-[#4FA74F]'></i>
              <h1 className='inline text-3xl font-semibold ml-2'>Fresh Cart</h1>
            </div>
          </Link>
          <div className="flex items-center me-6 lg:hidden">
            <i className="fa-solid fa-bars text-4xl cursor-pointer" onClick={handleNavbarToggle}></i>
          </div>
        </div>

        <div className={`navbar-menu ${isOpen ? 'open' : ''} lg:block`}>
          <div className={`flex lg:absolute static text-left top-1/2 left-1/2 transform -translate-x-0 lg:-translate-x-1/2 lg:-translate-y-1/2 -translate-y-0`}>
            {UserToken && (
              <ul className="lg:flex gap-5 text-gray-500">
                <li><NavLink to="/" className="block py-2 rounded">Home</NavLink></li>
                <li><NavLink to="/cart" className="block py-2 rounded">Cart</NavLink></li>
                <li><NavLink to="/wishlist" className="block py-2 rounded">Wishlist</NavLink></li>
                <li><NavLink to="/products" className="block py-2 rounded">Products</NavLink></li>
                <li><NavLink to="/categories" className="block py-2 rounded">Categories</NavLink></li>
                <li><NavLink to="/brands" className="block py-2 rounded">Brands</NavLink></li>
              </ul>
            )}
          </div>

          <div className="lg:flex items-center ml-auto">
            {UserToken ? (
              <div className='flex lg:inline-block flex-col-reverse'>
                <NavLink to="/cart">
                  <div className="relative mt-3 inline-block mr-3">
                    <i className='fa-solid fa-cart-shopping text-2xl hover:text-black transition duration-200 text-gray-600'></i>
                    <span className='absolute font-bold rounded-md text-sm text-white transform -translate-x-2.5 -translate-y-2 px-1.5 bg-[#4FA74F]'>{CartLength}</span>
                  </div>
                </NavLink>
                <span onClick={signOut} className="hover:text-black transition text-gray-600 duration-200 cursor-pointer">Sign Out</span>
              </div>
            ) : (
              <>
                <NavLink to="/login" className="block hover:text-black transition text-gray-600 duration-200 my-5 lg:my-0 lg:inline">Login</NavLink>
                <NavLink to="/register" className="block hover:text-black transition text-gray-600 duration-200 lg:inline mx-3">Register</NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
