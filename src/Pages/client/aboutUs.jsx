import { FaUsers, FaLightbulb, FaHandsHelping } from "react-icons/fa";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen px-4 py-12"
         style={{ backgroundColor: "var(--color-primary)" }}>
      
      {/* Hero Section */}
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-6">
            We are dedicated to providing the best products and services for our customers.
            Our mission is to inspire confidence and help you look and feel your best every day.
          </p>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
          <img 
            src="/about-hero.jpg" // replace with your image
            alt="About Us"
            className="w-full max-w-md rounded-2xl shadow-xl object-cover"
          />
        </div>
      </div>

      {/* Mission & Values Section */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center">
          <FaUsers className="text-4xl mb-4 text-gray-800" />
          <h3 className="text-xl font-bold mb-2">Our Team</h3>
          <p className="text-gray-600">A passionate team committed to excellence and customer satisfaction.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center">
          <FaLightbulb className="text-4xl mb-4 text-gray-800" />
          <h3 className="text-xl font-bold mb-2">Our Mission</h3>
          <p className="text-gray-600">To innovate and provide high-quality products that make life better.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center">
          <FaHandsHelping className="text-4xl mb-4 text-gray-800" />
          <h3 className="text-xl font-bold mb-2">Our Values</h3>
          <p className="text-gray-600">Integrity, transparency, and dedication in every action we take.</p>
        </div>
      </div>

    </div>
  );
}
