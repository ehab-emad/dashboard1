import styled from "styled-components";
import { HiArrowDown } from 'react-icons/hi';

const PendingButtonsStyle = {
    container: {
      paddingBottom: '8px',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'stretch',
      borderBottom: '1px solid var(--line-saperator, rgba(0, 47, 54, 0.08))',
      display: 'flex',
      fontFamily: 'Expo Arabic, sans-serif',
      flexWrap: 'wrap',
      width: 'auto',
      minWidth: 'calc(100% - 32px)',
      maxWidth: '100%',
    },
    title: {
      color: 'var(--Text, #252422)',
      fontSize: '20px',
      fontWeight: '600',
      alignSelf: 'stretch',
      margin: 'auto 0',
    },
    button: (isActive) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50px',
      alignSelf: 'stretch',
      margin: 'auto 0',
      padding: '8px',
      whiteSpace: 'nowrap',
      backgroundColor: isActive ? '#ffffff' : 'transparent',
      color: isActive ? '#26969c' : '#8d8883',
      fontWeight: isActive ? '600' : '400',
      border: 'none',
      cursor: 'pointer',
      outline: 'none'
    }),
  };

   
  const InSmall = styled.div`
    display : flex ;
    flex-direction : row-reverse;
    align-items : center;
    @media (min-width : 450px) {
        display : none;
    }
  `
  const InBig = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 50px;
    align-self: stretch;
    gap: 4px;
    overflow: hidden;
    font-size: 14px;
    margin: auto 0;
    padding: 8px;
    background: #F6F5F5;
    @media (max-width : 450px) {
        display : none;
    }
`


const ProductListingFilter = ({ handlebuttonclick, filterbuttons,  title }) => {

  return (

    <div style={PendingButtonsStyle.container}>
      <InSmall>
        <p style={{margin : '0px' , fontSize : '18px' , fontWeight : '700' , color : '#26969c'}}>activeButton</p>
        <HiArrowDown style={{ width: '15px', height: '15px' }} />      </InSmall>
      
    <InBig style={PendingButtonsStyle.filterContainer}>
      {filterbuttons.map((buttonData, index) => (
        <button
          key={index}
          style={PendingButtonsStyle.button(buttonData.isActive)} // Use isActive from buttonData
          onClick={() => handlebuttonclick(index)} // Only pass index to handleButtonClick
          role="button"
          tabIndex={0}
          aria-pressed={buttonData.isActive}
        >
          {buttonData.text}
        </button>
      ))}
    </InBig>
    <h1 style={PendingButtonsStyle.title}>{title}</h1>
  </div>

  );
};

export default ProductListingFilter;