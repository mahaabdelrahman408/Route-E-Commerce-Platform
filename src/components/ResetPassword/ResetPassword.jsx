import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import { UserContext } from "../../context/UserContext";
import { toast } from "sonner";
export default function ResetPassword() {


  const [showPassword, setShowPassword] = useState(false);

  const{setUserToken}=useContext(UserContext)

const navigate = useNavigate();
  async function resetpassword(values) {
    try{
    let{data}=await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",values)
  console.log('restpasword',data);

     localStorage.setItem("userToken", data.token);
     setUserToken(data.token);
      // setIsResetPassword(data);
            toast.success(data.message, {
  duration: 2000,
  position: "top-right",
});
      setTimeout(() => {
         navigate("/login", {
  state: { message: data.message }
    });

      }, 3000);
 

  }
  catch(err){

      toast.error(err?.response?.data?.message, {
  duration: 2000,
  position: "top-right",
});
  }
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email invalid"),
        newPassword: Yup.string()
            .required("Password is required"),

  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },

    validationSchema,
    onSubmit:resetpassword,

  });

  return <>
   <h2 className="text-3xl text-text font-semibold">reset your account password</h2>
                  <form onSubmit={formik.handleSubmit} className="space-y-4">
    

        <div className="mb-6">
                   
                <div className=" mb-2 flex items-center justify-between pt-4">

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
                  placeholder="Your Email ..."
                  className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />

              </div>
        <div className="mb-6">
                   
                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="newPassword"
                    className="text-sm font-medium text-black"
                  >
                    new Password
                  </label>

                  {formik.touched.newPassword && formik.errors.newPassword && (
                    <span className="text-sm text-red-500">
                      {formik.errors.newPassword}
                    </span>
                  )}

                </div>

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    id="newPassword"
                    autoComplete="current-password"
                    value={formik.values.newPassword}
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

                    {/* Verify */}

            <button
  type="submit"
  disabled={!formik.isValid || !formik.dirty}
  className="flex h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-[#55c95b] font-semibold text-white transition hover:bg-[#46b84d] disabled:cursor-not-allowed disabled:opacity-60"
>
  Verify
</button>

              </form>

  </>
   
}
