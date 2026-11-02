import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

export default function Login() {
  const [apiError, setApiError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setUserToken ,setUsername ,setEmail} = useContext(UserContext);

  async function login(values) {
    setApiError(null);

    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );

      // console.log(data);

      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
localStorage.setItem("username", data.user.name);
setUsername(data.user.name);      
localStorage.setItem("email", data.user.email);
setEmail(data.user.email);

      navigate("/");
    } catch (err) {
      // console.log(err?.response?.data?.message);

      setApiError(
        err?.response?.data?.message ?? "something went wrong"
      );
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email invalid"),

    password: Yup.string()
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema,

    onSubmit: login,
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-8">

        <div className="grid w-full items-center gap-10 md:grid-cols-2">

          {/* Image */}
          <div className="flex items-center justify-center">
            <img
              src="/signin-DlR7P608.png"
              alt="Sign in"
              className="w-70 object-contain sm:w-87.5 lg:w-107.5"
            />
          </div>

          {/* Login Form */}
          <div className="w-full max-w-112.5">

            <h1 className="text-3xl font-bold text-[#1f2d3d]">
              Sign in to FreshCart
            </h1>

            <p className="mt-1 text-base text-black">
              Welcome back to FreshCart! Enter your email to get started.
            </p>

            {/* API Error */}
            {apiError && (
              <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
                {apiError}
              </div>
            )}

            <form
              onSubmit={formik.handleSubmit}
              className="mt-9"
            >

              {/* Email */}
              <div className="mb-6">

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-black"
                  >
                    Email
                  </label>

                  {formik.touched.email && formik.errors.email && (
                    <span className="text-sm text-red-500">
                      {formik.errors.email}
                    </span>
                  )}

                </div>

                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Email"
                  className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />

              </div>

              {/* Password */}
              <div className="mb-6">

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-black"
                  >
                    Password
                  </label>

                  {formik.touched.password && formik.errors.password && (
                    <span className="text-sm text-red-500">
                      {formik.errors.password}
                    </span>
                  )}

                </div>

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="********"
                    className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 pr-12 text-sm outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />

                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700"
                    aria-label="Show password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </button>

                </div>

              </div>

              {/* Sign In */}
              <button
                type="submit"
                className="cursor-pointer h-11 w-full rounded-lg bg-mincolor font-semibold text-white transition hover:bg-[#46b84d]"
              >
                Sign In
              </button>

              {/* Create Account */}
              <div className="mt-6 text-sm text-black">
                You don’t have an account?

                <NavLink
                  to="/register"
                  className="ml-1 text-green-600 hover:underline"
                >
                  Sign Up
                </NavLink>
              </div>

              {/* Forgot Password */}
              <NavLink
                to="/ForgotPassword"
                className="mt-4 block text-sm text-green-600 hover:underline"
              >
                Forget Your Password?
              </NavLink>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}