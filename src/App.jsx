import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProductCard from "./Components/productCard";
import Home from "./Pages/home";
import Login from "./Pages/login";
import Test from "./Pages/test";
import AdminPage from "./Pages/adminPage";
import { Toaster } from "react-hot-toast";
import ClientPage from "./Pages/client/clientPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId="693549845879-aqb13uhia2nh7a8oo2jl12sg5oqanou7.apps.googleusercontent.com";
function App() {
  return (
    <BrowserRouter>
    <GoogleOAuthProvider clientId={clientId}>
      <Toaster position="top-right" />
      <div className="h-screen w-full flex justify-center items-center bg-primary text-accent ">
        <Routes path="/">
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<Test />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/*" element={<ClientPage />} />
        </Routes>
      </div>
    </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
