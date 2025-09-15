import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi"; // 🛒 import cart icon
import { addToCart } from "../utils/cart";
import { toast } from "react-hot-toast";

export default function ProductCard(props) {
  const product = props.product;
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault(); // prevent navigation
addToCart(product, 1);
toast.success("Product added to cart");
navigate("/products");
  };

  return (
    <Link
      to={"/overview/" + product.productId}
      className="w-[300px] h-[450px] flex flex-col shadow-2xl rounded-2xl shrink-0 overflow-hidden cursor-pointer bg-white hover:scale-105 transition-all duration-200"
    >
      <img
        src={product.image[0]}
        className="w-full h-[250px] object-cover"
        alt={product.name}
      />
      <div className="w-full flex-1 p-[10px] flex flex-col justify-between">
        <div>
          <h1 className="text-sm text-gray-500">ID: {product.productId}</h1>
          <h1 className="font-bold text-lg line-clamp-1">{product.name}</h1>
          <div className="mt-1">
            {product.labledPrice > product.price ? (
              <p>
                <span className="line-through text-red-500">
                  Rs.{" "}
                  {product.labledPrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>{" "}
                <span className="text-green-600 font-semibold">
                  Rs.{" "}
                  {product.price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </p>
            ) : (
              <span className="text-green-600 font-semibold">
                Rs.{" "}
                {product.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            )}
          </div>
        </div>

        <h1 className="font-bold text-lg">{product.category}</h1>

        {/* 🛒 Add to Cart button with icon */}
        <button
          onClick={handleAddToCart}
          className="mt-3 flex items-center justify-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-teal-900 transition-all cursor-pointer"
        >
          <FiShoppingCart className="text-xl" />
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
