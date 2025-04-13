import styled from "styled-components";
import { useState } from 'react';
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
  div: {
    alignSelf: "stretch",
    display: "flex",
    Width: "100%",
    alignItems: "center",
    gap: "8px",
    fontSize: "18px",
    color: "var(--Text, #252422)",
    textAlign: "right",
    justifyContent: "end",
    flexWrap: "wrap",
    flex: 1,
    flexBasis: "0%",
    margin: "auto 0",
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
  filterButtons: {
    borderRadius: "50px",
    alignSelf: "stretch",
    margin: "auto 0",
    padding: "4px 8px",
    cursor: 'pointer',
  },
  buttonSmallScreen: {
    width: '150px',
    padding: '8px 10px',
    textAlign: 'right',
    color: 'var(--Paragraph, #736e67)',
    fontSize: '20px',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '5px'
  },
};

const InSmall = styled.div`
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 10px;
  @media (min-width: 450px) {
    display: none;
  }
`;

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
  @media (max-width: 450px) {
    display: none;
  }
`;

const ProductListingFilter = ({ handlebuttonclick, chossen, title, filters }) => {
  const [isOpen, setIsopen] = useState(false);

  return (
    <div style={PendingButtonsStyle.container}>
      {/* Small Screen Filters */}
      <InSmall>
        <p style={{ margin: '0px', fontSize: '18px', fontWeight: '700', color: '#26969c' }}>{chossen}</p>
        <HiArrowDown style={{ width: '15px', height: '15px' }} onClick={() => setIsopen(!isOpen)} />
        <div
          style={{
            display: isOpen ? 'flex' : 'none',
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 10,
          }}
          onClick={() => setIsopen(false)}
        ></div>
        <div
          style={{
            display: isOpen ? 'flex' : 'none',
            flexDirection: 'column',
            position: 'absolute',
            padding: '10px 5px',
            backgroundColor: 'white',
            top: '100%',
            left: '20%',
            zIndex: '20',
            borderRadius: '10px',
          }}
        >
          {filters.map((filter, index) => (
            <button
              key={index}
              onClick={() => { handlebuttonclick(filter.text); setIsopen(false); }}
              style={{
                ...PendingButtonsStyle.buttonSmallScreen,
                background: chossen === filter.text ? '#F2FBFA' : 'white',
                color: chossen === filter.text ? 'var(--Blue, #26969c)' : 'var(--Paragraph, #736e67)',
              }}
            >
              {filter.text}
            </button>
          ))}
        </div>
      </InSmall>

      {/* Large Screen Filters */}
      <InBig style={PendingButtonsStyle.filterContainer}>
        {filters.map((filter, index) => (
          <div
            key={index}
            style={{
              ...PendingButtonsStyle.filterButtons,
              background: chossen === filter.text ? 'white' : 'var(--BG-gray, #f6f5f5)',
              color: chossen === filter.text ? 'var(--Blue, #26969c)' : 'var(--Paragraph, #736e67)',
            }}
            onClick={() => handlebuttonclick(filter.text)}
          >
            {filter.text}
          </div>
        ))}
      </InBig>

      <h1 style={PendingButtonsStyle.title}>{title}</h1>
    </div>
  );
};

export default ProductListingFilter;