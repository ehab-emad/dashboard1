
import  { useState } from 'react';

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
    },
  
  addNewCard: {
    borderRadius: '24px',
    boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.04)',
    backgroundColor: '#fff',
    display: 'flex',
    width: 'auto',
    flexDirection: 'column',
    justifyContent: 'start',
    padding: '24px',
  
  },
  cardHeader: {
    paddingBottom: '8px',
    justifyContent: 'end',
    alignItems: 'center',
    borderBottom: '1px solid rgba(0, 47, 54, 0.08)',
    display: 'flex',
    width: '100%',
    gap: '8px',
    color: '#252422',
    textAlign: 'right',
    flexWrap: 'wrap',
    font: '600 24px Expo Arabic, -apple-system, Roboto, Helvetica, sans-serif',
    '@media (max-width: 991px)': {
      maxWidth: '100%'
    }
  },
  cardLogo: {
    aspectRatio: '1',
    objectFit: 'contain',
    objectPosition: 'center',
    width: '32px',
    alignSelf: 'stretch',
    cursor :' pointer',
  },
  cardTitle: {
    alignSelf: 'stretch',
    flex: 1,
    flexBasis: '0%',
    margin: 'auto 0',
    '@media (max-width: 991px)': {
      maxWidth: '100%'
    }
  },
  cardOptions: {
    aspectRatio: '1',
    objectFit: 'contain',
    objectPosition: 'center',
    width: '24px',
    alignSelf: 'stretch',
    margin: 'auto 0'
  },
  cardForm: {
    display: 'flex',
    marginTop: '40px',
    width: 'auto',
    flexDirection: 'column',
    fontSize: '14px',
    fontWeight: '400',
    justifyContent: 'start',
 
  },
  formGroup: {
    display: 'flex',
    width: 'auto',
    alignItems: 'start',
    gap: '16px',
    fontFamily: 'Expo Arabic, sans-serif',
    textAlign: 'right',
    justifyContent: 'end',
    flexWrap: 'wrap',

  },
  formField: {
    display: 'flex',
    width: 'auto',
    flexDirection: 'column',
    justifyContent: 'start',
    flex: 1,

  },
  formLabel: {
    color: '#252422',
    alignSelf: 'end',
    direction: ' ltr'
  },
  textInput: {
    alignSelf: 'stretch',
    borderRadius: '8px',
    backgroundColor: '#f6f5f5',
    marginTop: '8px',
    width: 'auto',
    color: '#736e67',
    padding: '16px',
        direction: 'rtl'

  },
  cvvField: {
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '8px',
    display: 'flex',
    width: 'auto',

  },

  submitButton: {
    alignSelf: 'stretch',
    borderRadius: '50px',
    backgroundColor: '#8d8883',
    marginTop: '40px',
    width: '100%',
    overflow: 'hidden',
    color: '#fff',
    textAlign: 'center',
    padding: '16px',
    font: '500 16px/1 Expo Arabic, -apple-system, Roboto, Helvetica, sans-serif',

  }
};

function AddPaymentMethodFormSeller({toggleAddCard}) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    cvv: '',
    expiryDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (

  <div style={styles.overlay}>
    <div style={styles.addNewCard}>
      <div style={styles.cardHeader}>
        <img 
          loading="lazy" 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/84b15f0f49b0b5cca28a0ce83139e43bd4c4853af00470229f75b745cacb8b98?placeholderIfAbsent=true&apiKey=57830d6d22374b3392882ad918f38de5" 
          alt="" 
          style={styles.cardLogo} 
          onClick={toggleAddCard}
        />
        <div style={styles.cardTitle}>اضافة بطاقة جديدة</div>
        <img 
          loading="lazy" 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/831e9e8d09758935df02be32b48ba30bcb5f18d2a80a0f3f768f3fb9471fedce?placeholderIfAbsent=true&apiKey=57830d6d22374b3392882ad918f38de5" 
          alt="" 
          style={styles.cardOptions} 
        />
      </div>
      <form onSubmit={handleSubmit} style={styles.cardForm}>
        <div style={styles.formGroup}>
          <div style={styles.formField}>
            <label htmlFor="cardNumber" style={styles.formLabel}>رقم البطاقة</label>
            <input 
              id="cardNumber"
              type="password"
              value={formData.cardNumber}
              onChange={handleInputChange}
              style={styles.textInput}
              placeholder="******************************"
              aria-label="رقم البطاقة"
            />
          </div>
          <div style={styles.formField}>
            <label htmlFor="cardHolder" style={styles.formLabel}>اسم حامل البطاقة</label>
            <input 
              id="cardHolder"
              type="text"
              value={formData.cardHolder}
              onChange={handleInputChange}
              style={styles.textInput}
              placeholder="e.g John"
              aria-label="اسم حامل البطاقة"
            />
          </div>
        </div>
        <div style={styles.formGroup}>
          <div style={styles.formField}>
            <label htmlFor="cvv" style={styles.formLabel}>CVV</label>
            <div style={styles.cvvField}>

              <input 
                id="cvv"
                type="number"
                value={formData.cvv}
                onChange={handleInputChange}
                style={styles.textInput}
                placeholder="CVV"
                aria-label="CVV"
                maxLength="4"
              />
            </div>
          </div>
          <div style={styles.formField}>
            <label htmlFor="expiryDate" style={styles.formLabel}>تاريخ الإنتهاء</label>
            <input 
              id="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={handleInputChange}
              style={styles.textInput}
              placeholder="MM / YY"
              aria-label="تاريخ الإنتهاء"
            />
          </div>
        </div>
        <button type="submit" style={styles.submitButton}>اضافة البطاقة</button>
      </form>
    </div>
    </div>
  );
}

export default AddPaymentMethodFormSeller;