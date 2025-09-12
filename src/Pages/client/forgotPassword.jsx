import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiLoader } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function ForgotPassword() {
  const [step, setStep] = useState("email"); // email | otp-reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [otpStatus, setOtpStatus] = useState(""); // "", "Valid", "Invalid"
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const otpRefs = useRef([]);

  // Step 1: Send OTP
  async function sendOTP(e) {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");

    setLoading(true);
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/send-otp",
        { email }
      );
      toast.success("OTP sent successfully");
      setStep("otp-reset");
    } catch (error) {
      console.log(error);
      toast.error(
        "Error sending OTP" +
          (error.response?.data?.message
            ? `: ${error.response.data.message}`
            : "")
      );
    } finally {
      setLoading(false);
    }
  }

  // Handle OTP inputs
  function handleOtpChange(element, index) {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value && index < 5) otpRefs.current[index + 1].focus();
    if (!element.value && index > 0) otpRefs.current[index - 1].focus();
  }

  // Step 2: Validate OTP automatically
  useEffect(() => {
    if (step !== "otp-reset") return;
    if (!otp.every((digit) => digit !== "")) {
      setOtpStatus("");
      return;
    }

    const validateOtp = async () => {
      try {
        await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/api/users/validate-otp",
          {
            email,
            otp: otp.join(""),
            password: "dummyPassword123!", // dummy to just validate OTP
          }
        );
        setOtpStatus("Valid");
      } catch (error) {
        if (error.response?.data?.message === "Invalid OTP") {
          setOtpStatus("Invalid");
        } else {
          console.log(error);
        }
      }
    };

    validateOtp();
  }, [otp, email, step]);

  // Step 3: Submit new password
  async function submitOtpAndPassword(e) {
    e.preventDefault();
    if (!otp.every((digit) => digit !== ""))
      return toast.error("Please enter OTP");
    if (!newPassword || !confirmPassword)
      return toast.error("Please fill all fields");
    if (newPassword !== confirmPassword)
      return toast.error("Passwords do not match");
    if (otpStatus !== "Valid") return toast.error("OTP is invalid");

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/reset-password",
        {
          email,
          otp: otp.join(""),
          password: newPassword,
        }
      );
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error resetting password");
    }
  }

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(120deg, #00809dbb 0%, #222831cc 100%), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')",
      }}
    >
      <div className="w-[450px] min-h-[500px] bg-[#eeeeee99] backdrop-blur-2xl rounded-2xl shadow-2xl p-8 flex flex-col items-center border border-[#00809d33]">
        {step === "email" && (
          <>
            <h2 className="text-3xl font-bold text-[#00809D] mb-3 text-center">
              Forgot Password?
            </h2>
            <p className="text-[#222831] mb-6 text-center text-sm px-4">
              Enter your email address and we’ll send you a link to reset your password.
            </p>
            <form
              onSubmit={sendOTP}
              className="w-full space-y-5 flex flex-col items-center"
            >
              <div className="relative flex items-center bg-[#eeeeeecc] rounded-xl px-4 w-[350px] border border-[#00809d33]">
                <FiMail className="text-[#00809D] text-lg" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 bg-transparent text-[#222831] placeholder-[#00809d99] px-3 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-[350px] h-12 flex items-center justify-center rounded-xl bg-[#00809D] hover:bg-[#065084] transition text-[#EEEEEE] text-lg font-semibold shadow-md"
              >
                {loading ? (
                  <FiLoader className="animate-spin text-xl" />
                ) : (
                  "Send OTP"
                )}
              </button>
              <button
                onClick={() => navigate("/login")}
                type="button"
                className="w-[350px] h-12 flex items-center justify-center rounded-xl bg-[#222831] hover:bg-[#065084] transition text-[#EEEEEE] text-lg font-semibold shadow-md"
              >
                Back to Login
              </button>
            </form>
          </>
        )}

        {step === "otp-reset" && (
          <>
            <h2 className="text-3xl font-bold text-[#00809D] mb-3 text-center">
              Enter OTP & New Password
            </h2>
            <p className="text-[#222831] mb-6 text-center text-sm px-4">
              Enter the 6-digit OTP sent to your email and create a new password.
            </p>
            <form
              onSubmit={submitOtpAndPassword}
              className="w-full flex flex-col items-center space-y-5"
            >
              <div className="flex justify-between w-[350px] mb-1">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={data}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    ref={(el) => (otpRefs.current[index] = el)}
                    className="w-12 h-12 text-center rounded-xl bg-[#eeeeeecc] text-[#222831] text-lg border border-[#00809d33] focus:outline-none"
                  />
                ))}
              </div>
              {otpStatus && (
                <span
                  className={`text-sm font-semibold ${
                    otpStatus === "Valid" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {otpStatus}
                </span>
              )}

              <div className="relative flex items-center bg-[#eeeeeecc] rounded-xl px-4 w-[350px] border border-[#00809d33]">
                <FiLock className="text-[#00809D] text-lg" />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full h-12 bg-transparent text-[#222831] placeholder-[#00809d99] px-3 focus:outline-none"
                />
              </div>

              <div className="relative flex items-center bg-[#eeeeeecc] rounded-xl px-4 w-[350px] border border-[#00809d33]">
                <FiLock className="text-[#00809D] text-lg" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-12 bg-transparent text-[#222831] placeholder-[#00809d99] px-3 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-[350px] h-12 flex items-center justify-center rounded-xl bg-[#00809D] hover:bg-[#065084] transition text-[#EEEEEE] text-lg font-semibold shadow-md"
              >
                Reset Password
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
