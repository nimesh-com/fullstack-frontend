import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ProductAdminPage() {
  const [a, setA] = useState(0);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/products",{headers: { Authorization: `Bearer ${localStorage.getItem("token")}`} })
      .then((response) => {
        setProducts(response.data);
      });
  }, [a]);
  return (
    <div className="w-full h-full border-[3px]">
      <table>
        <thead>
          <tr>
            <th className="p-[10px]">Image</th>
            <th className="p-[10px]">Product Id</th>
            <th className="p-[10px]">Name</th>
            <th className="p-[10px]">Price</th>
            <th className="p-[10px]">Category</th>
            <th className="p-[10px]">Description</th>
            <th className="p-[10px]">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td className="p-[10px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-[100px] h-[100px] object-cover"
                />
              </td>
              <td className="p-[10px]">{product.productId}</td>
              <td className="p-[10px]">{product.name}</td>
              <td className="p-[10px]">{product.price}</td>
              <td className="p-[10px]">{product.category}</td>
              <td className="p-[10px]">{product.description}</td>
              <td className="p-[10px]">
                <BiTrash
                  className="bg-red-500 text-4xl text-white p-[3px] rounded-full cursor-pointer"
                  onClick={() => {
                    const token = localStorage.getItem("token");
                    if (token === null) {
                      navigate("/login");
                      return;
                    }
                    axios
                      .delete(
                        import.meta.env.VITE_BACKEND_URL +
                          "/products/" +
                          product.productId,
                        {
                          headers: {
                            Authorization: "Bearer " + token,
                          },
                        }
                      )
                      .then((response) => {
                        setA(a + 1);
                        toast.success("Product Deleted Successfully");
                        navigate("/admin/products");
                      })
                      .catch((error) => {
                        toast.error("Product Deletion Failed");
                      });
                  }}
                />
              </td>
              <td>
                <BiEdit className="bg-green-500 text-4xl text-white p-[3px] rounded-full cursor-pointer" onClick={
                    ()=>{
                        navigate("/admin/updateProduct/",{
                            state:product
                        });
                    }
                }/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link
        to="/admin/addProduct"
        className=" cursor-pointer fixed right-[60px] bottom-[60px] text-white bg-black p-[20px] rounded-[10px]"
      >
        <BiPlus className="text-3xl" />
      </Link>
    </div>
  );
}
