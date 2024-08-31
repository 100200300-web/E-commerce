import React, { useContext, useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../Context/AuthContext";
import { cartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";
import Logo from "../../assets/shopping-cart.png";

export default function Navbar() {
  const navigate = useNavigate();
  const { numberOfCartItems} = useContext(cartContext);
  const { token, setToken } = useContext(authContext);
  const { numOfItemOfWishlist,getWishlistItems } = useContext(WishlistContext);
  useEffect(() => {
    getWishlistItems();
  }, []);
  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/Login");
  }
  return (
    <>
      <div className=" mx-auto">
        <nav className="border-gray-200 py-5">
          <div className=" flex flex-wrap items-center justify-between">
            <div className="w-3/12">
              <Link to={"/Home"}>
                <div className="flex items-center justify-center">
                  <img src={Logo} className="w-[20%]" alt=" Logo" />
                  <h1 className=" text-2xl font-bold text-cyan-700">SHOPIFY</h1>
                </div>
              </Link>
            </div>
            <button
              data-collapse-toggle="mobile-menu"
              type="button"
              className="md:hidden ml-3 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 p-2 focus:ring-cyan-600 rounded-lg inline-flex items-center justify-center"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="hidden md:block w-8/12  " id="mobile-menu">
              <ul className="flex-col md:flex-row flex md:space-x-8 justify-center items-center  md:mt-0 md:text-sm md:font-medium">
                {token ? (
                  <>
                    <li>
                      <NavLink
                        to={"/Home"}
                        className="block py-2 px-3  text-lg rounded md:bg-transparent md:text-cyan-600 md:p-0 dark:text-white md:dark:text-cyan-600"
                        aria-current="page"
                      >
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/Products"}
                        className="block py-2 px-3 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-cyan-600 md:p-0 dark:text-white md:dark:hover:text-cyan-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Products
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/Categories"}
                        className="block py-2 px-3 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-cyan-600 md:p-0 dark:text-white md:dark:hover:text-cyan-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Categories
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/Brands"}
                        className="block py-2 px-3 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-cyan-600 md:p-0 dark:text-white md:dark:hover:text-cyan-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Brands
                      </NavLink>
                    </li>
                    <li className=" relative">
                      <NavLink
                        to={"/Cart"}
                        className="block py-2 px-3 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-cyan-600 md:p-0 dark:text-white md:dark:hover:text-cyan-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Cart
                      </NavLink>
                      <div className=" absolute top-[-6px] right-[-15px] flex justify-center items-center text-xs w-4 h-4 p-1 rounded-full bg-cyan-600 text-white">
                        {numberOfCartItems}
                      </div>
                    </li>
                    <li className=" relative">
                      <NavLink
                        to={"/Wishlist"}
                        className="block py-2 px-3 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-cyan-600 md:p-0 dark:text-white md:dark:hover:text-cyan-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Wishlist
                      </NavLink>
                      <div className=" absolute top-[-6px] right-[-15px] flex justify-center items-center text-xs w-4 h-4 p-1 rounded-full bg-cyan-600 text-white">
                        {numOfItemOfWishlist}
                      </div>
                    </li>
                    <li>
                      <span
                        className=" cursor-pointer text-lg"
                        onClick={handleLogout}
                      >
                        Logout
                      </span>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink
                        to={"/Login"}
                        className="block py-2 px-3 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-cyan-600 md:p-0 dark:text-white md:dark:hover:text-cyan-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/Register"}
                        className="block py-2 px-3 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-cyan-600 md:p-0 dark:text-white md:dark:hover:text-cyan-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Register
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
