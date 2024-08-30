import React, { useContext, useEffect } from "react";
import { cartContext } from "./../Context/CartContext";
import { Link } from "react-router-dom";

export default function AllOrders() {
  let { deletall } = useContext(cartContext);
  useEffect(() => {deletall}, []);
  return (
    <>
      <div className="bg-[#F8F9FA] w-3/4 mx-auto rounded-md my-6 md:h-[400px]">
        <div className="flex flex-wrap justify-center items-center py-20">
          <div className="space-y-3">
            <h1 className="md:text-[32px] text-[30px]">
              {" "}
              Your payment process is successful{" "}
              <i className="fa-solid fa-circle-check text-[#08b26b]"></i>
            </h1>
            <Link to={"/"}>
              <button
                type="button"
                className="block mx-auto btn p-4 w-full my-5 text-sm font-medium text-[#0891b2] focus:outline-none bg-white rounded-lg border border-[#0891b2] hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-[#0891b2] dark:hover:text-white dark:hover:bg-gray-700"
              >
                Go Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
