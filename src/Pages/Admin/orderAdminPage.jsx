import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Components/Loader";

export function OrderAdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setOrders(response.data);
          console.log(response.data);
          setLoading(false);
        });
    }
  }, [loading]);

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
             {
                orders.map((order, index)=>{
                    return (
                        <tr key={index}>
                            <td className="border border-slate-300 text-center">{order.orderID}</td>
                            <td className="border border-slate-300 text-center">{order.name}</td>
                            <td className="border border-slate-300 text-center">{order.email}</td>
                            <td className="border border-slate-300 text-center">{order.phone}</td>
                            <td className="border border-slate-300 text-center">{order.address}</td>
                            <td className="border border-slate-300 text-center">{new Date(order.date).toLocaleDateString()}</td>
                            <td className="border border-slate-300 text-end">{order.total.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}</td>
                            <td className="border border-slate-300 text-center">{order.status}</td>
                        </tr>
                    )
                })
             }
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
