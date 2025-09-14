import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Components/loader";
import ProductCard from "../../Components/productCard";
import { FiSearch } from "react-icons/fi";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (isLoading) {
      if (query === "") {
        setIsLoading(true);
        axios
          .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
          .then((response) => {
            setProducts(response.data);
            setIsLoading(false);
          });
      } else {
        setIsLoading(true);
        axios
          .get(
            import.meta.env.VITE_BACKEND_URL + "/api/products/search/" + query
          )
          .then((response) => {
            setProducts(response.data);
            setIsLoading(false);
          });
      }
    }
  }, [isLoading, query]);

  return (
    <div
      className="w-full min-h-screen bg-gradient-to-br from-[#eeeeee] via-[#e0f7fa] to-[#00809d11] pb-10"
      style={{
        backgroundImage:
          "linear-gradient(120deg, #eeeeee 0%, #e0f7fa 60%, #00809d11 100%)",
      }}
    >
      {/* Search Bar */}
      <div className="w-full flex justify-center items-center p-8 bg-white/80 shadow-md sticky top-0 z-10 backdrop-blur">
        <div className="relative w-full max-w-xl">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00809D] text-xl" />
          <input
            type="text"
            onChange={(e) => {
              setQuery(e.target.value);
              setIsLoading(true);
            }}
            placeholder="Search for cosmetics, brands, or categories..."
            className="w-full h-12 pl-12 pr-4 border border-[#00809d33] rounded-full shadow focus:ring-2 focus:ring-[#00809D] outline-none text-[#222831] bg-[#eeeeeecc] placeholder-[#00809d99] transition"
          />
        </div>
      </div>

      {/* Product List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <Loader />
        </div>
      ) : (
        <div className="w-full flex flex-wrap justify-center gap-8 px-4 py-8">
          {products.length === 0 ? (
            <div className="text-center text-[#00809D] text-xl font-semibold mt-20">
              No products found.
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.productId}
                className="transition-transform hover:-translate-y-2 hover:shadow-2xl"
              >
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
