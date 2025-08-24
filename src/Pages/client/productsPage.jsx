import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import  Loader  from "../../Components/Loader";
import ProductCard from "../../Components/productCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((response) => {
          setProducts(response.data);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full h-full">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full h-full flex justify-center items-center flex-wrap shrink-0 gap-[40px] p-[20px] hover:scale-105 transition-all duration-200">
          {products.map((products) => {
            return <ProductCard key={products.productId} product= {products} />;
          })}
        </div>
      )}
    </div>
  );
}
