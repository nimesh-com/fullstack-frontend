import { Link, Route, Routes } from "react-router-dom";
import { IoReorderThreeSharp } from "react-icons/io5";
import ProductAdminPage from "./Admin/productAdminPage";
import AddProduct from "./Admin/addProductPage";
import UpdateProduct from "./Admin/productUpdate";
import { OrderAdminPage } from "./Admin/orderAdminPage";

export default function AdminPage() {
  return (
    <div className=" w-full h-screen  flex">
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
      <div className="w-[calc(100%-300px)] h-full">
        <Routes path="/*">
          <Route path="/" element={<h1>Dashboard</h1>} />
          <Route path="/products" element={<ProductAdminPage />} />
          <Route path="/orders" element={<OrderAdminPage />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/updateProduct" element={<UpdateProduct />} />
        </Routes>
      </div>
    </div>
  );
}
