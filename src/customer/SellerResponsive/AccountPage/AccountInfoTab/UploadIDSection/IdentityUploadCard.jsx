import styled from "styled-components";

const styles = {
  cardContainer: {
    borderRadius: '24px',
    border: '1px solid var(--line-saperator, rgba(0, 47, 54, 0.08))',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
  },
  title: {
    color: 'var(--Text, #252422)',
    alignSelf: 'end',
    font: '400 16px/1 Expo Arabic, -apple-system, Roboto, Helvetica, sans-serif',
  },
  uploadArea: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '24px',
    background: 'var(--BG-gray,rgb(255, 255, 255))',
    display: 'flex',
    marginTop: '16px',
    flexDirection: 'column',
    padding: '10px',
    width: '100%'
  },
  uploadImage: {
    aspectRatio: '1',
    objectFit: 'contain',
    objectPosition: 'center',
    width: '100%',
    height: '100%',
  },
  uploadButton: {
    alignSelf: 'stretch',
    borderRadius: '50px',
    background: 'var(--Light, #e5f2f3)',
    marginTop: '16px',
    minHeight: '51px',
    width: '100%',
    gap: '8px',
    color: 'var(--Blue, #26969c)',
    textAlign: 'center',
    padding: '17px 40px',
    font: '500 14px Expo Arabic, -apple-system, Roboto, Helvetica, sans-serif',
    border: 'none',
    cursor: 'pointer',
  },
  fileInput: {
    display: 'none', // Hide the file input
  },
};

const CardContainer = styled.div`
  width : 50%;
  @media (max-width: 620px) {
      width : 90%;
  }
`
const UploadArea = styled.div`
  width : 50%;
  @media (max-width: 620px) {
      width : 30%;
  }
`


const IdentityUploadCard = ({ title, onUpload, fileInputProps ,imageSrc}) => {

  return (
    <CardContainer style={styles.cardContainer}>
      <div style={styles.title}>{title}</div>
      <UploadArea style={styles.uploadArea}>
        <img
          loading="lazy"
          src={imageSrc || "https://cdn.builder.io/api/v1/image/assets/TEMP/12ed17ac30bcf2d028ff8c71b7612f738a9f2ba64a6695a2520135801a1fbc2c?placeholderIfAbsent=true&apiKey=57830d6d22374b3392882ad918f38de5"} // Use uploaded image or default image
          alt="Identity card upload preview"
          style={styles.uploadImage}
        />
      </UploadArea>
      <button 
        onClick={onUpload}
        style={styles.uploadButton}
        tabIndex={0}
        aria-label={`Upload ${title}`}
      >
        رفع الصورة
      </button>
      {/* File input inside the card */}
      <input
        {...fileInputProps} // Pass all file input props from the parent
        style={styles.fileInput}
      />
    </CardContainer>
  );
};

export default IdentityUploadCard;