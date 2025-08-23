import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";


export default function Header() {
    return (
        <div className="h-[100px] bg-blue-500 flex justify-center items-center relative">
        <Link to="/" className="text-2xl font text-white">Home</Link>
        <Link to="/products" className="text-2xl font text-white ml-5">Products</Link>
        <Link to="/reviews" className="text-2xl font text-white ml-5">Reviews</Link>
        <Link to="/about" className="text-2xl font text-white ml-5">About us</Link>
        <Link to="/contact" className="text-2xl font text-white ml-5">Contact us</Link>
        <Link to="/cart" className="absolute right-[80px]"><BiCart className="text-3xl font text-white ml-5"/></Link>
        </div>
    );
}