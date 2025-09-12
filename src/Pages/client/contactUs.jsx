import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", contact: "", message: "" });
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-12"
         style={{ backgroundColor: "var(--color-primary)" }}>
      <div className="w-full max-w-4xl shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side - Info & WhatsApp */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center items-center"
             style={{ backgroundColor: "var(--color-secondary)", color: "white" }}>
          <h2 className="text-3xl font-bold mb-4 text-center">Get in Touch</h2>
          <p className="text-center mb-6">
            Have any questions or want to work with us? Send us a message or chat directly on WhatsApp!
          </p>
          <a
            href="https://wa.me/+94779719469"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold shadow-lg transition"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "white",
            }}
          >
            <FaWhatsapp className="text-white text-2xl" />
            Chat on WhatsApp
          </a>
        </div>

        {/* Right Side - Contact Form */}
        <div className="md:w-1/2 p-8" style={{ backgroundColor: "white" }}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: "var(--color-accent)" }}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: "var(--color-accent)" }}
            />
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact Number"
              required
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: "var(--color-accent)" }}
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              rows="4"
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 resize-none"
              style={{ borderColor: "var(--color-accent)" }}
            ></textarea>
            <button
              type="submit"
              className="py-3 rounded-lg font-semibold shadow-md transition flex justify-center items-center"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "white",
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "var(--color-btn-hover)"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "var(--color-accent)"}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
