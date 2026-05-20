import { useEffect, useState } from "react";

import API from "../services/api";

function Orders() {

  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("token");

  // FETCH ORDERS
  const fetchOrders = async () => {

    try {

      const { data } = await API.get(
        "/orders/myorders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="px-8 py-16">

      <h1 className="text-4xl font-bold mb-10">
        My Orders
      </h1>

      <div className="space-y-8">

        {orders.map((order) => (

          <div
            key={order._id}
            className="bg-[#161616] border border-gray-800 rounded-2xl p-8"
          >

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold">
                Order ID:
              </h2>

              <span className="text-cyan-400 font-semibold">
                {order.orderStatus}
              </span>

            </div>

            <div className="space-y-4">

              {order.orderItems.map((item) => (

                <div
                  key={item._id}
                  className="flex justify-between border-b border-gray-700 pb-4"
                >

                  <span>
                    {item.product.name}
                  </span>

                  <span>
                    Qty: {item.quantity}
                  </span>

                </div>

              ))}

            </div>

            <div className="mt-6 text-right text-2xl font-bold text-cyan-400">

              ₹{order.totalPrice}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Orders;