import { useEffect, useState } from "react";

import API from "../services/api";

import { toast } from "react-toastify";

function AdminDashboard() {

  const token = localStorage.getItem("token");

  // STATES
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const [uploading, setUploading] =
  useState(false);

  const [editingProductId, setEditingProductId] =
  useState(null);

  // FETCH PRODUCTS
  const fetchProducts = async () => {

    try {

      const { data } =
        await API.get("/products");

      setProducts(data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // CREATE PRODUCT
  const createProduct = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Product created");

      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
      });

      fetchProducts();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to create product"
      );

    }

  };

  const updateProduct = async (e) => {

  e.preventDefault();

  try {

    await API.put(
      `/products/${editingProductId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Product updated");

    setEditingProductId(null);

    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      stock: "",
    });

    fetchProducts();

  } catch (error) {

    toast.error("Update failed");

  }

};

<button
  onClick={() => {

    setEditingProductId(product._id);

    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      stock: product.stock,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }}
  className="bg-yellow-500 hover:bg-yellow-400 transition px-6 py-3 rounded-xl font-bold text-black"
>

  Edit

</button>

  // DELETE PRODUCT
  const deleteProduct = async (id) => {

    try {

      await API.delete(
        `/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Product deleted");

      fetchProducts();

    } catch (error) {

      toast.error("Delete failed");

    }

  };

  const uploadImage = async (e) => {

  const file = e.target.files[0];

  if (!file) return;

  const imageData = new FormData();

  imageData.append("image", file);

  try {

    setUploading(true);

    const { data } =
      await API.post(
        "/upload",
        imageData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    setFormData({
      ...formData,
      image: data.imageUrl,
    });

    toast.success("Image uploaded");

    setUploading(false);

  } catch (error) {

    toast.error("Upload failed");

    setUploading(false);

  }

};

  return (
    <div className="px-8 py-16">

      <h1 className="text-5xl font-bold mb-12">
        Admin Dashboard
      </h1>

      {/* CREATE PRODUCT */}
      <div className="bg-[#161616] border border-gray-800 rounded-2xl p-8 mb-12">

        <h2 className="text-3xl font-bold mb-8">
          Create Product
        </h2>

        <form
  onSubmit={
    editingProductId
      ? updateProduct
      : createProduct
  }
          className="grid md:grid-cols-2 gap-6"
        >

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="p-4 rounded-xl bg-[#222] border border-gray-700 outline-none focus:border-cyan-400"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="p-4 rounded-xl bg-[#222] border border-gray-700 outline-none focus:border-cyan-400"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="p-4 rounded-xl bg-[#222] border border-gray-700 outline-none focus:border-cyan-400"
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="p-4 rounded-xl bg-[#222] border border-gray-700 outline-none focus:border-cyan-400"
            required
          />

          <div className="md:col-span-2">

  <label className="block mb-2 text-gray-300">

    Product Image

  </label>

  <input
    type="file"
    onChange={uploadImage}
    className="w-full p-4 rounded-xl bg-[#222] border border-gray-700"
    required={!editingProductId}
  />

  {uploading && (

    <p className="text-cyan-400 mt-2">
      Uploading...
    </p>

  )}

  {formData.image && (

    <img
      src={formData.image}
      alt="Preview"
      className="w-40 h-40 object-cover rounded-xl mt-4 border border-gray-700"
    />

  )}

</div>

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="md:col-span-2 p-4 rounded-xl bg-[#222] border border-gray-700 outline-none focus:border-cyan-400 h-32"
            required
          />

          <button className="md:col-span-2 bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold py-4 rounded-xl">

            {editingProductId ? "Update Product" : "Create Product"}

          </button>

        </form>

      </div>

      {/* PRODUCT LIST */}
      <div className="space-y-6">

        {products.map((product) => (

          <div
            key={product._id}
            className="bg-[#161616] border border-gray-800 rounded-2xl p-6 flex items-center justify-between"
          >

            <div className="flex items-center gap-5">

              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 rounded-xl object-cover"
              />

              <div>

                <h2 className="text-2xl font-bold">
                  {product.name}
                </h2>

                <p className="text-gray-400">
                  ₹{product.price}
                </p>

              </div>

            </div>

            <button
              onClick={() =>
                deleteProduct(product._id)
              }
              className="bg-red-500 hover:bg-red-400 transition px-6 py-3 rounded-xl font-bold"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AdminDashboard;