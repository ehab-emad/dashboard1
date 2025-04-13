import { useState } from "react";
import { AddBanckAccInputField } from "./AddBanckAccInputField";

const formFields = [
  { id: "accountHolder", label: "اسم صاحب الحساب", type: "text" },
  { id: "accountNumber", label: "رقم الحساب", type: "number" },
  { id: "ibanNumber", label: "رقم الآيبان", type: "number" }
];

function AddBankAccForm({close}) {

  
  const [formData, setFormData] = useState({
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    ibanNumber: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    close()
  };
  const closeform = () => {

    close()
  };

  const handleInputChange = (id, value) => {
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const styles = {
    overlay: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Expo Arabic, sans-serif',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    formContainer: {
      borderRadius: "24px",
      boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.04)",
      backgroundColor: "#fff",
      display: "flex",
      width: "auto",
      flexDirection: "column",
      justifyContent: "start",
      padding: "24px",
     
   
    },
    header: {
      paddingBottom: "8px",
      justifyContent: "end",
      alignItems: "center",
      borderBottom: "1px solid var(--line-saperator, rgba(0, 47, 54, 0.08))",
      display: "flex",
      width: "100%",
      gap: "8px",
      fontSize: "20px",
      color: "var(--Text, #252422)",
      textAlign: "right",
      lineHeight: 1.3,
      flexWrap: "wrap"
    },
    headerIcon: {
      aspectRatio: "1",
      objectFit: "contain",
      objectPosition: "center",
      width: "32px",
      alignSelf: "stretch",
      margin: "auto 0"
    },
    title: {
      alignSelf: "stretch",
      flex: 1,
      flexBasis: "0%",
      margin: "auto 0"
    },
    closeIcon: {
      aspectRatio: "1",
      objectFit: "contain",
      objectPosition: "center",
      width: "24px",
      alignSelf: "stretch",
      margin: "auto 0"
    },
    formContent: {
      display: "flex",
      marginTop: "32px",
      width: "100%",
      flexDirection: "column",
      fontSize: "14px",
      fontWeight: 400,
      justifyContent: "start"
    },
    submitButton: {
      alignSelf: "stretch",
      borderRadius: "50px",
      backgroundColor:'#26969C',
      marginTop: "32px",
      width: "auto",
      gap: "8px",
      overflow: "hidden",
      fontSize: "16px",
      color: "var(--White, #fff)",
      textAlign: "center",
      lineHeight: 1,
      padding: "16px",
      border: "none",
      cursor: "pointer"
    },    
    disabledButton: {
      alignSelf: "stretch",
      borderRadius: "50px",
      backgroundColor:'#8D8883',
      marginTop: "32px",
      width: "auto",
      gap: "8px",
      overflow: "hidden",
      fontSize: "16px",
      color: "var(--White, #fff)",
      textAlign: "center",
      lineHeight: 1,
      padding: "16px",
      border: "none",
      cursor: "pointer"
    },
 
  };


  const isFormComplete = () => {
    return Object.values(formData).every(field => field.trim() !== "");
  };

  return (
    <div style={styles.overlay}>
      <form style={styles.formContainer} onSubmit={handleSubmit}>
        <div style={styles.header}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/723c7003593e7ad8be580a63fd439c26a33a9587d770e1d491b516f7f460f97c?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e7"
            style={styles.headerIcon}
            alt="Close"
            onClick={closeform} // Ensure this is correctly set

          />
          <div style={styles.title}>إضافة حساب بنكي جديد</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3611b601316d1694b5decea418c92544c24317b7fc72f562021c54866cd295a2?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e7"
            style={styles.closeIcon}
            alt=""

          />
        </div>
        <div style={styles.formContent}>
          <AddBanckAccInputField
            label="اسم البنك"
            id="bankName"
            value={formData.bankName}
            onChange={handleInputChange}
            withIcon
          />
          {formFields.map(field => (
            <AddBanckAccInputField
              key={field.id}
              label={field.label}
              id={field.id}
              value={formData[field.id]}
              onChange={handleInputChange}
              type={field.type}
            />
          ))}
        </div>
        <button 
          type="submit" 
          style={{
            ...styles.submitButton,
            ...(isFormComplete() ? {} : styles.disabledButton) // Apply disabled styles if the form is not complete
          }} 
          disabled={!isFormComplete()}
        >
          اضافة حساب بنكي
        </button>
      </form>
    </div>
  );
}

export default AddBankAccForm;