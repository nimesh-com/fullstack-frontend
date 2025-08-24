import { use, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../utils/cart";
import { useEffect } from "react";
import axios from "axios";

export function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("You must be logged in to place an order");
      navigate("/login");
    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          setName(response.data.firstname + " " + response.data.lastname);
          setEmail(response.data.email);
        })
        .catch((error) => {
          toast.error("You must be logged in to place an order");
          navigate("/login");
          return;
        });
    }
  }, []);
  const [cart, setCart] = useState(location.state.items || []); // Initialize cart state
  useEffect(() => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      navigate("/products");
    }
  }, [cart, navigate]);

  // If cart is empty, don’t render Checkout content
  if (cart.length === 0) {
    return null;
  }

  function getTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  console.log(cart);
  async function placeOrder() {
    const token = localStorage.getItem("token");
    if (token === null) {
      toast.error("You must be logged in to place an order");
      navigate("/login");
      return;
    }
    if (address == "" || phone == "" || name == "" || email == "") {
      toast.error("Please fill all the details");
      return;
    }
    const order = {
      address: address,
      phone: phone,
      items: [],
    };
    cart.forEach((item) => {
      order.items.push({
        productId: item.productId,
        qty: item.quantity,
      });
    });
    try {
      await axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/orders", order, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          toast.success("Order placed successfully");
          localStorage.removeItem("cart");
          navigate("/products");
          return;
        });
    } catch (error) {
      toast.error("Failed to place order");
      console.log(error);
      return;
    }
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
                          if (newCart.length === 0) {
                            localStorage.removeItem("cart");
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

                  <button
                    className="absolute top-4 right-4 w-8 h-8 flex justify-center items-center bg-red-100 text-red-600 hover:bg-red-600 hover:text-white rounded-full transition-colors duration-200"
                    onClick={() => {
                      const newCart = [...cart];
                      newCart.splice(index, 1);
                      if (newCart.length === 0) {
                        localStorage.removeItem("cart");
                      }
                      setCart(newCart);
                    }}
                  >
                    <TbTrash className="text-lg cursor-pointer" />
                  </button>
                </div>
              );
            })}

            <div className="bg-white rounded-xl shadow-md p-6 mt-6 hover:shadow-lg transition-all duration-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Deliver Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="bg-white rounded-xl shadow-md p-6 mt-6 hover:shadow-lg transition-all duration-200">
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
              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg mt-6 transition duration-200 cursor-pointer"
                onClick={placeOrder}
              >
                Place Your Order
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
