import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaLock, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/users/google-login", {
          token: response.access_token,
        })
        .then((res) => {
          toast.success("Login Success");
          localStorage.setItem("token", res.data.token);
          const decoded = jwtDecode(res.data.token);
          localStorage.setItem("email", decoded.email);
          if (res.data.role === "admin") {
            navigate("/admin");
          }
          if (res.data.role === "user") {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Login Failed");
        });
    },
  });

  function handleLogin() {
    if (email === "" || Password === "") {
      toast.error("Please fill all the fields");
      return;
    }
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
        email: email,
        password: Password,
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Login Success");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", email);
        if (response.data.role === "admin") {
          navigate("/admin");
        }
        if (response.data.role === "user") {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Login Failed");
      });
  }

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-cover bg-center overflow-hidden m-0 mt-[80px]"
      style={{
        backgroundImage:
          "linear-gradient(120deg, #00809dbb 0%, #222831cc 100%), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')",
      }}
    >
      <div className="w-[450px] bg-[#eeeeee99] backdrop-blur-xl rounded-2xl shadow-2xl p-8 flex flex-col items-center border border-[#00809d33]">
        {/* Header */}
        <h1 className="text-3xl font-bold text-[#00809D] mb-8 tracking-wide">
          Welcome Back
        </h1>

        {/* Email Input */}
        <div className="w-full mb-4">
          <label className="text-[#222831] text-lg mb-2 block">Email</label>
          <div className="flex items-center gap-2 bg-[#eeeeeecc] rounded-xl px-4 border border-[#00809d33]">
            <FaEnvelope className="text-[#00809D]" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Enter your email"
              className="w-full h-12 bg-transparent text-[#222831] focus:outline-none placeholder-[#00809d99]"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="w-full mb-2">
          <label className="text-[#222831] text-lg mb-2 block">Password</label>
          <div className="flex items-center gap-2 bg-[#eeeeeecc] rounded-xl px-4 border border-[#00809d33]">
            <FaLock className="text-[#00809D]" />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full h-12 bg-transparent text-[#222831] focus:outline-none placeholder-[#00809d99]"
            />
          </div>
        </div>

        {/* Forgot Password */}
        <div className="w-full text-right mb-6">
          <p>
            <Link
              to="/forgot-password"
              className="text-[#00809D] hover:underline font-semibold"
            >
              Forgot Password?
            </Link>
          </p>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-[#00809D] hover:bg-[#065084] transition text-[#EEEEEE] text-lg font-semibold shadow-md"
        >
          <FaLock /> Login
        </button>

        {/* Divider */}
        <div className="flex items-center w-full my-6">
          <div className="flex-1 h-px bg-[#00809d33]"></div>
          <span className="px-3 text-[#00809D] text-sm font-semibold">OR</span>
          <div className="flex-1 h-px bg-[#00809d33]"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={googleLogin}
          className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-[#222831] hover:bg-[#065084] transition text-[#EEEEEE] text-lg font-semibold shadow-md"
        >
          <FaGoogle /> Continue with Google
        </button>

        {/* Don't have an account */}
        <div className="mt-6 text-center">
          <span className="text-[#222831] text-sm">
            Don't have an account?{" "}
            <a
              href="/register"
              className="inline-block bg-[#00809D] hover:bg-[#065084] text-[#EEEEEE] font-semibold px-4 py-2 rounded-lg transition ml-1"
            >
              Create Account
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
