import { fas } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from './../../context/WishlistContext';



export default function RecentProducts({ title ="Popular Products"}) {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const { addToCart , cartcontextEror } = useContext(CartContext);
const{wishlist, addToWishlist , deleteProductWishlist}=useContext(WishlistContext);
//***************************** Get All Products *****************************

useEffect(() => {
  const controller = new AbortController()

  async function getProducts() {
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products", {
        signal: controller.signal,
      })
      
      setProducts(data.data)
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error(error)
        
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false)
      }
    }
  }

  getProducts()

  return () => controller.abort()
}, [])

  return <>
  
  {/* API Error */}
            {cartcontextEror && (
              <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
                {cartcontextEror.message}
              </div>
            )}

    <h2 className= "text-text font-semibold text-3xl">{title}</h2>
{loading ? <Loading/> : (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    {products.map((product) => (
      <div
        key={product._id}
        className="group rounded-lg bg-white p-2 shadow-md border border-gray-100"
      >

        <Link to={`/productdetails/${product._id}`} className="block">
        {/* Image */}
        <div className="relative">
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-full h-64 object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="px-1 pb-2">
          <h3 className="text-lg font-semibold text-green-600 truncate">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </h3>

          <p className=" text-lg text-gray-500 mt-1">
            {product.category?.name}
          </p>

          <div className="flex items-center justify-between mt-2">
            <span className="text-lg text-gray-700">
              {product.price} EGP
            </span>

            <span className="text-lg text-gray-700">
              {product.ratingsAverage}
              <FontAwesomeIcon
                icon={fas.faStar}
                className="ml-1 text-yellow-400"
              />
            </span>
          </div>

          {/* Heart */}
          {/* <div className="flex justify-end mt-2">
            <FontAwesomeIcon
              icon={fas.faHeart}
              className="cursor-pointer text-lg text-red-500 hover:text-red-600"
            />
          </div> */}
        
        </div>
        </Link>
          {/* Heart */}
<div className={`hover:text-red-500 text-lg ${
  wishlist?.data?.includes(product._id)
    ? "text-red-500"
    : "text-gray-300"
}`}>
  <FontAwesomeIcon
    onClick={() => {
      if (wishlist?.data?.includes(product)) {
        deleteProductWishlist(product);
      } else {
        addToWishlist(product);
      }
    }}
    icon={fas.faHeart}
    className="cursor-pointer text-lg"  />
</div>
         {/* add cart */}
          <button onClick={() => addToCart(product._id)} className="add-cart-btn">
            Add to Cart
          </button>
      </div>
    ))}
  </div>
)}
  </>
}
