import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../../Components/loader";

export default function ProductAdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          setProducts(response.data);
          setIsLoading(false);
        })
        .catch(() => {
          toast.error("Failed to fetch products");
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📦 Manage Products</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <Loader />
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-200">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 text-sm uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Product ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Labeled Price</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, idx) => (
                <tr
                  key={product.productId}
                  className={`hover:bg-gray-50 transition ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-3">
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover shadow"
                    />
                  </td>
                  <td className="px-6 py-3 font-medium">{product.productId}</td>
                  <td className="px-6 py-3 font-semibold">{product.name}</td>
                  <td className="px-6 py-3 text-green-600 font-bold">
                    ${product.price}
                  </td>
                  <td className="px-6 py-3 line-through text-gray-400">
                    ${product.labledPrice}
                  </td>
                  <td className="px-6 py-3">{product.category}</td>
              
                  <td className="px-6 py-3 flex items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        navigate("/admin/updateProduct/", { state: product });
                      }}
                      className="p-2 rounded-full bg-green-100 hover:bg-green-500 hover:text-white transition"
                    >
                      <BiEdit size={22} />
                    </button>
                    <button
                      onClick={() => {
                        const token = localStorage.getItem("token");
                        if (!token) {
                          navigate("/login");
                          return;
                        }
                        axios
                          .delete(
                            import.meta.env.VITE_BACKEND_URL +
                              "/products/" +
                              product.productId,
                            {
                              headers: { Authorization: "Bearer " + token },
                            }
                          )
                          .then(() => {
                            setIsLoading(!isLoading);
                            toast.success("✅ Product Deleted Successfully");
                          })
                          .catch(() => {
                            toast.error("❌ Product Deletion Failed");
                          });
                      }}
                      className="p-2 rounded-full bg-red-100 hover:bg-red-500 hover:text-white transition"
                    >
                      <BiTrash size={22} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Floating Add Button */}
      <Link
        to="/admin/addProduct"
        className="fixed right-8 bottom-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:scale-110 transition transform p-4 rounded-full"
      >
        <BiPlus className="text-3xl" />
      </Link>
    </div>
  );
}
