import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  function Login() {
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
    <div className="w-full h-screen bg-[url(./loginbg.jpg)] bg-cover bg-center flex justify-center items-center ">
      <div className="w-[500px] h-[500px] backdrop-blur-sm rounded-2xl relative gap-[20px] text-white flex flex-col items-center justify-center">
        <h1 className="absolute top-[20px] text-2xl text-bold  text-center my-5">
          Login
        </h1>
        <div className="w-[350px] flex flex-col">
          <span>
            <label className="text-white text-2xl">Email</label>
          </span>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="w-[350px] h-[50px]  rounded-2xl border border-white text-white"
          />
        </div>
        <div className="w-[350px] flex flex-col">
          <span>
            <label className="text-white  text-2xl">Password</label>
          </span>
          <input
            type="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-[350px] h-[50px]  rounded-2xl border border-white text-white"
          />
        </div>
        <button
          onClick={Login}
          className="w-[350px] h-[50px]   rounded-2xl bg-blue-500 text-white text-2xl"
        >
          Login
        </button>
      </div>
    </div>
  );
}
