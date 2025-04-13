

const styles = {
  modalOverlay: {
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
  },
  modalContainer: {
    borderRadius: '24px',
    background: 'var(--White, #fff)',
    boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.04)',
    width: '380px',
    maxWidth: '100%',
    padding: '24px',
    '@media (max-width: 991px)': {
      padding: '0 20px'
    }
  },
  contentWrapper: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column'
  },
  title: {
    color: 'var(--Text, #252422)',
    fontSize: '20px',
    fontWeight: 600
  },
  description: {
    color: 'var(--Cool, #8d8883)',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '18px',
    marginTop: '8px'
  },
  buttonContainer: {
    display: 'flex',
    marginTop: '24px',
    width: '100%',
    flexDirection: 'column',
    fontSize: '14px',
    lineHeight: 1
  },
  confirmButton: {
    alignSelf: 'stretch',
    borderRadius: '50px',
    background: 'var(--Blue, #26969c)',
    boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.08)',
    width: '100%',
    gap: '8px',
    overflow: 'hidden',
    color: 'var(--White, #fff)',
    fontWeight: 600,
    padding: '12px 16px',
    border: 'none',
    cursor: 'pointer'
  },
  cancelButton: {
    alignSelf: 'stretch',
    borderRadius: '50px',
    border: '1px solid var(--Blue, #26969c)',
    marginTop: '8px',
    width: '100%',
    gap: '8px',
    color: 'var(--Blue, #26969c)',
    fontWeight: 500,
    padding: '12px 24px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    '@media (max-width: 991px)': {
      padding: '0 20px'
    }
  }
};

const DeleteAddressSellerPop = ({toggleDeleteAddress,deleteAddress,id }) => {


  return (
    <div style={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div style={styles.modalContainer}>
        <div style={styles.contentWrapper}>
          <h2 id="modal-title" style={styles.title}>إزالة العنوان </h2>
          <p style={styles.description}>
          هل أنت متأكد أنك تريد حذف العنوان         
           </p>
        </div>
        <div style={styles.buttonContainer}>
          <button 
            style={styles.confirmButton}
            onClick={() => deleteAddress(id)}            
            tabIndex={0}
          >
            تأكيد الحذف   
                
        </button>
          <button 
            style={styles.cancelButton}
            onClick={toggleDeleteAddress}
            tabIndex={0}
          >
            الرجوع
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAddressSellerPop;