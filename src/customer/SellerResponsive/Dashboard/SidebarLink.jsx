import styled from "styled-components";
import PropTypes from 'prop-types'; // For prop validation


const LinkSideBar = styled.div`
  width: 100%;
  @media (max-width: 1024px) {
    width: auto;
  }
`;

function SidebarLink({ text, icon, setCurrentPage, isActive,toggleSidebar }) {
  const styles = {
    link: {
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      justifyContent: 'flex-end',
      padding: '16px',
      marginTop: '0px',
      cursor: 'pointer',
      outline: 'none', // Ensure focus outline is visible
      backgroundColor: isActive ? '#30494C' : 'transparent', // Check if active
      color: isActive ? 'white' : 'rgba(166, 177, 178, 1)',
      transition: 'background-color 0.3s ease',
    },
    text: {
      alignSelf: 'stretch',
      margin: '0',
    },
    icon: {
      aspectRatio: '1',
      objectFit: 'contain',
      objectPosition: 'center',
      width: '20px',
      alignSelf: 'stretch',
      margin: '0',
    },
  };

  const handleClick = () => {
    setCurrentPage(text);
    toggleSidebar()
    };

  return (
    <LinkSideBar
      style={styles.link}
      role="button"
      tabIndex={0}
      onClick={handleClick}
    >
      <span style={styles.text}>{text}</span>
      <img src={icon} alt={`${text} icon`} style={styles.icon} />
    </LinkSideBar>
  );
  
}

// Prop validation
SidebarLink.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};


export default SidebarLink;