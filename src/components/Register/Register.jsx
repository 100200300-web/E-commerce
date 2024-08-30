import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
export default function Register() {
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  let user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  async function regiterUser(values) {
    setIsLoading(true);
    const { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((data) => {
        toast.success("Succes", {
          duration: 1000,
        });
        setIsLoading(false);
        setTimeout(() => {
          navigate("/Login");
        }, 2000);
      })
      .catch((data) => {
        toast.error(`${data.response.data.message}`, {
          duration: 2000,
        });
        setIsLoading(false);
      });
  }
  const registerFormik = useFormik({
    initialValues: user,
    onSubmit: regiterUser,
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("Name is required")
        .min(3, "Name must be more than 3 characters ")
        .max(12, "Name must be less than 12 characters "),
      email: yup.string().required("Email is required").email("Invalid Email"),
      password: yup
        .string()
        .required()
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/,
          `should contain at least one digit -
                should contain at least one lower case -
                should contain at least one upper case -
                should contain at least 8 from the mentioned characters`
        ),
      rePassword: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "Password doesn't match rePassword"),
      phone: yup
        .string()
        .required("Phone Number is required")
        .matches(/^01[0125][0-9]{8}$/, "Must be valid egyptian phone number"),
    }),
  });

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="w-1/2 mx-auto">
        <h1 className="text-2xl text-cyan-600">Register Now :</h1>

        <form className="max-w-md mt-8" onSubmit={registerFormik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={registerFormik.handleBlur}
              onChange={registerFormik.handleChange}
              value={registerFormik.values.name}
              type="text"
              name="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-cyan-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
            {registerFormik.touched.name && registerFormik.errors.name ? (
              <div className=" bg-red-300 text-white mt-3 p-2 ">
                {registerFormik.errors.name}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={registerFormik.handleBlur}
              onChange={registerFormik.handleChange}
              value={registerFormik.values.email}
              type="email"
              name="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-cyan-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
            {registerFormik.touched.email && registerFormik.errors.email ? (
              <div className=" bg-red-300 text-white mt-3 p-2">
                {registerFormik.errors.email}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={registerFormik.handleBlur}
              onChange={registerFormik.handleChange}
              value={registerFormik.values.password}
              type="password"
              name="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-cyan-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            {registerFormik.touched.password &&
            registerFormik.errors.password ? (
              <div className=" bg-red-300 text-white mt-3 p-2">
                {registerFormik.errors.password}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={registerFormik.handleBlur}
              onChange={registerFormik.handleChange}
              value={registerFormik.values.rePassword}
              type="password"
              name="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_repeat_password"
              className="peer-focus:font-medium absolute text-sm text-cyan-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Re-password
            </label>
            {registerFormik.touched.rePassword &&
            registerFormik.errors.rePassword ? (
              <div className=" bg-red-300 text-white mt-3 p-2">
                {registerFormik.errors.rePassword}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={registerFormik.handleBlur}
              onChange={registerFormik.handleChange}
              value={registerFormik.values.phone}
              type="tel"
              name="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-cyan-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number
            </label>
            {registerFormik.touched.phone && registerFormik.errors.phone ? (
              <div className=" bg-red-300 text-white mt-3 p-2">
                {registerFormik.errors.phone}
              </div>
            ) : (
              ""
            )}
          </div>
          <button type="submit" className="btn p-2 w-full flex justify-center items-center">
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
              "Create New Account"
            )}
          </button>
          <div className="py-4">
            <h1 className=" mt-1 text-center  text-black">
              Already have an account?{" "}
              <NavLink to={"/login"} className=" underline text-blue-700">
                Sign in
              </NavLink>
            </h1>
          </div>
        </form>
      </div>
    </>
  );
}
