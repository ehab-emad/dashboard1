
import {  useState } from 'react';
import styled from "styled-components";
import { HiArrowDown } from 'react-icons/hi';

const MonthlyStatus = {
    number14: {
      alignSelf: "stretch",
      gap: "10px",
      fontSize: "20px",
      color: "var(--Blue, #26969c)",
      fontWeight: 600,
      whiteSpace: "nowrap",

    },
    number24: {
      alignSelf: "stretch",
      gap: "10px",
      fontSize: "20px",
      color: "var(--Blue, #26969c)",
      fontWeight: 600,

    },
    findYourNextMatch: {
      borderRadius: "24px",
      background: "var(--White, #fff)",
      backgroundColor: "var(--White, #fff)",
      display: 'flex', // Enable flexbox layout
      width: 'auto', // Full width of the parent
      minWidth: 'calc(100% - 32px)', // Ensure minWidth accounts for parent's padding
      maxWidth: '100%', // Prevent exceeding parent width
      flexDirection: 'column', // Arrange children in a column
      overflow: 'hidden', // Prevent overflow
      justifyContent: 'flex-start', // Align content to the start
      padding: '16px', // Padding inside the component
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Optional shadow for depth
      marginBottom: '16px', // Space below the component
      // Additional styles for responsive design
      flexShrink: 0, // Prevent shrinking in flex container
   

    },
    header: {
      paddingBottom: "8px",
      justifyContent: "space-between",
      alignItems: 'base-line',
      borderBottom: "1px solid var(--line-saperator, rgba(0, 47, 54, 0.08))",
      display: "flex",
      flexDirection : 'row',
      width: "100%",
      fontWeight: 400,
    },
    filter: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50px",
      background: "var(--BG-gray, #f6f5f5)",
      backgroundColor: "var(--BG-gray, #f6f5f5)",
      alignSelf: "stretch",
      display: "flex",
      Width: "100%",
      gap: "4px",
      overflow: "hidden",
      fontSize: "14px",
      color: "var(--Paragraph, #736e67)",
      whiteSpace: "nowrap",
      lineHeight: 1,
      margin: "auto 0",
      padding: "4px",

    },
    filterButtons: {
      borderRadius: "50px",
      alignSelf: "stretch",
      margin: "auto 0",
      padding: "4px 8px",
      cursor: 'pointer',
    },
    filterButtons2: {
      borderRadius: "50px",
      background: "var(--White, #fff)",
      backgroundColor: "var(--White, #fff)",
      alignSelf: "stretch",
      color: "var(--Blue, #26969c)",
      fontWeight: 600,
      margin: "auto 0",
      padding: "4px 12px",

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
    monthSummary: {
      alignSelf: "stretch",
      flex: 1,
      flexBasis: "0%",
      margin: "auto 0",
 
    },
    img: {
      aspectRatio: 1,
      objectFit: "contain",
      objectPosition: "center",
      width: "24px",
      alignSelf: "stretch",
      margin: "auto 0"
    },
    statBox: {
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: "16px",
      border: "0.5px solid var(--stroke, rgba(0, 47, 54, 0.24))",
      alignSelf: "stretch",
      display: "flex",
      width: 'auto',
      gap: "40px",
      flex: 1,
      flexBasis: "0%",
      margin: "auto 0",
      padding: "24px",

    },
    statIcon: {
      aspectRatio: 1,
      objectFit: "contain",
      objectPosition: "center",
      width: "48px",
      alignSelf: "stretch",
      margin: "auto 0"
    },
    statContent: {
      alignSelf: "stretch",
      display: "flex",
      flexDirection: "column",
      alignItems: "end",
      justifyContent: "start",
      margin: "auto 0"
    },
    statLabel: {
      alignSelf: "stretch",
      marginTop: "8px",
      gap: "10px",
      fontSize: "14px",
      color: "var(--Paragraph, #736e67)",
      fontWeight: 300,
      lineHeight: 1
    },
    buttonSmallScreen : {
      width : '133px',
      padding: '8px 10px',
      textAlign: 'right',
      color: 'var(--Paragraph, #736e67)',
      // fontWeight: 'bolder',
      fontSize: '20px',
      backgroundColor : 'white',
      border : 'none',
      borderRadius : '5px'
    },

  };
  const StatsContainer = styled.div`
  display: flex;
  margin-top: 16px;
  width: 100%;
  align-items: center;
  gap: 16px;
  text-align: right;
  justify-content: end;
  flex-wrap: rap;
  @media (max-width : 744px) {
      flex-direction: column-reverse;
  }
`
const InSmall = styled.div`
  position : relative;
  display : flex ;
  flex-direction : row-reverse;
  align-items : center;
  gap : 10px;
  @media (min-width : 450px) {
      display : none;
  }
`
const InBig = styled.div`
  justify-content:  center ;
  align-items:  center ;
  border-radius:  50px ;
  background:  var(--BG-gray, #f6f5f5) ;
  background-color:  var(--BG-gray, #f6f5f5) ;
  align-self:  stretch ;
  display:  flex ;
  gap:  4px ;
  overflow:  hidden ;
  font-size:  14px ;
  color:  var(--Paragraph, #736e67) ;
  white-space:  nowrap ;
  line-height: 1;
  margin:  auto 0 ;
  padding:  4px ;
  @media (max-width : 450px) {
      display : none;
  }
`

