import  { useEffect, useState } from 'react';
import PersonalInfoCardCustomer from './AccountInfoTab/PersonalinfoSection/PersonalInfoCardCustomer';
import AccountDetailsCustomer from  './AccountInfoTab/AccountDetailsSection/AccountDetailsCustomer'
import UploadIDCustomer from './AccountInfoTab/UploadIDSection/UploadIDCustomer';
import AccountDeactivationCustomer from './AccountInfoTab/AccountDactivationSection/AccountDeactivationCustomer';
import AddressesList from './AddressesTab/AddressesListSeller';
import PaymentMethodsCustomer from './BillsPaymentsTab/PaymentMethodsSection/PaymentMethodsCustomer';
import Transactions from '../PaymentPage/Transactions';
import { useDispatch, useSelector } from 'react-redux';
import { customerbyId } from '../../../store/reducers/sellerProductsReducer';
const styles = {
  contactContainer: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Expo Arabic, sans-serif',
    gap:'16px'
  },
  navButtons: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    textAlign: 'center',
    lineHeight: 1,
    justifyContent: 'end',
    flexWrap: 'wrap',
  },
  navButton: {
    alignSelf: 'stretch',
    borderRadius: '50px',
    gap: '8px',
    padding: '16px 24px',
    background: 'var(--White, #fff)',
    color: 'var(--Cool, #8d8883)',
    fontWeight: 400,
    outline: ' none',
    border: 'none'

  },
  navButtonActive: {
    alignSelf: 'stretch',
    borderRadius: '50px',
    gap: '8px',
    padding: '16px 24px',
    background: 'var(--Blue, #27989e)',
    boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.08)',
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: 400,
    outline: ' none',
    border: 'none',

  },
  contentSection: {
    display: 'flex',
    marginTop: '24px',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '24px 0',
  },
  contentWrapper: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'start',
  },
  sectionTitle: {
    color: 'var(--Text, #252422)',
    fontSize: '24px',
    fontWeight: 600,
    alignSelf: 'end',
  },
  cardsGrid: {
    display: 'flex',
    marginTop: '32px',
    width: '100%',
    alignItems: 'start',
    gap: '16px',
    textAlign: 'right',
    justifyContent: 'end',
    flexWrap: 'wrap',
  },
  contactCard: {
    justifyContent: 'end',
    alignItems: 'start',
    borderRadius: '16px',
    background: 'var(--White, #fff)',
    boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.04)',
    display: 'flex',
    minWidth: '240px',
    gap: '16px',
    overflow: 'hidden',
    flexWrap: 'wrap',
    flexGrow: 1,
    width: '435px',
    padding: '24px',
  },
  contactContent: {
    display: 'flex',
    minWidth: '240px',
    flexDirection: 'column',
    alignItems: 'end',
    justifyContent: 'start',
    flex: 1,
    flexBasis: '0%',
  },
  contactTitle: {
    color: 'var(--Paragraph, #736e67)',
    fontSize: '18px',
    fontWeight: 400,
  },
  contactDetails: {
    color: 'var(--Text, #252422)',
    fontSize: '20px',
    fontWeight: 600,
    marginTop: '8px',
  },
  contactIcon: {
    aspectRatio: '1',
    objectFit: 'contain',
    objectPosition: 'center',
    width: '48px',
  }
};

function MyAccountCustomer() {


const [activeButton, setActiveButton] = useState(3);
const { customerby_Id } = useSelector((state) => state.seller_products);

const customerid = localStorage.getItem('customerId');

const dispatch=useDispatch()
useEffect(()=>{
dispatch(customerbyId(customerid))


},[dispatch])
const buttons = [
  { id: 2, text: 'العناوين' },
  { id: 3, text: '  بيانات الحساب' },
];

const handleButtonClick = (id) => {
  setActiveButton(id);
  console.log(id)
};
  return (
    <div style={styles.contactContainer}>
       
      <div style={styles.navButtons}>
      {buttons.map((button) => (
        <button
          key={button.id}
          onClick={() => handleButtonClick(button.id)}
          style={activeButton === button.id ? styles.navButtonActive : styles.navButton}
        >
          {button.text}
        </button>
      ))}
      </div>

     {
      customerby_Id?  (activeButton == 3? 
        (
          <>
            <PersonalInfoCardCustomer customerby_Id={customerby_Id}/>
            <AccountDetailsCustomer Sellerdata={customerby_Id}/>
            <UploadIDCustomer Sellerdata={customerby_Id}/>
            <AccountDeactivationCustomer Sellerdata={customerby_Id}/>
          </>
        )
        : 
        activeButton == 2 ? 
        ( <AddressesList Sellerdata={customerby_Id}/>)
        :       
     <>
        <PaymentMethodsCustomer Sellerdata={customerby_Id}/>
        <Transactions Sellerdata={customerby_Id}/>
        </>
     

      ):null
     }

      
  </div>
   
  );
}

export default MyAccountCustomer;