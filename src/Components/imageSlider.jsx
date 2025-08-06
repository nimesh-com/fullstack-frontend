import { act, useState } from "react";
export default function ImageSlider(props) {
  const image = props.image;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  return (
    <div className="w-[400px] h-[500px]">
      <img
        src={image[activeImageIndex]}
        alt=""
        className="w-full h-[400px] object-cover"
      />
      <div className="w-full h-[100px] flex flex-row justify-center items-center gap-[2px]">
        {image.map((image, index) => {
          return (
            <img
              src={image}
              key={index}
              className={
                "w-[90px] h-[90px] object-cover cursor-pointer" +
                (activeImageIndex == index ? " border border-red-500" : "")
              }
              onClick={() => {
                setActiveImageIndex(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
