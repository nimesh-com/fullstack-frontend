/* 
 productId
    name
    price
    category
    description
    image
    isAvailable

*/
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import uploadFile from "../../utils/mediaUpload";
import { useLocation, useNavigate } from "react-router-dom";
export default function UpdateProduct() {
  const location = useLocation();
  const navigate=useNavigate();
  const [productId, setProductId] = useState(location.state.productId);
  const [name, setProductName] = useState(location.state.name);
  const [price, setProductPrice] = useState(location.state.price);
  const [category, setProductCategory] = useState(location.state.category);
  const [description, setProductDescription] = useState(
    location.state.description
  );
  const [image, setProductImage] = useState([]);
  const [isAvailable, setIsAvailable] = useState(location.state.isAvailable);

  async function UpdateProduct() {
    const promisArray = [];

    for (let i = 0; i < image.length; i++) {
      const promise = uploadFile(image[i]);
      promisArray[i] = promise;
    }
    const response = await Promise.all(promisArray);

    const productData = {
      productId: productId,
      name: name,
      price: price,
      category: category,
      description: description,
      image: response,
      isAvailable: isAvailable,
    };

    if (productData.image.length === 0) {
      productData.image = location.state.image;
    }

    const token = localStorage.getItem("token");

    if (token === null) {
      window.location.href = "/login";
      return;
    }

    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "/products/" + productId,
        productData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.success("Product Updated Successfully")
        navigate('/admin/products');
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to add product");
      });
  }

  return (
    <div className="w-full h-full p-10 flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl border border-gray-300">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Update Product
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product ID
          </label>
          <input
            disabled
            type="number"
            name="productId"
            onChange={(e) => setProductId(e.target.value)}
            value={productId}
            placeholder="Enter Product ID"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            onChange={(e) => setProductName(e.target.value)}
            value={name}
            placeholder="Enter Product Name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            onChange={(e) => setProductPrice(e.target.value)}
            value={price}
            placeholder="Enter Price"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            name="category"
            onChange={(e) => setProductCategory(e.target.value)}
            value={category}
            placeholder="Enter Category"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            rows="3"
            value={description}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Enter Description"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="file"
            name="image"
            multiple
            onChange={(e) => setProductImage(e.target.files)}
            placeholder="Enter Image URL"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="block text-sm font-medium text-gray-700">
            Is Available
          </label>
          <select
            name="isAvailable"
            onChange={(e) => setIsAvailable(e.target.value === "true")}
            className="mt-1 block w-40 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={UpdateProduct}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
}
