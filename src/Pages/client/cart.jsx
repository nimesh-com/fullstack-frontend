import { useState } from "react";
import { getCart } from "../../utils/cart";

export function CartPage() {
  const [cart, setCart] = useState(getCart()); // Initialize cart state
  return (
    <div className="w-full h-screen flex flex-col py- [40px] items-center">
      {cart.map((item) => {
        return (
          <div
            key={item.productId}
            className="w-[800px] h-[100px] m-[10px] bg-white rounded-lg shadow-2xl flex flex-row items-center"
          >
            <img
              src={item.image[0]}
              alt={item.name}
              className="w-[100px] h-[100px] object-cover"
            />
            <div className="w-[320px] h-full not-first:flex flex-col justify-center pl-[10px]">
              <span className="text-lg font-bold">{item.name}</span>
              <span className="text-lg"></span>
              <span className="text-lg font-bold">
                Rs.{" "}
                {item.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="w-[190px] h-full bg-amber-700"></div>
            <div className="w-[190px] h-full bg-amber-500"></div>
          </div>
        );
      })}
    </div>
  );
}
