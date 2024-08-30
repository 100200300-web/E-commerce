import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { cartContext } from "../Context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function Payment() {
  const [loading, setIsLoading] = useState(false);
  const { onlinePayment, cashPayment } = useContext(cartContext);
  const { state } = useLocation();
  const navigate = useNavigate();
  let user = {
    details: "",
    phone: "",
    city: "",
  };

  async function checkOut(values) {
    setIsLoading(true);
    if (state.method == "Online Payment") {
      await onlinePayment(values);
    } else {
      await cashPayment(values);
      navigate("/allorders");
    }

    setIsLoading(false);
  }
  const checkOutFormik = useFormik({
    initialValues: user,
    onSubmit: checkOut,
    validationSchema: yup.object().shape({
      details: yup
        .string()
        .required()
        .min(10, "Details must be more than 10 characters "),
      phone: yup
        .string()
        .required("Phone Number is required")
        .matches(/^01[0125][0-9]{8}$/, "Must be valid egyptian phone number"),
      city: yup
        .string()
        .required()
        .min(6, "Your Address must be more than 6 characters "),
    }),
  });
  return (
    <>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <div className="w-1/2 mx-auto">
        <h1 className="text-2xl text-cyan-600">{state.method}</h1>
        <form className="mt-8" onSubmit={checkOutFormik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={checkOutFormik.handleBlur}
              onChange={checkOutFormik.handleChange}
              value={checkOutFormik.values.details}
              type="text"
              name="details"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_details"
              className="peer-focus:font-medium absolute text-sm text-cyan-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              details
            </label>
            {checkOutFormik.touched.details && checkOutFormik.errors.details ? (
              <div className=" bg-red-300 text-white p-2 mt-3">
                {checkOutFormik.errors.details}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={checkOutFormik.handleBlur}
              onChange={checkOutFormik.handleChange}
              value={checkOutFormik.values.phone}
              type="tel"
              name="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-cyan-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              phone
            </label>
            {checkOutFormik.touched.phone && checkOutFormik.errors.phone ? (
              <div className=" bg-red-300 text-white p-2 mt-3">
                {checkOutFormik.errors.phone}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={checkOutFormik.handleBlur}
              onChange={checkOutFormik.handleChange}
              value={checkOutFormik.values.city}
              type="text"
              name="city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_city"
              className="peer-focus:font-medium absolute text-sm text-cyan-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              city
            </label>
            {checkOutFormik.touched.city && checkOutFormik.errors.city ? (
              <div className=" bg-red-300 text-white p-2 mt-3">
                {checkOutFormik.errors.city}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex items-center justify-between mt-5">
            <button type="submit" className="btn p-3 block text-center ml-auto">
              {loading ? (
                <ColorRing
                  visible={true}
                  height="40"
                  width="40"
                  ariaLabel="color-ring-loading"
                  wrapperClass="color-ring-wrapper"
                  colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                />
              ) : (
                "Pay Now"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
