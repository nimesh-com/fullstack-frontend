import { Link } from "react-router-dom";
import { BiLock } from "react-icons/bi";

export default function UnauthorizedPage() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      {/* Lock Icon */}
      <div className="text-red-500 mb-6">
        <BiLock className="text-8xl sm:text-9xl md:text-[10rem] animate-pulse" />
      </div>

      {/* Heading */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-800 mb-4 text-center">
        401
      </h1>

      {/* Subheading */}
      <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-6 text-center">
        Unauthorized Access
      </h2>

      {/* Description */}
      <p className="text-center text-gray-600 mb-8 max-w-md sm:max-w-lg md:max-w-xl px-2">
        You do not have permission to access this page. Only admin users are
        allowed. Please login with an authorized account.
      </p>

      {/* Login Button */}
      <Link
        to="/login"
        className="px-6 py-3 text-sm sm:text-base md:text-lg bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition font-semibold flex items-center gap-2"
      >
        Login
      </Link>
    </div>
  );
}
