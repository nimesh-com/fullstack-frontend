import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProductCard from "./Components/productCard";
import Home from "./Pages/home";
import Login from "./Pages/login";
import Test from "./Pages/test";
import AdminPage from "./Pages/adminPage";

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen w-full flex justify-center items-center ">
        <Routes path="/">
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path = "/test" element={<Test/>}/>
          <Route path="/admin/*" element={<AdminPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
