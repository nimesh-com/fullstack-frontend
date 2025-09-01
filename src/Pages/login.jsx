import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaLock, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

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
    <div className="w-full h-screen bg-[url(./loginbg.jpg)] bg-cover bg-center flex justify-center items-center">
      <div className="w-[450px] bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        {/* Header */}
        <h1 className="text-3xl font-bold text-white mb-8">Welcome Back</h1>

        {/* Email Input */}
        <div className="w-full mb-4">
          <label className="text-white text-lg mb-2 block">Email</label>
          <div className="flex items-center gap-2 bg-white/20 rounded-xl px-4">
            <FaEnvelope className="text-white/80" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Enter your email"
              className="w-full h-12 bg-transparent text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="w-full mb-2">
          <label className="text-white text-lg mb-2 block">Password</label>
          <div className="flex items-center gap-2 bg-white/20 rounded-xl px-4">
            <FaLock className="text-white/80" />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full h-12 bg-transparent text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Forgot Password */}
        <div className="w-full text-right mb-6">
          <p>
            <Link to="/forgot-password" className="text-white">
              Forgot Password
            </Link>
          </p>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white text-lg font-semibold shadow-md"
        >
          <FaLock /> Login
        </button>

        {/* Divider */}
        <div className="flex items-center w-full my-6">
          <div className="flex-1 h-px bg-white/30"></div>
          <span className="px-3 text-white/80 text-sm">OR</span>
          <div className="flex-1 h-px bg-white/30"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={googleLogin}
          className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-red-500 hover:bg-red-600 transition text-white text-lg font-semibold shadow-md"
        >
          <FaGoogle /> Continue with Google
        </button>

        {/* Don't have an account */}
        <div className="mt-6 text-center">
          <span className="text-white text-sm">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-white font-semibold hover:underline"
            >
              Register
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
