import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import { toast } from "react-toastify";

import ProductCard
  from "../components/ProductCard";

function Wishlist() {

  const [wishlist, setWishlist] =
    useState([]);

  const token =
    localStorage.getItem("token");

  // FETCH WISHLIST
  const fetchWishlist =
    async () => {

      try {

        const { data } =
          await API.get(
            "/wishlist",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setWishlist(data);

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // REMOVE
  const removeWishlist =
    async (id) => {

      try {

        await API.delete(
          `/wishlist/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        toast.success(
          "Removed from wishlist"
        );

        fetchWishlist();

      } catch (error) {

        toast.error(
          "Remove failed"
        );

      }

    };

  return (
    <div className="px-8 py-16">

      <h1 className="text-5xl font-bold mb-12">

        Your Wishlist ❤️

      </h1>

      {wishlist.length === 0 ? (

        <div className="text-center py-20">

          <h2 className="text-3xl font-bold mb-4">

            Wishlist Empty

          </h2>

        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {wishlist.map((item) => (

            <div
              key={item._id}
              className="relative"
            >

              <button
                onClick={() =>
                  removeWishlist(
                    item._id
                  )
                }
                className="absolute top-4 right-4 z-20 bg-red-500 hover:bg-red-400 px-4 py-2 rounded-xl"
              >

                Remove

              </button>

              <ProductCard
                product={item.product}
              />

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Wishlist;