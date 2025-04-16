import InvoiceSummary from './OrderSummaryComponents/InvoiceSummary';
import RenterInfo2 from './OrderSummaryComponents/RenterInfo2';
import OwnerInfo from './OrderSummaryComponents/OwnerInfo ';
import RentalDetails from './OrderSummaryComponents/RentalDetails';
import RequestTopSummary from './OrderSummaryComponents/RequestTopSummary';
import ProductDetails from './OrderSummaryComponents/ProductDetails';
import ReceivingAddress from './RecievingAddress';
import '../../../App.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChangepublishedStatus, customerbyId, productbyId, getSeller } from '../../../store/reducers/sellerProductsReducer';
import styled from 'styled-components';
import { ChangeOrderStatus, ClosedOrders, getNewOrders, getSellerCancelledOrders, getSellerOrders } from '../../../store/reducers/sellerOrdersReducer';
import { productbyIdCustomer } from '../../../store/reducers/customerProductReducer';
import { DeleteorderbyCustomer, getCustomerOrders } from '../../../store/reducers/CustomerOrderreducer';

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

  const ActionButtons = styled.div`
  display: flex;
  align-self: stretch; 
  width:100%
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  line-height: 1;
  justify-content: start;
  margin: auto 0;
  
  @media (max-width : 668px) {
      border-top: 1px solid #80808033;
      padding-top : 10px;
      margin-top : 10px;
      justify-content: space-between;
  }
  `

  const ApproveButton = styled.div`
  align-self: stretch;
  border-radius: 50px;
  width: 100%;
  background: var(--Blue,rgb(167, 10, 10));
  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.08);
  gap: 8px; /* Note: gap only works for flex/grid containers */
  color: rgba(255, 255, 255, 1);
  margin: auto 0;
  padding: 12px 20px;
  cursor: pointer;
  @media (max-width : 668px) {
      width : 50%;
  };
  @media (max-width : 429px) {
      font-size : small
  }
  `

const OrderSummary = ({orderData,toggleDetails,index}) => {
    const {sellerdata,customerby_Id}=useSelector((state) => state.seller_products);
    const {productby_Id}=useSelector((state) => state.customer_products);
  const customerid = localStorage.getItem('customerId');


  const dispatch=useDispatch()

  const onApproveClick = async(order) => {
    const customerid=order.customerid
    const id=order.id
   
   await  dispatch(DeleteorderbyCustomer({ customerid , id }));
   await   dispatch(getCustomerOrders(customerid));
     
    toggleDetails(index)
 


      };
  useEffect(()=>{
   dispatch(getSeller(orderData.sellerid))
      dispatch(customerbyId(orderData.customerid))
      dispatch(productbyIdCustomer({productid:orderData.productid}))
  },[])
  return (
    <div style={OrderSumaryStyle.mainContainer}>
      <div style={OrderSumaryStyle.container1}>
       
        <RequestTopSummary orderData={orderData}/>
      </div>
      <div style={OrderSumaryStyle.container}>
        <div style={OrderSumaryStyle.left} className='details'>
       {orderData &&  <InvoiceSummary orderData={orderData} />}    
     
          {orderData?   <OwnerInfo orderData={orderData} />:null}

        </div>
        <div style={OrderSumaryStyle.right}>
        {orderData &&   <RentalDetails orderData={orderData}/>}
        {orderData &&       <ReceivingAddress orderData={orderData}/>}

        {orderData &&      <ProductDetails orderData={orderData}/>}
          <ActionButtons>
        {
          orderData.status==="pending"?
              <ApproveButton
         onClick={() => onApproveClick(orderData)}
       >
        حذف الطلب
       </ApproveButton>:<div style={{display:'none'}}></div> 
        }
       
        </ActionButtons>
        </div>

      </div>
    
    </div>
  );
};

export default OrderSummary;