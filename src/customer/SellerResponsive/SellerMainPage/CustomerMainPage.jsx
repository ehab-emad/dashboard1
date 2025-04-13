import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MonthlyStatusComponent from './MonthlyStatusComponent';
import NewOrderStatus from './NewOrderStatus';
import RecentOrders from './RecentOrders';
import { getSeller } from '../../../store/reducers/sellerProductsReducer';
import { SellerNotifications } from '../../../store/reducers/sellerStuffReducer';

const CustomerMainPage = () => {
    const dispatch = useDispatch();
    
    const { sellerdata } = useSelector(state => state.seller_products);
    const customerid = localStorage.getItem('customerId');
    
    useEffect(() => {
        const idToUse = customerid 
        dispatch(getSeller(idToUse));
            dispatch(SellerNotifications(customerid))
        
    }, [dispatch, customerid]);

    useEffect(() => {
        if (sellerdata?.status) {
          // Store directly as string (no JSON.stringify)
          localStorage.setItem('status', sellerdata.status); 
          console.log('Saved status:', sellerdata.status);
        }
      }, [sellerdata]);
      

    return (
        <>
            <MonthlyStatusComponent />
            <NewOrderStatus />
          
        </>
    );
};

export default CustomerMainPage;