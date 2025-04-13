import  { useState } from "react";
import axios from "axios";

const ImageUploader = ({ setImages ,setUploaded }) => {
  const [files, setFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    setIsUploading(true);

    try {
      const uploadPromises = files.map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", 'trent_images'); // Changed here
        return axios.post(
          `https://api.cloudinary.com/v1_1/dbztvm0io/image/upload`,
          formData
        );
      });

      const responses = await Promise.all(uploadPromises);
      const imageUrls = responses.map((response) => response.data.secure_url);

      setImages((prevImages) => [...prevImages, ...imageUrls]); 
      setUploadedImages((prevImages) => [...prevImages, ...imageUrls]);     
      alert("All images uploaded successfully!");
      setUploaded(true)

    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };



  return (
    <div>
      <h1>Upload Multiple Images to Cloudinary</h1>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload Images"}
      </button>

      {uploadedImages.length > 0 && (
        <div>
          <h2>Uploaded Images:</h2>
          {uploadedImages.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Uploaded ${index}`}
              style={{ width: "200px", margin: "10px" }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;