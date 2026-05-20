import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import API from "../services/api";

import {
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

import { toast } from "react-toastify";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [rating, setRating] =
    useState(0);

  const [comment, setComment] =
    useState("");

  // FETCH PRODUCT
  const fetchProduct =
    async () => {

      try {

        const { data } =
          await API.get(
            `/products/${id}`
          );

        setProduct(data);

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchProduct();

  }, [id]);

  // ADD TO CART
  const addToCart =
    async () => {

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
          "/cart",
          {
            productId:
              product._id,
            quantity: 1,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        toast.success(
          "Added to cart"
        );

        window.dispatchEvent(
          new Event(
            "cartUpdated"
          )
        );

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Failed to add item"
        );

      }

    };

  // SUBMIT REVIEW
  const submitReview =
    async (e) => {

      e.preventDefault();

      try {

        const token =
          localStorage.getItem("token");

        await API.post(
          `/products/${id}/reviews`,
          {
            rating,
            comment,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        toast.success(
          "Review added"
        );

        setRating(0);

        setComment("");

        fetchProduct();

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Review failed"
        );

      }

    };

  // LOADING
  if (loading) {

    return (
      <div className="text-center py-20 text-2xl">
        Loading...
      </div>
    );

  }

  // NO PRODUCT
  if (!product) {

    return (
      <div className="text-center py-20 text-2xl">
        Product not found
      </div>
    );

  }

  return (
    <div className="px-8 py-16 max-w-7xl mx-auto">

      {/* PRODUCT SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* IMAGE */}
        <div>

          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-3xl border border-gray-800 shadow-2xl"
          />

        </div>

        {/* DETAILS */}
        <div>

          <h1 className="text-5xl font-bold mb-4">

            {product.name}

          </h1>

          {/* RATING */}
          <div className="flex items-center gap-3 mb-6">

            <div className="flex items-center text-yellow-400">

              <FaStar />

              <span className="ml-1">

                {product.rating?.toFixed(1)}

              </span>

            </div>

            <span className="text-gray-400">

              ({product.numReviews} reviews)

            </span>

          </div>

          <p className="text-gray-400 text-lg leading-relaxed mb-8">

            {product.description}

          </p>

          <div className="mb-6">

            <span className="text-4xl font-bold text-cyan-400">

              ₹{product.price}

            </span>

          </div>

          <div className="mb-8">

            <span className="text-gray-400">

              Category:
            </span>

            <span className="ml-2 text-white font-semibold">

              {product.category}

            </span>

          </div>

          <div className="mb-10">

            <span className="text-gray-400">

              Stock:
            </span>

            <span className="ml-2 text-green-400 font-semibold">

              {product.stock}
            </span>

          </div>

          {/* ADD TO CART */}
          <button
            onClick={addToCart}
            className="bg-cyan-500 hover:bg-cyan-400 transition px-10 py-5 rounded-2xl text-black font-bold text-lg flex items-center gap-3"
          >

            <FaShoppingCart />

            Add To Cart

          </button>

        </div>

      </div>

      {/* REVIEWS */}
      <div className="mt-24">

        <h2 className="text-4xl font-bold mb-12">

          Customer Reviews

        </h2>

        {/* REVIEW FORM */}
        <form
          onSubmit={submitReview}
          className="bg-[#161616] border border-gray-800 rounded-3xl p-8 mb-16"
        >

          <h3 className="text-2xl font-bold mb-6">

            Write Review

          </h3>

          {/* RATING */}
          <select
            value={rating}
            onChange={(e) =>
              setRating(
                e.target.value
              )
            }
            className="w-full bg-[#222] border border-gray-700 rounded-2xl p-4 mb-6 outline-none"
            required
          >

            <option value="">
              Select Rating
            </option>

            <option value="1">
              1 Star
            </option>

            <option value="2">
              2 Stars
            </option>

            <option value="3">
              3 Stars
            </option>

            <option value="4">
              4 Stars
            </option>

            <option value="5">
              5 Stars
            </option>

          </select>

          {/* COMMENT */}
          <textarea
            value={comment}
            onChange={(e) =>
              setComment(
                e.target.value
              )
            }
            placeholder="Write your review..."
            className="w-full bg-[#222] border border-gray-700 rounded-2xl p-4 h-36 outline-none mb-6"
            required
          />

          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-400 transition px-8 py-4 rounded-2xl text-black font-bold"
          >

            Submit Review

          </button>

        </form>

        {/* REVIEW LIST */}
        <div className="space-y-8">

          {product.reviews?.length ===
          0 ? (

            <p className="text-gray-400 text-lg">

              No reviews yet

            </p>

          ) : (

            product.reviews.map(
              (review) => (

                <div
                  key={review._id}
                  className="bg-[#161616] border border-gray-800 rounded-3xl p-8"
                >

                  <div className="flex items-center justify-between mb-4">

                    <h3 className="text-2xl font-bold">

                      {review.name}

                    </h3>

                    <div className="flex items-center text-yellow-400">

                      <FaStar />

                      <span className="ml-1">

                        {review.rating}

                      </span>

                    </div>

                  </div>

                  <p className="text-gray-300 text-lg leading-relaxed">

                    {review.comment}

                  </p>

                </div>

              )
            )

          )}

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;