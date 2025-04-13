import  { useState } from 'react';
import styled from "styled-components";


const styles = {
  date: {
    whiteSpace: 'nowrap',
    // flex: '1'
  },
  amount: {
    whiteSpace: 'nowrap',
    // flex: '1'
  },
  statusContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '12px',
    
    fontWeight: '600',
    justifyContent: 'center',
  },
  statusPaid: {
    color: 'var(--success, #4a9908)',
    borderRadius: '8px',
    backgroundColor: 'rgba(225, 255, 201, 1)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    justifyContent: 'end',
    padding: '8px'
  },
  statusCancelled: {
    color: 'rgba(214, 27, 27, 1)',
    borderRadius: '8px',
    backgroundColor: 'rgba(250, 228, 228, 1)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    justifyContent: 'end',
    padding: '8px',
  },
  statusText: {
    alignSelf: 'stretch',
    margin: 'auto 0'
  },
  statusIcon: {
    aspectRatio: '1',
    objectFit: 'contain',
    objectPosition: 'center',
    width: '16px',
    alignSelf: 'stretch',
    margin: 'auto 0'
  },
  orderNumber: {
    whiteSpace: 'nowrap',
  },
  all : {
    width : '20%'
  }
};

const LargeScreen = styled.div`
display: flex;
justify-content: flex-end; /* 'end' should be 'flex-end' */
border-radius: 16px;
border: 1px solid var(--line-saperator, rgba(0, 47, 54, 0.08));
background: var(--White, #fff);
margin-top: 16px;
width: auto;
gap: 24px;
text-align: center;
flex-wrap: nowrap;
padding: 8px 16px;
  @media (max-width : 640px) {
    display : none
  }
`
const SmallScreen = styled.div`
display : flex;
flex-direction : column;
border-radius: 16px;
border: 1px solid rgba(0, 47, 54, 0.08);
background: #fff;
color: #252422;
text-align: center;
flex-wrap: nowrap;
gap: 16px;
padding: 16px;
margin-top : 16px;
font: 400 14px "Expo Arabic", -apple-system, Roboto, Helvetica, sans-serif;
@media (min-width : 640px) {
  display : none
}
`

const Amount = styled.div`
@media (max-width : 640px) {
  color : #26969c;
  text-align : left;
}
`

