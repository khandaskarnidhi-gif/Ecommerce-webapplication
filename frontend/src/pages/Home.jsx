import { useEffect, useState } from "react";

import API from "../services/api";

import ProductCard from "../components/ProductCard";

function Home() {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  // FETCH PRODUCTS
  const fetchProducts = async () => {

    try {

      setLoading(true);

      const { data } =
        await API.get("/products");

      setProducts(data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // UNIQUE CATEGORIES
  const categories = [
    "All",
    ...new Set(
      products.map(
        (product) => product.category
      )
    ),
  ];

  // FILTER PRODUCTS
  const filteredProducts =
    products.filter((product) => {

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        selectedCategory === "All"
          ? true
          : product.category ===
            selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );

    });

  // LOADING UI
  if (loading) {

    return (

      <div className="flex items-center justify-center h-[70vh]">

        <div className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>

      </div>

    );

  }

  return (
    <div className="px-8 py-12">

      {/* HERO SECTION */}
      <div className="text-center max-w-4xl mx-auto mb-16">

        <h1 className="text-6xl font-extrabold leading-tight mb-6">

          Premium Shopping
          <span className="text-cyan-400">
            {" "}Experience
          </span>

        </h1>

        <p className="text-gray-400 text-lg mb-10">

          Discover premium products with
          futuristic shopping experience.

        </p>

        {/* SEARCH BAR */}
        <div className="max-w-2xl mx-auto">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full p-5 rounded-2xl bg-[#161616] border border-gray-800 outline-none focus:border-cyan-400 text-lg"
          />

        </div>

      </div>

      {/* CATEGORY FILTERS */}
      <div className="flex flex-wrap gap-4 justify-center mb-14">

        {categories.map((category) => (

          <button
            key={category}
            onClick={() =>
              setSelectedCategory(category)
            }
            className={`px-6 py-3 rounded-xl transition font-semibold ${
              selectedCategory === category
                ? "bg-cyan-500 text-black"
                : "bg-[#161616] border border-gray-700 hover:border-cyan-400"
            }`}
          >

            {category}

          </button>

        ))}

      </div>

      {/* PRODUCTS GRID */}
      {filteredProducts.length === 0 ? (

        <div className="text-center py-20">

          <h2 className="text-3xl font-bold mb-4">
            No Products Found
          </h2>

          <p className="text-gray-400">
            Try searching something else.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {filteredProducts.map((product) => (

            <ProductCard
              key={product._id}
              product={product}
            />

          ))}

        </div>

      )}

    </div>
  );
}

export default Home;