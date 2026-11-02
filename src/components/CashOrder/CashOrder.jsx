
import { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { OrderContext } from "../../context/OrderContext";
import { UserContext } from "../../context/UserContext";

//******************* Create Cash Order From Cart (v2)*******************

export default function CashOrder() {
  const {  userOrders , getUserOrders} = useContext(OrderContext);
  const { userId } = useContext(UserContext);

  // console.log("order:", order);

  useEffect(() => {
    if (userId) {
      getUserOrders();
    }
  }, [userId, getUserOrders]);

  
  return (
    <>
      <h2 className="text-3xl text-text font-semibold">My Orders</h2>
      {userOrders?.map((orderItem)=>( 
        <div
      key={orderItem.id}
      className="flex justify-between   relative overflow-x-auto  bg-neutral-primary-soft shadow-xs rounded-base border border-default">
        <table className="w-1/2 text-sm text-left rtl:text-right ">
          <tbody>
            {orderItem?.cartItems?.map((item, index) => (
              <tr
                key={index}
                className="bg-neutral-primary-soft  border-default hover:bg-neutral-secondary-medium"
              >
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-heading whitespace-nowrap"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={item.product.imageCover}
                    alt="Jese image"
                  />

                  <div className="ps-3">
                    <div className="text-base font-semibold">
                                  {item.product.title.split(" ").slice(0, 2).join(" ")}
                    </div>
                    <div className="font-medium text-mincolor">
                      {item.price} EGP
                    </div>
                    <div className=" flex gap-2 font-medium text-gray-500"> 
                      Qty :<div className="font-medium text-mincolor">{item.count}</div>
                   </div>
                 

                    
                  </div>
                </th>
              </tr>
              
              
            ))}
            
            
          </tbody>

    
        </table>
                
      <div className="w-1/2 text-center p-6  ">

          
          <h2 className=" text-3xl underline">order details</h2> 
       {orderItem &&     (
  <div className="font-medium text-text " >

    <div className="  mb-3 flex  gap-2 justify-center ">
<div >Order ID: </div>
        
        <div className="text-mincolor ">{orderItem?.id}</div>
    </div>
                <div className="  mb-3 flex  gap-2 justify-center ">

    <div >Payment Method</div>

    <div className="text-mincolor ">{orderItem?.paymentMethodType}</div>
        </div>
        <div className="  mb-3 flex  gap-2 justify-center ">

    <div >Address:</div>

    <div className="text-mincolor ">{orderItem?.shippingAddress?.details}</div>
        </div>
        <div className="  mb-3 flex  gap-2 justify-center ">

    <div >Phone Number:</div>

    <div className="text-mincolor ">{orderItem?.shippingAddress?.phone}</div>
        </div>
  {/* <div className="  mb-3 flex  gap-2 justify-center ">

    <div >Cart Price:</div>

    <div className="text-mincolor ">{cart?.data?.totalCartPrice}</div>
        </div>
  <div className="  mb-3 flex  gap-2 justify-center ">

    <div >Shipping Price:</div>

    <div className="text-mincolor ">{orderItem?.shippingPrice}</div>
        </div>
  <div className="  mb-3 flex  gap-2 justify-center ">

    <div >Tax Price:</div>

    <div className="text-mincolor ">{orderItem?.taxPrice}</div>
        </div> */}

        <div className="  mb-3 flex  gap-2 justify-center ">

    <div >Total Order Price:</div>

    <div className="text-mincolor ">{orderItem?.totalOrderPrice}</div>
        </div>

 

         
  
        
         </div>
  )}
       
           
  
        
         </div>
      </div>))}









      {/* ******************************************************** */}
      {/* <div className="flex justify-between   relative overflow-x-auto  bg-neutral-primary-soft shadow-xs rounded-base border border-default">
        <table className="w-1/2 text-sm text-left rtl:text-right ">
          <tbody>
            {order?.data?.cartItems?.map((item, index) => (
              <tr
                key={index}
                className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium"
              >
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-heading whitespace-nowrap"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={item.product.imageCover}
                    alt="Jese image"
                  />

                  <div className="ps-3">
                    <div className="text-base font-semibold">
                                  {item.product.title.split(" ").slice(0, 2).join(" ")}
                    </div>
                    <div className="font-medium text-mincolor">
                      {item.price} EGP
                    </div>
                    <div className=" flex gap-2 font-medium text-gray-500"> 
                      Qty :<div className="font-medium text-mincolor">{item.count}</div>
                   </div>
                

                    
                  </div>
                </th>
              </tr>
              
              
            ))}
            
            
          </tbody>

    
        </table>
                
      <div className="w-1/2 text-center p-6  ">

          
          <h2 className=" text-3xl underline">order details</h2> 
       {order &&     (
  <div className="font-medium text-text " >

    <div className="  mb-3 flex  gap-2 justify-center ">
<div >Order ID: </div>
        
        <div className="text-mincolor ">{order?.data?.id}</div>
    </div>
                <div className="  mb-3 flex  gap-2 justify-center ">

    <div >Payment Method</div>

    <div className="text-mincolor ">{order?.data?.paymentMethodType}</div>
        </div>
        <div className="  mb-3 flex  gap-2 justify-center ">

    <div >Address:</div>

    <div className="text-mincolor ">{order?.data?.shippingAddress?.details}</div>
        </div>
        <div className="  mb-3 flex  gap-2 justify-center ">

    <div >Phone Number:</div>

    <div className="text-mincolor ">{order?.data?.shippingAddress?.phone}</div>
        </div>
  <div className="  mb-3 flex  gap-2 justify-center ">

    <div >Cart Price:</div>

    <div className="text-mincolor ">{order?.pricing?.cartPrice}</div>
        </div>
  <div className="  mb-3 flex  gap-2 justify-center ">

    <div >Shipping Price:</div>

    <div className="text-mincolor ">{order?.pricing?.shippingPrice}</div>
        </div>
  <div className="  mb-3 flex  gap-2 justify-center ">

    <div >Tax Price:</div>

    <div className="text-mincolor ">{order?.pricing?.taxPrice}</div>
        </div>

        <div className="  mb-3 flex  gap-2 justify-center ">

    <div >Total Order Price:</div>

    <div className="text-mincolor ">{order?.pricing?.totalOrderPrice}</div>
        </div>

 

         
  
        
         </div>
  )}
       
           
  
        
         </div>
      </div> */}
    </>
  );
}