import { useState } from "react";
import { addToCart, getCart, getTotal } from "../../utils/cart";
import { TbTrash } from "react-icons/tb";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/footer";

export function CartPage() {
  const [cart, setCart] = useState(getCart()); // Initialize cart state
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="flex-grow py-8 px-4 w-full">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Your Shopping Cart
          </h1>

          {cart.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="flex justify-center mb-4">
                <TbTrash className="text-4xl text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row items-center relative transition-all duration-200 hover:shadow-lg"
                >
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1 md:ml-4 mt-4 md:mt-0 text-center md:text-left">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-md text-gray-600 mt-1">
                      Rs.{" "}
                      {item.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  <div className="flex items-center mt-4 md:mt-0">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        className="w-8 h-8 flex justify-center items-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-l-lg"
                        onClick={() => {
                          addToCart(item, -1);
                          setCart(getCart());
                        }}
                      >
                        -
                      </button>
                      <span className="mx-3 text-lg font-medium min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        className="w-8 h-8 flex justify-center items-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-r-lg"
                        onClick={() => {
                          addToCart(item, 1);
                          setCart(getCart());
                        }}
                      >
                        +
                      </button>
                    </div>

                    <div className="ml-6 text-center">
                      <p className="text-lg font-bold text-gray-900">
                        Rs.{" "}
                        {(item.price * item.quantity).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>

                  <button
                    className="absolute top-4 right-4 w-8 h-8 flex justify-center items-center bg-red-100 text-red-600 hover:bg-red-600 hover:text-white rounded-full transition-colors duration-200"
                    onClick={() => {
                      addToCart(item, -item.quantity);
                      setCart(getCart());
                      toast.success("Item removed from cart");
                    }}
                  >
                    <TbTrash className="text-lg cursor-pointer" />
                  </button>
                </div>
              ))}

              {/* Cart Summary */}
              <div className="bg-white rounded-xl shadow-md p-6 mt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Cart Summary
                </h2>

                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    Rs.{" "}
                    {cart
                      .reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )
                      .toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold">
                      Rs.{" "}
                      {getTotal().toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>

                <button
                  className="w-full bg-secondary hover:bg-btn-hover text-white font-medium py-3 px-4 rounded-lg mt-6 transition duration-200 cursor-pointer"
                  onClick={() => {
                    navigate("/checkout", { state: { items: cart } });
                  }}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
