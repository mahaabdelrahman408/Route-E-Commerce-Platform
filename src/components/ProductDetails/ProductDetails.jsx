import { fas } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "react-slick";
import Loading from "../Loading/Loading";




export default function ProductDetails() {
    const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
   autoplay:true,
   autoplaySpeed:2000,
  };
  const [product, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  
  let { id } = useParams();
  //***************************** Get specific Product *****************************

  useEffect(() => {
  const controller = new AbortController()

  async function getProducts() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`, {
        signal: controller.signal,
      })
      // console.log(data);
      
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
}, [id])
  return <>
    {loading ? <Loading/> : (
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Product Image */}
          <div className=" w-full max-w-md mx-auto">
          
                <Slider {...settings}>
     {product?.images?.map((image, index) => 
      
          <img   key={index} src={image}
              alt={product?.title}
              className="w-full max-w-md h-125 object-contain"
            />)}
    </Slider>
          </div>
          

          {/* Product Details */}
          <div className="space-y-5">

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              {product?.title}
            </h1>

            {/* Description */}
            <p className="text-sm md:text-base text-gray-700 leading-7">
              {product?.description}
            </p>

            {/* Category */}
            <p className="text-mincolor font-semibold text-lg">
              {product?.category?.name}
            </p>

            {/* Price + Rating */}
            <div className="flex items-center justify-between">

              <span className="text-gray-800 text-lg">
                {product?.price} EGP
              </span>

              <span className="text-gray-700">
                {product?.ratingsAverage}

                <FontAwesomeIcon
                  icon={fas.faStar}
                  className="ml-2 text-yellow-400"
                />
              </span>

            </div>

            {/* Heart */}
            <div className="flex justify-end">
              <FontAwesomeIcon
                icon={fas.faHeart}
                className="text-3xl text-red-500 cursor-pointer
                           hover:text-red-600 transition-colors"
              />
            </div>

            {/* Add To Cart */}
            <button
              onClick={() => addToCart(product.id)}
              className="cursor-pointer  block w-full rounded-lg
                         bg-mincolor text-white
                         py-3 px-4
                         font-semibold
                         transition-all duration-300
                         hover:bg-green-600
                         hover:scale-[1.02]"
            >
              Add to Cart
            </button>

          </div>
        </div>
      </div>
    )}  
  </>
   
}
