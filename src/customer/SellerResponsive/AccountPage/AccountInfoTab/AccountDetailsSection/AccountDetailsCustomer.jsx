import {  useState,useEffect} from "react";
import SettingsCardFieldCustomer from "./SettingsCardFieldSeller.jsx";
import GenderSelectorCustomer from "./GenderSelectorSeller.jsx";
import VerificationCodeCustomer from "./VerificationCodeCustomer.jsx";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateCustomerDetails } from "../../../../../store/reducers/firebasefunctions.js";
import { getCustomer } from "../../../../../store/reducers/customerProductReducer.js";



const genderstyles = {
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'end',
    flex: 1,
  },
  
  labelWrapper: {
    alignSelf: 'end',
    display: 'flex',
    alignItems: 'start',
    gap: '8px',
    fontWeight: '400',
    justifyContent: 'end',
  },
  label: {
    color: 'var(--Text, #252422)',
    fontSize: '16px',
    lineHeight: '1',
  },
  badge: {
    alignSelf: 'stretch',
    borderRadius: '50px',
    background: 'var(--BG-gray, #f6f5f5)',
    gap: '8px',
    overflow: 'hidden',
    fontSize: '12px',
    color: 'var(--Paragraph, #736e67)',
    textAlign: 'center',
    lineHeight: '1',
    padding: '4px 8px',
  },
  input: {
    alignSelf: 'stretch',
    borderRadius: '16px',
    background: 'var(--BG-gray, #f6f5f5)',
    marginTop: '8px',
    width: 'auto',
    gap: '10px',
    fontSize: '14px',
    color: 'var(--Cool, #8d8883)',
    fontWeight: '300',
    lineHeight: '1',
    padding: '16px',
  }
};


const Details = styled.div`
  @media (max-width: 620px) {
      flex-direction : column-reverse
  }
`
const BigScreenFilterButton = styled.button`
margin: auto 0;
display: flex;
@media (max-width : 450px) {
  display : none;
}
`

const SmallScreenFilterButton = styled.button`
  display: none;
  margin-top : 10px;
  width : 100%;
  @media (max-width : 450px) {
    display : flex;
  }
`

const AccountDetailsCustomer = ({Sellerdata}) => {
  const [selectedGender, setSelectedGender] = useState(Sellerdata.gender);

  const [verifycode , setverifycode] = useState(false);
  const [selectedName, setSelectedName] = useState(Sellerdata.customername);
  const [selectedPhone, setSelectedPhone] = useState(Sellerdata.phone);
  const [selectedEmail, setSelectedEmail] = useState(Sellerdata.email);
  const [save, setSave] = useState(false);

  const customerid = localStorage.getItem('customerId');


  useEffect(() => {
    if (Sellerdata?.gender) {
      setSelectedGender(Sellerdata.gender);
    }
  }, [Sellerdata?.gender]);
  
  const handleSave = async () => {
   
      const customerData = {
        customername: selectedName,
        phone: selectedPhone,
        email: selectedEmail,
        gender: selectedGender,
      };

      await updateCustomerDetails(customerid, customerData); // Call the update function
      toast.success ('تم حفظ التعديلات بنجاح');
      
  
  }
  
  const styles = {
    container: {
      borderRadius: '16px',
      backgroundColor: 'rgba(255, 255, 255, 1)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Expo Arabic, sans-serif',
      justifyContent: 'start',
      padding: '16px',
      gap: '24px'
    },
    wrapper: {
        display: 'flex',
        marginTop: '16px',
        width: 'auto',
        gap: '8px',
        fontSize: '14px',
        lineHeight: '1',
        justifyContent: 'end',
        flexWrap: 'nowrap',
      },
    header: {
      paddingBottom: '8px',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid var(--line-saperator, rgba(0, 47, 54, 0.08))',
      display: 'flex',
      width: '100%',
      flexWrap: 'wrap',
    },
    filterButton: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50px",
      background: '#26969C' ,
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
    icon: {
      aspectRatio: "1",
      objectFit: "contain",
      objectPosition: "center",
      width: "16px",
      alignSelf: "stretch",
      margin: "auto 0",
    },
    titleWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '18px',
      color: 'var(--Text, #252422)',
      fontWeight: '400',
      textAlign: 'right',
      justifyContent: 'end',
      flexWrap: 'wrap',
      flex: 1,
      background:' white',
    },
  
    fieldsContainer: {
      display: 'flex',
      gap: '24px',
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'start',
    },
    row: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      gap: '24px',
      justifyContent: 'end',
      flexWrap: 'nowrap',
    },
  };
 const  toggleVerification =() => {

  }
// Use useEffect to update button activation state

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <BigScreenFilterButton style={styles.filterButton} onClick={handleSave}>
          <span style = {{display : 'block' , padding : '5px'}}>حفظ التعديلات</span> {/* Use span for text inside button */}
        </BigScreenFilterButton>
        <div style={styles.titleWrapper}>
          <span>تفاصيل الحساب</span>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/153d92b9a771df541e6342492453771c77aad84a0e08110e7966ac3bf9344464?placeholderIfAbsent=true&apiKey=2e2b2f636cc34221b980cbf747a16fe6" alt="" style={styles.icon} />
        </div>
      </div>

      <div style={styles.fieldsContainer}>
        <Details style={styles.row}>
          <SettingsCardFieldCustomer
            label="رقم الجوال"
            initialValue={Sellerdata?.phone || ""} // Fallback to empty string
            type='number'
            setSelected={setSelectedPhone}
            value={selectedPhone}

          />
          <SettingsCardFieldCustomer
            label="الاسم"
            initialValue={Sellerdata?.customername || ""} // Set the initial value here
            type='text'
            setSelected={setSelectedName}
            value={selectedName}



          />
        </Details>

        <Details style={styles.row}>
          <div style={genderstyles.wrapper}>
            <span style={{ fontSize: '16px' }}>الجنس</span>
            <GenderSelectorCustomer
              selectedGender={selectedGender || ""}
              onGenderSelect={setSelectedGender}
             

            />
          </div>
          <SettingsCardFieldCustomer
            label="البريد الإلكتروني"
            value={selectedEmail}
            initialValue={Sellerdata?.email || ""} // Set the initial value here
            type='email'
            setSelected={setSelectedEmail}

          />
        </Details>
      </div>

      {verifycode ? <VerificationCodeCustomer  close={toggleVerification}/> : null }
  
      <SmallScreenFilterButton 
            style={styles.filterButton} 
            onClick={handleSave} // Add onClick handler
          >
            <span style = {{display : 'block' , padding : '5px'}}>حفظ التعديلات</span> {/* Use span for text inside button */}
      </SmallScreenFilterButton>

    </div>
  );
};

export default AccountDetailsCustomer;