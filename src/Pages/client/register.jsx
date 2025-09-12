import { useState } from "react";
import { FiUser, FiMail, FiLock, FiLoader } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit() {
    if (password !== confirmPassword) {
      toast.error("Confirm Password does not match Password");
      return;
    }

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Registration Successful");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Registration Failed");
      });
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center overflow-hidden mt-[80px]"
      style={{
        backgroundImage:
          "linear-gradient(120deg, #00809dbb 0%, #222831cc 100%), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')",
      }}
    >
      <div className="bg-[#eeeeee99] backdrop-blur-2xl rounded-3xl shadow-2xl p-10 w-full max-w-lg flex flex-col items-center border border-[#00809d33]">
        <h2 className="text-3xl font-extrabold text-[#00809D] mb-2 text-center tracking-wide drop-shadow">
          Create Your Beauty Account
        </h2>
        <p className="text-[#222831] mb-6 text-center text-base font-medium">
          Join us for exclusive cosmetic deals and beauty tips!
        </p>
        <div className="w-full space-y-6">
          <div className="flex gap-4">
            <div className="relative w-1/2">
              <FiUser className="absolute left-3 top-3 text-[#00809D] text-xl" />
              <input
                type="text"
                name="firstName"
                required
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#eeeeeecc] text-[#222831] placeholder-[#00809d99] border border-[#00809d33] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00809D] transition shadow"
              />
            </div>
            <div className="relative w-1/2">
              <FiUser className="absolute left-3 top-3 text-[#00809D] text-xl" />
              <input
                type="text"
                name="lastName"
                required
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#eeeeeecc] text-[#222831] placeholder-[#00809d99] border border-[#00809d33] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00809D] transition shadow"
              />
            </div>
          </div>
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-[#00809D] text-xl" />
            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#eeeeeecc] text-[#222831] placeholder-[#00809d99] border border-[#00809d33] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00809D] transition shadow"
            />
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-[#00809D] text-xl" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-[#eeeeeecc] text-[#222831] placeholder-[#00809d99] border border-[#00809d33] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00809D] transition shadow"
            />
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-[#00809D] text-xl" />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-[#eeeeeecc] text-[#222831] placeholder-[#00809d99] border border-[#00809d33] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00809D] transition shadow"
            />
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-[#00809D] hover:bg-[#065084] text-[#EEEEEE] font-bold py-3 rounded-xl shadow-lg transition text-lg tracking-wide"
          >
            Register
          </button>
        </div>
        <div className="mt-8 text-center">
          <span className="text-[#222831] text-base">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#00809D] font-semibold hover:underline"
            >
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
