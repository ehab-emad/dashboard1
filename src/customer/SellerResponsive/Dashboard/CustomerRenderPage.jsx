
import { useEffect, useState } from 'react';

import SellerOrders from '../OrderPage/CustomerOrders'

import PaymentPage from '../PaymentPage/PaymentPage';
import { SupportTickets } from '../supportTickets/SupportTickets';


import { Provider } from 'react-redux';
import store from '../../../store/index';
import MyAccountCustomer from '../AccountPage/MyAccountCustomer';
import CustomerOrders from '../OrderPage/CustomerOrders';
import CustomerMainPage from '../SellerMainPage/CustomerMainPage';



function CustomerRenderPage({currentPage, setCurrentPage}) {

  useEffect(() => {

    setCurrentActive(currentPage)
  }, [currentPage]); // Dependency array
  
  const [currentActive, setCurrentActive] = useState('');

  const mainDivStyle = {
    width: '100%', // Take full width of the parent
    display: 'flex',
    flexDirection : 'column'
  };


  return (

    <Provider store={store} >

    <div style={mainDivStyle} >


    <>

      { currentActive === 'حسابي' ?  (

        <MyAccountCustomer />
      ) :currentActive === 'الرئيسية' ?  (

          
          <CustomerMainPage/>
      
      ) :currentActive === 'الدعم الفني' ?  (
      
        <SupportTickets />

      ) : currentActive === 'الطلبات' ?(
          <CustomerOrders />      
      ):currentActive === 'المدفوعات' ?(

        <PaymentPage />
          
          ):null}

    </>



     </div>
     </Provider>

  );
}

export default CustomerRenderPage;

