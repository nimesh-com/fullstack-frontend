import { useState } from "react";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: Add registration logic here
    alert("Registered successfully!");
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center overflow-hidden mt-[80px]"
      style={{
        backgroundImage:
          "linear-gradient(120deg, #00809dbb 0%, #222831cc 100%), url('https://images.unsplash.com/photo-1512499617640-c2f999098c01?auto=format&fit=crop&w=1500&q=80')",
      }}
    >
      <div className="bg-[#eeeeeecc] backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center border border-[#00809d33]">
        <h2 className="text-3xl font-extrabold text-[#00809D] mb-2 text-center tracking-wide">
          Create Your Beauty Account
        </h2>
        <p className="text-[#222831] mb-6 text-center text-sm">
          Join us for exclusive cosmetic deals and beauty tips!
        </p>
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-[#00809D] text-xl" />
            <input
              type="text"
              name="name"
              required
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-[#eeeeee] text-[#222831] placeholder-[#00809d99] border border-[#00809d33] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00809D] transition"
            />
          </div>
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-[#00809D] text-xl" />
            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-[#eeeeee] text-[#222831] placeholder-[#00809d99] border border-[#00809d33] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00809D] transition"
            />
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-[#00809D] text-xl" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-3 bg-[#eeeeee] text-[#222831] placeholder-[#00809d99] border border-[#00809d33] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00809D] transition"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-[#00809D]"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-[#00809D] text-xl" />
            <input
              type={showCPassword ? "text" : "password"}
              name="confirmPassword"
              required
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-3 bg-[#eeeeee] text-[#222831] placeholder-[#00809d99] border border-[#00809d33] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00809D] transition"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-[#00809D]"
              onClick={() => setShowCPassword((v) => !v)}
              tabIndex={-1}
            >
              {showCPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-[#00809D] hover:bg-[#065084] text-[#EEEEEE] font-bold py-3 rounded-lg shadow-lg transition text-lg"
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-[#222831] text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#00809D] hover:underline font-semibold"
            >
              Login
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
