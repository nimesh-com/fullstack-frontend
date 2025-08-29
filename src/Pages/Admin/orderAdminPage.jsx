import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Components/Loader";
import Paginator from "../../Components/paginator";
import toast from "react-hot-toast";

export function OrderAdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const [clickedOrder, setClickedOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState("pending");

  useEffect(() => {
    if (loading) {
      axios
        .get(
          import.meta.env.VITE_BACKEND_URL +
            "/api/orders/" +
            page +
            "/" +
            limit,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setOrders(response.data.orders);
          setTotalPages(response.data.totalPages);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to fetch orders");
          setLoading(false);
        });
    }
  }, [loading, page, limit]);

  return (
    <div className="w-full h-full flex">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full h-full flex flex-col">
          <span className="font-bold text-2xl my-5">Orders</span>
          <table className="table-auto border-collapse border border-slate-400">
            <thead>
              <tr>
                <th className="border border-slate-300">Order ID</th>
                <th className="border border-slate-300">Name</th>
                <th className="border border-slate-300">Email</th>
                <th className="border border-slate-300">Phone</th>
                <th className="border border-slate-300">Address</th>
                <th className="border border-slate-300">Date</th>
                <th className="border border-slate-300">Price</th>
                <th className="border border-slate-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr
                    className="border-b-[1px] hover:bg-blue-700 hover:text-white cursor-pointer"
                    key={order.orderID}
                    onClick={() => {
                      setClickedOrder(order);
                      setOrderStatus(order.status); // sync select with current order status
                      setPopupVisible(true);
                    }}
                  >
                    <td className="border border-slate-300 text-center">
                      {order.orderID}
                    </td>
                    <td className="border border-slate-300 text-center">
                      {order.name}
                    </td>
                    <td className="border border-slate-300 text-center">
                      {order.email}
                    </td>
                    <td className="border border-slate-300 text-center">
                      {order.phone}
                    </td>
                    <td className="border border-slate-300 text-center">
                      {order.address}
                    </td>
                    <td className="border border-slate-300 text-center">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="border border-slate-300 text-end">
                      {order.total.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border border-slate-300 text-center">
                      {order.status}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Popup */}
          {popupVisible && clickedOrder && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="w-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl overflow-y-auto relative p-6">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Order Details
                  </h2>
                  <button
                    onClick={() => {
                      setPopupVisible(false);
                      setClickedOrder(null);
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white font-bold hover:bg-red-600 transition cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Basic Info */}
                <div className="space-y-2 text-gray-700 mb-6">
                  <p>
                    <span className="font-semibold">Order ID:</span>{" "}
                    {clickedOrder.orderID}
                  </p>
                  <p>
                    <span className="font-semibold">Name:</span>{" "}
                    {clickedOrder.name}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {clickedOrder.email}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {clickedOrder.phone}
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {clickedOrder.address}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        clickedOrder.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : clickedOrder.status === "completed"
                          ? "bg-blue-100 text-blue-700"
                          : clickedOrder.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {clickedOrder.status}
                    </span>
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <select
                      className="border border-gray-300 rounded-md px-2 py-1"
                      value={orderStatus}
                      onChange={(e) => {
                        setOrderStatus(e.target.value);
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    {orderStatus !== clickedOrder.status && (
                      <button
                        onClick={async () => {
                          try {
                            await axios.put(
                              import.meta.env.VITE_BACKEND_URL +
                                "/api/orders/" +
                                clickedOrder.orderID,
                              {
                                status: orderStatus,
                              },
                              {
                                headers: {
                                  Authorization: `Bearer ${localStorage.getItem(
                                    "token"
                                  )}`,
                                },
                              }
                            );
                            setLoading(true);
                            setPopupVisible(false);
                            setClickedOrder(null);
                            toast.success("Order status updated successfully");
                          } catch (err) {
                            console.error(err);
                            toast.error("Failed to update order status");
                          }
                        }}
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
                      >
                        Save Changes
                      </button>
                    )}
                  </div>

                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(clickedOrder.date).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-semibold">Note:</span>{" "}
                    {clickedOrder.note}
                  </p>
                  <p className="text-lg font-semibold">
                    <span>Total:</span> $
                    {clickedOrder.total.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>

                {/* Items */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Items
                  </h3>
                  <ul className="space-y-3">
                    {clickedOrder.items?.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-4 border rounded-xl p-3 shadow-sm hover:shadow-md transition"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Qty: {item.qty}
                          </p>
                          <p className="text-sm text-gray-600">
                            Price: ${item.price}
                          </p>
                        </div>
                        <p className="font-semibold text-gray-800">
                          $
                          {(item.price * item.qty).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Pagination */}
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
    </div>
  );
}
