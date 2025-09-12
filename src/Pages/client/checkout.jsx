import { useState, useEffect, useRef } from "react";
import { TbTrash } from "react-icons/tb";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);

  const loginToastShown = useRef(false);
  const emptyCartToastShown = useRef(false);

  const [cart, setCart] = useState(location.state?.items || []);

  // Fetch user details
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && !loginToastShown.current) {
      toast.error("You must be logged in to place an order");
      loginToastShown.current = true;
      navigate("/login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setName(response.data.firstname + " " + response.data.lastname);
        setEmail(response.data.email);
      })
      .catch(() => {
        if (!loginToastShown.current) {
          toast.error("You must be logged in to place an order");
          loginToastShown.current = true;
          navigate("/login");
        }
      });
  }, [navigate]);

  // Check if cart is empty
  useEffect(() => {
    if (cart.length === 0 && !emptyCartToastShown.current) {
      toast.error("Your cart is empty");
      emptyCartToastShown.current = true;
      navigate("/products");
    }
  }, [cart, navigate]);

  if (cart.length === 0) return null;

  function getTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  async function placeOrder() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to place an order");
      navigate("/login");
      return;
    }

    if (!name || !email || !phone || !address) {
      toast.error("Please fill all the details");
      return;
    }

    const order = {
      address,
      phone,
      items: cart.map((item) => ({ productId: item.productId, qty: item.quantity })),
    };

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, order, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Order placed successfully");
      localStorage.removeItem("cart");
      navigate("/products");
    } catch (error) {
      console.log(error);
      toast.error("Failed to place order");
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Place Your Order
        </h1>

        <div className="space-y-4">
          {cart.map((item, index) => (
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
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <p className="text-md text-gray-600 mt-1">
                  Rs. {item.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>

              <div className="flex items-center mt-4 md:mt-0">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    className="w-8 h-8 flex justify-center items-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-l-lg"
                    onClick={() => {
                      const newCart = [...cart];
                      newCart[index].quantity--;
                      if (newCart[index].quantity === 0) newCart.splice(index, 1);
                      if (newCart.length === 0) localStorage.removeItem("cart");
                      setCart(newCart);
                    }}
                  >
                    -
                  </button>
                  <span className="mx-3 text-lg font-medium min-w-[2rem] text-center">{item.quantity}</span>
                  <button
                    className="w-8 h-8 flex justify-center items-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-r-lg"
                    onClick={() => {
                      const newCart = [...cart];
                      newCart[index].quantity++;
                      setCart(newCart);
                    }}
                  >
                    +
                  </button>
                </div>

                <div className="ml-6 text-center">
                  <p className="text-lg font-bold text-gray-900">
                    Rs. {(item.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              <button
                className="absolute top-4 right-4 w-8 h-8 flex justify-center items-center bg-red-100 text-red-600 hover:bg-red-600 hover:text-white rounded-full transition-colors duration-200"
                onClick={() => {
                  const newCart = [...cart];
                  newCart.splice(index, 1);
                  if (newCart.length === 0) localStorage.removeItem("cart");
                  setCart(newCart);
                }}
              >
                <TbTrash className="text-lg cursor-pointer" />
              </button>
            </div>
          ))}

          {/* Delivery Details */}
          <div className="bg-white rounded-xl shadow-md p-6 mt-6 hover:shadow-lg transition-all duration-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="bg-white rounded-xl shadow-md p-6 mt-6 hover:shadow-lg transition-all duration-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Cart Summary</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">Rs. {getTotal().toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="border-t border-gray-200 pt-4 flex justify-between">
              <span className="text-lg font-bold">Total</span>
              <span className="text-lg font-bold">Rs. {getTotal().toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <button onClick={placeOrder} className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg mt-6 transition duration-200 cursor-pointer">
              Place Your Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