const totalIncome = 3000000;
const totalClients = 1000;
const totalOrders = 2000;


const MonthlyStatusComponent = () => {

 



const [activeButton, setActiveButton] = useState('يومي'); // Default active button  
const [income, setIncome] = useState(totalIncome); // Default income  
const [clients, setClients] = useState(totalClients); // Default clients
const [orders, setOrders] = useState(totalOrders); // Default order
const [isOpen , setIsopen] = useState(false) // 

const handleButtonClick = (button) => {
  setActiveButton(button);

  if (button === 'سنوي') {
    setIncome(totalIncome.toFixed(2));
    setClients(totalClients.toFixed(2));
    setOrders(totalOrders.toFixed(2));
  } else if (button === 'شهري') {
    setIncome((totalIncome / 12).toFixed(2)); // Monthly income
    setClients((totalClients / 12).toFixed(2)); // Monthly clients
    setOrders((totalOrders / 12).toFixed(2)); // Monthly orders
  } else if (button === 'يومي') {
    setIncome((totalIncome / 360).toFixed(2)); // Daily income
    setClients((totalClients / 360).toFixed(2)); // Daily clients
    setOrders((totalOrders / 360).toFixed(2)); // Daily orders
  } else if (button === 'اسبوع') {
    setIncome((totalIncome / 52).toFixed(2)); // Weekly income
    setClients((totalClients / 52).toFixed(2)); // Weekly clients
    setOrders((totalOrders / 52).toFixed(2)); // Weekly orders
  }
  setIsopen(false)
}


  return (
    <div style={MonthlyStatus.findYourNextMatch}>
      <div style={MonthlyStatus.header}>

        <InSmall>
          <p style={{margin : '0px' , fontSize : '18px' , fontWeight : '700' , color : '#26969c'}}>{activeButton}</p>
          <HiArrowDown style={{ width: '15px', height: '15px' }} />          <div style={{display : isOpen ? 'flex' : 'none' ,position: "fixed",top: 0,left: 0,width: "100vw",height: "100vh",backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent blackzIndex: 10, // Ensure it's on top
          }}onClick={() => setIsopen(false)}></div>
          <div style = {{display : isOpen ? 'flex' : 'none' , flexDirection : 'column' , position : 'absolute' , padding : '10px 5px' , backgroundColor : 'white' , top : '100%' , left : '20%' , zIndex : '20' , borderRadius : '10px' }}>
            <button onClick={() => handleButtonClick('يومي')} style = {{...MonthlyStatus.buttonSmallScreen , background: activeButton === 'يومي' ? '#F2FBFA' : 'white' ,color: activeButton === 'يومي' ? 'var(--Blue, #26969c)' : 'var(--Paragraph, #736e67)',}}>يومي</button>
            <button onClick={() => handleButtonClick('اسبوعي')} style = {{...MonthlyStatus.buttonSmallScreen ,  background: activeButton === 'اسبوعي' ? '#F2FBFA' : 'white',color: activeButton === 'اسبوعي' ? 'var(--Blue, #26969c)' : 'var(--Paragraph, #736e67)',}}>اسبوعي</button>
            <button onClick={() => handleButtonClick('شهري')} style = {{...MonthlyStatus.buttonSmallScreen ,  background: activeButton === 'شهري' ? '#F2FBFA' : 'white',color: activeButton === 'شهري' ? 'var(--Blue, #26969c)' : 'var(--Paragraph, #736e67)'}}>شهري</button>
            <button onClick={() => handleButtonClick('سنوي')} style = {{...MonthlyStatus.buttonSmallScreen,  background: activeButton === 'سنوي' ? '#F2FBFA' : 'white',color: activeButton === 'سنوي' ? 'var(--Blue, #26969c)' : 'var(--Paragraph, #736e67)',}}>سنوي</button>
          </div>
        </InSmall>

        <InBig>
          <div
            style={{
              ...MonthlyStatus.filterButtons,
              background: activeButton === 'سنوي' ? 'white' : 'var(--BG-gray, #f6f5f5)',
              color: activeButton === 'سنوي' ? 'var(--Blue, #26969c)' : 'var(--Paragraph, #736e67)',
            }}
            onClick={() => handleButtonClick('سنوي')}
          >
            سنوي
          </div>
          <div
            style={{
              ...MonthlyStatus.filterButtons,
              background: activeButton === 'شهري' ? 'white' : 'var(--BG-gray, #f6f5f5)',
              color: activeButton === 'شهري' ? 'var(--Blue, #26969c)' : 'var(--Paragraph, #736e67)',
            }}
            onClick={() => handleButtonClick('شهري')}
          >
            شهري
          </div>
          <div
            style={{
              ...MonthlyStatus.filterButtons,
              background: activeButton === 'اسبوع' ? 'white' : 'var(--BG-gray, #f6f5f5)',
              color: activeButton === 'اسبوع' ? 'var(--Blue, #26969c)' : 'var(--Paragraph, #736e67)',
            }}
            onClick={() => handleButtonClick('اسبوع')}
          >
            اسبوع
          </div>
          <div
            style={{
              ...MonthlyStatus.filterButtons2,
              background: activeButton === 'يومي' ? 'white' : 'var(--BG-gray, #f6f5f5)',
              color: activeButton === 'يومي' ? 'var(--Blue, #26969c)' : 'var(--Paragraph, #736e67)',
            }}
            onClick={() => handleButtonClick('يومي')}
          >
            يومي
          </div>
        </InBig>

        <div style={MonthlyStatus.div}>
          <div style={MonthlyStatus.monthSummary}>ملخص النشاط</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/62616b450c7c548dd87509ee5505498674c9c6f293a77fa54e1420cfa1c1091b?placeholderIfAbsent=true&apiKey=2e2b2f636cc34221b980cbf747a16fe6"
            style={MonthlyStatus.img}
            alt=""
          />
        </div>
      </div>
      
      <StatsContainer>
        <div style={MonthlyStatus.statBox}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b87fcd906d1d5fae10e6b5a63e6a78adf229f029e19bd6edf94979022140f93d?placeholderIfAbsent=true&apiKey=2e2b2f636cc34221b980cbf747a16fe6"
            style={MonthlyStatus.statIcon}
            alt=""
          />
          <div style={MonthlyStatus.statContent}>
            <div style={MonthlyStatus.number14}>{income}</div>
            <div style={MonthlyStatus.statLabel}>إجمالي العائد</div>
          </div>
        </div>
        <div style={MonthlyStatus.statBox}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5e3670b7772457ec5184473c9d952ed3c0c62d407639ce8de5a693f09de96be7?placeholderIfAbsent=true&apiKey=2e2b2f636cc34221b980cbf747a16fe6"
            style={MonthlyStatus.statIcon}
            alt=""
          />
          <div style={MonthlyStatus.statContent}>
            <div style={MonthlyStatus.number24}>{clients}</div>
            <div style={MonthlyStatus.statLabel}>العملاء</div>
          </div>
        </div>
        <div style={MonthlyStatus.statBox}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3c3ec9775107dd8f5384ebf57727930140c239f63711bbf359f5046e39b25c19?placeholderIfAbsent=true&apiKey=2e2b2f636cc34221b980cbf747a16fe6"
            style={MonthlyStatus.statIcon}
            alt=""
          />
          <div style={MonthlyStatus.statContent}>
            <div style={MonthlyStatus.number14}>{orders}</div>
            <div style={MonthlyStatus.statLabel}>إجمالي الطلبات</div>
          </div>
        </div>
      </StatsContainer>
    </div>
  );
};

export default MonthlyStatusComponent;