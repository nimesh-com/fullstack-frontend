// src/Components/footer.jsx
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin ,FaReact} from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="bg-[#00809D] text-[#EEEEEE] py-10 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold mb-3">LuxeAura</h2>
          <p className="text-sm leading-6">
            Discover premium beauty & cosmetics products to enhance your lifestyle. 
            LuxeAura – where elegance meets care.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-[#222831] transition">Home</Link></li>
            <li><Link to="/products" className="hover:text-[#222831] transition">Products</Link></li>
            <li><Link to="/about" className="hover:text-[#222831] transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-[#222831] transition">Contact</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Follow Us</h2>
          <div className="flex space-x-4 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#222831]"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#222831]"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#222831]"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#222831]"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
<div className="mt-10 border-t border-gray-300 pt-6 text-center text-sm flex flex-col items-center gap-1">
  <p className="text-white">
    &copy; {new Date().getFullYear()} LuxeAura. All rights reserved.
  </p>
  <p className="flex items-center justify-center gap-1 text-white">
    <FaReact className="text-white" /> Developed by Nimesh Jayawickrama
  </p>
</div>
    </footer>
  );
}
