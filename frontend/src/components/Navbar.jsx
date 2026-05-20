import {
  Link,
  useLocation,
} from "react-router-dom";

import API from "../services/api";

import {
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";

import {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  AuthContext,
} from "../context/AuthContext";

import {
  FaHeart,
} from "react-icons/fa";

function Navbar() {

  const location = useLocation();

  const [cartCount, setCartCount] =
  useState(0);

  const {
    user,
    logout,
  } = useContext(AuthContext);

  useEffect(() => {

  const fetchCartCount = async () => {

    try {

      const token =
        localStorage.getItem("token");

      if (!token) return;

      const { data } =
        await API.get("/cart", {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        });

      const totalItems =
        data.reduce(
          (total, item) =>
            total + item.quantity,
          0
        );

      setCartCount(totalItems);

    } catch (error) {

      console.log(error);

    }

  };

  fetchCartCount();

   // 👇 IMPORTANT: listen for cart updates
  window.addEventListener("cartUpdated", fetchCartCount);

  return () => {
    window.removeEventListener("cartUpdated", fetchCartCount);
  };

}, []);


  

  return (
    <nav className="bg-[#111111] border-b border-gray-800 px-8 py-4 flex items-center justify-between sticky top-0 z-50">

      {/* LOGO */}
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide text-cyan-400"
      >
        ShopX
      </Link>

      {/* NAV LINKS */}
      <div className="flex items-center gap-6">

        <Link
          to="/"
          className="hover:text-cyan-400 transition"
        >
          Home
        </Link>

        {!user ? (
          <>

            <Link
              to="/login"
              className="hover:text-cyan-400 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="hover:text-cyan-400 transition"
            >
              Register
            </Link>

          </>
        ) : (

          <button
            onClick={logout}
            className="hover:text-red-400 transition"
          >
            Logout
          </button>

        )}
{user?.role === "admin" && (

  <Link
    to="/admin"
    className="hover:text-cyan-400 transition"
  >
    Admin
  </Link>

)}

<Link
  to="/wishlist"
  className="hover:text-pink-400 transition"
>

  <FaHeart size={20} />

</Link>

        <Link
          to="/cart"
          className="relative hover:text-cyan-400 transition"
        >
          <div className="relative">

  <FaShoppingCart size={22} />

  {cartCount > 0 && (

    <span className="absolute -top-3 -right-3 bg-cyan-500 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">

      {cartCount}

    </span>

  )}

</div>
        </Link>

        <Link
  to="/orders"
  className="hover:text-cyan-400 transition"
>
  <FaUser size={20} />
</Link>
<Link
  to="/admin/orders"
  className="hover:text-cyan-400 transition"
>
  Orders
</Link>

      </div>

    </nav>
  );
}

export default Navbar;