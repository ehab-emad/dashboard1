import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MonthlyStatusComponent from './MonthlyStatusComponent';
import NewOrderStatus from './NewOrderStatus';
import RecentOrders from './RecentOrders';
import { getSeller } from '../../../store/reducers/sellerProductsReducer';
import { SellerNotifications } from '../../../store/reducers/sellerStuffReducer';

const SellerMainPage = () => {
    const dispatch = useDispatch();
    
    const { sellerdata } = useSelector(state => state.seller_products);
    const sellerid = localStorage.getItem('sellerId');
    
    useEffect(() => {
        const idToUse = sellerid 
        dispatch(getSeller(idToUse));
            dispatch(SellerNotifications('zTC4dLSjCIS2I3YAl9QTJUkro0p2'))
        
    }, [dispatch, sellerid]);

    useEffect(() => {
        if (sellerdata?.status) {
          // Store directly as string (no JSON.stringify)
          localStorage.setItem('status', sellerdata.status); 
        
        }
      }, [sellerdata]);
      

    return (
        <>
            <MonthlyStatusComponent />
            <NewOrderStatus />
            <RecentOrders />
        </>
    );
};

export default SellerMainPage;