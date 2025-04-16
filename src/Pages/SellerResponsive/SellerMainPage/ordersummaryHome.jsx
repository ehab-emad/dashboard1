import  { useEffect } from 'react';

import   '../../../App.css';

import { useDispatch, useSelector } from 'react-redux';
import { customerbyId, getSeller, productbyId } from '../../../store/reducers/sellerProductsReducer';
import RequestTopSummary from '../OrderPage/OrderSummaryComponents/RequestTopSummary';
import RenterInfo2 from '../OrderPage/OrderSummaryComponents/RenterInfo2';
import OwnerInfo from '../OrderPage/OrderSummaryComponents/OwnerInfo ';
import RentalDetails from '../OrderPage/OrderSummaryComponents/RentalDetails';
import ProductDetails from '../OrderPage/OrderSummaryComponents/ProductDetails';
import ReceivingAddress from '../OrderPage/RecievingAddress';
import InvoiceSummary from '../OrderPage/OrderSummaryComponents/InvoiceSummary';


const OrderSumaryStyle = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        overflow : 'hidden',
        width: 'auto', // Full width of the parent
        minWidth: 'calc(100% - 32px)', // Ensure minWidth accounts for parent's padding
        maxWidth: '100%', // Prevent exceeding parent width
        backgroundColor: '#e0e0e0', // Main background color
        padding: '10px', // Optional padding
        flexShrink: 0, // Prevent shrinking in flex container
        gap: "10px",
        borderRadius: "30px",

    },
    container: {
      gap: '20px',
        display: 'flex',
        flexWrap:"wrap",
        //backgroundColor:" #767676",

    },
    container1: {
        display: 'flex',
        flexDirection: 'column',
        //backgroundColor:" #777777",
        padding: "8px"

    },
    left: {
        // width: '40%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden', // Prevents overflow
        gap: '16px'


    },
    right: {

        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        paddingLeft: '12px',
        borderRadius: '5px',
        overflow: 'hidden', // Prevents overflow
        gap: '16px'



    },
    inner: {
        flexGrow: 1, // This will make the inner components stretch
        padding: '4px',
        borderRadius: '5px',
        display: 'flex', // Optional: make it flexible for content
        alignItems: 'center', // Center content vertically
        justifyContent: 'center', // Center content horizontally
        overflow: 'hidden', // Prevents overflow

    },
    inner2: {
      flexGrow: 1, // This will make the inner components stretch
      padding: '4px',
      borderRadius: '5px',
      display: 'flex', // Optional: make it flexible for content
      alignItems: 'center', // Center content vertically
      justifyContent: 'center', // Center content horizontally
      overflow: 'hidden', // Prevents overflow
      flexDirection: 'column',


  },

};


