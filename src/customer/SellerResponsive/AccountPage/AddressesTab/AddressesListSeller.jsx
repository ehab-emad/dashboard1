import AddressesCardCustomer from './AddressesCardSeller';
import AddAddressForm from './AddAddressForm';
import  { useEffect, useState } from 'react';
import { addCustomerAddress, addSellerAddress, deleteCustomerAddress, deleteSellerAddress, updateSellerAddress } from '../../../../store/reducers/firebasefunctions';
import { useDispatch, useSelector } from 'react-redux';
import { customerbyId, getSeller } from '../../../../store/reducers/sellerProductsReducer';

const initialAddresses = [
  {
    id: 1,
    type: 'المنزل',
    isDefault: true,
    city: 'الرياض',
    address: 'كتابة العنوان بالتفصيل وقد يمتد العنوان الى سطر او سطرين وميعاد الاستلام المتاح للمالك',
  },
  {
    id: 2,
    type: 'العمل',
    isDefault: false,
    city: 'الرياض',
    address: 'كتابة العنوان بالتفصيل وقد يمتد العنوان الى سطر او سطرين وميعاد الاستلام المتاح للمالك',
  }
];
const styles = {
  container: {
    alignSelf: 'stretch',
    borderRadius: '16px',
    background: 'var(--White, #fff)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    padding: '16px'
  },
  header: {
    padding: '0 0 8px',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid var(--line-saperator, rgba(0, 47, 54, 0.08))',
    display: 'flex',
    width: '100%',
    fontFamily: 'Expo Arabic, sans-serif',
    flexWrap: 'wrap'
  },
  addNewButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50px',
    background: 'var(--Light, #e5f2f3)',
    display: 'flex',
    gap: '4px',
    fontSize: '14px',
    color: 'var(--Blue, #26969c)',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: '1',
    margin: 'auto 0',
    padding: '16px 24px'
  },
  addNewIcon: {
    width: '16px',
    height: '16px',
    objectFit: 'contain'
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '18px',
    color: 'var(--Text, #252422)',
    fontWeight: '500',
    textAlign: 'right',
    justifyContent: 'end',
    flex: '1',
    flexBasis: '48px'
  },
  titleIcon: {
    width: '24px',
    height: '24px',
    objectFit: 'contain'
  },
  messageContainer: {
    alignSelf: 'stretch',
    borderRadius: '16px',
    background: 'var(--BG-gray, #f6f5f5)',
    backgroundColor: 'var(--BG-gray, #f6f5f5)',
    gap: '24px',
    color: 'var(--Paragraph, #736e67)',
    textAlign: 'center',
    padding: '16px',
    font: '400 14px Expo Arabic, -apple-system, Roboto, Helvetica, sans-serif',
  }
  
};

const AddressesListSeller = ({Sellerdata}) => {


const [AddAddress, setIsAddAddress] = useState(false);


const [addresses, setAddress] = useState(Sellerdata.address);
const dispatch=useDispatch()
const deleteAddress = async(id) => {
  const customerid = localStorage.getItem('customerId');
  await  deleteCustomerAddress(customerid,id)
  setAddress((prevAddresses) => 
    prevAddresses.filter(address => address.id !== id)
  );
};

  
const toggleDefaultAddress = (selectedId) => {
  setAddress((prevAddresses) => 
    prevAddresses.map((address) => ({
      ...address,    
      isDefault: address.id === selectedId // Set isDefault only for the selected ID
    }))
    
  );
  
};

const toggleAddAddress = (id) => {
  setIsAddAddress(prevState => !prevState);
};
const { customerby_Id } = useSelector((state) => state.seller_products);



const addNewAddress = async(newAddress) => {
  const customerid = localStorage.getItem('customerId');

  await addCustomerAddress(customerid,newAddress)
   dispatch(customerbyId(customerid))
  setIsAddAddress(false); // Close the form after adding
};
useEffect(() => {
  if (customerby_Id) {
    setAddress(customerby_Id.address); // تحديث قائمة العناوين بعد التغيير
  }
}, [customerby_Id]);


  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={toggleAddAddress} style={styles.addNewButton}>
          <span>إضافة عنوان جديد</span>
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/945874ee7fd94ac004afc566f72c960c7929d36660ea6d7e4194f4902f33f11f?placeholderIfAbsent=true&apiKey=57830d6d22374b3392882ad918f38de5" 
            alt="" 
            style={styles.addNewIcon}
          />
        </button>
        <div style={styles.titleWrapper}>
          <span>العناوين</span>
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ccbe98d10232e98b51b12a90d2084798206457ba3de56258bac1932eec32fbb5?placeholderIfAbsent=true&apiKey=57830d6d22374b3392882ad918f38de5" 
            alt="" 
            style={styles.titleIcon}
          />
        </div>
      </div>

        {addresses.length > 0 ? (
          addresses.map(address => (
            <AddressesCardCustomer 
              key={address.id}
              address={address}
              toggleDefaultAddress={toggleDefaultAddress}
              deleteAddress={deleteAddress}
 
  
            />
          ))
        ) : 
        <div 
            className="no-address-message" 
            style={styles.messageContainer}
            role="alert"
            aria-live="polite"
          >
            لا يوجد لديك اي عناوين حالياـ يرجى اضافة عنوان واحد على الاقل لتمكننا من استلام منتجاتك
          </div>
        
        
    }
        {  AddAddress ? <AddAddressForm toggleAddAddress={toggleAddAddress} addNewAddress={addNewAddress}   toggleDefaultAddress={toggleDefaultAddress}
        
        /> : null }


  
    </div>
  );
}; 

export default AddressesListSeller;