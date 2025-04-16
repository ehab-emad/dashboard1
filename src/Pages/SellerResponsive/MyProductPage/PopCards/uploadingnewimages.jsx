import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ImageUploader1 = ({ updatedProduct, setUpdatedProduct }) => {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("من فضلك اختر صورة واحدة على الأقل.");
      return;
    }

    setIsUploading(true);

    try {
      const uploadPromises = files.map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "trent_images");
        return axios.post(
          `https://api.cloudinary.com/v1_1/dbztvm0io/image/upload`,
          formData
        );
      });

      const responses = await Promise.all(uploadPromises);
      const imageUrls = responses.map((res) => res.data.secure_url);

      setImages((prev) => [...prev, ...imageUrls]);

      setUpdatedProduct((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...imageUrls],
      }));

      toast.success("تم رفع الصور بنجاح");
      setFiles([]); // نفضي الملفات بعد الرفع
    } catch (err) {
      console.error("Error uploading images:", err);
      alert("فشل في رفع الصور، حاول مرة تانية.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (urlToRemove) => {
    setImages((prev) => prev.filter((url) => url !== urlToRemove));
    setUpdatedProduct((prev) => ({
      ...prev,
      images: prev.images.filter((url) => url !== urlToRemove),
    }));
  };

  return (
    <div>
      {/* عرض صور تم رفعها */}
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "15px" }}>
        {updatedProduct.images?.map((url, index) => (
          <div key={index} style={{ position: "relative", margin: "10px" }}>
            <img
              src={url}
              alt={`img-${index}`}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
            <button
              onClick={() => handleRemoveImage(url)}
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* اختيار الصور واستعراضها قبل الرفع */}
      <div style={{ marginTop: "15px", marginBottom: "15px" }}>
        <label
          htmlFor="file-upload"
          style={{
            display: "inline-block",
            backgroundColor: "#007BFF",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            transition: "0.3s",
          }}
        >
          اختر الصورة
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setFiles(Array.from(e.target.files))}
          style={{ display: "none" }}
        />
      </div>

      {/* عرض الصور قبل الرفع + روابط مؤقتة */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {files.map((file, index) => {
          const previewUrl = URL.createObjectURL(file);
          return (
            <div key={index} style={{ margin: "10px", textAlign: "center" }}>
              <img
                src={previewUrl}
                alt={`preview-${index}`}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "8px",
                  objectFit: "cover",
                  marginBottom: "5px",
                }}
              />
             
            </div>
          );
        })}
      </div>

      <button
        onClick={handleUpload}
        disabled={isUploading}
        style={{
          backgroundColor: isUploading ? "#ccc" : "#28a745",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: isUploading ? "not-allowed" : "pointer",
          fontWeight: "bold",
          marginTop: "15px",
        }}
      >
        {isUploading ? "جاري الرفع..." : "رفع الصور"}
      </button>
    </div>
  );
};

export default ImageUploader1;
