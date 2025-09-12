// src/Pages/home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../Components/productCard";
import Loader from "../Components/Loader";

// Swiper v12+ imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + "/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const sectionBg = "rgba(238,238,238,0.15)"; // semi-transparent section

  return (
    <div
      className="w-full flex flex-col min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #EEEEEE, #e0f7fa, #d4f1ff, #ffe8b3)",
        "--color-primary": "#EEEEEE",
        "--color-secondary": "#00809D",
        "--color-accent": "#222831",
        "--color-btn-hover": "#065084",
      }}
    >
      {/* Hero Section */}
      <div
        className="min-h-screen flex flex-col justify-center items-center text-center px-4"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(238,238,238,0.009) 90%, rgba(238,238,238,1) 100%), url('/home-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1
          className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg"
          style={{ color: "white" }}
        >
          Welcome to LuxeAura Cosmetics
        </h1>
        <p
          className="text-lg md:text-xl mb-8 max-w-2xl drop-shadow-md"
          style={{ color: "white" }}
        >
          Discover the latest beauty products, exclusive deals, and expert tips
          to look and feel your best. Shop your favorite brands and explore new
          arrivals!
        </p>
        <Link
          to="/products"
          className="flex items-center gap-2 px-6 py-3 bg-[var(--color-secondary)] hover:bg-[var(--color-btn-hover)] text-[var(--color-primary)] font-bold rounded-xl text-lg shadow transition"
        >
          Explore Products
        </Link>
      </div>

      {/* Featured Products Slider */}
      <div
        className="max-w-7xl mx-auto mt-16 px-4 py-8 rounded-3xl"
        style={{ background: sectionBg }}
      >
        <h2
          className="text-3xl font-bold mb-6"
          style={{ color: "var(--color-secondary)" }}
        >
          Featured Products
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop
            slidesPerView="auto"
            spaceBetween={25}
          >
            {products.map((product) => (
              <SwiperSlide key={product.productId} style={{ width: "320px" }}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Categories / Features Section */}
      <div
        className="max-w-7xl mx-auto mt-16 px-4 py-12 rounded-3xl"
        style={{ background: sectionBg }}
      >
        <h2
          className="text-3xl font-bold mb-8 text-center"
          style={{ color: "var(--color-secondary)" }}
        >
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[white] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
            <h3 className="text-xl font-bold mb-2 text-[var(--color-accent)]">
              Premium Quality
            </h3>
            <p>Only high-quality cosmetic products from trusted brands.</p>
          </div>
          <div className="bg-[white] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
            <h3 className="text-xl font-bold mb-2 text-[var(--color-accent)]">
              Fast Delivery
            </h3>
            <p>
              Get your products delivered quickly and safely to your doorstep.
            </p>
          </div>
          <div className="bg-[white] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
            <h3 className="text-xl font-bold mb-2 text-[var(--color-accent)]">
              Exclusive Deals
            </h3>
            <p>Enjoy special offers and discounts on your favorite products.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div
        className="max-w-7xl mx-auto mt-16 px-4 py-12 text-center rounded-3xl"
        style={{ background: sectionBg }}
      >
        <h2
          className="text-3xl font-bold mb-6"
          style={{ color: "var(--color-secondary)" }}
        >
          Start Your Beauty Journey Today
        </h2>
        <Link
          to="/products"
          className="inline-block px-8 py-4 bg-[var(--color-secondary)] hover:bg-[var(--color-btn-hover)] text-[var(--color-primary)] font-bold rounded-xl shadow-lg transition"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
