import RecentProductCard from './RecentProductCard'; // Adjust the import path as necessary
import styled from "styled-components";
import  { useEffect,useMemo } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {   getproductrented, getRentedOrders} from '../../../store/reducers/sellerOrdersReducer';
import { getOrders } from '../../../store/reducers/firebasefunctions';





const RecentOrderStyle = {
    recentOrders: {
      alignItems: 'flex-end', // Align items to the end (right)
      borderRadius: '24px',
      background: 'var(--White, #fff)',
      backgroundColor: 'var(--White, #fff)',
      display: 'flex', // Enable flexbox layout
      flexDirection: 'column', // Arrange children vertically
      fontFamily: 'Expo Arabic, sans-serif', // Font family for text
      justifyContent: 'flex-start', // Align content to the start
      padding: '16px', // Padding inside the component
      marginTop: '20px', // Space above the component
      overflow: 'hidden', // Prevent overflow
      width: 'auto', // Full width of the parent
      minWidth: 'calc(100% - 32px)', // Ensure minWidth accounts for parent's padding
      maxWidth: '100%', // Prevent exceeding parent width
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Optional shadow for depth
      flexShrink: 0, // Prevent shrinking in flex container

    },
    header: {
      borderColor: "rgba(0, 47, 54, 0.08)",
      borderBottomWidth: "1px",
      display: "flex",
      width: "100%",
      paddingBottom: "8px",
      alignItems: "center",
      fontWeight: "400",
      flexDirection : 'row'
    },
    secButton: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50px",
      background: "var(--BG-gray, #f6f5f5)",
      display: "flex",
      gap: "4px",
      overflow: "hidden",
      fontSize: "14px",
      color: "var(--Cool, #8d8883)",
      lineHeight: "1",
      margin: "auto 0",
      padding: "8px 16px 8px 12px",
      curser:'pointer',
      outline: 'none'
    },
    filterButton: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50px",
      background: "var(--BG-gray, #f6f5f5)",
      gap: "4px",
      overflow: "hidden",
      fontSize: "14px",
      color: "var(--Cool, #8d8883)",
      lineHeight: "1",
      padding: "8px 16px 8px 12px",
      curser:'pointer',
      border:'none',
      outline: 'none'
    },
    buttonImg: {
      aspectRatio: '1',
      objectFit: 'contain',
      objectPosition: 'center',
      width: '14px',
      alignSelf: 'stretch',
      margin: 'auto 0'
    },
    content: {
      alignSelf: 'stretch',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '18px',
      color: 'var(--Text, #252422)',
      textAlign: 'right',
      justifyContent: 'end',
      flexWrap: 'wrap',
      flex: 1,
      flexBasis: '28px',
      margin: 'auto 0'
    },
    headerImg: {
      aspectRatio: '1',
      objectFit: 'contain',
      objectPosition: 'center',
      width: '24px',
      alignSelf: 'stretch',
      margin: 'auto 0'
    }
  };

  const HeaderContainer = styled.div`
  justify-content: space-between;
  @media (max-width : 450px) {
    justify-content: end;
  }
`

const BigScreenFilterButton = styled.button`
  margin: "auto 0",
  display: flex;
  @media (max-width : 450px) {
    display : none;
  }
`
const SmallScreenFilterButton = styled.button`
  display: none;
  width : 100%;
  margin-top : 10px;
  @media (max-width : 450px) {
    display : flex;
  }
`

  
const RecentOrders = () => 
  {
  const dispatch = useDispatch();
  const {  rented_orders ,new_orders} = useSelector((state) => state.seller_orders);
  
 
  const sellerid = localStorage.getItem('sellerId');


  useEffect(() => {

        dispatch( getRentedOrders(sellerid));
      }, [dispatch,new_orders]);


  const memoizedRecentOrders = useMemo(() => {
    
    // If new_orders is available, use it; otherwise, fallback to the static data
    return rented_orders 
  }, [rented_orders]); // Recalculate only when new_orders changes


    return (
        <div style={RecentOrderStyle.recentOrders}>
          <HeaderContainer style={RecentOrderStyle.header}>
            <BigScreenFilterButton style={RecentOrderStyle.filterButton} >
              <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ae96818e45715f1a827a229643aec834784b498c298553ca983744f29b67715?placeholderIfAbsent=true&apiKey=57830d6d22374b3392882ad918f38de5"
                  style={RecentOrderStyle.buttonImg}
                  alt="All products"
              />
              <span>كل المنتجات</span>
            </BigScreenFilterButton>
                <div style={RecentOrderStyle.content}>
                    <div>المنتجات المؤجرة حديثاً</div>
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/23a6d6d603fb6d25f552d067c23ecabe15a1cb3b3200e46c3e6b80b6fca4362f?placeholderIfAbsent=true&apiKey=57830d6d22374b3392882ad918f38de5"
                        style={RecentOrderStyle.headerImg}
                        alt="Recent products"
                    />
                </div>
          </HeaderContainer>
          {memoizedRecentOrders.slice(0,3).map((order, index) => (
              <RecentProductCard key={index} productdata={order} productid={order.productid} />
            
          ))}
          <SmallScreenFilterButton style={RecentOrderStyle.filterButton} >
            
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ae96818e45715f1a827a229643aec834784b498c298553ca983744f29b67715?placeholderIfAbsent=true&apiKey=2e2b2f636cc34221b980cbf747a16fe6"
              style={RecentOrderStyle.buttonImg}
            />
            <span>كل الطلبات</span> {/* Use span for text inside button */}
          </SmallScreenFilterButton>
        </div>
    );
};

export default RecentOrders;