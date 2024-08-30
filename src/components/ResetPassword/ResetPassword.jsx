import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
export default function ResetPassword() {
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  let user = {
    email: "",
    newPassword: "",
  };
  async function resetPassword(values) {
    setIsLoading(true);
    await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .then((data) => {
        console.log(data);
        toast.success(`Password Changed`, {
          duration: 2000,
        });
        setIsLoading(false);
        navigate("/Login");
      })
      .catch((data) => {
        console.log(data);
        setIsLoading(false);
      });
  }
  const resetPasswordFormik = useFormik({
    initialValues: user,
    onSubmit: resetPassword,
    validationSchema: yup.object().shape({
      email: yup.string().required("Email is required").email("Invalid Email"),
      newPassword: yup
        .string()
        .required()
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/,
          `should contain at least one digit -
                should contain at least one lower case -
                should contain at least one upper case -
                should contain at least 8 from the mentioned characters`
        ),
    }),
  });
  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <div className="w-1/2 mx-auto">
        <h1 className="text-2xl text-cyan-600">
          Please Enter Your Email & New Password
        </h1>
        <form className="mt-8" onSubmit={resetPasswordFormik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={resetPasswordFormik.handleBlur}
              onChange={resetPasswordFormik.handleChange}
              value={resetPasswordFormik.values.email}
              type="email"
              name="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-cyan-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
            {resetPasswordFormik.touched.email &&
            resetPasswordFormik.errors.email ? (
              <div className=" bg-red-300 text-white p-2 mt-3">
                {resetPasswordFormik.errors.email}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={resetPasswordFormik.handleBlur}
              onChange={resetPasswordFormik.handleChange}
              value={resetPasswordFormik.values.newPassword}
              type="password"
              name="newPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_newPassword"
              className="peer-focus:font-medium absolute text-sm text-cyan-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              newPassword
            </label>
            {resetPasswordFormik.touched.newPassword &&
            resetPasswordFormik.errors.newPassword ? (
              <div className=" bg-red-300 text-white p-2 mt-3">
                {resetPasswordFormik.errors.newPassword}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex items-center justify-between mt-3">
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
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
