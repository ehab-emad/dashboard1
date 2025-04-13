import styled from "styled-components";



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
      alignItems: "center",
      borderBottom: "1px solid var(--line-saperator, rgba(0, 47, 54, 0.08))",
      display: "flex",
      width: "100%",
      fontWeight: 400,
      flexWrap: "nowrap",

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
    statsContainer: {
      display: "flex",
      marginTop: "16px",
      width: "100%",
      alignItems: "center",
      gap: "16px",
      textAlign: "right",
      justifyContent: "end",
      flexWrap: "nowrap",
  
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
    }
  };
  const totalamount = 3000000;
  const profits = 1000;

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
    }`




const PaymentSummary = () => {




  return (
    <div style={MonthlyStatus.findYourNextMatch}>
      <div style={MonthlyStatus.header}>
       
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
            <div style={MonthlyStatus.number14}>{totalamount}</div>
            <div style={MonthlyStatus.statLabel}>إجمالي العائد</div>
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
            <div style={MonthlyStatus.number14}>{profits}</div>
            <div style={MonthlyStatus.statLabel}>إجمالي الطلبات</div>
          </div>
        </div>
      </StatsContainer>
    </div>
  );
};

export default PaymentSummary
;