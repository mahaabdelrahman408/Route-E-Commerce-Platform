import { useContext } from "react"
import { WishlistContext } from "../../context/WishlistContext"
import { CartContext } from "../../context/CartContext";

export default function Wishlist() {
const {getwishlist , deleteProductWishlist}=useContext(WishlistContext);
 const{addToCart}= useContext(CartContext)
  return <>
 <h2 className= "text-3xl text-text font-semibold ">Shopping Cart</h2>  
 
       {getwishlist?.data?.map((item) => (
        <div
          key={item._id}
          className="flex justify-between bg-neutral-primary-soft shadow-xs rounded-base border border-default"
        >
        <div className="flex items-center w-full px-6 py-4">
  <img
    className="w-20 h-20 object-contain"
    src={item.imageCover}
    alt={item.title}
  />

  <div className="ps-3">
    <div className="text-base font-semibold">
      {item.title.split(" ").slice(0, 2).join(" ")}
    </div>

    <div className="font-medium text-mincolor">
      {item.price} EGP
    </div>
  </div>

  <div className="ml-auto flex items-center gap-8">
    <button
      onClick={() => deleteProductWishlist(item._id)}
      className="cursor-pointer font-medium text-fg-danger hover:underline"
    >
      Remove
    </button>

    <button
      onClick={() => addToCart(item._id)}
      className="bg-mincolor text-white px-4 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
    >
      Add to Cart
    </button>
  </div>
</div>
        </div>
      ))}

 
 

 
 
 
 
 
 
 
 </>
   
}
