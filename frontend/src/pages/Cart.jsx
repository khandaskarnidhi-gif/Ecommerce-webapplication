import { useEffect, useState } from "react";

import { FaTrash } from "react-icons/fa";

import API from "../services/api";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

function Cart() {

  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // FETCH CART
  const fetchCart = async () => {

    try {

      const { data } = await API.get(
        "/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart(data.cartItems);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {
    fetchCart();
  }, []);

  // REMOVE ITEM
  const removeItem = async (id) => {

    try {

      await API.delete(
        `/cart/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Item removed");

      fetchCart();

    } catch (error) {

      toast.error("Failed to remove item");

    }

  };

  // UPDATE QUANTITY
  const updateQuantity = async (
    id,
    quantity
  ) => {

    try {

      await API.put(
        `/cart/${id}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCart();

    } catch (error) {

      console.log(error);

    }

  };

  // TOTAL
  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      item.product.price * item.quantity,
    0
  );

  return (
    <div className="px-8 py-16">

      <h1 className="text-4xl font-bold mb-10">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (

        <div className="bg-[#161616] p-8 rounded-2xl border border-gray-800">

          <p className="text-gray-400">
            Your cart is empty.
          </p>

        </div>

      ) : (

        <div className="grid lg:grid-cols-3 gap-8">

          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-6">

            {cart.map((item) => (

              <div
                key={item._id}
                className="bg-[#161616] border border-gray-800 rounded-2xl p-5 flex items-center gap-5"
              >

                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-32 h-32 object-cover rounded-xl"
                />

                <div className="flex-grow">

                  <h2 className="text-2xl font-bold mb-2">
                    {item.product.name}
                  </h2>

                  <p className="text-cyan-400 text-xl font-semibold mb-4">
                    ₹{item.product.price}
                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-4">

                    <button
                      onClick={() =>
                        updateQuantity(
                          item._id,
                          item.quantity - 1
                        )
                      }
                      className="bg-gray-700 px-4 py-2 rounded-lg"
                    >
                      -
                    </button>

                    <span className="text-lg">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item._id,
                          item.quantity + 1
                        )
                      }
                      className="bg-gray-700 px-4 py-2 rounded-lg"
                    >
                      +
                    </button>

                  </div>

                </div>

                {/* DELETE */}
                <button
                  onClick={() =>
                    removeItem(item._id)
                  }
                  className="text-red-500 hover:text-red-400"
                >
                  <FaTrash size={22} />
                </button>

              </div>

            ))}

          </div>

          {/* SUMMARY */}
          <div className="bg-[#161616] border border-gray-800 rounded-2xl p-8 h-fit">

            <h2 className="text-3xl font-bold mb-8">
              Order Summary
            </h2>

            <div className="flex justify-between mb-6 text-xl">

              <span>Total</span>

              <span className="text-cyan-400 font-bold">
                ₹{totalPrice}
              </span>

            </div>

            <button
  onClick={() => navigate("/checkout")}
  className="w-full bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold py-4 rounded-xl"
>
              Proceed To Checkout

            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Cart;