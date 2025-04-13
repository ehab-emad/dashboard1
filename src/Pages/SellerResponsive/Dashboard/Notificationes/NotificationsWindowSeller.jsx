import NotificationList from "./NotificationList";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {SellerNotifications} from '../../../../store/reducers/sellerStuffReducer'

const styles = {

  overlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Expo Arabic, sans-serif',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 100
  },
  notificationsMenu: {
    borderRadius: '16px',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    display: 'flex',
    width: 'auto',
    flexDirection: 'column',
    overflow: 'auto',
    overflowY: 'scroll', 
    fontFamily: 'Expo Arabic, sans-serif',
    fontWeight: 400,
    justifyContent: 'start',
    padding: '16px',
    border: '2px solid rgba(244, 245, 248, 1)',
    position: 'fixed',
    zIndex: 1000, 
    
  },
  header: {
    padding: '8px 0',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid var(--line-saperator, rgba(0, 47, 54, 0.08))',
    display: 'flex',
    width: '100%',
    gap: '40px 100px',
    fontSize: '18px',
    color: 'var(--Text, #252422)',
    whiteSpace: 'nowrap',
    textAlign: 'right',
    marginBottom : '20px',
  },
  notificationIcon: {
    aspectRatio: '1',
    objectFit: 'contain',
    objectPosition: 'center',
    width: '24px',
    alignSelf: 'stretch',
    margin: 'auto 0',
    cursor : 'pointer'
  },
  notificationTitle: {
    alignSelf: 'stretch',
    margin: 'auto 0'
  },
  emptyState: {
    alignSelf: 'stretch',
    borderRadius: '16px',
    background: 'var(--BG-gray, #f6f5f5)',
    backgroundColor: 'var(--BG-gray, #f6f5f5)',
    marginTop: '16px',
    width: '100%',
    gap: '24px',
    fontSize: '14px',
    color: 'var(--Paragraph, #736e67)',
    textAlign: 'center',
    padding: '16px'
  }
};


const NotificationsWindowSeller = ({close, setCurrentPage,CountNotifications, notifications}) => {

  const {seller_notification} = useSelector((state ) => state.seller_stuff);
 

  const dispatch = useDispatch();

  const sellerid = localStorage.getItem('sellerId');


  useEffect(() => {

    dispatch(SellerNotifications(sellerid))


  }, []);





  return (
    
  <div style={styles.overlay}>

    <div style={styles.notificationsMenu}>
      <div style={styles.header}>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ee4b3fd47ebfa1e941421a5a5bc1d336efbc811cf9e81e4b3316c9aacfde3bc?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e7"
          alt="Notifications icon"
          style={styles.notificationIcon}
          onClick={close}        
          />
        <div style={styles.notificationTitle}>الاشعارات</div>
      </div>

    {seller_notification.length > 0 ?  <NotificationList notifications={seller_notification} setCurrentPage={setCurrentPage} close={close}/> : 
      <div style={styles.emptyState}>
        لا يوجد لديك اي اشعارات حاليا
      </div>
     }
    </div>
  </div> 
  );
};

export default NotificationsWindowSeller;