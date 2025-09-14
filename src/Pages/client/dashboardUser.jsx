import { useState, useEffect } from "react";
import { FiHome, FiUser, FiShoppingBag, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../Components/Loader";
import Paginator from "../../Components/paginator";

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
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders/${page}/${limit}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
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

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    toast.success("Logged out successfully");
    navigate("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#00809D] text-white flex flex-col p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-8">My Dashboard</h1>
        <nav className="flex flex-col gap-4">
          <button
            onClick={() => setActiveMenu("overview")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              activeMenu === "overview"
                ? "bg-white text-[#00809D] font-semibold"
                : "hover:bg-[#065084]"
            }`}
          >
            <FiHome /> Overview
          </button>
          <button
            onClick={() => setActiveMenu("profile")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              activeMenu === "profile"
                ? "bg-white text-[#00809D] font-semibold"
                : "hover:bg-[#065084]"
            }`}
          >
            <FiUser /> Profile
          </button>
          <button
            onClick={() => setActiveMenu("orders")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              activeMenu === "orders"
                ? "bg-white text-[#00809D] font-semibold"
                : "hover:bg-[#065084]"
            }`}
          >
            <FiShoppingBag /> My Orders
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            <FiLogOut /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeMenu === "orders" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Purchase History</h2>
            <div className="space-y-6">
              {loading && <Loader />}
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Order ID: {order.orderID}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#00809D]">
                        Rs.{" "}
                        {order.total.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                      <span
                        className={`text-sm px-3 py-1 rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Order items */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 bg-gray-50 rounded-lg p-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.qty} × Rs.
                            {item.price.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}
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

        {activeMenu === "profile" && (
          <div>
            {/* Profile Section */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2">
                My Profile
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="text-lg font-medium text-gray-800">
                    {user.firstname} {user.lastname}
                  </p>
                </div>

                {/* Email */}
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-lg font-medium text-gray-800">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeMenu === "overview" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Overview</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white shadow-md rounded-xl p-6 text-center">
                <p className="text-sm text-gray-500">Total Orders</p>
                <h3 className="text-2xl font-bold text-[#00809D]">
                  {orders.length}
                </h3>
              </div>
              <div className="bg-white shadow-md rounded-xl p-6 text-center">
                <p className="text-sm text-gray-500">Delivered</p>
                <h3 className="text-2xl font-bold text-green-600">
                  {orders.filter((o) => o.status === "completed").length}
                </h3>
              </div>
              <div className="bg-white shadow-md rounded-xl p-6 text-center">
                <p className="text-sm text-gray-500">Pending</p>
                <h3 className="text-2xl font-bold text-yellow-600">
                  {orders.filter((o) => o.status == "pending").length}
                </h3>
              </div>
              <div className="bg-white shadow-md rounded-xl p-6 text-center">
                <p className="text-sm text-gray-500">Total Spent</p>
                <h3 className="text-2xl font-bold text-[#065084]">
                  Rs.
                  {orders
                    .reduce((sum, o) => sum + (o.total || 0), 0)
                    .toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </h3>
              </div>
            </div>

            {/* Recent Orders */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
              <div className="space-y-4">
                {orders.slice(0, 3).map((order) => (
                  <div
                    key={order._id}
                    className="bg-white rounded-lg p-4 shadow hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-center">
                      {/* Left: Order Info */}
                      <div className="flex items-center space-x-4">
                        {/* Show first item image */}
                        {order.items && order.items.length > 0 && (
                          <img
                            src={order.items[0].image}
                            alt={order.items[0].name}
                            className="w-16 h-16 object-cover rounded-md border"
                          />
                        )}
                        <div>
                          <h4 className="font-semibold">
                            Order ID {order.orderID}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {new Date(order.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                          <p className="text-sm text-gray-700">
                            {order.items.length} item(s)
                          </p>
                        </div>
                      </div>

                      {/* Right: Order Total & Status */}
                      <div className="text-right">
                        <p className="font-bold text-[#00809D]">
                          Rs.{" "}
                          {order.total.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}
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

                {orders.length === 0 && (
                  <p className="text-gray-500 italic">
                    No recent orders found.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
