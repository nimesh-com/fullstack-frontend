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

const clientId =
  "693549845879-aqb13uhia2nh7a8oo2jl12sg5oqanou7.apps.googleusercontent.com";

export default function ClientPage() {
  return (
    <div className="w-full h-screen max-h-screen">
      <Header />
      <GoogleOAuthProvider clientId={clientId}>
        <div className="w-full h-[calc(100%-100px)]">
          <Routes path="/">
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/reviews" element={<h1>Reviews</h1>} />
            <Route path="/about" element={<h1>About us</h1>} />
            <Route path="/contact" element={<h1>Contact us</h1>} />
            <Route path="/overview/:productId" element={<Overview />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="/*" element={<h1>404</h1>} />
          </Routes>
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}
