import {  useState} from "react";
import styled from "styled-components";
import { updateCustomerStatus, updateSellerStatus } from '../../../../../store/reducers/firebasefunctions'; // Import the uploadIdImages function
import { useSelector } from "react-redux";

const Container = styled.div`
@media (max-width: 510px) {
    flex-direction : column-reverse;
    gap: 0px;
}
`
const AccountDeactivationCustomer = ({Sellerdata}) => {
  const customerid = localStorage.getItem('customerId');


  const [activatestate, setActivateState] = useState(Sellerdata.active);
 

  const togglestate=async () => {
    
 await   updateCustomerStatus(customerid)
    setActivateState(!activatestate)

  }


  const styles = {
    container: {
      justifyContent: "end",
      alignItems: "center",
      alignSelf: "stretch",
      borderRadius: "24px",
      background: "var(--White, #fff)",
      boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.04)",
      display: "flex",
      fontFamily: "Expo Arabic, sans-serif",
      flexWrap: "wrap",
      padding: "20px",
    },
    deactivateButton: {
      alignSelf: "stretch",
      borderRadius: "50px",
      background: !activatestate ? '#26969C' :"var(--error-shade, #fae4e4)",
      gap: "8px",
      fontSize: "16px",
      color: !activatestate ? 'white' :"var(--Error-color, #d61b1b)",
      fontWeight: "400",
      textAlign: "center",
      margin: "auto 0",
      padding: "16px 40px",
      border: "none",
      cursor: "pointer",
      outline: 'none'
    },
    headerSection: {
      alignSelf: "stretch",
      display: "flex",
      minWidth: "240px",
      flexDirection: "column",
      justifyContent: "center",
      flex: 1,
      flexBasis: "80px",
      margin: "auto 0",
    },
    title: {
      margin : "0px",
      color: "var(--Text, #252422)",
      fontSize: "24px",
      fontWeight: "600",
      alignSelf: "end",
    },
    description: {
      color: "rgba(25, 23, 21, 0.5)",
      fontSize: "14px",
      fontWeight: "300",
      lineHeight: "1",
      textAlign: "right",
      marginTop: "8px",
    },
    "@media (max-width: 991px)": {
      container: {
        padding: "0 20px",
      },
      deactivateButton: {
        padding: "0 20px",
      },
      headerSection: {
        maxWidth: "100%",
      },
      description: {
        maxWidth: "100%",
      },
    },
  };


  return (
    <Container style={styles.container}>
      <button 
        style={styles.deactivateButton}
        tabIndex={0}
        role="button"
        aria-label="تعطيل الحساب"
        onClickCapture={togglestate}
      >
        {!activatestate ?'تفعيل الحساب': ' تعطيل الحساب'}
        
       
      </button>
      <div style={styles.headerSection}>
        <h2 style={styles.title}>  {!activatestate ?'تفعيل الحساب': ' تعطيل الحساب'}</h2>
        <p style={styles.description}>
          يرجى ملاحظة أنه عند حذف حسابك، سيتم حذف جميع معلومات الحساب نهائيًا
          دون إمكانية استعادتها.
        </p>
      </div>
    </Container>
  );
};

export default AccountDeactivationCustomer;