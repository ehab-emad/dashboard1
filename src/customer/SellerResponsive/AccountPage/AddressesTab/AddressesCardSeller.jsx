
import  { useEffect, useState } from 'react';
import styled from "styled-components";
import DeleteAddressCustomerPop from './DeleteAddressSellerPop';
import EditAddressFormCustomer from './EditAddressFormSeller';
import { deleteSellerAddress, updateCustomerAddress, updateSellerAddress } from '../../../../store/reducers/firebasefunctions';
import { customerbyId, getSeller } from '../../../../store/reducers/sellerProductsReducer';
import { useDispatch } from 'react-redux';


const styles = {
  card: {
    justifyContent: 'end',
    alignItems: 'start',
    display: 'flex',
    marginTop: '24px',
    width: 'auto',
    gap: '16px',
    padding:"20px",
    flexWrap: 'wrap',
    cursor: 'pointer'
  },
  iconGroup: {
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: '8px',
    justifyContent: 'center',
    height: '100%'
  },
  locationIcon: {
    width: '36px',
    height: '36px',
    objectFit: 'contain'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    fontFamily: 'Expo Arabic, sans-serif',
    justifyContent: 'center',
    flex: 1,
    flexBasis: 0
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: 500
  },
  defaultBadge: {
    alignSelf: 'stretch',
    borderRadius: '8px',
    background: 'var(--success-shade, #e1ffc9)',
    gap: '8px',
    overflow: 'hidden',
    fontSize: '12px',
    color: 'var(--success, #4a9908)',
    textAlign: 'center',
    lineHeight: 1,
    margin: 'auto 0',
    padding: '4px'
  },
  title: {
    color: 'var(--Text, #252422)',
    textAlign: 'right',
    fontSize: '18px',
    lineHeight: 1
  },
  cityRow: {
    display: 'flex',
    marginTop: '8px',
    alignItems: 'end',
    gap: '4px',
    fontSize: '14px'
  },
  cityLabel: {
    color: 'var(--Paragraph, #736e67)',
    fontWeight: 300,
    lineHeight: 1
  },
  cityValue: {
    color: 'var(--Text, #252422)',
    fontWeight: 400
  },
  addressRow: {
    display: 'flex',
    marginTop: '8px',
    gap: '4px',
    fontSize: '14px',
    textAlign: 'right',
    justifyContent: 'end',
    flexDirection: 'row'
  },
  addressLabel: {
    color: 'var(--Paragraph, #736e67)',
    fontWeight: 300,
    lineHeight: 1
  },
  addressValue: {
    color: 'var(--Text, #252422)',
    fontWeight: 400
  },
  editIcon: {
    width: '28px',
    height: '28px',
    objectFit: 'contain'
  },
  button : {
    borderRadius : '20px',
    border : '0px',
    padding : '16px 18px',
    marginTop : '10px',
    fontSize : '20px'
  }
};

const active = 'https://cdn.builder.io/api/v1/image/assets/TEMP/f258512ce488319fbf1c1f7d88b41ff6b52a1d2348c33f65ed75983dc520a8bf?placeholderIfAbsent=true&apiKey=57830d6d22374b3392882ad918f38de5'
const inactive = 'https://cdn.builder.io/api/v1/image/assets/TEMP/87527008286ce7c1fcb85794d81a119ea6e53b04a776981c0dba0c2cf0a50923?placeholderIfAbsent=true&apiKey=57830d6d22374b3392882ad918f38de5'
const deleteicon = 'https://cdn.builder.io/api/v1/image/assets/TEMP/85b021dbea5b225c13fbe5b7e5efadaded2dd26a2da8476529ef828c86326007?placeholderIfAbsent=true&apiKey=57830d6d22374b3392882ad918f38de5';
const editicon = 'https://cdn.builder.io/api/v1/image/assets/TEMP/8b968133be120bba5abcac8c0e081dded9eda2882f9f7dbb170cfde02cfe90c1?placeholderIfAbsent=true&apiKey=57830d6d22374b3392882ad918f38de5';