const TransactionCard = ({
  createdAt,
  transactionnumber,
  status,
  sellername,
  amountpaid,
  transactionid,
  orderNumber,
  customername
}) => {
    const toggleProduct = (productId) => {
      setOpenProducts((prev) => ({
        ...prev,
        [productId]: !prev[productId], // Toggle the clicked product
      }));
    };
    const [openProducts, setOpenProducts] = useState({});
  
const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'N/A';
  if (timestamp.seconds && timestamp.nanoseconds) {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    return date.toLocaleDateString(); // Customize the format as needed
  }
  return timestamp;
};



  return (
    <>
    <LargeScreen style={styles.card}>
      <div style={{ ...styles.date , ...styles.all}}>{formatTimestamp(createdAt)||"empty"}</div>
      <div style={{ ...styles.amount , ...styles.all}}>{amountpaid||"empty"}</div>
      <div style={{...styles.statusContainer , ...styles.all}}>
      <div className='hide' style={styles.statusContainer}>
            
              {status==="pending" ?
              <img style={{width:"80%"}} src='https://res.cloudinary.com/dbztvm0io/image/upload/v1741538281/%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA_%D8%B7%D9%84%D8%A8%D8%A7%D8%AA_%D8%B4%D9%83%D8%A7%D9%88%D9%8A_-_%D9%85%D8%A7%D9%84%D9%83_%D9%85%D8%B3%D8%AA%D8%A3%D8%AC%D8%B1_-_%D9%82%D9%8A%D8%AF_%D8%A7%D9%84%D9%85%D8%B1%D8%A7%D8%AC%D8%B9%D8%A9_zmei4y.png' alt='new order'/>
              
              
              
              :status==="processed" ?
            <img style={{width:"75%"}} src='https://res.cloudinary.com/dbztvm0io/image/upload/v1741538281/%D8%A7%D9%84%D9%85%D8%AF%D9%81%D9%88%D8%B9%D8%A7%D8%AA_-_%D8%AA%D9%85_%D8%A7%D9%84%D8%B1%D9%81%D8%B9_dpmato.png' alt=''/>:
            
 status==="active" ?
            <img style={{width:"80%"}} src='https://res.cloudinary.com/dbztvm0io/image/upload/v1741538282/%D8%B7%D9%84%D8%A8%D8%A7%D8%AA_-_%D8%A7%D8%AF%D9%85%D9%86_-_%D8%AD%D8%AC%D8%B2_%D9%86%D8%B4%D8%B7_%D8%B3%D9%87%D9%85_d0ednz.png' alt='active'/>:
            <img style={{width:"80%"}} src='https://res.cloudinary.com/dbztvm0io/image/upload/v1741538281/%D8%B7%D9%84%D8%A8%D8%A7%D8%AA_-_%D9%85%D8%A7%D9%84%D9%83_%D9%85%D8%B3%D8%AA%D8%A3%D8%AC%D8%B1_-_%D8%B7%D9%84%D8%A8_%D9%85%D9%84%D8%BA%D9%8A_ovidgg.png' alt='cancled'/>
            
            
            }
            </div>
      </div>
      <div style={{ ...styles.owner , ...styles.all}}>{sellername||"empty"}</div>
      <div style={{ ...styles.tenant , ...styles.all}}>{customername||"empty"}</div>
      <div style={{ ...styles.orderNumber , ...styles.all}}>{transactionnumber}</div>
    </LargeScreen>


    <SmallScreen>
      <div style={{direction : 'rtl', display : 'flex' , alignItems: "center" , gap : '16px' , justifyContent : 'space-between' , flexDirection : 'row'}}>
      <Amount style={{width:"20%"}}>{transactionnumber ||0}</Amount>
      

      <div className='hide' style={styles.statusContainer}>
            
      {status==="pending" ?
              <img style={{maxWidth:"125px"}}  src='https://res.cloudinary.com/dbztvm0io/image/upload/v1741538281/%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA_%D8%B7%D9%84%D8%A8%D8%A7%D8%AA_%D8%B4%D9%83%D8%A7%D9%88%D9%8A_-_%D9%85%D8%A7%D9%84%D9%83_%D9%85%D8%B3%D8%AA%D8%A3%D8%AC%D8%B1_-_%D9%82%D9%8A%D8%AF_%D8%A7%D9%84%D9%85%D8%B1%D8%A7%D8%AC%D8%B9%D8%A9_zmei4y.png' alt='new order'/>
              
              
              
              :status==="processed" ?
            <img style={{maxWidth:"125px"}} src='https://res.cloudinary.com/dbztvm0io/image/upload/v1741538281/%D8%A7%D9%84%D9%85%D8%AF%D9%81%D9%88%D8%B9%D8%A7%D8%AA_-_%D8%AA%D9%85_%D8%A7%D9%84%D8%B1%D9%81%D8%B9_dpmato.png' alt=''/>:
            
 status==="active" ?
            <img style={{maxWidth:"125px"}}  src='https://res.cloudinary.com/dbztvm0io/image/upload/v1741538282/%D8%B7%D9%84%D8%A8%D8%A7%D8%AA_-_%D8%A7%D8%AF%D9%85%D9%86_-_%D8%AD%D8%AC%D8%B2_%D9%86%D8%B4%D8%B7_%D8%B3%D9%87%D9%85_d0ednz.png' alt='active'/>:
            <img style={{maxWidth:"125px"}}  src='https://res.cloudinary.com/dbztvm0io/image/upload/v1741538281/%D8%B7%D9%84%D8%A8%D8%A7%D8%AA_-_%D9%85%D8%A7%D9%84%D9%83_%D9%85%D8%B3%D8%AA%D8%A3%D8%AC%D8%B1_-_%D8%B7%D9%84%D8%A8_%D9%85%D9%84%D8%BA%D9%8A_ovidgg.png' alt='cancled'/>
            
            
            }
          </div>
            <img src={'https://cdn.builder.io/api/v1/image/assets/TEMP/b96d1ed5b69bb8dcca96ca72efe39f483bf3d84f91f02fd737257c912709c862?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e'} onClick={() => toggleProduct(transactionid)} style={{width : '20px' , height : '20px', transform:  "rotate(180deg)" }}/>
     
        </div>
        {
openProducts[transactionid]  && 
<><div style={{display : 'flex' , flexDirection : 'column',position:"relative"}} className='line'>
<div style={{display : 'flex' , flexDirection : 'row-reverse' , justifyContent : 'space-between'}}>
<p style={{direction : 'rtl' , fontSize : 'large' , margin : '5px 0px'}}><span style = {{color : '#736E67'}}>  اسم المستأجر : </span> {customername||"empty"}</p>
<p style={{direction : 'rtl' , fontSize : 'large' , margin : '5px 0px'}}><span style = {{color : '#736E67'}}> اسم المالك : </span> {sellername ||"empty"}</p>
</div>
<div style={{display : 'flex' , flexDirection : 'row-reverse' , justifyContent : 'space-between'}}>
<p style={{fontSize : 'large' , margin : '0px'}}>{amountpaid} :<span style = {{color : '#736E67'}}>  المبلغ </span></p>
<p style={{direction : 'rtl' , fontSize : 'large' , margin : '0px'}}><span style = {{color : '#736E67'}}>التاريخ : </span>{formatTimestamp(createdAt)||"empty"}</p>
</div>
</div></>
 
}
    
   
    </SmallScreen>
  </>
  );
};

export default TransactionCard;