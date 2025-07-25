export default function Login() {
  return (
    <div className="w-full h-screen bg-[url(./loginbg.jpg)] bg-cover bg-center flex justify-center items-center ">
      <div className="w-[500px] h-[500px] backdrop-blur-sm rounded-2xl relative gap-[20px] text-white flex flex-col items-center justify-center">
        <h1 className="absolute top-[20px] text-2xl text-bold  text-center my-5">
          Login
        </h1>
        <div className="w-[350px] flex flex-col">
          <span>
            <label className="text-white text-2xl">Email</label>
          </span>
          <input
            type="text"
            className="w-[350px] h-[50px]  rounded-2xl border border-white text-white"
          />
        </div>
        <div className="w-[350px] flex flex-col">
          <span>
            <label className="text-white  text-2xl">Password</label>
          </span>
          <input
            type="Password"
            className="w-[350px] h-[50px]  rounded-2xl border border-white text-white"
          />
        </div>
        <button className="w-[350px] h-[50px]   rounded-2xl bg-blue-500 text-white text-2xl">
          Login
        </button>
      </div>
    </div>
  );
}
