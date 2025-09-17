import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../Components/footer";

export default function ContactUsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!localStorage.getItem("token")) {
      toast.error("You must be logged in to contact us");
      navigate("/login");
      return;
    }

    if (!name || !email || !message || !phone) {
      toast.error("Please fill all the details");
      return;
    }

    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "/api/contacts",
        {
          name: name,
          email: email,
          message: message,
          phone: phone,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        toast.success("Message Sent Successfully");
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to send message");
      });
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <div className="flex-grow flex justify-center items-center px-4 py-12">
        <div className="w-full max-w-4xl shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Side - Info & WhatsApp */}
          <div
            className="md:w-1/2 p-8 flex flex-col justify-center items-center"
            style={{ backgroundColor: "var(--color-secondary)", color: "white" }}
          >
            <h2 className="text-3xl font-bold mb-4 text-center">Get in Touch</h2>
            <p className="text-center mb-6">
              Have any questions or want to work with us? Send us a message or
              chat directly on WhatsApp!
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
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                required
                className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: "var(--color-accent)" }}
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                required
                className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: "var(--color-accent)" }}
              />
              <input
                type="text"
                name="contact"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Contact Number"
                required
                className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: "var(--color-accent)" }}
              />
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your Message"
                required
                rows="4"
                className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 resize-none"
                style={{ borderColor: "var(--color-accent)" }}
              ></textarea>
              <button
                type="submit"
                onClick={handleSubmit}
                className="py-3 rounded-lg font-semibold shadow-md transition flex justify-center items-center"
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "white",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--color-btn-hover)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--color-accent)")
                }
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
