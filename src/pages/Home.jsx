import { useState } from "react";
import myImage from "../assets/gallery.png";
import iconUpload from "../assets/upload.png";
import PredictHoaxService from "../services/PredictHoaxService";

export default function Home() {
  const [fileSelected, setFileSelected] = useState(false);
  const [fileUpload, setFileUpload] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileUpload(file);
      console.log("File uploaded:", file);
      setFileSelected(true);
      // Kamu bisa menambahkan logika lain di sini untuk mengunggah file
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!fileSelected) {
      console.log("Please select a file");
      return;
    }
    // yg di postman bisa  seperti ini
    // const data = {
    //   image : setFileSelected
    // }
    const data = new FormData();
    data.append("image", fileUpload);

    try {
      const result = await PredictHoaxService.predict(data);
      console.log("result1", result.data);
      console.log("data", data);
      if (result) {
        console.log(result);
        // window.location.href = "/";
      }
    } catch (error) {
      console.log(error.response.data);
      // setAlert(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div>
        <div className="relative w-[200px] pt-10">
          <img src={myImage} alt="imageUpload" />
          <div className="absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-50 rounded-full z-10 flex items-center justify-center">
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            <img className="w-[25px]" src={iconUpload} alt="icon" />
          </div>
        </div>
        {fileSelected && (
          <form className="flex justify-center mt-4" onSubmit={onSubmit}>
            <button className="mt-4 p-2 bg-blue-500 text-white rounded">
              Scan Yuk
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
