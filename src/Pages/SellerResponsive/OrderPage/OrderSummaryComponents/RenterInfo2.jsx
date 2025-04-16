

const styles = {
  renterCard: {
    alignSelf: 'stretch',
    borderRadius: '24px',
    background: 'var(--White, #fff)',
    display: 'flex',
    width: 'auto', // Full width of the parent
    minWidth: 'calc(100% - 32px)', // Ensure minWidth accounts for parent's padding
    maxWidth: '100%', // Prevent exceeding parent width
    height: 'auto',
    flexDirection: 'column',
    overflow: 'hidden',
    padding: '16px',
    flexShrink: 0, // Prevent shrinking in flex container

    '@media (max-width: 991px)': {
      maxWidth: '100%'
    }
  },
  header: {
    paddingBottom: '8px',
    justifyContent: 'end',
    alignItems: 'center',
    borderBottom: '1px solid var(--line-saperator, rgba(0, 47, 54, 0.08))',
    display: 'flex',
    width: '100%',
    gap: '8px',
    fontSize: '18px',
    color: 'var(--Text, #252422)',
    fontWeight: '400',
    textAlign: 'right'
  },
  headerIcon: {
    aspectRatio: '1',
    objectFit: 'contain',
    objectPosition: 'center',
    width: '24px'
  },
  profileContainer: {
    borderRadius: '24px',
    border: '0.5px solid var(--Stroke, rgba(0, 47, 54, 0.24))',
    display: 'flex',
    marginTop: '16px',
    width: '100%',
    flexDirection: 'column',
    padding: '4px'
  },
  profileHeader: {
    display: 'flex',
    width: 'auto',
    alignItems: 'center',
    gap: '8px',
    justifyContent: 'space-between',
    paddingRight:'10px',
    paddingLeft:'10px'

  },
  verifiedBadge: { 
    borderRadius: '8px',
    background: 'var(--success-shade, #e1ffc9)',
    padding: '4px 8px',
    whiteSpace:"nowrap",
    fontSize: '12px',
    color: 'var(--success, #4a9908)',
    fontWeight: '600',
    textAlign: 'center',
    margin: 'auto 0'
  },
  userInfo: {
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    justifyContent: 'center',
    flex: 1
  },
  userName: {
    fontSize: '18px',
    color: 'var(--Text, #252422)',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 1
  },
  location: {
    color: 'var(--Paragraph, #736e67)',
    textAlign: 'right',
    fontSize: '14px',
    fontWeight: '300',
    lineHeight: 1,
    marginTop: '4px'
  },
  avatar: {
    width: '44px',
    aspectRatio: '1',
    objectFit: 'contain',
    boxShadow: '0px 4px 16px 0px rgba(255, 255, 255, 0.24)'
  },
  divider: {
    width: '100%',
    height: '1px',
    marginTop: '16px'
  },
  infoSection: {
    display: 'flex',
    marginTop: '16px',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'end',
    fontSize: '14px'
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'var(--Paragraph, #736e67)',
    fontWeight: '400',
    textAlign: 'right',
    lineHeight: 2,
    justifyContent: 'start',
    marginTop: '8px'
  },
  infoText: {
    alignSelf: 'stretch',
    margin: 'auto 0'
  },
  infoIcon: {
    aspectRatio: '1',
    objectFit: 'contain',
    objectPosition: 'center',
    width: '24px',
    alignSelf: 'stretch',
    margin: 'auto 0'
  },
  ratingContainer: {
    alignSelf: 'stretch',
    display: 'flex',
    marginTop: '8px',
    width: '100%',
    alignItems: 'center',
    gap: '8px',
    justifyContent: 'end'
  },
  ratingWrapper: {
    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'var(--Paragraph, #736e67)',
    fontWeight: '400',
    textAlign: 'right',
    lineHeight: 2,
    justifyContent: 'start',
    margin: 'auto 0',
    '@media (max-width: 991px)': {
      whiteSpace: 'initial'
    }
  },
  ratingText: {
    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    justifyContent: 'end',
    margin: 'auto 0'
  },
  ratingValue: {
    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    justifyContent: 'end',
    margin: 'auto 0'
  },
  starsValue: {
    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    justifyContent: 'end',
    margin: 'auto 0'
  },
  ratingIcon: {
    aspectRatio: '1',
    objectFit: 'contain',
    objectPosition: 'center',
    width: '24px'
  },
  profileimg : {
    display : 'flex',
    flexDirection: 'row'

  },
  contactButton: {
    borderRadius: '50px',
    border: '1px solid var(--Blue, #27989e)',
    marginTop: '16px',
    width: 'auto',
    padding: '16px 6px',
    fontSize: '16px',
    color: 'var(--Blue, #27989e)',
    fontWeight: '500',
    textAlign: 'center',
    '@media (max-width: 991px)': {
      padding: '0 20px'
    }
  }
};

function RenterInfo({orderData}) {
  return (
    <div style={styles.renterCard}>
      <div style={styles.header}>
        <span>:بيانات المستأجر </span>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ae47a5b6ccdab1fd1cb4ebe5d95b96f94327ef2a925f54bc73b9598a467b5282?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e7" alt="" style={styles.headerIcon} />
      </div>
      
      <div style={styles.profileContainer}>
        <div style={styles.profileHeader}>
          <button style={styles.contactButton}>مراجعة العضوية  </button>
          <div style={styles.profileimg}>   
             <div style={styles.userInfo}>
              <div style={styles.verifiedBadge}>  {
                  orderData.customerstatus==="approved"? "  مالك موثوق":"مالك غير موثوق"
                }</div>
              <div style={styles.userName}>{orderData.customername||"empty"} </div>
             </div>

             <img loading="lazy" src={orderData.customerimage||"https://cdn.builder.io/api/v1/image/assets/TEMP/2a18a1efa1608002be194d42f3bfbf8f8234c6e03664aa6ad91723d9a41c9f6d?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e7"} alt="صورة المستأجر" style={styles.avatar} />

          </div>
        </div>
      

        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/0a742e7554757f620346d9dd00e9750a7f28f92d794af6ef4402e33494401e3f?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e7" alt="" style={styles.divider} />



      </div>
    </div>
  );
}

export default RenterInfo;