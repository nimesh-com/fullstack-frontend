import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../Components/loader";
import toast from "react-hot-toast";
import ImageSlider from "../../Components/imageSlider";
import { addToCart, getCart } from "../../utils/cart";


export default function Overview() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (status === "loading") {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/${params.productId}`
        )
        .then((res) => {
          setProduct(res.data);
          setStatus("success");
        })
        .catch(() => {
          setStatus("error");
        });
    }
  }, [status]);

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 flex justify-center items-center">
      {status === "loading" && <Loader />}

      {status === "success" && (
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* Product Image Slider */}
          <div className="flex justify-center items-center bg-gray-100 p-6">
            <ImageSlider image={product.image} />
          </div>

          {/* Product Details */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <h1 className="font-extrabold text-3xl text-gray-800 mb-4">
                {product.name}
              </h1>

              {/* Price */}
              {product.labledPrice > product.price ? (
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-2xl font-bold text-red-500 line-through">
                    Rs.{" "}
                    {product.labledPrice.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <span className="text-3xl font-bold text-green-600">
                    Rs.{" "}
                    {product.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              ) : (
                <p className="text-3xl font-bold text-gray-900 mb-6">
                  Rs.{" "}
                  {product.price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              )}

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-8">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
             onClick={()=>{
              addToCart(product, 1);
              toast.success("Product added to cart!");
              console.log(getCart());
             }}
                className="w-1/2 py-3 bg-yellow-500 text-white font-bold rounded-lg shadow hover:bg-yellow-600 transition-all cursor-pointer"
              >
                Add to Cart
              </button>
              <button className="w-1/2 py-3 bg-green-600 text-white font-bold rounded-lg shadow hover:bg-green-700 transition-all cursor-pointer">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="text-red-500 font-bold text-lg">
          Error loading product
        </div>
      )}
    </div>
  );
}
