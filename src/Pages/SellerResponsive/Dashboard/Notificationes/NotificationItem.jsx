
const styles = {
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    justifyContent: 'flex-end',
    cursor: 'pointer'
  },
  content: {
    display: 'flex',
    minWidth: '240px',
    flexDirection: 'column',
    flex: '1 1 0%'
  },
  header: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    gap: '40px 100px',
    justifyContent: 'space-between'
  },
  timeWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '10px',
    color: 'var(--Cool, #8d8883)',
    fontWeight: '400'
  },
  statusDot: {
    borderRadius: '50%',
    width: '8px',
    height: '8px',
    margin: 'auto 0'
  },
  activeDot: {
    backgroundColor: 'var(--success, #4a9908)'
  },
  inactiveDot: {
    backgroundColor: 'var(--Cool, #8d8883)'
  },
  time: {
    margin: 'auto 0'
  },
  title: {
    color: 'var(--Text, #252422)',
    fontSize: '14px',
    fontWeight: '500',
    margin: 'auto 0'
  },
  description: {
    color: 'var(--Paragraph, #736e67)',
    fontSize: '14px',
    fontWeight: '400',
    marginTop: '8px'
  },
  icon: {
    width: '40px',
    aspectRatio: '1',
    objectFit: 'contain'
  }
};



function NotificationItem({ close,status, time, title, description, icon , page, setCurrentPage}) {
  
  const GotoPage = () => {

    setCurrentPage(page)
    close()

  }
  
  return (
    <div 
    
      style={styles.container}
      onClick={GotoPage}      
      >
      <div style={styles.content}>
        <div style={styles.header}>
          <div style={styles.timeWrapper}>
            <div 
              style={{
                ...styles.statusDot,
                ...(status === 'active' ? styles.activeDot : styles.inactiveDot)
              }}
              role="status"
              aria-label={status === 'active' ? 'Active notification' : 'Inactive notification'}
            />
            <div style={styles.time}>{time}</div>
          </div>
          <div style={styles.title}>{title}</div>
        </div>
        <div style={styles.description}>{description}</div>
      </div>
      <img 
        src={icon} 
        style={styles.icon} 
        alt=""
        loading="lazy"
      />
    </div>
  );
}

export default NotificationItem;