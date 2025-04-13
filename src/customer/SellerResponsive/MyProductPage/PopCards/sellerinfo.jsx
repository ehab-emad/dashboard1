import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSeller } from "../../../../store/reducers/sellerProductsReducer";


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
    width: '100%',
    alignItems: 'center',
    gap: '8px',
    justifyContent: 'end'
  },
  container: {
    justifyContent: "end",
    alignItems: "center",
    borderRadius: "24px",
    border: "0.5Px solid var(--Stroke, rgba(0, 47, 54, 0.24))",
    display: "flex",
    gap: "16px",
    fontFamily: "Expo Arabic, sans-serif",
    textAlign: "center",
    padding: "16px",
    width: 'auto'

  },
  contactButton: {
    alignSelf: "stretch",
    borderRadius: "50px",
    border: "1px solid var(--Blue, #27989e)",
    gap: "8px",
    fontSize: "14px",
    color: "var(--Blue, #27989e)",
    fontWeight: "500",
    margin: "auto 0",
    padding: "16px",
    backgroundColor: "transparent",
    cursor: "pointer"
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    justifyContent: "end",
    flex: 1,
    flexBasis: "32px",
    margin: "auto 0",
  },
  userDetails: {
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
    justifyContent: "center",
    flex: 1,
    flexBasis: "0%",
    margin: "auto 0"
  },
  verifiedBadge: {
    borderRadius: "8px",
    background: "var(--success-shade, #e1ffc9)",
    backgroundColor: "var(--success-shade, #e1ffc9)",
    gap: "10px",
    fontSize: "12px",
    color: "var(--success, #4a9908)",
    fontWeight: "600",
    padding: "4px 8px",
    width: 'auto'
  },
  userName: {
    marginTop: "4px",
    gap: "4px",
    fontSize: "18px",
    color: "var(--Text, #252422)",
    fontWeight: "500",
    lineHeight: "1"
  },
  userAvatar: {
    aspectRatio: "1",
    objectFit: "contain",
    objectPosition: "center",
    width: "44px",
    boxShadow: "0px 4px 16px 0px rgba(255, 255, 255, 0.24)",
    alignSelf: "stretch",
    margin: "auto 0"
  }

};

function RenterInfoAdmin({Order}) {
  const {sellerdata  } = useSelector((state) => state.seller_products);

  const dispatch=useDispatch()
  useEffect(()=>{
dispatch(getSeller(Order.sellerid))


  },[])
  return (
    <div style={styles.renterCard}>
      <div style={styles.header}>
        <span>:بيانات المالك</span>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ae47a5b6ccdab1fd1cb4ebe5d95b96f94327ef2a925f54bc73b9598a467b5282?placeholderIfAbsent=true&apiKey=6d0a7932901f457a91041e45ceb959e7" alt="" style={styles.headerIcon} />
      </div>
      <div style={styles.container}>
      <button 
        style={styles.contactButton}
        tabIndex="0"
        aria-label="مراجعة العضوية"
      >
        مراجعة العضوية
      </button>{
        sellerdata?
        <div style={styles.userInfo}>
        <div style={styles.userDetails}>
          <div style={styles.verifiedBadge}> 
          {
              sellerdata.status==="approved"?       '   مالك   موثوق'
              :
             ' مالك غير موثق'

            }

          </div>{console.log(sellerdata)}
          <div style={styles.userName}> {sellerdata.sellername||"empty"}</div>
        </div>
        <img
          loading="lazy"
          src={sellerdata.profileimage || "https://cdn.builder.io/api/v1/image/assets/TEMP/5f02b4db5cc70c11bdf0641a418032178f997ffff8f299103fa0e831bdb4ff46?placeholderIfAbsent=true&apiKey=2e2b2f636cc34221b980cbf747a16fe6"}
          style={styles.userAvatar}
          alt="صورة المالك خالد محمد"
        />
      </div>:<div></div>
      }
    
      
      </div>
  
    </div>
  );
}

export default RenterInfoAdmin;