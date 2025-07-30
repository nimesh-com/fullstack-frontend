import uploadFile from "../utils/mediaUpload";
import { useState } from "react";
export default function Test() {
  const [file, setFile] = useState(null);
  function handleUpload() {
    uploadFile(file)
      .then((url) => {
<<<<<<< HEAD
        console.log(url);
=======
        console;
>>>>>>> 87f72a34a43d18a72a5dda2b17bd948b7abfd89c
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="w-full h-full flex justify-center items-center">
<<<<<<< HEAD
      <input onChange={(e) => setFile(e.target.files[0])} type="file" />
=======
      <input onChange={setFile} type="file" />
>>>>>>> 87f72a34a43d18a72a5dda2b17bd948b7abfd89c
      <button
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload 
      </button>
    </div>
  );
} 
  

  