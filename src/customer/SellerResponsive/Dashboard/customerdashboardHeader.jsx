
import { useState,useEffect,useMemo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { CustomerNotifications } from "../../../store/reducers/customerStuffReducer";
import NotificationsWindowCustomer from "./Notificationes/NotificationsWindowCustomer";

const styles = {
  dashboardHeader: {
    display: "flex",
    Width: '100%',              // Maximum width of the header
    justifyContent: 'space-between',  // Aligns items
    borderBottom: '0.5px solid rgba(0, 47, 54, 0.24)', // Bottom border
    paddingBottom: "8px", // Add padding at the bottom
    alignItems : 'center'
  },
  actionButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    justifyContent: 'flex-end',
    
  },
  notificationIcons: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  counticon: {
    width: '20px',
    background: 'red',
    fontSize: '14px',
    borderRadius: '10px',
    textAlign: 'center',
    position : 'relative',
    top: '-5px', // Adjust this value as needed
    right: '10px', // Adjust this value as needed
    color: 'white',
    fontWeight:'8px'
  },
  addIcon: {
    width: '20px',
  },
  pageTitle: {
    margin : '10px',
    color: '#252422',
    fontSize: '30px',
    fontWeight: '500',
  },
  profileIcon: {
    width: '32px',
    margin: '0px', // Optional: Add a small margin to the left for spacing
  },
};

const AddProductButton = styled.div`
border-radius: 50px;
background-color: #26969c;
box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.08);
display: flex;
align-items : center;
gap: 8px;
color: #fff;
text-align: center;
padding: 12px 12px 12px 16px;
font: 500 14px/1 Expo Arabic, -apple-system, Roboto, Helvetica, sans-serif;
border: none;
cursor: pointer;



`
const IconButton = styled.img`
width : 36px;
@media (max-width : 1026px) {
    width : 40px
}
`
const MainContent = styled.div`
display: flex;
flex-direction: row-reverse; 
justify-content : space-between;
align-items: center; 
gap: 16px;
width : 60%;
`

const MenuImage = styled.img`
width : 30px;
height : 30px;
@media (min-width: 1024px) {
    display : none;
}
`

const CustomerDashboardHeader = ({setCurrentPage,currentPage , toggleFunc}) => {
  const {customer_notification} = useSelector((state ) => state.customer_stuff);
  const sellerid = localStorage.getItem('customerId');

  const [isSellerApproved, setIsSellerApproved] = useState(false);

  const [Notifications , setNotification] = useState(false);
  const [NotificationCount , setNotificationCount] = useState(0);

  const dispatch = useDispatch();



  useEffect(() => {

    dispatch(CustomerNotifications(sellerid))


  }, []);


  const notifications = useMemo(() => {

      return [
        {
          id: 3,
          status: 'inactive',
          time: '07/12/2024',
          page: 'الطلبات',
          title: 'الطلبات',
          description: 'تم تقديم طلب جديد من العميل "اسم العميل" لاستئجار المنتج "اسم المنتج".',
          icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/595da2e578d727f657f26ab4f428bec7ad15d73104c4e41f93e9e7623f559318?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e7'
        },
        {
          id: 4,
          status: 'inactive',
          time: '11/12/2024',
          page: 'المنتجات',
          title: 'المنتجات',
          description: 'قام العميل "اسم العميل" بإلغاء الطلب رقم #54321. لم يتم تأكيد الحجز',
          icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/2434da327523ec0b98fb7ff2cbc26f4b29af04d3a18d2c933805491fec040612?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e7'
        },
        // Add more seller-specific notifications here
      ];
 
  }, []);




  const navigateToDashboard = () => {
    setCurrentPage('إضافة منتج');
  };

  const toggleNotifications = () => {

    setNotification(!Notifications)

  }

  
  useEffect(() => {
    console.log('Updating notification count:', notifications.length);
  
    setNotificationCount(notifications.length);
  }, [ notifications]);

  useEffect(() => {
    const status = localStorage.getItem('status');
    setIsSellerApproved(status?.toLowerCase() === 'approved');
  }, []);
    
  return (
    <header style={styles.dashboardHeader}>
      <div style={styles.actionButtons}>

       
   
        <div style={styles.notificationIcons}>
            <IconButton
              loading="lazy"
              src= "https://res.cloudinary.com/drpmd9zkk/image/upload/v1733320228/Trent/d8g5sqhlnezxljrtjob6.svg"
              onClick={toggleNotifications}
            />
              <div
              loading="lazy"
              style={styles.counticon}> {customer_notification.length} </div>

        </div>

        {Notifications   ? <NotificationsWindowCustomer close={toggleNotifications} setCurrentPage={setCurrentPage} notifications={notifications} /> : null }
 
      </div>

      <MainContent> 

        <MenuImage src={'https://img.icons8.com/?size=100&id=eofQ1g5BaAx6&format=png&color=000000'} alt="lazy" onClick={toggleFunc} />

        <h1 style={styles.pageTitle}>{currentPage}</h1>
      </MainContent>

    </header>
  );
};

export default CustomerDashboardHeader;