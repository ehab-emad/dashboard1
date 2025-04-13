import { useState, useRef,useEffect } from 'react';
import IdentityUploadCard from './IdentityUploadCard';
import styled from "styled-components";
import { uploadIdImages } from '../../../../../store/reducers/firebasefunctions'; // Import the uploadIdImages function
import { useDispatch, useSelector } from 'react-redux';
import { getSeller } from '../../../../../store/reducers/sellerProductsReducer';



const CardsContainer = styled.div`
  @media (max-width: 620px) {
      flex-direction : column-reverse
  }
`




export default function UploadIDSeller() {


  const frontFileInputRef = useRef(null); // Ref for front file input
  const backFileInputRef = useRef(null); // Ref for back file input
  const [frontImageSrc, setFrontImageSrc] = useState(null); // State for front image URL
  const [backImageSrc, setBackImageSrc] = useState(null); // State for back image URL
  const [active,setActive] = useState(false); 

  const sellerid = localStorage.getItem('sellerId');

  const { sellerdata } = useSelector((state) => state.seller_products);
  const dispatch=useDispatch()

  useEffect(()=>{
    },[dispatch])

  const styles = {
    container: {
      borderRadius: '16px',
      backgroundColor: 'rgba(255, 255, 255, 1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'end',
      justifyContent: 'start',
      padding: '16px',
    },
    header: {
      paddingBottom: '8px',
      alignItems: 'center',
      alignSelf: 'stretch',
      borderBottom: '1px solid var(--line-saperator, rgba(0, 47, 54, 0.08))',
      justifyContent: 'space-between',
      display: 'flex',
      width: '100%',
      flexWrap: 'wrap',
    },
    filterButton: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50px",
      background: active ? '#26969C' : '#8d8883',
      gap: "4px",
      overflow: "hidden",
      fontSize: "16px",
      color: "white",
      lineHeight: "1",
      padding: "8px 16px 8px 12px",
      curser:'pointer',
      border:'none',
      outline: 'none'
    },
    saveButton: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50px',
      background: active ? 'var(--Cool, #26969C)':' #8d8883',
      gap: '4px',
      display: 'flex',
      fontSize: '16px',
      color: '#ffffff',
      fontWeight: '600',
      whiteSpace: 'nowrap',
      textAlign: 'center',
      padding: '16px 24px',
      cursor: 'pointer',
    },
    titleContainer: {
      alignSelf: 'stretch',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '18px',
      color: 'var(--Text, #252422)',
      fontWeight: '500',
      whiteSpace: 'nowrap',
      textAlign: 'right',
      justifyContent: 'end',
      flexWrap: 'wrap',
      flex: 1,
      flexBasis: '48px',
      margin: 'auto 0',
    },
    titleText: {
      alignSelf: 'stretch',
      margin: 'auto 0',
    },
    titleIcon: {
      aspectRatio: '1',
      objectFit: 'contain',
      objectPosition: 'center',
      width: '24px',
      alignSelf: 'stretch',
      margin: 'auto 0',
    },
    description: {
      color: 'var(--Paragraph, #736e67)',
      textAlign: 'right',
      marginTop: '24px',
      font: '400 14px/1 Expo Arabic, -apple-system, Roboto, Helvetica, sans-serif',
    },
    cardsContainer: {
      display: 'flex',
      marginTop: '24px',
      alignItems: 'center',
      gap: '24px',
      width: '100%',
      justifyContent: 'end',
      flexWrap: 'nowrap',
    },
    '@media (max-width: 991px)': {
      header: {
        maxWidth: '100%',
      },
      titleContainer: {
        maxWidth: '100%',
        whiteSpace: 'initial',
      },
      cardsContainer: {
        maxWidth: '100%',
      },
      saveButton: {
        padding: '0 20px',
      },
    },
  };

  useEffect(() => {
  
    dispatch(getSeller(sellerid))

    const areUploaded = !!frontImageSrc && !!backImageSrc; // Check if both images are uploaded
    setActive(areUploaded); // Update the active state
  }, [frontImageSrc, backImageSrc,dispatch]); // Run this effect when frontImageSrc or backImageSrc changes



  const handleUpload = (side) => {
    if (side === 'front') {
      frontFileInputRef.current.click(); // Trigger front file input
    } else if (side === 'back') {
      backFileInputRef.current.click(); // Trigger back file input
    }
  };

  const handleImageUpload = async (event, setImageSrc, side) => {
    const file = event.target.files[0]; // Get the uploaded file

    
    if (file) {
      try {

        const imageUrl = await uploadIdImages(file, side, sellerid); // Upload the file and get the URL

        // Update the state with the new image URL
        setImageSrc(imageUrl);

      
      } catch (error) {
        console.error(`Error uploading ${side} image:`, error);
        alert(`Failed to upload ${side} image. Please try again.`);
      }
    }
  };



  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleContainer}>
          <div style={styles.titleText}>الهوية</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/41cf1ed3ef90d5723c17be97b4fb0f4eea16d1b296187dd7dec224cb66d2fd32?placeholderIfAbsent=true&apiKey=57830d6d22374b3392882ad918f38de5"
            alt=""
            style={styles.titleIcon}
          />
        </div>
      </div>

      <p style={styles.description}>
        أبعاد الصورة تكون على الاقل 800 × 800 بكسل بصيغة PNG او JPG
      </p>

      <CardsContainer style={styles.cardsContainer}>
      <IdentityUploadCard
          title="الواجهة الامامية"
          onUpload={() => handleUpload('front')}
          fileInputProps={{
            ref: frontFileInputRef,
            type: 'file',
            accept: 'image/png, image/jpeg',
            onChange: (e) => handleImageUpload(e, setFrontImageSrc, 'front'), // Pass 'frontside'
          }}
          imageSrc={sellerdata?.idimages?.front || frontImageSrc}        />
       <IdentityUploadCard
          title="الواجهة الخلفية"
          onUpload={() => handleUpload('back')}
          fileInputProps={{
            ref: backFileInputRef,
            type: 'file',
            accept: 'image/png, image/jpeg',
            onChange: (e) => handleImageUpload(e, setBackImageSrc, 'back'), // Pass 'backside'
          }}
          imageSrc={sellerdata?.idimages?.back || backImageSrc}        />
      </CardsContainer>
   
   
    </div>
  );
}