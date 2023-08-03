import "./App.css";
import axios from "axios";
import { useState } from "react";
import Dropzone from "react-dropzone";
import ImageDisplay from "./GetImage";

function App() {
  const [image, setImage] = useState([]);

  // const handleDrop = (acceptedFiles) => {
  //   setImage(acceptedFiles[0]);
  // }; 
  const handleDrop = (acceptedFiles) => {
    // Revoke Blob URLs from old images
    image.forEach((img) => URL.revokeObjectURL(img.preview));
  
    // Set the new set of images
    setImage(acceptedFiles);
  };

  // const handleSubmit = async () => {
  //   if (image) {
  //     const formData = new FormData();
  //     formData.append("image", image);

  //     try {
  //       const response = await axios.post("https://localhost:7099/image/upload", formData);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.log("Error uploading image:", error);
  //     }
  //   }
  // };

  const handleSubmit = async () => {
    if (image.length > 0) {
      try {
        const responses = await Promise.all(
          image.map(async (file) => {
            const formData = new FormData();
            formData.append("image", file);
            return await axios.post("https://localhost:7099/image/upload", formData);
          })
        );

        console.log(responses.map((response) => response.data));
      } catch (error) {
        console.log("Error uploading images:", error);
      }
    }
  };

  return (
    <>
      <Dropzone
      onDrop={handleDrop}  >
        {({ getRootProps, getInputProps }) => (
          <div style={{backgroundColor: "red", width: "30%"}} {...getRootProps()}>
            <input {...getInputProps()} />
            {image.length > 0 ? (
              <div>
              {image.map((image, index) => (
                <img key={index} src={URL.createObjectURL(image)} alt={`Uploaded ${index}`} />
              ))}
            </div>
            ) : (
              <p>Drag and drop an image here, or click to select one.</p>
            )}
          </div>
        )}
      </Dropzone>
      <button onClick={handleSubmit}>Upload Image</button>
      <ImageDisplay/>
    </>
  );
}

export default App;
