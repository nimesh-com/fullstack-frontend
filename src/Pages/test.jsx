import { useState } from "react";

export default function Test() {
  const [count, setCount] = useState(0);
  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

  return (
    <div className="text-3xl w-full h-screen flex justify-center items-center bg-amber-300">
      <div className="w-[400px] h-[400px] flex flex-col justify-center items-center bg-white">
        <h1 className="text-4xl font-bold ">{count}</h1>

        <div className="w-full h-[100px] flex justify-center items-center">
          <button
            onClick={increment}
            className="text-4xl bg-blue-500 h-[45px] w-[45px] rounded-2xl flex justify-center items-center mx-2"
          >
            +
          </button>
          <button
            onClick={decrement}
            className="text-4xl bg-blue-500 h-[45px] w-[45px] rounded-2xl flex justify-center items-center"
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
}
