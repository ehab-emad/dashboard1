import styled from "styled-components";

const active = 'https://cdn.builder.io/api/v1/image/assets/TEMP/f258512ce488319fbf1c1f7d88b41ff6b52a1d2348c33f65ed75983dc520a8bf?placeholderIfAbsent=true&apiKey=57830d6d22374b3392882ad918f38de5'
const inactive = 'https://cdn.builder.io/api/v1/image/assets/TEMP/87527008286ce7c1fcb85794d81a119ea6e53b04a776981c0dba0c2cf0a50923?placeholderIfAbsent=true&apiKey=57830d6d22374b3392882ad918f38de5'

const SelectImg = styled.img `
display : block;
@media (max-width : 654px) {
  display : none;
}
`
const Card = styled.div `
gap: 24px;
@media (max-width : 654px) {
  flex-direction : column-reverse;
  gap: 16px;
}
`

const PaymentCardSeller = ({ key,card ,onDeleteClick,toggleDefaultCard} ) => {
  
  
  const styles = {
    card: {
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: '16px',
      border: card.isDefault ? '1px solid var(--Blue, #26969c)' : '1px solid var(--line-saperator, rgba(0, 47, 54, 0.08))',
      background: 'var(--White, #fff)',
      display: 'flex',
      fontFamily: 'Expo Arabic, sans-serif',
      flexWrap: 'wrap',
      padding: '16px',
      cursor:' pointer'
    },
    icon: {
      aspectRatio: '1',
      objectFit: 'contain',
      objectPosition: 'center',
      width: '36px',
      alignSelf: 'stretch',
      margin: 'auto 0'
    },
    dateContainer: {
      alignSelf: 'stretch',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      textAlign: 'right',
      justifyContent: 'space-between',
      flex : .5,
      '@media (max-width: 991px)': {
        maxWidth: '100%'
      }
    },
    date: {
      color: 'var(--Text, #252422)',
      fontWeight: '500',
      alignSelf: 'stretch',
      margin: 'auto 0'
    },
    dateLabel: {
      color: 'var(--Paragraph, #736e67)',
      fontWeight: '400',
      alignSelf: 'stretch',
      margin: 'auto 0'
    },
    cardInfoContainer: {
      alignSelf: 'stretch',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      justifyContent: 'end',
      margin: 'auto 0',
      flex : 1,
      '@media (max-width: 991px)': {
        maxWidth: '100%'
      }
    },
    statusBadge: {
      alignSelf: 'stretch',
      borderRadius: '8px',
      background: 'var(--success-shade, #e1ffc9)',
      gap: '8px',
      overflow: 'hidden',
      fontSize: '12px',
      color: 'var(--success, #4a9908)',
      fontWeight: '500',
      whiteSpace: 'nowrap',
      textAlign: 'center',
      lineHeight: '1',
      margin: 'auto 0',
      padding: '4px',
      '@media (max-width: 991px)': {
        whiteSpace: 'initial'
      }
    },
    cardNumber: {
      textAlign: 'right',
      fontSize: '18px',
      fontWeight: '600',
      alignSelf: 'stretch',
      margin: 'auto 0'
    },
    cardNumberLabel: {
      fontWeight: '500',
      color: 'var(--Text, #252422)'
    },
    cardNumberValue: {
      color: 'var(--Orange, #ff8945)'
    },
    cardLogo: {
      aspectRatio: '1',
      objectFit: 'contain',
      objectPosition: 'center',
      width: '48px',
      alignSelf: 'stretch',
      margin: 'auto 0'
    },
    menuIcon: {
      aspectRatio: '1',
      objectFit: 'contain',
      objectPosition: 'center',
      width: '28px',
      alignSelf: 'stretch',
      margin: 'auto 0'
    }
  };


   const activeicon = card.isDefault ? active :inactive ;
                

  return (


      <Card onClick={() => toggleDefaultCard(card.id)} style={styles.card}>
        <div style={styles.dateContainer}>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a3a4c182782bc4347c0ae04ad923673b168b6585d201f143385003845a27f850?placeholderIfAbsent=true&apiKey=57830d6d22374b3392882ad918f38de5"
        style={styles.icon}
        alt=""
        onClick={onDeleteClick}
      />
        <div style = {{display : 'flex',flexDirection : 'row' , alignItems : 'center' }}>
          <div style={styles.date}>{card.expiration}</div>
          <div style={styles.dateLabel}>:تاريخ الانتهاء</div>
        </div>
        </div>
        <div style={styles.cardInfoContainer}>
        
        <div style={styles.statusBadge} role="status">{activeicon ==active ?' افتراضي': ''}</div>
        <div style={styles.cardNumber}>
          <span style={styles.cardNumberLabel}>تنتهي بالرقم</span>
          <span style={styles.cardNumberValue}>{card.fourdigits}</span>
        </div>
        <img
          loading="lazy"
          src={card.icon}
          style={styles.cardLogo}
          alt="Card provider logo"
        />
        <SelectImg
        loading="lazy"
        src={activeicon}
        style={styles.menuIcon}
        alt=""
        tabIndex="0"
        role="button"
      />
        </div>
    </Card>

  );
};

export default PaymentCardSeller;