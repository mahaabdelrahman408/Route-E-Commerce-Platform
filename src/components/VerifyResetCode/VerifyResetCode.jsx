import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { useLocation } from 'react-router-dom';


export default function VerifyResetCode() {
const [apiError, setApiError] = useState(null);
const [isVerified, setIsVerified] = useState(null);
const navigate = useNavigate();
const location = useLocation();
useEffect(() => {
  if (!location.state?.ForgotPassword) {
    navigate("/ForgotPassword", { replace: true });
  }
}, [location.state, navigate]);

async function verifyResetCode(values) {
  try {
    let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values);
 console.log('testcode',data);

      setIsVerified(data);
      setTimeout(() => {
         navigate("/ResetPassword", {
  state: { message: data.status }
    });

      }, 2000);
  }
  catch (err) {
    console.log('testerr', err?.response?.data?.message);
    setApiError(err?.response?.data?.message);
  }
}
const validationSchema = Yup.object().shape({
    resetCode: Yup.string()
      .required("Reset code is required")
      .length(6, "Reset code must be 6 characters"),
  });
  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: verifyResetCode,
  });
  return <>
  <h2 className="text-text font-semibold">Enter Your Reset Code</h2>
                  <form onSubmit={formik.handleSubmit} className="space-y-4">
    

  {/* API Error */}
            {apiError && (
              <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
                {apiError}
              </div>
            )}
  {/* API isVerified */}
            {isVerified && (
              <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-green-800">
                {isVerified.status}
              </div>
            )}
        <div className="mb-6">
                   
                <div className="mb-2 flex items-center justify-between pt-4">

                  <label
                    htmlFor="resetCode"
                    className="text-sm font-medium text-black"
                  >
                Reset Code
                  </label>

                  {formik.touched.resetCode && formik.errors.resetCode && (
                    <span className="text-sm text-red-500">
                      {formik.errors.resetCode}
                    </span>
                  )}

                </div>

                <input
                  type="text"
                  name="resetCode"
                  id="resetCode"
                  autoComplete="resetCode"
                  value={formik.values.resetCode}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setApiError(null); // Clear API error on input change
                  }}
                  onBlur={formik.handleBlur}
                  placeholder="Your Reset Code ..."
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
