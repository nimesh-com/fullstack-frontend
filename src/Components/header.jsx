import { useState } from "react";
import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="h-[80px] bg-secondary flex items-center px-6 relative">
      {/* Logo / Home */}
      <Link to="/" className="w-[100px] h-[70px] object-cover">
          <img className="w-full h-full" src="./pngwing.com.png" alt="" />
      </Link>

      {/* Desktop Menu */}
      <nav className="hidden md:flex ml-6 space-x-6">
        <Link to="/" className="text-white text-lg hover:text-gray-200">
          Home
        </Link>
        <Link to="/products" className="text-white text-lg hover:text-gray-200">
          Products
        </Link>
        <Link to="/reviews" className="text-white text-lg hover:text-gray-200">
          Reviews
        </Link>
        <Link to="/about" className="text-white text-lg hover:text-gray-200">
          About Us
        </Link>
        <Link to="/contact" className="text-white text-lg hover:text-gray-200">
          Contact Us
        </Link>
      </nav>

      {/* Cart Icon */}
      <Link to="/cart" className="ml-auto mr-10">
        <BiCart className="text-3xl text-white" />
      </Link>

      {/* Hamburger (Mobile only) */}
      <button
        className="md:hidden text-white text-3xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-secondary flex flex-col items-center py-4 space-y-4 md:hidden">
            <Link
            to="/"
            className="text-white text-lg"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-white text-lg"
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/reviews"
            className="text-white text-lg"
            onClick={() => setIsOpen(false)}
          >
            Reviews
          </Link>
          <Link
            to="/about"
            className="text-white text-lg"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-white text-lg"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
}
