
const SettingsCardFieldSeller = ({ label, initialValue , type,setSelected,value}) => {

  const isPhoneNumberLabel = label === "رقم الجوال"; // Check if the label is the phone number label

  

  const styles = {
    wrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'end',
      flex: 1,
      outline: 'none',
      border: 'none'
    },
    labelWrapper: {
      alignSelf: 'end',
      display: 'flex',
      alignItems: 'start',
      gap: '8px',
      fontWeight: '400',
      justifyContent: 'end',
    },
    label: {
      color: 'var(--Text, #252422)',
      fontSize: '16px',
      lineHeight: '1',
    },
    badge: {
      alignSelf: 'stretch',
      borderRadius: '50px',
      background: 'var(--BG-gray, #f6f5f5)',
      gap: '8px',
      overflow: 'hidden',
      fontSize: '12px',
      color: 'var(--Paragraph, #736e67)',
      textAlign: 'center',
      lineHeight: '1',
      padding: '4px 8px',
    },
    input: {
      alignSelf: 'stretch',
      borderRadius: '16px',
      background: 'var(--BG-gray, #f6f5f5)',
      textAlign :  isPhoneNumberLabel ? 'right' : 'none', // Conditional direction
      marginTop: '8px',
      width: 'auto',
      fontSize: '14px',
      color: 'var(--Cool, #8d8883)',
      fontWeight: '300',
      lineHeight: '1',
      padding: '16px',
      direction: isPhoneNumberLabel ? 'ltr' : 'rtl', // Conditional direction
      border: 'none', // Remove the border
      outline: 'none', // Remove the outline on focus
  
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.labelWrapper}>
        <div style={styles.label}>{label}</div>
      </div>
      <input
        type={type}        
        value={value}
        placeholder={initialValue}
        onChange={(e) => setSelected(e.target.value)}
        style={styles.input}
        aria-label={label} // Accessibility improvement
      />
    </div>
  );
};

export default SettingsCardFieldSeller;