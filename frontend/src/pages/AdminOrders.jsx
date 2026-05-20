import { useEffect, useState } from "react";

import API from "../services/api";

import { toast } from "react-toastify";

function AdminOrders() {

  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("token");

  // FETCH ORDERS
  const fetchOrders = async () => {

    try {

      const { data } =
        await API.get(
          "/orders",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
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

  // UPDATE STATUS
  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await API.put(
        `/orders/${id}`,
        {
          orderStatus: status,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success("Status updated");

      fetchOrders();

    } catch (error) {

      toast.error("Update failed");

    }

  };

  return (
    <div className="px-8 py-16">

      <h1 className="text-5xl font-bold mb-12">

        Manage Orders

      </h1>

      <div className="space-y-8">

        {orders.map((order) => (

          <div
            key={order._id}
            className="bg-[#161616] border border-gray-800 rounded-2xl p-8"
          >

            <div className="flex justify-between items-center mb-6">

              <div>

                <h2 className="text-2xl font-bold">

                  {order.user?.name}

                </h2>

                <p className="text-gray-400">

                  {order.user?.email}

                </p>

              </div>

              <span className="text-cyan-400 font-bold text-lg">

                ₹{order.totalPrice}

              </span>

            </div>

            {/* ITEMS */}
            <div className="space-y-4 mb-8">

              {order.orderItems.map((item) => (

                <div
                  key={item._id}
                  className="flex justify-between border-b border-gray-700 pb-3"
                >

                  <span>
                    {item.product?.name}
                  </span>

                  <span>
                    Qty: {item.quantity}
                  </span>

                </div>

              ))}

            </div>

            {/* STATUS */}
            <div className="flex items-center gap-4">

              <select
                value={order.orderStatus}
                onChange={(e) =>
                  updateStatus(
                    order._id,
                    e.target.value
                  )
                }
                className="bg-[#222] border border-gray-700 rounded-xl p-3 outline-none"
              >

                <option>
                  Pending
                </option>

                <option>
                  Processing
                </option>

                <option>
                  Shipped
                </option>

                <option>
                  Delivered
                </option>

              </select>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AdminOrders;