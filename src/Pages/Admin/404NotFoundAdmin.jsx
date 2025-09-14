import { Link } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      {/* Icon */}
      <BiErrorCircle className="text-red-500 text-9xl mb-6 animate-bounce" />

      {/* Heading */}
      <h1 className="text-6xl md:text-7xl font-extrabold text-gray-800 mb-4">
        404
      </h1>

      {/* Subheading */}
      <h2 className="text-2xl md:text-3xl text-gray-700 mb-6">
        Oops! Page Not Found
      </h2>

      {/* Description */}
      <p className="text-center text-gray-600 mb-8 max-w-lg">
        The page you are looking for might have been removed, had its name
        changed, or you do not have permission to access it.
      </p>

      {/* Button to go back home */}
      <Link
        to="/admin"
        className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition font-semibold flex items-center gap-2"
      >
        Go to Home
      </Link>
    </div>
  );
}
