import { Link, Route, Routes } from "react-router-dom";
import { IoReorderThreeSharp } from "react-icons/io5";

export default function AdminPage() {
  return (
    <div className=" w-full h-screen  justify-center">
      <div className="w-[300px] h-full flex flex-col items-center">
        <span className=" font-bold text-2xl my-5">Admin Panal</span>
        <Link
          className="flex flex-row h-[60px] w-full border items-center text-xl p-[20px] text-red-500 gap-[25px]"
          to="/admin/products"
        >
          <IoReorderThreeSharp />
          Products
        </Link>
        <Link
          className="flex flex-row h-[60px] w-full border items-center text-xl p-[20px]  text-red-500 gap-[25px]"
          to="/admin/orders"
        >
          <IoReorderThreeSharp />
          Orders
        </Link>
      </div>
      <div className="w-[calc(100%-100px)] h-full">
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/products" element={<h1>Products</h1>} />
          <Route path="/orders" element={<h1>Orders</h1>} />
        </Routes>
      </div>
    </div>
  );
}
