import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { toast } from "sonner";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();
  const { setUserToken, setUsername, setEmail } = useContext(UserContext);
  async function register(values) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values,
      );
      // console.log(data);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      setUsername(data.user.name);
setEmail(data.user.email);
      toast.success(data.message, {
  duration: 2000,
  position: "top-right",
});
      navigate("/");
    } catch (err) {
      // console.log(err?.response?.data?.message);
      // setApiError(err?.response?.data?.message ?? "something went wrong");
      toast.error(err?.response?.data?.message, {
  duration: 2000,
  position: "top-right",
});
    }
  }
  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("name is Required")
      .min(3, "min is 3")
      .max(30, "max is 30"),
    email: Yup.string().required("email is Required").email("email invalid"),
    password: Yup.string()
      .required("password is Required")
      .matches(/^[A-Z][a-zA-Z0-9@]{4,10}$/, "invalid password ex(Ahmed@123)"),
    rePassword: Yup.string()
      .required("re-enter password is Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    phone: Yup.string()
      .required("phone is Required")
      .matches(/^01[0125][0-9]{8}$/, "we need valid egyptian phone number "),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: register,
  });
return (
  <div className="min-h-screen bg-white">
    <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-6">

      <div className="grid w-full items-center gap-8 md:grid-cols-2">

        {/* Image */}
        <div className="flex items-center justify-center">
          <img
            src="signup-g-Dtp6-wtD.svg"
            alt="Sign up"
            className="w-70 object-contain sm:w-87.5 lg:w-107.5"
          />
        </div>

        {/* Register Form */}
        <div className="w-full max-w-112.5">

          <h1 className="text-3xl font-bold text-[#1f2d3d]">
            Get Start Shopping
          </h1>

          <p className="mt-1 text-sm text-black">
            Welcome to FreshCart! Enter your email to get started.
          </p>


          <form
            onSubmit={formik.handleSubmit}
            className="mt-5"
          >

            {/* Name */}
            <div className="mb-3">

              <label
                htmlFor="name"
                className="mb-1 block text-sm font-medium text-black"
              >
                Name
              </label>

              <input
                type="text"
                name="name"
                id="name"
                autoComplete="given-name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Name"
                className="h-9 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />

              {formik.touched.name && formik.errors.name && (
                <span className="mt-0.5 block text-sm text-red-800">
                  {formik.errors.name}
                </span>
              )}

            </div>

            {/* Email */}
            <div className="mb-3">

              <div className="mb-1 flex items-center justify-between">
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
                className="h-9 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />

            </div>

            {/* Phone */}
            <div className="mb-3">

              <div className="mb-1 flex items-center justify-between">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-black"
                >
                  Phone
                </label>

                {formik.touched.phone && formik.errors.phone && (
                  <span className="text-sm text-red-500">
                    {formik.errors.phone}
                  </span>
                )}
              </div>

              <input
                type="tel"
                name="phone"
                id="phone"
                autoComplete="tel"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Phone"
                className="h-9 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />

            </div>

            {/* Password */}
            <div className="mb-3">

              <div className="mb-1 flex items-center justify-between">
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
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="********"
                  className="h-9 w-full rounded-lg border border-gray-300 bg-white px-4 pr-11 text-sm outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
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

            {/* Re-enter Password */}
            <div className="mb-3">

              <div className="mb-1 flex items-center justify-between">
                <label
                  htmlFor="rePassword"
                  className="text-sm font-medium text-black"
                >
                  RePassword
                </label>

                {formik.touched.rePassword &&
                  formik.errors.rePassword && (
                    <span className="text-sm text-red-500">
                      {formik.errors.rePassword}
                    </span>
                  )}
              </div>

              <input
                type="password"
                name="rePassword"
                id="rePassword"
                autoComplete="new-password"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="********"
                className="h-9 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />

            </div>

            {/* Submit */}
            {formik.isSubmitting ? (
              <button
                type="submit"
                className="mt-5 flex h-9 w-full items-center justify-center rounded-lg bg-[#55c95b] text-white transition hover:bg-[#46b84d]"
              >
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  className="text-white"
                />
              </button>
            ) : (
              <button
                type="submit"
                className="mt-5 h-9 w-full rounded-lg bg-[#55c95b] font-semibold text-white transition hover:bg-[#46b84d]"
              >
                Sign Up
              </button>
            )}

            {/* Sign In */}
            <p className="mt-5 text-sm text-black">
              You have an account?

              <NavLink
                to="/login"
                className="ml-1 text-green-600 hover:underline"
              >
                Sign In
              </NavLink>
            </p>

          </form>
        </div>

      </div>
    </div>
  </div>
);
}
