import { Link, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { IoReorderThreeSharp } from "react-icons/io5";
import { FaUserShield, FaSignOutAlt } from "react-icons/fa"; // ✅ icons
import ProductAdminPage from "./Admin/productAdminPage";
import AddProduct from "./Admin/addProductPage";
import UpdateProduct from "./Admin/productUpdate";
import { OrderAdminPage } from "./Admin/orderAdminPage";
import toast from "react-hot-toast";
import NotFoundPageAdmin from "./Admin/404NotFoundAdmin";
import UnauthorizedPage from "./Admin/Unauthorized";

export default function AdminPage() {
  const navigate = useNavigate();
  // ✅ Check user role
  const role = localStorage.getItem("role");

  // ❌ If not admin → show 404
  if (role !== "admin") {
    return <UnauthorizedPage />;
  }

  // ✅ Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      {/* ✅ Header */}
      <div className="w-full h-[70px] bg-gradient-to-r from-gray-900 to-gray-700 text-white flex justify-between items-center px-6 shadow-lg">
        <div className="text-2xl font-bold tracking-wide">
          🛠 Admin Dashboard
        </div>
        <div className="flex items-center gap-4">
          {/* Admin profile */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-red-600 flex justify-center items-center text-lg shadow-md">
              <FaUserShield className="text-white" />
            </div>
            <span className="font-medium text-lg">Admin</span>
          </div>
          {/* Logout */}
          <button
            onClick={handleLogout}
            className="ml-4 px-4 py-2 flex items-center gap-2 bg-red-500 hover:bg-red-600 transition rounded-lg text-sm font-semibold shadow-md cursor-pointer"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>

      {/* ✅ Content area */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="w-[300px] h-full flex flex-col items-center border-r bg-white shadow-md">
          <span className="font-bold text-2xl my-6 text-gray-800">Menu</span>

          <Link
            className="flex flex-row h-[60px] w-full border-b items-center text-lg px-[20px] text-gray-700 hover:bg-gray-100 gap-[15px] transition"
            to="/admin/products"
          >
            <IoReorderThreeSharp className="text-red-500 text-xl" />
            Products
          </Link>

          <Link
            className="flex flex-row h-[60px] w-full border-b items-center text-lg px-[20px] text-gray-700 hover:bg-gray-100 gap-[15px] transition"
            to="/admin/orders"
          >
            <IoReorderThreeSharp className="text-red-500 text-xl" />
            Orders
          </Link>
        </div>

        {/* Main Content */}
        <div className="w-[calc(100%-300px)] h-full bg-gray-50 p-6 overflow-y-auto">
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Welcome, Admin 🎉
                  </h1>
                  <p className="text-gray-600 text-lg max-w-xl">
                    Manage products, track orders, and monitor system activity
                    all from one place. Use the menu to navigate through your
                    admin tools.
                  </p>
                </div>
              }
            />
            <Route path="/products" element={<ProductAdminPage />} />
            <Route path="/orders" element={<OrderAdminPage />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/updateProduct" element={<UpdateProduct />} />
            {/* Fallback 404 */}
            <Route path="*" element={<NotFoundPageAdmin />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
