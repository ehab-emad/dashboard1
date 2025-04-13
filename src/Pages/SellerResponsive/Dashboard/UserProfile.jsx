

const styles = {
  container: {
    justifyContent: 'end',
    alignItems: 'center',
    borderRadius: '8px',
    boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    width: '100%',
    gap: '8px',
    fontWeight: '500',
    textAlign: 'center'
  },
  content: {
    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    justifyContent: 'end',
    margin: 'auto 0'
  },
  textContainer: {
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    justifyContent: 'center',
    margin: 'auto 0',
    cursor: 'pointer'
  },
  name: {
    color: 'var(--White, #fff)',
    fontSize: '16px'
  },
  badge: {
    alignSelf: 'stretch',
    borderRadius: '8px',
    backgroundColor: 'rgba(48, 54, 46, 1)',
    marginTop: '4px',
    gap: '10px',
    fontSize: '12px',
    color: 'var(--Orange, #ff8945)',
    padding: '4px 8px'
  },
  avatar: {
    aspectRatio: '1',
    objectFit: 'contain',
    objectPosition: 'center',
    width: '49px',
    borderRadius:"22px",
    alignSelf: 'stretch',
    margin: 'auto 0',
    cursor: 'pointer'

  }
};
function UserProfile({ name, badge, avatar }) {


  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.textContainer}>
          <div style={styles.name}>{name}</div>
          <div style={styles.badge}>{badge}</div>
        </div>
        <img src={avatar} alt={name} style={styles.avatar} loading="lazy" />
      </div>
    </div>
  );
}

export default UserProfile;