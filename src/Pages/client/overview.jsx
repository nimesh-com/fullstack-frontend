import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../Components/loader";
import toast from "react-hot-toast";
import ImageSlider from "../../Components/imageSlider";

export default function Overview() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading"); // loading, success, error

  useEffect(() => {
    if (status === "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/products/" + params.productId)
        .then((res) => {
          setProduct(res.data);
          setStatus("success");
        })
        .catch((error) => {
          setStatus("error");
        });
    }
  }, [status]);

  return (
    <div className="w-full h-full">
      {status === "loading" && <Loader />}
      {status === "success" && (
        <div className="w-full h-full flex flex-row">
          <div className="w-[49%] h-full flex flex-col justify-center items-center">
            <ImageSlider image={product.image} />
          </div>
          <div className="w-[49%] h-full bg-red-500"></div>
        </div>
      )}
      {status === "error" && <div>Error</div>}
    </div>
  );
}
