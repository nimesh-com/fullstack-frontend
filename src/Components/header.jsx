import { useState } from "react";
import { BiCart } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUserPlus, FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  }

  return (
    <header className="h-[80px] bg-[#00809D] flex items-center px-6 shadow-lg relative z-20">
      {/* Logo / Home */}
      <Link to="/" className="w-[120px] h-[70px] flex items-center gap-2">
        <div className="w-12 h-12 bg-[#EEEEEE] rounded-full flex items-center justify-center shadow-md">
          <img className="w-10 h-10" src="./pngwing.com.png" alt="Logo" />
        </div>
        <span className="text-[#EEEEEE] text-2xl font-extrabold tracking-wide ml-2 hidden md:inline">
          ShopEase
        </span>
      </Link>

      {/* Desktop Menu */}
      <nav className="hidden md:flex ml-8 space-x-8">
        <Link
          to="/"
          className="text-[#EEEEEE] text-lg font-medium hover:text-[#222831] transition"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="text-[#EEEEEE] text-lg font-medium hover:text-[#222831] transition"
        >
          Products
        </Link>
        <Link
          to="/reviews"
          className="text-[#EEEEEE] text-lg font-medium hover:text-[#222831] transition"
        >
          Reviews
        </Link>
        <Link
          to="/about"
          className="text-[#EEEEEE] text-lg font-medium hover:text-[#222831] transition"
        >
          About Us
        </Link>
        <Link
          to="/contact"
          className="text-[#EEEEEE] text-lg font-medium hover:text-[#222831] transition"
        >
          Contact Us
        </Link>
      </nav>

      {/* Cart Icon */}
      <Link to="/cart" className="ml-auto mr-6">
        <BiCart className="text-3xl text-[#EEEEEE] hover:text-[#222831] transition" />
      </Link>


      {/* Register & Logout Buttons */}
      <div className="hidden md:flex items-center gap-3">
       
        {localStorage.getItem("token") ? (
          <button
            onClick={handleLogout}
            className="cursor-pointer hover:bg-red-500 hover:text-white flex items-center gap-1 px-4 py-2 bg-[#EEEEEE] text-[#00809D] rounded-lg font-semibold transition"
          >
            <FiLogOut className="text-lg" />
            Logout
          </button>
        ):(
           <Link
          to="/register"
          className="flex items-center gap-1 px-4 py-2 bg-[#EEEEEE] hover:bg-[#065084] text-[#00809D] hover:text-[#EEEEEE] rounded-lg font-semibold transition"
        >
          <FiUserPlus className="text-lg" />
          Register
        </Link>
        )}
      </div>

      {/* Hamburger (Mobile only) */}
      <button
        className="md:hidden text-[#EEEEEE] text-3xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-[#00809D] flex flex-col items-center py-6 space-y-4 md:hidden shadow-xl z-30">
          <Link
            to="/"
            className="text-[#EEEEEE] text-lg font-medium hover:text-[#222831] transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-[#EEEEEE] text-lg font-medium hover:text-[#222831] transition"
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/reviews"
            className="text-[#EEEEEE] text-lg font-medium hover:text-[#222831] transition"
            onClick={() => setIsOpen(false)}
          >
            Reviews
          </Link>
          <Link
            to="/about"
            className="text-[#EEEEEE] text-lg font-medium hover:text-[#222831] transition"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-[#EEEEEE] text-lg font-medium hover:text-[#222831] transition"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>
          <Link
            to="/register"
            className="flex items-center gap-1 px-4 py-2 bg-[#EEEEEE] hover:bg-[#065084] text-[#00809D] hover:text-[#EEEEEE] rounded-lg font-semibold transition"
            onClick={() => setIsOpen(false)}
          >
            <FiUserPlus className="text-lg" />
            Register
          </Link>
          <button
            className="flex items-center gap-1 px-4 py-2 bg-[#222831] hover:bg-[#065084] text-[#EEEEEE] rounded-lg font-semibold transition"
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
          >
            <FiLogOut className="text-lg" />
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
