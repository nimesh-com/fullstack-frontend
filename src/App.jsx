import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProductCard from "./Components/productCard";
import Home from "./Pages/home";
import Login from "./Pages/login";
import Test from "./Pages/test";

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen w-full flex justify-center items-center ">
        <Routes path="/">
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path = "/test" element={<Test/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
