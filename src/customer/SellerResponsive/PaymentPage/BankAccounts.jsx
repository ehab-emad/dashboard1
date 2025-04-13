import BankAccountInfo from "./BankAccountInfo";
import AddBankAccForm from './AddBankAccForm';
import {  useState } from 'react';

const styles = {
  div: {
    borderRadius: "24px",
    backgroundColor: "rgba(255, 255, 255, 1)",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Expo Arabic, sans-serif",
    justifyContent: "start",
    padding: "16px",
    overflowX: 'hidden', // Hide horizontal scrollbar
  },
  header: {
    paddingBottom: "8px",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid rgba(0, 47, 54, 0.08)",
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
  },
  button: {
    alignSelf: "stretch",
    borderRadius: "50px",
    background: "#e5f2f3",
    backgroundColor: "#e5f2f3",
    gap: "8px",
    fontSize: "14px",
    color: "#27989e",
    fontWeight: "500",
    textAlign: "center",
    margin: "auto 0",
    padding: "16px 24px",
  },
  div2: {
    alignSelf: "stretch",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "18px",
    color: "#252422",
    fontWeight: "400",
    textAlign: "right",
    justifyContent: "end",
    flexWrap: "wrap",
    flex: 1,
    flexBasis: "48px",
    margin: "auto 0",
  },
  bankAccounts: {
    alignSelf: "stretch",
    flex: 1,
    flexBasis: "0%",
    margin: "auto 0",
  },
  img: {
    aspectRatio: "1",
    objectFit: "contain",
    objectPosition: "center",
    width: "24px",
    alignSelf: "stretch",
    margin: "auto 0",
  },
  noAccounts: {
    borderRadius: "16px",
    border: "1px solid rgba(0, 47, 54, 0.08)",
    alignSelf: "end",
    marginTop: "16px",
width: '100%', // Set to 100% to take full width of the parent
      height: 'auto', // Allow height to adjust based on content
      minWidth: '0', // Ensure no minimum width constraints
      maxWidth: '100%', // Ensure it doesn't exceed parent width
      flexGrow: 1, // Allow it to grow and fill available space
      flexShrink: 0, // Prevent shrinking if there's enough space
      boxSizing: 'border-box', // Include padding and borders in width calculations    fontSize: "14px",
    color: "#8c8b8a",
    fontWeight: "400",
    textAlign: "center",
    padding: "40px 16px",
  },
  "@media (max-width: 991px)": {
    header: {
      maxWidth: "100%",
    },
    button: {
      padding: "0 20px",
    },
    div2: {
      maxWidth: "100%",
    },
    bankAccounts: {
      maxWidth: "100%",
    },
  },
};

export default function BankAccounts() {

  const [FillForm, setFillForm] = useState(false)



  return (
    <div style={styles.div}>
      <div style={styles.header}>
        <div 
            style={styles.button}
            onClick={setFillForm}
        
          >إضافة حساب بنكي
        </div>
        <div style={styles.div2}>
          <div style={styles.bankAccounts}>الحسابات البنكية</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6299c531a36220e25a5565655e35b37447124e07118019883cdce27c2fabc1e6?placeholderIfAbsent=true&apiKey=d450998b662b4d7f9d8aea2e6e480818"
            style={styles.img}
            alt="Bank accounts icon"
          />
        </div>
      </div>
      { FillForm ? <AddBankAccForm close={setFillForm}/> : null }


      <BankAccountInfo />

    </div>
  );
}