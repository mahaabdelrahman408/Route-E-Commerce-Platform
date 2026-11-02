import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {  useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UserContext } from "../../context/UserContext";
export default function UpdateLoggedUserPassword() {
    
const { setUserToken } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

     async function updatePassword(values) {
try{
  let{data}=await axios.put("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",values,{ headers: {
      'token': localStorage.getItem("userToken")
     
      
    }})
 console.log(data);
      //  setIsResetPassword(data);
             toast.success(data.message, {
  duration: 2000,
  position: "top-right",
});
  setTimeout(() => {
      localStorage.removeItem("userToken");
  setUserToken(null);
    navigate("/login")
    // setIsResetPassword(null); 
  }, 3000);
}
catch(err){
  console.log("change password : ", err?.response?.data?.message);
  // setApiError(err?.response?.data?.message)
        toast.error(err?.response?.data?.message, {
  duration: 2000,
  position: "top-right",
});
}

     }



// console.log("apiError:", contextApiError);
 let validationSchema = Yup.object().shape({
   currentPassword: Yup.string()
      .required("currentPassword is Required")
      .matches(/^[A-Z][a-zA-Z0-9@]{4,10}$/, "invalid password ex(Ahmed@123)"),
    password: Yup.string()
      .required("password is Required")
      .matches(/^[A-Z][a-zA-Z0-9@]{4,10}$/, "invalid password ex(Ahmed@123)"),
    rePassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),

  });

  const formik = useFormik({
    initialValues: {
  
     currentPassword: "",
      password: "",
      rePassword: "",
    },

    validationSchema,

    onSubmit: updatePassword,
  });


  
  return <>
   <h2 className="text-text font-semibold">Update Password</h2>
  {/* {apiError && (
  <p className="mx-auto mb-3 max-w-md text-sm text-red-500">
    {apiError}
  </p>
)} */}

   {/* new Password */}
            {/* {isResetPassword && (
              <div className="text-center mt-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
                {isResetPassword.message}
              </div>
            )} */}
                  <form onSubmit={formik.handleSubmit} className="mx-auto max-w-md space-y-4">

  {/* currentPassword */}
                        <div className="mb-3">
            
                          <div className="mb-1 flex items-center justify-between">
                            <label
                              htmlFor="currentPassword"
                              className="text-sm font-medium text-black"
                            >
                              Current Password
                            </label>
            
                            {formik.touched.currentPassword && formik.errors.currentPassword && (
                              <span className="text-sm text-red-500">
                                {formik.errors.currentPassword}
                              </span>
                            )}
                          </div>
            
                          <div className="relative">
            
                            <input
                              type={showPassword ? "text" : "password"}
                              name="currentPassword"
                              id="currentPassword"
                              autoComplete="new-password"
                              value={formik.values.currentPassword}
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
            

            
                        {/* Password */}
                        <div className="mb-3">
            
                          <div className="mb-1 flex items-center justify-between">
                            <label
                              htmlFor="password"
                              className="text-sm font-medium text-black"
                            >
                              New Password
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
                              Confirm Password
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
                        Change Password

                    </button>
                  )}
 </form>
  </>
   
}
