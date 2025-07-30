import uploadFile from "../utils/mediaUpload";
import { useState } from "react";
export default function Test() {
  const [file, setFile] = useState(null);
  function handleUpload() {
    uploadFile(file)
      .then((url) => {
        console.log(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="w-full h-full flex justify-center items-center">
      <input onChange={(e) => setFile(e.target.files[0])} type="file" />
      <button
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload 
      </button>
    </div>
  );
} 
  

  