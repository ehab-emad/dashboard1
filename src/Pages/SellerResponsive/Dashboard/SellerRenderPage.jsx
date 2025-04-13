
import { useEffect, useState } from 'react';

import SellerMyProductsPage from '../MyProductPage/SellerMyProductsPage';
import SellerMainPage from '../SellerMainPage/SellerMainPage';
import SellerOrders from '../OrderPage/SellerOrders'
import MyAccountSeller from '../AccountPage/MyAccountSeller';
import PaymentPage from '../PaymentPage/PaymentPage';
import { SupportTickets } from '../supportTickets/SupportTickets';
import AddProduct from './AddProductPage';

import { Provider } from 'react-redux';
import store from '../../../store/index';
import MyAccountCustomer from '../AccountPage/MyAccountSeller';



function SellerRenderPage({currentPage, setCurrentPage}) {

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

      {currentActive === 'منتجاتي' ?(

        <SellerMyProductsPage />

      ) : currentActive === 'حسابي' ?  (

        <MyAccountSeller />
      ) : currentActive === 'إضافة منتج' ?  (
        <AddProduct />
    

      ) :currentActive === 'الرئيسية' ?  (

          
          <SellerMainPage/>
      
      ) :currentActive === 'الدعم الفني' ?  (
      
        <SupportTickets />

      ) : currentActive === 'الطلبات' ?(
          <SellerOrders />      
      ):currentActive === 'المدفوعات' ?(

        <PaymentPage />
          
          ):null}

    </>



     </div>
     </Provider>

  );
}

export default SellerRenderPage;