const AddressesCardSeller = ({key, address, toggleDefaultAddress, deleteAddress}) => {
  

const [EditAddress, setIsEditAddress] = useState(false);
const [DeleteAddress, setIsDeleteAddress] = useState(false);

 const activeicon = address.default ? active :inactive ;
const dispatch=useDispatch()
  const toggleEditAddress = () => {
    setIsEditAddress(prevState => !prevState);
  };

  useEffect(() => {
    console.log("Address props:", address);
  }, [address]);
  
  const toggleDeleteAddress = () => {
    setIsDeleteAddress(prevState => !prevState);

  };
  const editaddress = async(id,updatedData) => {
    const customerid = localStorage.getItem('customerId');
    await updateCustomerAddress(customerid,id,updatedData)
   
    setIsEditAddress(false);
  
     dispatch(customerbyId(customerid))
  };
  const Large = styled.div`
    display  :none;
    @media (min-width: 510px) {
        display : flex
    }
  `
  const Small = styled.div`
    display  :none;
    @media (max-width: 510px) {
        display : flex;
    }
  `
  const SmallSCreenButtonsEdit = styled.button`
    background-color :  #27989e;
    color : white;
  `
  const SmallSCreenButtonsDelete = styled.button`
    background-color : #fae4e4;
    color : #d61b1b;
  `
  
  return (
    <div style={{display  :'flex' , flexDirection : 'column' , borderRadius: '16px',border: address.default ? '1px solid var(--Blue, #26969c)' : '1px solid var(--line-saperator, rgba(0, 47, 54, 0.08))', background: 'var(--White, #fff)',padding: '16px',}}>
      <div style={styles.card} onClick={() => toggleDefaultAddress(address.id)}> 

      <Large style={styles.iconGroup}>
        <img 
        
        src={deleteicon} 
        alt="" 
        style={styles.locationIcon} 
        onClick={() => toggleDeleteAddress(address.id)}
        
        />

        <img 
          src={editicon} 
          alt="" 
          style={styles.locationIcon} 
          onClick={setIsEditAddress}
          
          />
      </Large>
      <div style={styles.content}>
        <div style={styles.titleRow} >
          {address.default && (
            <div style={styles.defaultBadge}>العنوان الافتراضي</div>
          )}
          <div style={styles.title}>{address.type}</div>
        </div>
        <div style={styles.cityRow}>
          <span style={styles.cityValue}>{address.city}</span>
          <span style={styles.cityLabel}>المدينة:</span>
        </div>
        <div style={styles.addressRow}>
          <span style={styles.addressValue}>{address.address}</span>
          <span style={styles.addressLabel}>العنوان:</span>
        </div>
      </div>

      <img src={activeicon} alt="تعديل" style={styles.editIcon} onClick={() => editaddress(address.id,{default:true})} />

      {  EditAddress ? <EditAddressFormCustomer toggleEditAddress={toggleEditAddress} address={address} editaddress={editaddress}    toggleDefaultAddress={toggleDefaultAddress}
        
        /> : null }
        {  DeleteAddress ? <DeleteAddressCustomerPop toggleDeleteAddress={toggleDeleteAddress} id={address.id}   deleteAddress={deleteAddress}
        
        /> : null } 
      </div>
      <Small style={{flexDirection : 'column'}}>
        <SmallSCreenButtonsEdit style = {{...styles.button}} onClick={() => toggleEditAddress(address.id)}>تعديل الحساب</SmallSCreenButtonsEdit>        
        <SmallSCreenButtonsDelete style = {styles.button}  onClick={() => toggleDeleteAddress(address.id)}>حذف الحساب</SmallSCreenButtonsDelete>        
      </Small>
    </div>

  );
};

export default AddressesCardSeller;