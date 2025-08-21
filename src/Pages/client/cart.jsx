import { useState } from "react";
import { addToCart, getCart } from "../../utils/cart";
import { BiTrash } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";
import toast from "react-hot-toast";

export function CartPage() {
  const [cart, setCart] = useState(getCart()); // Initialize cart state
  return (
    <div className="w-full h-screen flex flex-col py- [40px] items-center">
      {cart.map((item) => {
        return (
          <div
            key={item.productId}
            className="w-[800px] h-[100px] m-[10px] bg-white rounded-lg shadow-2xl flex flex-row items-center relative"
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
            <div className="w-[190px] h-full flex justify-center items-center">
              <button
                className="w-[30px] flex justify-center items-center bg-blue-600 cursor-pointer hover:bg-blue-500 rounded-2xl text-white font-bold"
                onClick={() => {
                  addToCart(item, -1);
                  setCart(getCart());
                }}
              >
                -
              </button>
              <span className="mx-2 text-lg font-bold">{item.quantity}</span>
              <button
                className="w-[30px] flex justify-center items-center bg-blue-600 cursor-pointer hover:bg-blue-500 rounded-2xl text-white font-bold"
                onClick={() => {
                  addToCart(item, 1);
                  setCart(getCart());
                }}
              >
                +
              </button>
            </div>
            <div className="w-[190px] h-full flex justify-end items-center pr-[10px]">
              {/* {item.price * item.qty}*/}
              <span className="text-lg font-bold">
                Rs.{" "}
                {(item.price * item.quantity).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <button
              className="w-[30px] h-[30px] absolute right-[-40px] flex justify-center  items-center bg-red-600 cursor-pointer hover:bg-white hover:text-red-600 border-[2px] border-red-600 rounded-2xl text-white font-bold"
              onClick={() => {
                addToCart(item, -item.quantity); // Remove the item from the cart
                setCart(getCart()); // Update the cart state
                toast.success("Item removed from cart"); // Show success message
              }}
            >
              <TbTrash className="text-2xl" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
