import { Link } from "react-router-dom";
export default function ProductCard(props) {
  const product = props.product
  return (
    <Link to={"/overview/"+product.productId} className="w-[300px] h-[400px] flex-col shadow-2xl rounded-2xl shrink-0 overflow-hidden cursor-pointer bg-white hover:scale-105 transition-all duration-200">
      <img
        src={product.image[0]}
        className="w-full h-[275px] object-cover"
        alt=""
      />
      <div className="w-full h-[125px] p-[10px]">
        <h1>Product Id: {product.productId}</h1>
        <h1 className="font-bold text-lg">{product.name}</h1>
        <div>
          {product.labledPrice > product.price ? (
            <p>
              {" "}
              <span className="line-through text-red-500">
                Rs.{" "}
                {product.labledPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>{" "}
              <span>
                Rs.{" "}
                {product.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>{" "}
            </p>
          ) : (
            <span>
              Rs.{" "}
              {product.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          )}
        </div>
        <h1 className="font-bold text-lg">{product.category}</h1>
      </div>
    </Link>
  );
}
