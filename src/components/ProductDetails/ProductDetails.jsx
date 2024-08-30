import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";
import { cartContext } from "../Context/CartContext";
import { Helmet } from "react-helmet";
export default function ProductDetails() {
  const { id } = useParams();
  const { addProduct } = useContext(cartContext);
  async function handelAddProduct(id) {
    const resFlag = await addProduct(id);
    if (resFlag) {
      toast.success("Add Product Successfully", {
        duration: 2000,
      });
    } else {
      toast.error("Add Product Error", {
        duration: 2000,
      });
    }
  }
  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ProductDetails", id],
    queryFn: getProductDetails,
  });
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <h2>{error}</h2>;
  }
  const Details = data.data.data;

  return (
    <>
      <Helmet>
        <title>Product Details</title>
      </Helmet>
      <div className="flex flex-wrap items-center justify-between ">
        <div className=" w-full md:w-1/2 lg:w-1/3 ">
          <div className=" ">
            <img
              src={Details.imageCover}
              alt={Details.title}
              className="w-full"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-2/3 mt-5">
          <div className="px-8 relative">
            {Details.priceAfterDiscount ? (
              <div className=" absolute px-0 py-2 md:p-2  bg-[#0891b2] text-white right-0 top-0">
                -
                {100 -
                  Math.ceil((Details.priceAfterDiscount / Details.price) * 100)}
                %
              </div>
            ) : (
              ""
            )}
            <h2 className="text-[#155e75] text-3xl font-bold">
              {Details.title}{" "}
            </h2>
            <p className="mt-5">
              <span className="text-[#155e75] font-bold">Category :</span>{" "}
              {Details.category.name}
            </p>
            <p className="mt-2">
              <span className="text-[#155e75] font-bold">Brand :</span>{" "}
              {Details.brand.name}
            </p>
            <p className="mt-2 text-[#155e75]">{Details.description}</p>
            <div className="flex items-center justify-between mt-2 ">
              <p>
                <span className="text-[#155e75] font-bold">Price :</span>{" "}
                <span
                  className={
                    Details.priceAfterDiscount ? "line-through text-[#000]" : ""
                  }
                >
                  {Details.price}
                </span>{" "}
                <span>{Details.priceAfterDiscount} </span> EGP
              </p>
              <p>
                <span>
                  <i className="fa-solid fa-star text-yellow-400"></i>
                </span>
                {Details.ratingsAverage}
              </p>
            </div>
            <div className="flex items-center justify-center mt-3">
              <button
                onClick={() => handelAddProduct(Details._id)}
                className="btn p-3  mt-4 w-full"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
