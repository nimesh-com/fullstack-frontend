import { Route, Routes } from "react-router-dom";
import Header from "../../Components/header";
import ProductsPage from "./productsPage";
import Overview from "./overview";


export default function ClientPage() {
    return (
        <div className="w-full h-screen max-h-screen">
          <Header/>
          <div className="w-full h-[calc(100%-100px)]">
           <Routes path="/">
           <Route path="/" element={<h1>Home</h1>} />
           <Route path="/products"element={<ProductsPage/>} />
           <Route path="/reviews" element={<h1>Reviews</h1>} />
           <Route path="/about" element={<h1>About us</h1>} />
           <Route path="/contact" element={<h1>Contact us</h1>} />
           <Route path="/overview/:productId" element={<Overview/>} />
           <Route path="/*" element={<h1>404</h1>} />
           </Routes>
          </div>
        </div>
    );
}