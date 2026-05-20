import { FaShoppingCart } from "react-icons/fa";

import { toast } from "react-toastify";

import API from "../services/api";

import { Link } from "react-router-dom";

import {
  FaHeart,
} from "react-icons/fa";

function ProductCard({ product }) {

  // ADD TO CART
  const addToCart = async () => {

    try {

      const token =
        localStorage.getItem("token");

      if (!token) {

        toast.error("Please login first");

        return;

      }

      await API.post(
        "/cart",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Added to cart");

      window.dispatchEvent(new Event("cartUpdated"));

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to add item"
      );

    }

  };

  const addToWishlist =
  async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      if (!token) {

        toast.error(
          "Please login first"
        );

        return;

      }

      await API.post(
        "/wishlist",
        {
          productId: product._id,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Added to wishlist"
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Wishlist failed"
      );

    }

  };

  return (

    <Link
      to={`/product/${product._id}`}
      className="bg-[#161616] border border-gray-800 rounded-2xl overflow-hidden hover:scale-105 transition duration-300 shadow-lg block"
    >

      {/* PRODUCT IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-56 object-cover"
      />

      {/* PRODUCT INFO */}
      <div className="p-5">

        <h2 className="text-2xl font-bold mb-2">
          {product.name}
        </h2>

        <p className="text-gray-400 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">

  <span className="text-cyan-400 text-xl font-bold">

    ₹{product.price}

  </span>

  <div className="flex items-center gap-3">

    {/* WISHLIST */}
    <button
      onClick={addToWishlist}
      className="bg-pink-500 hover:bg-pink-400 transition p-3 rounded-xl text-white"
    >

      <FaHeart />

    </button>

    {/* CART */}
    <button
      onClick={(e) => {

        e.preventDefault();

        addToCart();

      }}
      className="bg-cyan-500 hover:bg-cyan-400 transition p-3 rounded-xl text-black"
    >

      <FaShoppingCart />

    </button>

  </div>

</div>

          
        </div>

      </Link>

   

  );
}

export default ProductCard;