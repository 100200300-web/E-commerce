import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { ColorRing } from "react-loader-spinner";
import { Helmet } from "react-helmet";
export default function VerfiyResetCode() {
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  let user = {
    resetCode: "",
  };
  async function VerfiyCode(values) {
    setIsLoading(true);
    await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      )
      .then((data) => {
        console.log(data);
        toast.success(`${data?.data?.status}`, {
          duration: 2000,
        });
        setIsLoading(false);
        navigate("/ResetPassword");
      })
      .catch((data) => {
        console.log(data);

        toast.error(`${data?.response.data.message}`, {
          duration: 2000,
        });
        setIsLoading(false);
      });
  }
  const VerfiyCodeFormik = useFormik({
    initialValues: user,
    onSubmit: VerfiyCode,
  });
  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <div className="w-1/2 mx-auto">
        <h1 className="text-2xl text-cyan-600">
          Please Enter Your Verification Code
        </h1>
        <form className="mt-8" onSubmit={VerfiyCodeFormik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={VerfiyCodeFormik.handleBlur}
              onChange={VerfiyCodeFormik.handleChange}
              value={VerfiyCodeFormik.values.resetCode}
              type="text"
              name="resetCode"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_resetCode"
              className="peer-focus:font-medium absolute text-sm text-cyan-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-cyan-500 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              reset_Code
            </label>
            {VerfiyCodeFormik.touched.resetCode &&
            VerfiyCodeFormik.errors.resetCode ? (
              <div className=" bg-red-300 text-white p-2 mt-3">
                {VerfiyCodeFormik.errors.resetCode}
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
