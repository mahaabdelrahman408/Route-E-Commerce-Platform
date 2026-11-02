import { useContext } from "react";
import Loading from "../Loading/Loading";
import { CartContext } from "../../context/CartContext";
import { NavLink } from "react-router-dom";


export default function Cart() {
  const { cart ,updatProductCountCart, deleteProductCart, clearUserCart ,count ,applyCouponToCart ,couponName ,setCouponName } = useContext(CartContext);
  return <>
  <div className="flex justify-between items-center mb-4 pt-3 pb-2">
   <h2 className= "text-3xl text-text font-semibold ">Shopping Cart</h2>
<button className="cursor-pointer rounded-xl bg-red-500 text-white py-2 px-4 hover:bg-red-600" onClick={clearUserCart }  >
    Clear All
  </button>
  </div>


{cart === null ? (
  <Loading />
) : cart?.data?.products?.length > 0 ?

// *********************
<div>
   <div className="flex justify-between items-center mb-4 pt-3 pb-2">

  <div className="flex items-center gap-2 font-bold">
    <h2 className="text-text ">
      Total Price:
    </h2>

    <h2 className="text-mincolor">
      {cart?.data?.totalCartPrice} EGP
    </h2>
  </div>
  <div className="flex items-center gap-2 font-bold">

  <h2 className="text-text ">
    Total Number: 
  </h2>
  <h2 className="text-mincolor">{count}</h2>
  </div>

</div>
  <div className="  relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
  <table className="w-full text-sm text-left rtl:text-right text-body">
    <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Product
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Qty
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Price
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {cart?.data?.products?.map((item,index) => 
      <tr key={index} className=" bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
        <td className="p-4">
          <img src={item.product.imageCover} className="w-16 md:w-24 max-w-full max-h-full" alt={item.product.title} />
        </td>
        <td className="px-6 py-4 font-semibold text-heading">
          {item.product.title}
        </td>
        <td className="px-6 py-4">
          <form className="max-w-xs mx-auto">
            <label htmlFor="counter-input-1" className="sr-only">Choose quantity:</label>
            <div className="relative flex items-center">
              <button onClick={() => updatProductCountCart(item.product._id, item.count - 1)} type="button"  className="cursor-pointer flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" /></svg>
              </button>
              <span className="shrink-0 text-heading text-sm font-normal text-center w-10" >{item.count}</span>
              <button onClick={() => updatProductCountCart(item.product._id, item.count + 1)} type="button"  className="cursor-pointer flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7 7V5" /></svg>
             </button>
            </div>
          </form>
        </td>
        <td className="px-6 py-4 font-semibold text-heading">
          {item.price * item.count} EGP
        </td>
        <td className="px-6 py-4">
          <button onClick={() => deleteProductCart(item.product._id)} className="cursor-pointer font-medium text-fg-danger hover:underline">Remove</button>
        </td>
      </tr> )}
 
    </tbody>
  </table>
</div>
<div className="flex items-center gap-2 mt-4 justify-center ">
<input
  type="text"
  value={couponName}
  onChange={(e) => setCouponName(e.target.value)}
  placeholder="Coupon Code"
  className="w-64 border rounded-lg px-3 py-2 "
/>

<button
  onClick={() => applyCouponToCart(couponName)}
  className="bg-mincolor text-white px-4 py-2 rounded-lg"
>
  Apply
</button>

</div>
  <NavLink to={'/checkout'}

  className="mx-auto mt-4 block h-9 max-w-4xl rounded-lg bg-mincolor py-2 text-center text-sm font-semibold text-white transition hover:bg-[#46b84d]"
>
Checkout
</NavLink>
</div>


:   (
  <div>
      <h2 className="font-semibold text-center text-3xl">your Cart Is Empty</h2>
  <NavLink to={'/'}

  className="mx-auto mt-4 block h-9 max-w-4xl rounded-lg bg-mincolor py-2 text-center text-sm font-semibold text-white transition hover:bg-[#46b84d]"
>
Go To Shopping
</NavLink>
  </div>
  


) }

  </>
   
}
