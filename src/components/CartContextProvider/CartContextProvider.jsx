import axios from "axios";
import { CartContext } from "../../context/CartContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);
const [couponName, setCouponName] = useState("");
const [count, setCount] = useState(0)
// *************************** Add Product To Cart (v2) ***************************
  async function addToCart(productId) {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v2/cart`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            token,
            "Content-Type": "application/json",
          },
        },
      );
      // console.log("cart data:", data);
      // console.log("cart count:", data.numOfCartItems);
      
      setCart(data);
      // getProductsCart();
      setCount(data.numOfCartItems);
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


      // setCartContext(data);
      return data;
    } catch (error) {
      console.error(error?.response?.data?.message );
      
      throw error;
    }
  }
  // ***************************Get Logged User Cart (v2)***************************
  useEffect(() => {
    const controller = new AbortController();
  
  async function getProductsCart() {

    try {
      const headers ={
token : localStorage.getItem("userToken")
      }
      
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v2/cart`,
        {headers
        ,signal: controller.signal}
        
      );
            // console.log("display cart :", data);
 
      setCart(data);
  setCount(data.numOfCartItems);

    } catch (error) {
      if (!axios.isCancel(error)) {
      console.error(error?.response?.data?.message );
      
    }
  }
}
 
  getProductsCart();
    return () => controller.abort();
  }, [])
  // ***************************Update Cart Product Quantity (v2)***************************
  async function updatProductCountCart(productId, count) {
    try {
      const headers ={
token : localStorage.getItem("userToken")
      }   
         const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
        { count },
        {
          headers
        },
      );
      // console.log("cart data:", data);
      // console.log("cart count:", data.numOfCartItems);
      
      setCart(data);
      setCount(data.numOfCartItems);
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

  // ***************************Remove Product From Cart (v2)***************************
  async function deleteProductCart(productId) {
    try {
      const headers ={
token : localStorage.getItem("userToken")
      }   
         const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
     
        {
          headers
        },
      );
      
      setCart(data);
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
    // ***************************Clear User Cart (v2)***************************
  async function clearUserCart() {
    try {
      const headers ={
token : localStorage.getItem("userToken")
      }   
         const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v2/cart`,
     
        {
          headers
        },
      );
      
      setCart(data);
          setCount(data.numOfCartItems);

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
    // ***************************Apply Coupon To Cart (v2)***************************
  async function applyCouponToCart(couponName) {
    try {
            const token = localStorage.getItem("userToken");

  
         const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v2/cart/applyCoupon`,
        {
          couponName
        },
        {
          headers:{
                  token,
            "Content-Type": "application/json",
          }
                  

        },
      );
      
      setCouponName(data);

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
  return (
    <CartContext.Provider value={{ addToCart, cart ,setCart ,count, setCount ,updatProductCountCart, deleteProductCart, clearUserCart ,applyCouponToCart ,couponName, setCouponName }}>
      {children}
    </CartContext.Provider>
  );
}

   

