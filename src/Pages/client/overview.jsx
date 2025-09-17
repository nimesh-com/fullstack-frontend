import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../Components/loader";
import toast from "react-hot-toast";
import ImageSlider from "../../Components/imageSlider";
import { addToCart, getCart } from "../../utils/cart";
import { FiTrash2 } from "react-icons/fi";
import Footer from "../../Components/footer"; // added footer

export default function Overview() {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewStatus, setReviewStatus] = useState("loading");

  const email = localStorage.getItem("email");

  useEffect(() => {
    if (status === "loading") {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/${params.productId}`
        )
        .then((res) => {
          setProduct(res.data);
          setStatus("success");
        })
        .catch(() => {
          setStatus("error");
        });
    }
  }, [status, params.productId]);

  useEffect(() => {
    if (reviewStatus === "loading") {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/api/reviews/${params.productId}`
        )
        .then((res) => {
          setReviews(res.data);
          setReviewStatus("done");
        })
        .catch(() => {
          console.log("Error fetching reviews");
        });
    }
  }, [reviewStatus, params.productId]);

  function handleDeleteReview(reviewId) {
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/reviews/" + reviewId)
      .then(() => {
        toast.success("Review deleted");
        setReviewStatus("loading");
      })
      .catch(() => {
        toast.error("Error deleting review");
      });
  }

  function handleReviewSubmit() {
    if (review.trim() === "") {
      toast.error("Review cannot be empty");
      return;
    }
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`, {
        productId: params.productId,
        review: review,
        email: email,
      })
      .then(() => {
        toast.success("Review added successfully");
        setReview("");
        setReviewStatus("loading");
      })
      .catch(() => {
        toast.error("Error adding review");
      });
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Content */}
      <div className="flex-1 w-full bg-gray-50 p-6 flex flex-col items-center gap-10">
        {status === "loading" && <Loader />}
        {status === "success" && (
          <>
            {/* Product Details */}
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
              <div className="flex justify-center items-center bg-gray-100 p-6">
                <ImageSlider image={product.image} />
              </div>
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <h1 className="font-extrabold text-3xl text-accent mb-4">
                    {product.name}
                  </h1>
                  {product.labledPrice > product.price ? (
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-2xl font-bold text-red-500 line-through">
                        Rs.{" "}
                        {product.labledPrice.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                      <span className="text-3xl font-bold text-green-600">
                        Rs.{" "}
                        {product.price.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  ) : (
                    <p className="text-3xl font-bold text-gray-900 mb-6">
                      Rs.{" "}
                      {product.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  )}
                  <p className="text-gray-600 leading-relaxed mb-8">
                    {product.description}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      addToCart(product, 1);
                      toast.success("Product added to cart!");
                    }}
                    className="w-1/2 py-3 bg-secondary text-white font-bold rounded-lg shadow hover:bg-btn-hover transition-all cursor-pointer"
                  >
                    Add to Cart
                  </button>
                  <button
                    className="w-1/2 py-3 bg-green-600 text-white font-bold rounded-lg shadow hover:bg-green-700 transition-all cursor-pointer"
                    onClick={() => {
                      addToCart(product, 1);
                      navigate("/checkout", { state: { items: getCart() } });
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="w-full max-w-6xl flex flex-col gap-10">
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-accent mb-6">
                  Customer Reviews
                </h2>

                {reviews.length === 0 && (
                  <p className="text-gray-500 italic mb-4">
                    No reviews yet. Be the first to review!
                  </p>
                )}

                <div className="flex flex-col gap-6">
                  {reviews.map((review) => (
                    <div
                      key={review._id}
                      className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition"
                    >
                      {/* User Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-lg">
                          {review.userId.firstname[0]}
                          {review.userId.lastname[0]}
                        </div>
                      </div>

                      {/* Review Content */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                          <h3 className="text-lg font-semibold text-accent">
                            {review.userId.firstname} {review.userId.lastname}
                          </h3>
                          <span className="text-gray-400 text-sm mt-1 md:mt-0">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700 mt-2">{review.review}</p>
                      </div>

                      {/* Delete Button */}
                      <div className="flex flex-col items-center ml-4 gap-2">
                        {email === review.userId.email && (
                          <button
                            onClick={() => handleDeleteReview(review._id)}
                            className="mt-2 text-red-500 hover:text-red-700 transition cursor-pointer"
                            title="Delete Review"
                          >
                            <FiTrash2 className="text-xl" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Write Review */}
                {localStorage.getItem("token") && (
                  <div className="mt-8 bg-gray-50 rounded-xl p-6 shadow-inner">
                    <h3 className="text-xl font-semibold text-accent mb-4">
                      Write a Review
                    </h3>
                    <div className="flex flex-col gap-4">
                      <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent"
                        rows={4}
                        placeholder="Share your experience..."
                        required
                      />
                      <button
                        onClick={handleReviewSubmit}
                        type="submit"
                        className="self-end bg-accent text-white font-bold px-6 py-2 rounded-lg shadow hover:bg-accent-dark transition"
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        {status === "error" && (
          <div className="text-red-500 font-bold text-lg">
            Error loading product
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
