

const addressData = {
  headerTitle: "عنوان الاستلام",
  defaultTag: "العنوان الافتراضي",
  addressTitle: "المنزل",
  city: {
    name: "الرياض",
    label: "المدينة",
  },
  details: {
    text: "العنوان الكامل يذهب هنا",
    label: "العنوان",
  },
};
const ReceivingAddress = ({orderData}) => {
const addressStyles = {
  addresssection: {
    borderRadius: '24px',
    background: 'var(--White, #fff)',
    boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.04)',
    display: 'flex',
    width: ' auto',
    flexDirection: 'column',
    height:"184px",
    overflow: 'hidden',
    fontFamily: 'Expo Arabic, sans-serif',
    justifyContent: 'start',
    padding: '16px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: ' right',
  },
  headerTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginRight: '8px',
  },
  headerIcon: {
    width: '24px',
    height: '24px',
  },
  addressContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '16px',
  },
  addressContent: {
    flex: 1,
  },
  titleRow: {
    display: 'flex',
    justifyContent: 'right',
  },
  defaultTag: {
    backgroundColor: '#E1FFC9',
    borderRadius: '12px',
    color : '#4A9908',
    padding: '2px'

  },
  addressTitle: {
    fontWeight: 'bold',
  },
  cityRow: {
    display: 'flex',
    justifyContent: 'right',
    marginBottom: '8px',
    gap: '2px'
  },
  cityName: {
    fontWeight: 'bold',
  },
  cityLabel: {
    color: 'gray',
  },
  detailsRow: {
    display: 'flex',
    justifyContent: 'right',
  },
  detailsText: {
    color: 'black',
  },
  detailsLabel: {
    color: 'gray',
    display: 'flex',
    justifyContent: 'flex-end' ,// Use 'flex-end' for right alignment


    
  },
  locationIcon: {
    width: '24px',
    height: '24px',
  },
};

return (
  <div style={addressStyles.addresssection}>
    <div style={addressStyles.header}>
      <div style={addressStyles.headerTitle}>{addressData.headerTitle}</div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/acf40567464ef9e944bdcdcce8f4cbceb3942fe45c865fc5090ae9f658799914?placeholderIfAbsent=true&apiKey=2e2b2f636cc34221b980cbf747a16fe6"
        style={addressStyles.headerIcon}
        alt="Delivery address icon"
      />
    </div>
    <div style={addressStyles.addressContainer}>
      <div style={addressStyles.addressContent}>
        <div style={addressStyles.titleRow}>
          <div style={addressStyles.defaultTag}>{addressData.defaultTag}</div>
          <div style={addressStyles.addressTitle}>{addressData.addressTitle}</div>
        </div>
        <div style={addressStyles.cityRow}>
          <div style={addressStyles.cityName}>{orderData.pickupaddress? orderData.pickupaddress.city  : "empty"}</div>
          <div style={addressStyles.cityLabel}>:{addressData.city.label}</div>
        </div>
        <div style={addressStyles.cityRow}>
           
          <div style={addressStyles.cityName}>{orderData.pickupaddress? orderData.pickupaddress.address  : "empty"}</div>
          <div style={addressStyles.cityLabel}>:{addressData.details.label}</div>

        </div>
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/eeb3858d2e0cfae87947aea0ca63645cfc0fb5254a900437291dd2c6efa62426?placeholderIfAbsent=true&apiKey=2e2b2f636cc34221b980cbf747a16fe6"
        style={addressStyles.locationIcon}
        alt="Location pin icon"
      />
    </div>
  </div>
);
};

export default ReceivingAddress;