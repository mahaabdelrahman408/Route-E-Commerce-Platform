import { OrderContext } from "../../context/OrderContext";
import axios from "axios";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";

export default function OrderContextProvider({ children }) {
  const { cart } = useContext(CartContext);
  const { userId } = useContext(UserContext);
const [userOrders, setuserOrders] = useState([]);
  const [order, setOrder] = useState(() => {
    const savedOrder = localStorage.getItem("cashOrder");
    return savedOrder ? JSON.parse(savedOrder) : null;
  }); 
  //******************* Create Cash Order From Cart (v2) *******************
  async function createCashOrder(shippingAddress) {
    try {
      const token = localStorage.getItem("userToken");

      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v2/orders/${cart.cartId}`,
        { shippingAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            token,
            "Content-Type": "application/json",
          },
        },
      );

      // console.log("BEFORE SET:", data.data);
      // setOrder(data.data);
      setOrder(data);
      localStorage.setItem("cashOrder", JSON.stringify(data));

      // console.log("AFTER SET:", data);
    } catch (err) {
      console.error(err);
    }
  }
  //******************* getUserOrders *******************
  async function getUserOrders() {
    try {
      // const token = localStorage.getItem("userToken");

      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);

      setuserOrders(data);
      // console.log("User Orders:", data);
      // console.log("userId:", userId);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <OrderContext.Provider value={{ order, setOrder, createCashOrder, getUserOrders , userOrders ,setuserOrders}}>
      {children}
    </OrderContext.Provider>
  );
}
