import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import mriImage from "../assets/mri.jpg";
import { useNavigate } from "react-router-dom";




export const LandingPage = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
 

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) {
      setMessage("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post('/predict', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Assuming the backend response contains the diagnostic result
      const diagnosticResult = response.data;
    navigate("/details", { state: { diagnosticResult } });
    } catch (error) {
      setMessage("An error occurred while submitting the image.");
    }
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <div className="left-side">
            <img src={mriImage} alt="MRI" className="mri-image" />
          </div>

          <div className="right-side">
            <h1>MRI Scan Analyzer</h1>
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              {image ? (
                <p>{image.name}</p>
              ) : (
                <p>Drag & drop an image here, or click to select one</p>
              )}
            </div>
            <button onClick={handleSubmit}>Submit</button>

            {message && <p>{message}</p>}
          </div>
        </header>
      </div>
    </>
  );
};
