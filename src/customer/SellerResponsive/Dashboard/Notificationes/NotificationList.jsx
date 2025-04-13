import React from 'react';
import NotificationItem from './NotificationItem';


const styles = {
  notificationList: {
    display: 'flex',
    maxWidth: '392px',
    flexDirection: 'column',
    fontFamily: 'Expo Arabic, sans-serif',
    textAlign: 'right'
  },
  divider: {
    width: '100%',
    height: '1px',
    margin: '16px 0',
    backgroundColor: 'rgba(0, 47, 54, 0.08)'
  }
};

function NotificationList({notifications , setCurrentPage, close}) {
  return (
    <div style={styles.notificationList}>
      {notifications.map((notification, index) => (
        <React.Fragment key={notification.id}>
          <NotificationItem {...notification} setCurrentPage={setCurrentPage} close={close}/>
          {index < notifications.length - 1 && <div style={styles.divider} />}
        </React.Fragment>
      ))}
    </div>
  );
}

export default NotificationList;