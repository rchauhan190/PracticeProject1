"use client";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import Image from "next/image";
import defaultImage from "../../public/user.jpg";

export default function EditProfile() {
  // const [profile, setProfile] = useState({});
  const [image, setImage] = useState(defaultImage);
  const [file, setFile] = useState(null);
  const [updateProfile, setUpdateProfile] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    countryName: "",
    countryCode: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://api.staging.springprod.com/auth/v1/manager/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Profile Data:", response.data.data);
        
        setUpdateProfile({
          fullName: response.data.data.fullName || "",
          email: response.data.data.email || "",
          phoneNumber: response.data.data.phoneNumber || "",
          countryName: response.data.data.countryName || "",
          countryCode: response.data.data.countryCode || "",
        });

        const storedImage = localStorage.getItem("profileImage");
        if (storedImage) {
          setImage(storedImage);
        } else if (response.data.data.profileImage) {
          setImage(response.data.data.profileImage);
        }
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdateProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        "https://api.staging.springprod.com/auth/v1/manager/profile",
        updateProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update Response:", response.data);
      alert("Profile updated successfully!");

      const updatedProfile = await axios.get(
        "https://api.staging.springprod.com/auth/v1/manager/profile",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUpdateProfile(updatedProfile.data.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleImageUpload = async () => {
    if (!file) {
      alert("Please select an image first!");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("path", "/uploads");

    try {
      const response = await axios.post(
        "https://api.staging.springprod.com/upload/v1/manager",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Image Upload Response:", response.data.data);
      alert("Profile image updated successfully!");

      const permanentImageUrl = response.data.data.url;
      setImage(permanentImageUrl);
      localStorage.setItem("profileImage", permanentImageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        margin: "30px 0px",
        padding: "5px 20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "20vh",
          backgroundColor: "#2b5bc7",
          margin: "14px",
          padding: "32px",
          boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)",
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="image-upload"
          />

          <Image
            src={typeof image === "string" ?  image : defaultImage}
            alt="Profile"
            width={100}
            height={100}
            style={{ borderRadius: "50%" }}
            unoptimized
          />
          <label htmlFor="image-upload">
            <Button
              sx={{ color: "#2b5bc7", backgroundColor: "#fff" }}
              component="span"
            >
              Select Image
            </Button>
          </label>
          <Button
            onClick={handleImageUpload}
            sx={{
              backgroundColor: "#fff",
              color: "#2b5bc7",
            }}
          >
            Upload Image
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "#ffffff",
          margin: "14px",
          padding: "32px",
          boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "70px",
            margin: "0px 54px",
            padding: "0px 21px",
          }}
        >
          <FormControl>
            <FormLabel htmlFor="fullName">Name</FormLabel>
            <TextField
              name="fullName"
              required
              fullWidth
              value={updateProfile.fullName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              required
              fullWidth
              name="email"
              value={updateProfile.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="phoneNumber">Mobile Number</FormLabel>
            <TextField
              name="phoneNumber"
              required
              fullWidth
              value={updateProfile.phoneNumber}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="countryName">Country Name</FormLabel>
            <TextField
              required
              fullWidth
              name="countryName"
              value={updateProfile.countryName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="countryCode">Country Code</FormLabel>
            <TextField
              required
              fullWidth
              name="countryCode"
              value={updateProfile.countryCode}
              onChange={handleChange}
            />
          </FormControl>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          gap: "16px",
          margin: "14px",
        }}
      >
        <Button
          sx={{ backgroundColor: "#2b5bc7", color: "#fff", width: "150px" }}
          onClick={handleUpdateProfile}
        >
          Update
        </Button>
        <Button
          sx={{ color: "#2b5bc7", border: "1px solid #2b5bc7" }}
          onClick={() => setShowUpdateButton(false)}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
