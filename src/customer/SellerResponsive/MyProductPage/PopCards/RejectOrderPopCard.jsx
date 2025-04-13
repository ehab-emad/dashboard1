const RejectOrderStyle = {

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

  },
  modal: {
    alignSelf: 'stretch',
    position: 'absolute',
    top: '50%',          // Position at the vertical center
    left: '50%',         // Position at the horizontal center
    transform: 'translate(-50%, -50%)', // Adjust position to center
    borderRadius: '24px',
    background: 'var(--White, #fff)',
    boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.04)',
    display: 'flex',
    maxWidth: '380px',
    flexDirection: 'column',
    fontFamily: 'Expo Arabic, sans-serif',
    textAlign: 'center',
    justifyContent: 'start',
    padding: '40px 24px',
  },
  content: {
    alignSelf: 'center',
    display: 'flex',
    width: '276px',
    maxWidth: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: "nowrap",
  },
  title: {
    color: 'var(--Text, #252422)',
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '1',
  },
  description: {
    color: 'var(--Cool, #8d8883)',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '1',
    marginTop: '8px',
  },
  buttonContainer: {
    display: 'flex',
    marginTop: '40px',
    width: '100%',
    alignItems: 'start',
    gap: '8px',
    fontSize: '14px',
    lineHeight: '1',
    justifyContent: 'end',
  },
  backButton: {
    alignSelf: 'stretch',
    borderRadius: '50px',
    border: '1px solid var(--Blue, #26969c)',
    gap: '8px',
    color: 'var(--Blue, #26969c)',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    flex: '1',
    padding: '12px 24px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
  },
  confirmButton: {
    alignSelf: 'stretch',
    borderRadius: '50px',
    background: 'var(--Blue, #26969c)',
    boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.08)',
    gap: '8px',
    overflow: 'hidden',
    color: 'var(--White, #fff)',
    fontWeight: '600',
    flex: '1',
    padding: '12px 16px',
    cursor: 'pointer',
    border: 'none',
  }
};

const deleteContent = {
  title: 'حذف المنتج',
  description: 'هل انت متأكد من رغبتك في حذف هذا المنتج؟',
  ariaLabel: 'تأكيد الحذف',
  confirmButtonText: 'تأكيد الحذف'
};

const rejectContent = {
  title: 'رفض طلب التأجير',
  description: 'هل انت متأكد من رغبتك في رفض طلب التأجير؟',
  ariaLabel: 'تأكيد رفض الطلب',
  confirmButtonText: 'تأكيد رفض الطلب'
};

const RejectOrderPopCard = ({setDeletProduct,deleteProduct ,type }) => {
  const content = type === 'delete' ? deleteContent : rejectContent;

  const handlebackbutton=() => {

    setDeletProduct(false)
  }


  const handleConfirm=() => {

    deleteProduct()
    setDeletProduct(false)
  }


  return (

    <div style={RejectOrderStyle.overlay}>
    <div style={RejectOrderStyle.modal} role="dialog" aria-labelledby="rejection-title" aria-describedby="rejection-description">
      <div style={RejectOrderStyle.content}>
        <h2 id="rejection-title" style={RejectOrderStyle.title}>{content.title}</h2>
        <p id="rejection-description" style={RejectOrderStyle.description}>
          {content.description}
        </p>
      </div>
      <div style={RejectOrderStyle.buttonContainer}>
        <button 
          style={RejectOrderStyle.backButton}
          tabIndex={0}
          aria-label="الرجوع"
          onClick={handlebackbutton}
        >
          الرجوع
        </button>
        <button 
          style={RejectOrderStyle.confirmButton}
          tabIndex={0}
          aria-label={content.ariaLabel}
          onClick={handleConfirm}
        >
          {content.confirmButtonText}
        </button>
      </div>
    </div>
    </div>
  );
};

export default RejectOrderPopCard;