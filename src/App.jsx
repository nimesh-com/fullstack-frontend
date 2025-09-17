import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProductCard from "./Components/productCard";
import Home from "./Pages/home";
import Login from "./Pages/login";
import Test from "./Pages/test";
import AdminPage from "./Pages/adminPage";
import { Toaster } from "react-hot-toast";
import ClientPage from "./Pages/client/clientPage";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <div className="h-screen w-full flex justify-center items-center bg-primary text-accent ">
        <Routes path="/">
      {/*     <Route path="/forgot-password" element={<ForgotPassword />} /> */}
          <Route path="/test" element={<Test />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/*" element={<ClientPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
