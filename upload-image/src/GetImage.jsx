import axios from "axios";
import { useState } from "react";

const ImageDisplay = () => {
  const [imageData, setImageData] = useState('');
  const [input, setInput] = useState(0);
   
  const loadImageFromServer = async () => {
    try {
      const response = await axios.get(`https://localhost:7099/image/${input}`, { responseType: 'arraybuffer' });
      const base64Image = btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
      setImageData(`data:image/jpeg;base64,${base64Image}`);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div>
        <input type="text" onChange={(e)=> setInput(e.target.value) }></input>
      <button onClick={loadImageFromServer}>Load Image</button>
      {imageData && <img src={imageData} alt="Loaded" />}
    </div>
  );
};

export default ImageDisplay;