const backgroundstyles = {

    container :{
  
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Expo Arabic, sans-serif',
      position: 'absolute',
      top: 0,
      left: 0,
      scrollbarWidth:"none",
      width: '100vw',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    }
  }
  const styles = {
  
      mainContainer: {
          gap: "8px",
          flexDirection: 'column',
          height: 'auto',
          overflow : 'hidden',
          width: '84%', // Full width of the parent
          backgroundColor: '#e0e0e0', // Main background color
          padding: '24px', // Optional padding
          flexShrink: 0, // Prevent shrinking in flex container
          borderRadius: "30px",
          top: '55%',          // Position at the vertical center
          left: '50%',         // Position at the horizontal center
          position: 'absolute',
          transform: 'translate(-50%, -50%)', // Adjust position to center
          minWidth: '0', // Ensure no minimum width constraints
          maxWidth: '100%', // Ensure it doesn't exceed parent width
          boxSizing: 'border-box', // Include padding and borders in width calculations
          '@media (max-width: 991px)':{
          display:"block",
            margin:"auto",
  
          }
      },
  '@media (max-width: 991px)':{
    mainContainer: {
          display:"block",
            margin:"auto",
  
          }},
      buttonscontainer: {
        borderRadius: '24px',
        background: 'var(--White, #fff)',
        display: 'flex',
        width: 'auto', // Full width of the parent
        minWidth: 'calc(100% - 32px)', // Ensure minWidth accounts for parent's padding
        maxWidth: '100%', // Prevent exceeding parent width
        height: 'auto',
        overflow: 'hidden',
        padding: '16px',
        justifyContent: 'center',
        gap: '32px'
    
      },
      actionButtons: {
        display: 'flex',
        minWidth: '240px',
        alignItems: 'center',
        gap: '4px',
        fontSize: '14px',
        textAlign: 'center',
        lineHeight: '1',
        justifyContent: 'start',
        margin: 'auto 0',
        background: '#ffffff'
  
      },  
      actionButton: {
        alignSelf: 'stretch',
        borderRadius: '50px',
        gap: '8px',
        fontWeight: '500',
        margin: 'auto 0',
        padding: '1px 15px',
        border: 'none',
        cursor: 'pointer',
      },
      rejectButton: {
        background: 'var(--error-shade, #fae4e4)',
        color: 'rgba(214, 27, 27, 1)',
  
      },
      approveButton: {
        background: 'var(--Blue, #27989e)',
        color: 'rgba(255, 255, 255, 1)',
        boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.08)',
  
      },
      container: {
          // display: 'flex',
          //backgroundColor:" #767676",
          height: '100%',
          overflow : 'hidden',
          width: '100%', // Full width of the parent
          flexShrink: 0, // Prevent shrinking in flex container  
          minWidth: '0', // Ensure no minimum width constraints
          maxWidth: '100%', // Ensure it doesn't exceed parent width
          flexGrow: 1, // Allow it to grow and fill available space
          boxSizing: 'border-box', // Include padding and borders in width calculations
          gap: "24px",
         '@media (max-width: 991px)':{
        display:"block",
        margin:"auto",
width:"100%"
      },
    container: {
          display:"block",
            margin:"auto",
  
          }},
      container1: {
          display: 'flex',
          flexDirection: 'column',
          //backgroundColor:" #777777",
          padding: "8px",
          width: '100%', // Set to 100% to take full width of the parent
        height: '10%', // Allow height to adjust based on content
        minWidth: '0', // Ensure no minimum width constraints
        maxWidth: '100%', // Ensure it doesn't exceed parent width
        flexGrow: 1, // Allow it to grow and fill available space
        flexShrink: 0, // Prevent shrinking if there's enough space
        boxSizing: 'border-box', // Include padding and borders in width calculations
      },
      left: {
          // width: '40%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden', // Prevents overflow
          justifyContent: "start",
          alignItems: " center",
          height: 'auto', // Allow height to adjust based on content
          flexShrink: 0, // Prevent shrinking if there's enough space
          boxSizing: 'border-box', // Include padding and borders in width
          gap: "16px"
  
      },
      right: {
  
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: 'hidden', // Prevents overflow
          justifyContent: "start",
          alignItems: " center",
          height: 'auto', // Allow height to adjust based on content
          flexShrink: 0, // Prevent shrinking if there's enough space
          boxSizing: 'border-box', // Include padding and borders in width
          gap: "16px",
  
  
      },
  
      header: {
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "stretch",
        borderBottom: "1px solid var(--line-saperator, rgba(0, 47, 54, 0.08))",
        display: "flex",
        color: "var(--Text, #252422)",
        textAlign: "right",
        flexWrap: "wrap",
        font: "600 24px Expo Arabic, -apple-system, Roboto, Helvetica, sans-serif"
      },
      icon: {
        aspectRatio: "1",
        objectFit: "contain",
        objectPosition: "center",
        width: "32px",
        alignSelf: "stretch",
        margin: "auto 0",
        cursor: " pointer",
      },
      orderTitle: {
        alignSelf: "stretch",
        flex: 1,
        flexBasis: "0%",
        margin: "auto 0"
      },
      headetop: {
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "stretch",
        borderBottom: "1px solid var(--line-saperator, rgba(0, 47, 54, 0.08))",
        display: "flex",
        color: "var(--Text, #252422)",
        textAlign: "right",
        flexWrap: "wrap",
        marginBottom:"10px",
        font: "600 24px Expo Arabic, -apple-system, Roboto, Helvetica, sans-serif"
      },
      icontop: {
        aspectRatio: "1",
        objectFit: "contain",
        objectPosition: "center",
        width: "32px",
        alignSelf: "stretch",
        margin: "auto 0",
        cursor: " pointer",
      },
  
  
  };


const OrderSummaryHome = ({onReviewClick,orderData}) => {
  const {sellerdata,customerby_Id,productby_Id}=useSelector((state) => state.seller_products);
 
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getSeller(orderData.sellerid))
    dispatch(customerbyId(orderData.customerid))
    dispatch(productbyId({sellerid:orderData.sellerid,productid:orderData.productid}))
   
  },[])

  
  return (
<div
    style={backgroundstyles.container}
    role="dialog"
    className='highstate'
    aria-labelledby="dialog-title"
    aria-modal="true"
  >
   <div> <div style={styles.mainContainer} className='mainContainer_product'>

<div style={styles.headetop}>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/1479ad6ccf24ef7ae351d02c2a94be35ccbf27bd1b93d744fba097d06561feba?placeholderIfAbsent=true&apiKey=2e2b2f636cc34221b980cbf747a16fe6"
        style={styles.icontop}
        alt="Order details icon"
        onClick={()=>onReviewClick(orderData)}
      />
      <div style={styles.orderTitle}>بيانات الطلب</div>
</div>
 
<div style={OrderSumaryStyle.mainContainer} >
      <div style={OrderSumaryStyle.container1}>

        <RequestTopSummary orderData={orderData}/>
      </div>
      <div style={OrderSumaryStyle.container}>
        <div style={OrderSumaryStyle.left} className='details'>
        {
            orderData &&      <InvoiceSummary orderData={orderData} />}
           {
            orderData && <RenterInfo2 orderData={orderData} />
           }
            {/* <OwnerInfo orderData={sellerdata} /> */}

        </div>
        <div style={OrderSumaryStyle.right}>
          <RentalDetails orderData={orderData}/>
          <ReceivingAddress orderData={orderData}/>

          <ProductDetails orderData={orderData}/>

        </div>

      </div>
    </div>

</div></div>
    </div>
  );
};

export default OrderSummaryHome;