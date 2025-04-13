import { useState } from 'react';
import OrderSummary from './OrderSummary';

const styles = {
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50px',
    alignSelf: 'stretch',
    margin: 'auto 0',
    padding: '8px',
    whiteSpace: 'nowrap',
    
    backgroundColor: '#26969c' ,
    color: '#ffffff' ,
    fontWeight:  '600' ,
    outline: 'none'
  },

  maincontainer: {

    display: "flex",
    flexDirection: "column",


  },
  completedOrders: {
    justifyContent: "space-between",
    alignItems: 'center',
    borderRadius: "16px",
    // overflowX:"scroll",
    border: "1px solid rgba(0, 47, 54, 0.08)",
    background: "red",
    backgroundColor: "#fff",
    display: "flex",
    gap: "36px",
    color: "#252422",
    textAlign: "center",
    flexWrap: "nowrap",
    padding: "16px",
    font: "400 14px Expo Arabic, -apple-system, Roboto, Helvetica, sans-serif"
  },
  productImage: {
    width: '64px',
    height: '64px',
    objectFit: 'contain',
  },
  img: {
    aspectRatio: "1",
    objectFit: "contain",
    objectPosition: "center",
    width: "25px",
    margin: "auto 0",
    marginRight:"10px"
  },
  recentupdate: {
    width: "108px",
  },
  rentduration: {
    width: "108px",
    // display: "flex",
    justifyContent: "center",
  },
  price: {
    whiteSpace: "nowrap",
    textAlign: "center",
    width: "108px",
    justifyContent: "center",
    // display: "flex",
  },
  statusWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // width:"20%",
    fontSize: "12px",
    color: "#4a9908",
    fontWeight: "600",
    justifyContent: "center",
    maxWidth: "124px",
  },
  ordersStatus: {
    justifyContent: "end",
    alignItems: "center",
    borderRadius: "8px",
    background: "#e1ffc9",
    // backgroundColor: "#e1ffc9",
    display: "flex",
    gap: "8px",
    // padding: "8px"
  },
  statusText: {
    alignSelf: "stretch",
    margin: "auto 0"
  },
  statusIcon: {
    aspectRatio: "1",
    objectFit: "contain",
    objectPosition: "center",
    width: "16px",
    alignSelf: "stretch",
    margin: "auto 0"
  },
  customerName: {
    width: "20%",
    textAlign: "center",
    alignItems:"center",
// display:"flex",
justifyContent:"center"

  },
  requestName: {
    width: "240px",
    fontWeight: "600",
    textAlign: "right",
   
  },
  orderNumber: {
    whiteSpace: "nowrap",
    // display:"flex",
    justifyContent:"center",
    width: "80px",
    textAlign: "center"

  },
  "@media (max-width: 991px)": {
    price: {
      whiteSpace: "nowrap"
    },
    orderNumber: {
      whiteSpace: "nowrap"
    }
  }
};


function RequestDetails({ filteredData }) {
  const [showDetails, setShowDetails] = useState({});
  

  const toggleDetails = (index) => {
    setShowDetails((prev) => ({ ...prev, [index]: !prev[index] }));
  };


  return (
    <>
   
    

      {filteredData.map((order, index) => (
        <div key={index} style={styles.maincontainer}>
    
        <div  style={styles.completedOrders}>
      
          <div  style={{...styles.customerName,display:"flex"}}   onClick={() => toggleDetails(index)}>  <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/54f58e923871ae80039034396440365fb8d6bf30c397866b47d435b43bf1df8b?placeholderIfAbsent=true&apiKey=d450998b662b4d7f9d8aea2e6e480818"
              style={styles.img}
              alt=""
            
            /> <div className='hide'>{order.UpdatetAt||"empty"}</div>  </div>

          <div className='hide' style={styles.customerName}>{order.rentduration||"empty"}</div>
          <div className='hide'  style={styles.customerName}>{order.price ||0}</div>
          <div className='statusWrapperwidth' style={styles.statusWrapper}>
          <div className='hide' style={styles.ordersStatus}>
     
              {order.status==="pending" ?
              <img style={{width:"100%"}} src='https://res.cloudinary.com/dbztvm0io/image/upload/v1741538281/%D8%A7%D9%84%D8%B7%D9%84%D8%A8%D8%A7%D8%AA_-_%D8%A7%D8%AF%D9%85%D9%86_%D8%AD%D8%AC%D8%B2_%D8%AC%D8%AF%D9%8A%D8%AF_%D8%B3%D9%87%D9%85_lrx1l6.png' alt='new order'/>
              
              
              
              :order.status==="closed" ?
            <img style={{width:"100%"}} src='https://res.cloudinary.com/dbztvm0io/image/upload/v1741538281/%D8%A7%D9%84%D8%B7%D9%84%D8%A8%D8%A7%D8%AA_-_%D8%A7%D8%AF%D9%85%D9%86_-_%D8%AD%D8%AC%D8%B2_%D9%85%D9%86%D8%AA%D9%87%D9%8A_%D8%B3%D9%87%D9%85_xqn7jg.png' alt=''/>:
            
            order.status==="approved" ?
            <img style={{width:"100%"}} src='https://res.cloudinary.com/dbztvm0io/image/upload/v1741538282/%D8%B7%D9%84%D8%A8%D8%A7%D8%AA_-_%D8%A7%D8%AF%D9%85%D9%86_-_%D8%AD%D8%AC%D8%B2_%D9%86%D8%B4%D8%B7_%D8%B3%D9%87%D9%85_d0ednz.png' alt='active'/>:
            <img style={{width:"100%"}} src=' https://res.cloudinary.com/dbztvm0io/image/upload/v1741538281/%D8%A7%D9%84%D8%B7%D9%84%D8%A8%D8%A7%D8%AA_-_%D8%A3%D8%AF%D9%85%D9%86_-_%D8%AD%D8%AC%D8%B2_%D9%85%D9%84%D8%BA%D9%8A_%D8%B3%D9%87%D9%85_vovkjr.png' alt='cancled'/>
            
            
            }
            </div>
            </div>
     
          <div className='hide'  style={styles.customerName}>{order.customername||"empty"}</div>
          <div  style={styles.customerName}>{order.productname||"empty"}</div>
          <div style={styles.customerName}>{order.ordernumber||0}</div>
        </div>
           {showDetails[index] && <OrderSummary orderData={order} toggleDetails={toggleDetails} index={index}/>}
     </div>
      ))}
    </>
  );
}

export default RequestDetails;