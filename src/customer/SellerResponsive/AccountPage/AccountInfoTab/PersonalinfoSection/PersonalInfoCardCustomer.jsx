import styled from "styled-components";
import { useState , useRef,useEffect} from "react";
import { uploadProfileImage, uploadProfileImageCustomer } from "../../../../../store/reducers/firebasefunctions";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProfilePic = styled.img`
width: 15%;
@media (max-width : 820px) {
  width : 20%;
};
@media (max-width : 526px) {
  width: 100px;
}
`
const BigScreenButton = styled.button`
display: flex;
@media (max-width : 526px) {
  display : none;
}
`
const SmallScreenButton = styled.button`
display: none;
@media (max-width : 526px) {
  width : auto;
  display : flex;
}
`
const PersonalInfo = styled.div`
align-items: center;
@media (max-width : 526px) {
  align-items: start;
}
`
const style = {
  personalInfo: {
    justifyContent: "end",
    display: "flex",
    gap: "24px",
    fontFamily: "Expo Arabic, sans-serif",
    flexWrap: "nowrap",
    padding: "16px",
    height: 'auto'
  },
  fileInput: {
    display: 'none', // Hide the file input
  },
  infoContainer: {
    display: "flex",
    width: "auto",
    height: ' auto',
    flexDirection: "column",
    alignItems: "end",
    justifyContent: "end",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
    justifyContent: "end",
    height: '100%',
    color: "var(--Text, #252422)",
    fontSize: "24px",
  
  },

  description: {
    color: "var(--Paragraph, #736e67)",
    textAlign: "right",
    fontSize: "14px",
    fontWeight: "500px",
  },
  uploadButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50px",
    background: "var(--Light, #e5f2f3)",
    gap: "4px",
    fontSize: "14px",
    color: "var(--Blue, #26969c)",
    fontWeight: "400",
    textAlign: "center",
    padding: "16px",
    cursor: "pointer",
    border: "none",
    width: 'auto',
    height : '100%',
  },
  uploadText: {
    alignSelf: "stretch",
  },
  uploadIcon: {
    aspectRatio: "1",
    objectFit: "contain",
    objectPosition: "center",
    width: "auto",
  },
  profileImage: {
    objectFit: "contain",
    objectPosition: "center",
    borderRadius: "24px",
  }
};

const PersonalInfoCardCustomer = ({customerby_Id}) => {
 

  const [profileImage, setProfileImage] = useState(customerby_Id.profileimage); // State to store the uploaded image
  const fileInputRef = useRef(null); // Ref to access the file input
  const [isUploading, setIsUploading] = useState(false); // State to manage upload status
  const customerid = localStorage.getItem('customerId');





  const handleImageUpload = async (event) => {
    const file = event.target.files[0]; // Get the uploaded file
    if (file) {
      setIsUploading(true);

      try {
        // Call the uploadImage function
        const imageUrl = await uploadProfileImageCustomer(file, customerid); // Pass the file and customerid

        // Set the profile image URL in the state
        setProfileImage(imageUrl);
        toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.warn("فشل تحميل الصورة");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input
  };


  useEffect(() => {
    if (customerby_Id?.profileimage) {
      setProfileImage(customerby_Id.profileimage);
    }
  }, [customerby_Id?.profileimage]);
  

  return (
    <div style={{display : "flex", flexDirection : "column" ,background: "var(--White, #fff)",boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.04)",borderRadius: "16px",padding: "16px"}}>
      <PersonalInfo style={style.personalInfo}>
      <div style={style.infoContainer}>
        <div style={style.textContainer}>
            الصورة الشخصية
          <p style={style.description}>
            أبعاد الصورة تكون على الاقل 800 × 800 بكسل بصيغة PNG او JPG
          </p>
        </div>
        <BigScreenButton 
          style={style.uploadButton}
          tabIndex="0"
          role="button"
          aria-label="رفع صورة جديدة"
          onClick={handleButtonClick} // Trigger file input on button click
          disabled={isUploading} // Disable button during upload

        >
   
            {isUploading ? "Uploading..." : "رفع صورة جديدة"}
            <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/bbf2cbb5c9c7bfc69b4a5c87c6d95db00342798d43a5c2cea1d8041b8f40edca?placeholderIfAbsent=true&apiKey=57830d6d22374b3392882ad918f38de5"
            style={style.uploadIcon}
            alt=""
            
          />
        </BigScreenButton>
      </div>
      <ProfilePic
        loading="lazy"
        src={profileImage || "https://cdn.builder.io/api/v1/image/assets/TEMP/618b91195b5058caa7c90d93430776f764c8effa4feb7a5875255e9a7cbfef3f?placeholderIfAbsent=true&apiKey=57830d6d22374b3392882ad918f38de5"} // Use uploaded image or default image
        style={style.profileImage}
        alt="الصورة الشخصية"
      />
      </PersonalInfo>
      <SmallScreenButton 
          style={style.uploadButton}
          tabIndex="0"
          role="button"
          aria-label="رفع صورة جديدة"
          onClick={handleButtonClick} // Trigger file input on button click
          disabled={isUploading} // Disable button during upload

        >
            <input
            ref={fileInputRef} // Attach ref to the file input
            type="file"
            accept="image/png, image/jpeg" // Accept only PNG and JPG files
            style={style.fileInput}
            onChange={handleImageUpload}
          />
          {isUploading ? "Uploading..." : "رفع صورة جديدة"}
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/bbf2cbb5c9c7bfc69b4a5c87c6d95db00342798d43a5c2cea1d8041b8f40edca?placeholderIfAbsent=true&apiKey=57830d6d22374b3392882ad918f38de5"
            style={style.uploadIcon}
            alt=""
            
          />
      </SmallScreenButton>
    </div>
  );
};

export default PersonalInfoCardCustomer;