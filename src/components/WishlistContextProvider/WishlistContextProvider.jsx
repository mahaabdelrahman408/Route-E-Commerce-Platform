import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { WishlistContext } from "../../context/WishlistContext";


export default function WishlistContextProvider({children}) {
const [wishlist, setWishlist] = useState(null)
const [wishlistCount, setWishlistCount] = useState(0)
const [getwishlist, setGetWishlist] = useState([])

  // *************************** Add product to wishlist ***************************
  async function addToWishlist(product) {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId : product._id },
        {
          headers: {
            token,
           
          },
        },
      );
      // console.log("Wishlist data:", data);
      
      setWishlist(data);
setWishlistCount(data.data.length);
setGetWishlist((prev) => ({
  ...prev,
  data: [...(prev.data || []).filter((item) => item._id !== product._id), product],
}));
      toast.success(data.status,{
  duration: 1000, // Duration in milliseconds
  position: "top-right", // Position of the toast notification
});
setTimeout(() => {
  toast.success(data.message, {
    duration: 2000,
    position: "top-right",
  });
}, 2000);


      return data;
    } catch (error) {
      console.error(error?.response?.data?.message );
      
      throw error;
    }
  }
    // *************************** Remove product from wishlist***************************
  async function deleteProductWishlist(productId) {
    try {
      const headers ={
token : localStorage.getItem("userToken")
      }   
         const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
     
        {
          headers
        },
      );
      
      setWishlist(data);
      setWishlistCount(data.data.length);
    setGetWishlist((prev) => ({
  ...prev,
  data: prev.data.filter((item) => item._id !== productId),
}));

      toast.success(data.status,{
  duration: 2000, // Duration in milliseconds
  position: "top-right", // Position of the toast notification
});
setTimeout(() => {
  toast.success(data.message, {
    duration: 2000,
    position: "top-right",
  });
}, 2000);


      // setCartContext(data);
      return data;
    } catch (error) {
      console.error(error?.response?.data?.message );
      
      throw error;
    }
  }
      // *************************** Get logged user wishlist ***************************
  useEffect(() => {
    const controller = new AbortController();
  
  async function getProductsWishlist() {

    try {
      const headers ={
token : localStorage.getItem("userToken")
      }
      
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        {headers
        ,signal: controller.signal}
        
      );
         console.log("display wishlist :", data);
 
      setGetWishlist(data);
       setWishlistCount(data.count);
    } catch (error) {
      if (!axios.isCancel(error)) {
      console.error(error?.response?.data?.message );
      
    }
  }
}
 
  getProductsWishlist();
    return () => controller.abort();
  }, [])
  return <>
 <WishlistContext.Provider value={{wishlist,setWishlist ,wishlistCount, setWishlistCount ,addToWishlist,deleteProductWishlist , setGetWishlist,getwishlist }}>
      {children}
    </WishlistContext.Provider>  </>
   
}
