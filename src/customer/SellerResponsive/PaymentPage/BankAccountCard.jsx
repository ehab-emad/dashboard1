

const styles = {
    accountCard: {
        justifyContent: 'space-between',
        alignItems: 'start',
        borderRadius: '16px',
        border: '1px solid rgba(0, 47, 54, 0.08)', // var(--line-saperator)
        alignSelf: 'stretch',
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        flex: '1 1 0%',
        width : 'auto',
        margin: 'auto 0',
        padding: '16px',
      },
      accountCardActive: {
        width : 'auto',
        justifyContent: 'space-between',
        alignItems: 'start',
        borderRadius: '16px',
        border: '1px solid #26969c', // var(--Blue)
        background: '#fff', // var(--White)
        alignSelf: 'stretch',
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        flex: '1 1 0%',
        margin: 'auto 0',
        padding: '16px',
      },
      bankLogoWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        justifyContent: 'center',
      },
      bankLogo: {
        aspectRatio: '1',
        objectFit: 'contain',
        objectPosition: 'center',
        width: '36px',
        alignSelf: 'stretch',
        margin: 'auto 0',
      },
      accountInfo: {
        display: 'flex',
        flexDirection: 'column',
        color: '#736e67', // var(--Paragraph)
        textAlign: 'right',
        justifyContent: 'start',
        flex: '1',
      },
      accountName: {
        color: '#252422', // var(--Text)
        fontSize: '16px',
        fontWeight: 600,
        alignSelf: 'end',
      },
      accountRow: {
        display: 'flex',
        marginTop: '8px',
        width: '100%',
        alignItems: 'center',
        gap: '8px',
        justifyContent: 'end',
      },
      accountLabel: {
        fontWeight: 400,
        alignSelf: 'stretch',
        width: '80px',
        margin: 'auto 0',
        whiteSpace: "nowrap"
      },
      defaultBadge: {
        alignSelf: 'stretch',
        borderRadius: '8px',
        background: '#e1ffc9', // var(--success-shade)
        gap: '8px',
        fontSize: '12px',
        color: '#4a9908', // var(--success)
        fontWeight: 500,
        whiteSpace: 'nowrap',
        textAlign: 'center',
        lineHeight: '1',
        margin: 'auto 0',
        padding: '4px',
      },
      actionIcon: {
        aspectRatio: '1',
        objectFit: 'contain',
        objectPosition: 'center',
        width: '28px',
      },
};

const activeicon=  "https://cdn.builder.io/api/v1/image/assets/TEMP/5f5430af4e4079e6e8223429ec9903025f086cbd18e19caab60a7026f891f478?placeholderIfAbsent=true&apiKey=d450998b662b4d7f9d8aea2e6e480818"
const inactiveicon=  "https://cdn.builder.io/api/v1/image/assets/TEMP/4fbe6724a9069aeba158726af4802e90502bc9f45d4218ab02b31fefc172c684?placeholderIfAbsent=true&apiKey=d450998b662b4d7f9d8aea2e6e480818"



function BankAccountCard({ account , toggleDefaultState }) {

  return (
  <div onClick={toggleDefaultState} style={account.isDefault ? styles.accountCardActive : styles.accountCard}>
    {/* first logo */}
    <div style={styles.bankLogoWrapper}>
      {account.bankLogos.map((logo, index) => (
        <img
          key={index}
          loading="lazy"
          src={logo}
          alt=""
          style={styles.bankLogo}
        />
      ))}
    </div>
    {/* second part */}
    <div style ={{display : "flex" , gap : "10px", alignItems : "start"}}>
      <div style={styles.accountInfo}>
      <div style={styles.accountRow}>
        {account.isDefault && (
          <div style={styles.defaultBadge}>افتراضي</div>
        )}
        <div style={styles.accountName}>{account.name}</div>
      </div>
      <div style={styles.accountRow}>
        <div style={styles.accountNumber}>{account.accountNumber}</div>
        <div style={styles.accountLabel}>:رقم الحساب</div>
      </div>
      <div style={styles.accountRow}>
        <div style={styles.accountNumber}>{account.iban}</div>
        <div style={styles.accountLabel}>:الأيبان</div>
      </div>
      <div style={styles.accountRow}>
        <div style={styles.accountNumber}>{account.swift}</div>
        <div style={styles.accountLabel}>:السويفت</div>
      </div>
      </div>
      <img
        loading="lazy"
      src={account.isDefault ? activeicon : inactiveicon}
      alt=""
      style={styles.actionIcon}
      tabIndex="0"
      role="button"
      />
    </div>
  </div>
  );
}

export default BankAccountCard;