
import  { useState } from 'react';
import PaymentCardCustomer from './PaymentCardCustomer';
import AddPaymentMethodFormSeller from './AddPaymentMethodFormSeller';
import RejectOrderPopCardseller from './RejectOrderPopCardSeller';


const initialCards = [
  {
    id: 1,
    expiration: '00/00/000',
    isDefault: true,
    fourdigits: '7404',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/8a93f88c691a38061922ab5f4ab61951dd53c0ef9a4f9c546bb3db343b2e7239?placeholderIfAbsent=true&apiKey=57830d6d22374b3392882ad918f38de5',
   
  },
  {
    id: 2,
    expiration: '00/00/000',
    isDefault: false,
    fourdigits: '7404',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/8a93f88c691a38061922ab5f4ab61951dd53c0ef9a4f9c546bb3db343b2e7239?placeholderIfAbsent=true&apiKey=57830d6d22374b3392882ad918f38de5',
   
  },
 
];
const styles = {
  container: {
    alignSelf: 'stretch',
    borderRadius: '16px',
    background: 'var(--White, #fff)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    padding: '16px'
  },
  header: {
    padding: '0 0 8px',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid var(--line-saperator, rgba(0, 47, 54, 0.08))',
    display: 'flex',
    width: '100%',
    fontFamily: 'Expo Arabic, sans-serif',
    flexWrap: 'wrap'
  },
  addNewButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50px',
    background: 'var(--Light, #e5f2f3)',
    display: 'flex',
    gap: '4px',
    fontSize: '14px',
    color: 'var(--Blue, #26969c)',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: '1',
    margin: 'auto 0',
    padding: '16px 24px'
  },
  addNewIcon: {
    width: '16px',
    height: '16px',
    objectFit: 'contain'
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '18px',
    color: 'var(--Text, #252422)',
    fontWeight: '500',
    textAlign: 'right',
    justifyContent: 'end',
    flex: '1',
    flexBasis: '48px'
  },
  titleIcon: {
    width: '24px',
    height: '24px',
    objectFit: 'contain'
  },
  messageContainer: {
    alignSelf: 'stretch',
    borderRadius: '16px',
    background: 'var(--BG-gray, #f6f5f5)',
    backgroundColor: 'var(--BG-gray, #f6f5f5)',
    gap: '24px',
    color: 'var(--Paragraph, #736e67)',
    textAlign: 'center',
    padding: '16px',
    font: '400 14px Expo Arabic, -apple-system, Roboto, Helvetica, sans-serif',
  }
  
};
const PaymentMethodsCustomer = () => {



const [AddCard, setAddCard] = useState(false);
const [cards, setCards] = useState(initialCards);
const [showmessage, setShowMessage] = useState(false);
const [activecard, setActiveCard] = useState('');


  
const toggleDefaultCard = (id) => {
  setCards((prevCards) => 
    prevCards.map((card) => ({
      ...card,    
      isDefault: !card.isDefault, // Toggle the isDefault state
    }))
  );
  setActiveCard(id)
};


const toggleAddCard = () => {
  setAddCard(prevState => !prevState);

};



const onDeleteClick =() => {

  setShowMessage(!showmessage)

}

const deleteCard = (id) => {
  setCards((prevCards) => prevCards.filter(card => card.id !== activecard));
};



  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={toggleAddCard} style={styles.addNewButton}>
          <span>اضافة وسيلة دفع</span>
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/945874ee7fd94ac004afc566f72c960c7929d36660ea6d7e4194f4902f33f11f?placeholderIfAbsent=true&apiKey=57830d6d22374b3392882ad918f38de5" 
            alt="" 
            style={styles.addNewIcon}
          />
        </button>
        <div style={styles.titleWrapper}>
          <span>وسائل الدفع</span>
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ccbe98d10232e98b51b12a90d2084798206457ba3de56258bac1932eec32fbb5?placeholderIfAbsent=true&apiKey=57830d6d22374b3392882ad918f38de5" 
            alt="" 
            style={styles.titleIcon}
          />
        </div>
      </div>

        {cards.length > 0 ? (
          cards.map(card => (
            <PaymentCardCustomer 
              key={card.id}
              card={card}
              toggleDefaultCard={toggleDefaultCard}
              onDeleteClick={onDeleteClick}
            />
          ))
        ) : 
        <div 
            className="no-address-message" 
            style={styles.messageContainer}
            role="alert"
            aria-live="polite"
          >
            لا يوجد وسيلة دفع بعد
          </div>
        
        
    }
        {  AddCard ? <AddPaymentMethodFormSeller toggleAddCard={toggleAddCard} deleteCard={deleteCard} /> : null }
        {showmessage? <RejectOrderPopCardseller onDeleteClick={onDeleteClick} deleteCard={deleteCard}/> : null}

  
    </div>
  );
};

export default PaymentMethodsCustomer;