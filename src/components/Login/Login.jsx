import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../Context/AuthContext";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

export default function Login() {
  const { token, setToken } = useContext(authContext);
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  let user = {
    email: "",
    password: "",
  };
  async function loginUser(values) {
    setIsLoading(true);
    const data = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((data) => {
        setToken(data?.data.token);
        localStorage.setItem("token", data?.data.token);
        toast.success("Succes", {
          duration: 2000,
        });
        setIsLoading(false);

        navigate("/Home");
      })
      .catch((data) => {
        toast.error(`${data?.response.data.message}`, {
          duration: 2000,
        });
        setIsLoading(false);
      });
  }
  const loginFormik = useFormik({
    initialValues: user,
    onSubmit: loginUser,
    validationSchema: yup.object().shape({
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
    }),
  });
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="w-1/2 mx-auto">
        <h1 className="text-2xl text-cyan-600">Login Now :</h1>
        <form className="max-w-md  mt-8" onSubmit={loginFormik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={loginFormik.handleBlur}
              onChange={loginFormik.handleChange}
              value={loginFormik.values.email}
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
            {loginFormik.touched.email && loginFormik.errors.email ? (
              <div className=" bg-red-300 text-white p-2 mt-3">
                {loginFormik.errors.email}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={loginFormik.handleBlur}
              onChange={loginFormik.handleChange}
              value={loginFormik.values.password}
              type="password"
              name="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-cyan-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            {loginFormik.touched.password && loginFormik.errors.password ? (
              <div className=" bg-red-300 text-white p-2 mt-3">
                {loginFormik.errors.password}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between mt-3">
            <button type="submit" className="btn p-3  text-center w-full flex justify-center items-center">
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
                "Login"
              )}
            </button>
            <Link
              to={"/ForgetPassword"}
              className=" cursor-pointer hover:text-cyan-600 py-5 mx-auto underline"
            >
              Forget Password ?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
