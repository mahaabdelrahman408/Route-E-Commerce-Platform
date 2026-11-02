import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext} from "react";
import { UserContext } from "../../context/UserContext";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";


export default function Profile() {
const { updateLoggedUserData, apiError: contextApiError } = useContext(UserContext);

// console.log("apiError:", contextApiError);
 let validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("name is Required")
      .min(3, "min is 3")
      .max(30, "max is 30"),
    email: Yup.string().required("email is Required").email("email invalid"),
    // password: Yup.string()
    //   .required("password is Required")
    //   .matches(/^[A-Z][a-zA-Z0-9@]{4,10}$/, "invalid password ex(Ahmed@123)"),
    // rePassword: Yup.string()
    //   .required("re-enter password is Required")
    //   .oneOf([Yup.ref("password"), null], "Passwords must match"),
    phone: Yup.string()
      .required("phone is Required")
      .matches(/^01[0125][0-9]{8}$/, "we need valid egyptian phone number "),
  });

  const formik = useFormik({
    initialValues: {
     name: "",
      email: "",
    phone: "",

      password: "",
    },

    validationSchema,

    onSubmit: async (values) => {
      await updateLoggedUserData(values);
    },
  });

  return <>
  <h2 className="text-3xl text-text font-semibold">My Profile</h2>
  {contextApiError && (
  <p className="mx-auto mb-3 max-w-md text-sm text-red-500">
    {contextApiError}
  </p>
)}

 {/* {updatelogged && (
  
              <div className="text-center mt-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
                {updatelogged.message}
              </div>
            )} */}
                  <form onSubmit={formik.handleSubmit} className="mx-auto max-w-md space-y-4">


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

              {/* Update */}
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
                      className="cursor-pointer mt-5 h-9 w-full rounded-lg bg-mincolor font-semibold text-white transition hover:bg-[#46b84d]"
                    >
                      Update
                    </button>
                  )}
 </form>

<NavLink
  to="/profile/update/password"
  className="mx-auto mt-4 block h-9 max-w-md rounded-lg bg-mincolor py-2 text-center text-sm font-semibold text-white transition hover:bg-[#46b84d]"
>
  Change Password
</NavLink>




  </>
                

}
