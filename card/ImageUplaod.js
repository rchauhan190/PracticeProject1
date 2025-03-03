"use client";

import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Preview the image
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);

    
      const token = localStorage.getItem("token"); // Get token if needed
      const response = await axios.post(
        "https://api.staging.springprod.com/upload/v1/manager", // Replace with your backend API
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Add token if required
          },
        }
      );
      alert("Upload Successful! URL: " + response.data.url);
    
  };

  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h5">Upload an Image</Typography>

      {/* File Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="upload-input"
      />
      <label htmlFor="upload-input">
        <Button variant="contained" component="span">
          Choose Image
        </Button>
      </label>

      {/* Preview Selected Image */}
      {preview && (
        <Box mt={2}>
          <img
            src={preview}
            alt="Preview"
            style={{ width: "200px", height: "auto", borderRadius: "10px" }}
          />
        </Box>
      )}

      {/* Upload Button */}
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
       
        >
        
        </Button>
      </Box>
    </Box>
  );
}
