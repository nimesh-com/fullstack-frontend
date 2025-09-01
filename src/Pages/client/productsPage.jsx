import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Components/Loader";
import ProductCard from "../../Components/productCard";

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
  }, [isLoading]);

  return (
    <div className="w-full h-full bg-gray-50 min-h-screen">
      {/* Search Bar */}
      <div className="w-full flex justify-center items-center p-6 bg-white shadow-sm sticky top-0 z-10">
        <input
          type="text"
          onChange={(e) => {
            setQuery(e.target.value);
            setIsLoading(true);
          }}
          placeholder="🔍 Search for products..."
          className="w-[500px] max-w-full h-[45px] border border-gray-300 rounded-full px-4 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Product List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <Loader />
        </div>
      ) : (
        <div className="w-full flex justify-center items-center flex-wrap gap-10 p-6">
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
