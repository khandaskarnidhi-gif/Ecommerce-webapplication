import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import ProtectedRoute from "./routes/ProtectedRoute";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";
import ProductDetails from "./pages/ProductDetails";
import AdminOrders from "./pages/AdminOrders";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <BrowserRouter>

      <div className="bg-[#0f0f0f] text-white min-h-screen flex flex-col">

        <Navbar />

        <main className="flex-grow">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
  path="/cart"
  element={
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
  }
  
/>
<Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  }
/>

<Route
  path="/orders"
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>
<Route
  path="/product/:id"
  element={<ProductDetails />}
/>
<Route
  path="/admin/orders"
  element={
    <AdminRoute>
      <AdminOrders />
    </AdminRoute>
  }
/>
<Route
  path="/wishlist"
  element={<Wishlist />}
/>
          </Routes>

        </main>

        <Footer />

      </div>

    </BrowserRouter>
  );
}

export default App;