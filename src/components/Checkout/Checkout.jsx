
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext} from "react";
import { toast } from "sonner";
import { CartContext } from "../../context/CartContext";
import { NavLink, useNavigate } from 'react-router-dom';
import { OrderContext } from "../../context/OrderContext";
//***************************** Checkout session *****************************
export default function Checkout() {
  const{cart}=useContext(CartContext);  
  const { createCashOrder } = useContext(OrderContext);
  const navigate = useNavigate();
  async function checkout(shippingAddress){
      if (shippingAddress.payment === "cash") {
     await createCashOrder(shippingAddress);
    navigate("/cashorder");
    return;
  }
try{
  let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`,
    {shippingAddress},
    {headers:{
    token:localStorage.getItem("userToken")
    }}
  
  )
console.log(data);
      toast.success(data.status,{
  duration: 2000, // Duration in milliseconds
  position: "top-right", // Position of the toast notification
});
location.href=data.session.url
}
catch(err){
console.log(err);

}
  }
    let validationSchema = Yup.object().shape({
    
      phone: Yup.string()
        .required("phone is Required")
        .matches(/^01[0125][0-9]{8}$/, "we need valid egyptian phone number "),
      city: Yup.string()
        .required("city is Required")
        .matches( /^[a-zA-Z\u0600-\u06FF\s]+$/,
    "Enter a valid city name"),
      details: Yup.string()
        .required("details is Required")
        .matches(/^[a-zA-Z\u0600-\u06FF0-9\s.,/-]+$/,
    "Please enter a valid address"),
    });
    const formik = useFormik({
      initialValues: {
   
        phone: "",
        city: "",
        details: "",
        postalCode: "",
        payment: "",
      },
      validationSchema,
      onSubmit:checkout ,
    });
  return <>
  <h2 className="text-3xl text-text font-semibold ">Checkout</h2>
     <form
            onSubmit={formik.handleSubmit}
            className="mt-5 max-w-md mx-auto "
          >
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
                placeholder="Phone Number..."
                className="h-9 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />

            </div>

        {/* city */}
            <div className="mb-3">

              <div className="mb-1 flex items-center justify-between">
                <label
                  htmlFor="city"
                  className="text-sm font-medium text-black"
                >
                  City
                </label>

                {formik.touched.city && formik.errors.city && (
                  <span className="text-sm text-red-500">
                    {formik.errors.city}
                  </span>
                )}
              </div>

              <input
                type="tel"
                name="city"
                id="city"
                autoComplete="tel"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Write your city..."
                className="h-9 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />

            </div>
        {/* Details */}
            <div className="mb-3">

              <div className="mb-1 flex items-center justify-between">
                <label
                  htmlFor="details"
                  className="text-sm font-medium text-black"
                >
                  Details
                </label>

                {formik.touched.details && formik.errors.details && (
                  <span className="text-sm text-red-500">
                    {formik.errors.details}
                  </span>
                )}
              </div>

              <input
                type="tel"
                name="details"
                id="details"
                autoComplete="tel"
                value={formik.values.details}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Write Your Address Here..."
                className="h-9 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />

            </div>
{/* Cash Payment */}
            <div className="mb-3 flex items-center gap-2">
              <input type="radio" id="cash" name="payment" value="cash"
              checked={formik.values.payment === 'cash'} onChange={formik.handleChange}
              className="border-gray-500" />
              <label htmlFor="cash" >Cash Payment</label>
            </div>
            {/* Online Payment */}
             <div className="mb-3 flex items-center gap-2">
              <input type="radio" id="online" name="payment" value="online"
              checked={formik.values.payment === 'online'} onChange={formik.handleChange}
              className="border-gray-500" />
              <label htmlFor="online" >Online Payment</label>
            </div>
            
           {formik.values.payment === 'cash' ? (<button
          
                type="submit"
                className="cursor-pointer mt-5 h-9 w-full rounded-lg bg-mincolor font-semibold text-white transition hover:bg-[#46b84d]"
              >
                Continue with Cash Payment
              </button>): (
              <button
                type="submit"
                className="cursor-pointer mt-5 h-9 w-full rounded-lg bg-mincolor font-semibold text-white transition hover:bg-[#46b84d]"
              >
                Continue with Online Payment
              </button>
            )}


     
          </form>
  </> 
   
}
