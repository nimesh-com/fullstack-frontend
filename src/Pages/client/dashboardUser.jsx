// src/Pages/dashboardUser.jsx (or wherever your UserDashboard lives)
import { useState, useEffect } from "react";
import { FiHome, FiUser, FiShoppingBag, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../Components/loader";
import Paginator from "../../Components/paginator";
import Footer from "../../Components/footer"; // added Footer

export default function UserDashboard() {
  const [activeMenu, setActiveMenu] = useState("overview");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (loading) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${page}/${limit}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          setOrders(response.data.orders || []);
          setTotalPages(response.data.totalPages || 0);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error getting orders:", err);
          toast.error("Failed to fetch orders");
          setLoading(false);
        });
    }
  }, [loading, page, limit]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    // wrap page so footer sits at bottom
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Content area */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-[#00809D] text-white flex-shrink-0 flex flex-row md:flex-col items-center md:items-start p-4 md:p-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-4 md:mb-8">My Dashboard</h1>
          <nav className="flex flex-row md:flex-col gap-2 md:gap-4 w-full justify-around md:justify-start">
            <button
              onClick={() => setActiveMenu("overview")}
              className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg transition text-sm md:text-base ${
                activeMenu === "overview"
                  ? "bg-white text-[#00809D] font-semibold"
                  : "hover:bg-[#065084]"
              }`}
            >
              <FiHome /> <span className="hidden md:inline">Overview</span>
            </button>
            <button
              onClick={() => setActiveMenu("profile")}
              className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg transition text-sm md:text-base ${
                activeMenu === "profile"
                  ? "bg-white text-[#00809D] font-semibold"
                  : "hover:bg-[#065084]"
              }`}
            >
              <FiUser /> <span className="hidden md:inline">Profile</span>
            </button>
            <button
              onClick={() => setActiveMenu("orders")}
              className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg transition text-sm md:text-base ${
                activeMenu === "orders"
                  ? "bg-white text-[#00809D] font-semibold"
                  : "hover:bg-[#065084]"
              }`}
            >
              <FiShoppingBag /> <span className="hidden md:inline">My Orders</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-red-600 transition text-sm md:text-base"
            >
              <FiLogOut /> <span className="hidden md:inline">Logout</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          {/* Orders Section */}
          {activeMenu === "orders" && (
            <div>
              <h2 className="text-2xl font-bold mb-4 md:mb-6">Purchase History</h2>
              <div className="space-y-4">
                {loading && <Loader />}
                {!loading && orders.length === 0 && (
                  <p className="text-gray-500 italic">No orders found.</p>
                )}
                {orders.map((order) => (
                  <div
                    key={order.id || order._id || order.orderID}
                    className="bg-white shadow-md rounded-xl p-4 md:p-6 hover:shadow-lg transition"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-3 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold">Order ID: {order.orderID}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(order.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="text-right mt-2 md:mt-0">
                        <p className="text-lg font-bold text-[#00809D]">
                          Rs. {order.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            order.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 md:gap-4 bg-gray-50 rounded-lg p-2 md:p-3"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg"
                          />
                          <div>
                            <p className="font-semibold text-sm md:text-base">{item.name}</p>
                            <p className="text-xs md:text-sm text-gray-500">
                              Qty: {item.qty} × Rs. {item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Paginator
                currentPage={page}
                totalPages={totalPages}
                setLimit={setLimit}
                setCurrentPage={setPage}
                limit={limit}
                setLoading={setLoading}
              />
            </div>
          )}

          {/* Profile Section */}
          {activeMenu === "profile" && (
            <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2">My Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="text-lg font-medium text-gray-800">{user?.firstname} {user?.lastname}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-lg font-medium text-gray-800">{user?.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Overview Section */}
          {activeMenu === "overview" && (
            <div>
              <h2 className="text-2xl font-bold mb-4 md:mb-6">Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
                <div className="bg-white shadow-md rounded-xl p-4 md:p-6 text-center">
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <h3 className="text-xl md:text-2xl font-bold text-[#00809D]">{orders.length}</h3>
                </div>
                <div className="bg-white shadow-md rounded-xl p-4 md:p-6 text-center">
                  <p className="text-sm text-gray-500">Delivered</p>
                  <h3 className="text-xl md:text-2xl font-bold text-green-600">
                    {orders.filter((o) => o.status === "completed").length}
                  </h3>
                </div>
                <div className="bg-white shadow-md rounded-xl p-4 md:p-6 text-center">
                  <p className="text-sm text-gray-500">Pending</p>
                  <h3 className="text-xl md:text-2xl font-bold text-yellow-600">
                    {orders.filter((o) => o.status === "pending").length}
                  </h3>
                </div>
                <div className="bg-white shadow-md rounded-xl p-4 md:p-6 text-center">
                  <p className="text-sm text-gray-500">Total Spent</p>
                  <h3 className="text-xl md:text-2xl font-bold text-[#065084]">
                    Rs. {orders.reduce((sum, o) => sum + (o.total || 0), 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-2">Recent Orders</h3>
                {orders.slice(0, 3).map((order) => (
                  <div key={order._id || order.id || order.orderID} className="bg-white rounded-lg p-3 md:p-4 shadow hover:shadow-md transition">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div className="flex items-center gap-2 md:gap-4">
                        {order.items && order.items.length > 0 && (
                          <img
                            src={order.items[0].image}
                            alt={order.items[0].name}
                            className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-md border"
                          />
                        )}
                        <div>
                          <h4 className="font-semibold text-sm md:text-base">Order ID {order.orderID}</h4>
                          <p className="text-xs md:text-sm text-gray-500">
                            {new Date(order.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                          </p>
                          <p className="text-xs md:text-sm text-gray-700">{order.items.length} item(s)</p>
                        </div>
                      </div>
                      <div className="text-right mt-2 md:mt-0">
                        <p className="font-bold text-[#00809D] text-sm md:text-base">
                          Rs. {order.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-600"
                              : order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
