import axios from "axios";
import { useFormik } from "formik";
import {  useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";


export default function ForgotPassword() {
  const [apiError, setApiError] = useState(null);
  const [isVerified, setIsVerified] = useState(null);

const navigate = useNavigate();
  async function fogotpassword(values) {
    try{
    let{data}=await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",values)
  // console.log('test',data);

     
      setIsVerified(data);
      setTimeout(() => {
         navigate("/VerifyResetCode", {
  state: { ForgotPassword: true, message: data.message }
    });

      }, 2000);
 

  }
  catch(err){
// console.log(  'testerr' , err?.response?.data?.message );
setApiError(  err?.response?.data?.message )
  }
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email invalid"),

  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema,
    onSubmit:fogotpassword,

  });


  return <>
  
  <h2 className="text-text font-semibold">please enter your Email</h2>
                  <form onSubmit={formik.handleSubmit} className="space-y-4">
    

  {/* API Error */}
            {apiError && (
              <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
                {apiError}
              </div>
            )}
  {/* API isVerified */}
            {isVerified && (
              <div className="mt-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
                {isVerified.message}
              </div>
            )}
        <div className="mb-6">
                   
                <div className="mb-2 flex items-center justify-between pt-4">

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
                  onChange={(e) => {
                    formik.handleChange(e);
                    setApiError(null); // Clear API error on input change
                  }}
                  onBlur={formik.handleBlur}
                  placeholder="Your Email ..."
                  className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />

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
