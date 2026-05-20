import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import { toast } from "react-toastify";

function Checkout() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  // HANDLE CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // PLACE ORDER
  const placeOrder = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/orders",
        {
          shippingAddress: formData,
          paymentMethod: "Cash on Delivery",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order placed successfully");

      navigate("/orders");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Order failed"
      );

    }

  };

  return (
    <div className="px-8 py-16 flex justify-center">

      <div className="bg-[#161616] border border-gray-800 rounded-2xl p-10 w-full max-w-2xl">

        <h1 className="text-4xl font-bold mb-10 text-center">
          Checkout
        </h1>

        <form
          onSubmit={placeOrder}
          className="space-y-6"
        >

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#222] border border-gray-700 outline-none focus:border-cyan-400"
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#222] border border-gray-700 outline-none focus:border-cyan-400"
            required
          />

          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#222] border border-gray-700 outline-none focus:border-cyan-400"
            required
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#222] border border-gray-700 outline-none focus:border-cyan-400"
            required
          />

          <button className="w-full bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold py-4 rounded-xl">

            Place Order

          </button>

        </form>

      </div>

    </div>
  );
}

export default Checkout;