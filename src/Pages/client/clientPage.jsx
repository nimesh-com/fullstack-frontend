import { Route, Routes } from "react-router-dom";
import Header from "../../Components/header";
import ProductsPage from "./productsPage";
import Overview from "./overview";
import { CartPage } from "./cart";
import { Checkout } from "./checkout";
import Register from "./register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "../../Pages/login";
import { ForgotPassword } from "./forgotPassword";
import Home from "../home";
import NotFoundPage from "./404NotFound";
import ContactUsPage from "./contactUs";
import AboutUsPage from "./aboutUs";
import UserDashboard from "./dashboardUser";

const clientId =
  "693549845879-aqb13uhia2nh7a8oo2jl12sg5oqanou7.apps.googleusercontent.com";

export default function ClientPage() {
  return (
    <div className="w-full h-screen max-h-screen">
      <Header />
      <GoogleOAuthProvider clientId={clientId}>
        <div className="w-full h-[calc(100%-100px)]">
          <Routes path="/">
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/overview/:productId" element={<Overview />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}
