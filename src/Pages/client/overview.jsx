import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../Components/Loader";
import toast from "react-hot-toast";
import ImageSlider from "../../Components/imageSlider";
import { addToCart, getCart } from "../../utils/cart";
import { useNavigate } from "react-router-dom";


export default function Overview() {
  const params = useParams();
  const navigate = useNavigate();
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
    <div className="w-full min-h-screen bg-gray-50 p-6 flex flex-col items-center gap-10">
      {status === "loading" && <Loader />}

      {status === "success" && (
        <>
          {/* Product Details Card */}
          <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
            {/* Product Image Slider */}
            <div className="flex justify-center items-center bg-gray-100 p-6">
              <ImageSlider image={product.image} />
            </div>

            {/* Product Info */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <h1 className="font-extrabold text-3xl text-accent mb-4">
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
                  onClick={() => {
                    addToCart(product, 1);
                    toast.success("Product added to cart!");
                    console.log(getCart());
                  }}
                  className="w-1/2 py-3 bg-secondary text-white font-bold rounded-lg shadow hover:bg-btn-hover transition-all cursor-pointer"
                >
                  Add to Cart
                </button>
                <button
                  className="w-1/2 py-3 bg-green-600 text-white font-bold rounded-lg shadow hover:bg-green-700 transition-all cursor-pointer"
                  onClick={() => {
                    addToCart(product, 1);
                    navigate("/checkout", { state: { items: getCart() } });
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="w-full max-w-6xl flex flex-col gap-10">
            {/* ⭐ Customer Reviews Section */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-accent mb-4">
                Customer Reviews
              </h2>
              <div className="text-gray-500 italic">
                {/* TODO: Add reviews list & form here */}
                No reviews yet. Be the first to review!
              </div>
            </div>

            {/* 🌿 Key Benefits */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-accent mb-4">
                Key Benefits
              </h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                {/* TODO: Replace with dynamic data */}
                <li>Boosts immunity and overall health</li>
                <li>Rich in vitamins and minerals</li>
                <li>100% natural and safe</li>
              </ul>
            </div>

            {/* 🧪 Ingredients */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-accent mb-4">
                Ingredients
              </h2>
              <p className="text-gray-600">
                {/* TODO: Replace with dynamic data */}
                Contains herbal extracts, organic fruits, and natural oils.
              </p>
            </div>

            {/* 🔄 You May Also Like */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-accent mb-4">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {/* TODO: Add alternative product cards here */}
                <div className="bg-gray-100 h-40 rounded-lg flex justify-center items-center text-gray-400">
                  Placeholder Product
                </div>
                <div className="bg-gray-100 h-40 rounded-lg flex justify-center items-center text-gray-400">
                  Placeholder Product
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {status === "error" && (
        <div className="text-red-500 font-bold text-lg">
          Error loading product
        </div>
      )}
    </div>
  );
}
