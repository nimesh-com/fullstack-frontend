import { useEffect } from "react";
import { useState } from "react";
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
    <div className="w-full h-full">
      <div className="w-full flex justify-center items-center p-4">
        <input
          type="text"
          onChange={(e) => {
            setQuery(e.target.value);
            setIsLoading(true);
          }}
          placeholder="Search Product"
          className="w-[500px] h-[40px] border border-gray-300 rounded-md p-2"
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full h-full flex justify-center items-center flex-wrap shrink-0 gap-[40px] p-[20px]">
          {products.map((products) => {
            return <ProductCard key={products.productId} product={products} />;
          })}
        </div>
      )}
    </div>
  );
}
