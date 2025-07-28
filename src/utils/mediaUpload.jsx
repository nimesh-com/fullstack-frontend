const url = "https://sshhtkcwaautcrognpyx.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzaGh0a2N3YWF1dGNyb2ducHl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MDI3NDEsImV4cCI6MjA2OTI3ODc0MX0.O_a3pITg00SAflX3BWOo66jaU81TslyTl9peXZr4APc";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(url, key);
export default function uploadFile(file) {
  const promis = new Promise((resolve, reject) => {
    if (file == null) {
      reject("No File Selected");
      return;
    }
    const timStamp = new Date().getTime();
    const fileName = timStamp + "-" + file.name;

    supabase.storage
      .from("image")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })
      
      .then(() => {
        const publicUrl = supabase.storage.from("image").getPublicUrl(fileName)
          .data.publicUrl;
        console.log(publicUrl);
        resolve(publicUrl);
      })
      .catch((error) => {
        console.log("Error uploading file:", error);
        reject("Failed to upload file");
      });
  });
  return promis;

}
