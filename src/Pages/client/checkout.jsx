import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState(location.state.item || []); // Initialize cart state
  if (location.state.item == null) {
    toast.error("No items in cart");
    navigate("/products");
  }

  function getTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }
  return (
    <div className="w-full min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Place Your Order
        </h1>

        {
          <div className="space-y-4">
            {cart.map((item, index) => {
              return (
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
                          const newCart = [...cart];
                          newCart[index].quantity -= 1;
                          if (newCart[index].quantity === 0) {
                            newCart.splice(index, 1);
                          }
                          setCart(newCart);
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
                          const newCart = [...cart];
                          newCart[index].quantity += 1;
                          setCart(newCart);
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

                  <button className="absolute top-4 right-4 w-8 h-8 flex justify-center items-center bg-red-100 text-red-600 hover:bg-red-600 hover:text-white rounded-full transition-colors duration-200">
                    <TbTrash className="text-lg cursor-pointer" />
                  </button>
                </div>
              );
            })}

            {/* Cart Summary */}
            <div className="bg-white rounded-xl shadow-md p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Cart Summary
              </h2>

              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  Rs.{" "}
                  {getTotal().toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold">
                    Rs.
                    {getTotal().toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
              <div></div>

              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg mt-6 transition duration-200 cursor-pointer">
                Place Your Order
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
