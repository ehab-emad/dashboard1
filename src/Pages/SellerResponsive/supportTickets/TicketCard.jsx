import { useEffect, useState } from "react";
import styles from "./TicketCard.module.css";
import { TicketDetails } from "./TicketDetails";
import styled from "styled-components";
import {  useSelector } from "react-redux";


const BigScreen = styled.div`
display : block;
@media (max-width : 880px) {
  display : none;
}
`
const SmallScreen = styled.div`
display : none;
@media (max-width : 880px) {
  display : block;
}
`
const styless = {
  transactions: {
    borderRadius: '24px',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    display: 'flex',
    flexDirection: 'column',
    color: 'var(--Text, #252422)',
    textAlign: 'right',
    justifyContent: 'start',
    padding: '16px',
    font: '400 14px Expo Arabic, -apple-system, Roboto, Helvetica, sans-serif'
  },
  header: {
    paddingBottom: '8px',
    justifyContent: 'end',
    alignItems: 'center',
    borderBottom: '1px solid var(--line-saperator, rgba(0, 47, 54, 0.08))',
    display: 'flex',
    width: '100%',
    gap: '8px',
    fontSize: '18px',
    fontWeight: '500',
    flexWrap: 'wrap'
  },
  headerTitle: {
    alignSelf: 'stretch',
    flex: '1',
    flexBasis: '0%',
    margin: 'auto 0'
  },
  headerIcon: {
    aspectRatio: '1',
    objectFit: 'contain',
    objectPosition: 'center',
    width: '24px',
    alignSelf: 'stretch',
    margin: 'auto 0'
  },
  filterItem: {
    width : '20%',
    display:"flex",
    justifyContent:"center",
    background: 'transparent',
    textAlign: ' center'
  },      filterimages: {
    width : '14%',
    position:"relative",
    display:"flex",
    justifyContent:"center",
    background: 'transparent',
    textAlign: ' center'
  },
  orderNumber: {
    padding: '0 4px'
  }
};


export const TicketCard = ({
  ticketid,
  username,
  category,
  updatedAt,
  createdAt,
  active,
  title,
  ticketnumber,
  images,
  message,
  chat,
  changeStatus,
  addCommenet,
}) => {

  const [isDropDownShown , setDropDown] = useState(false);
  const [seeDetails , setSeeDetails] = useState(false);
   const {  Add_comment } = useSelector((state) => state.seller_products);
 useEffect(()=>{


 },[Add_comment])
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    if (timestamp.seconds && timestamp.nanoseconds) {
        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
        return date.toLocaleDateString(); // يعرض التاريخ فقط بدون الوقت
    }
    return timestamp;
};
  const changeVisability = () => {
    setDropDown(!isDropDownShown);
  }
  const changeDetailsVisability = () => {
    setSeeDetails(!seeDetails);
  }

  

  return (  
    <div className={`${styles.placeHolder} ${seeDetails ? styles.selected : undefined}`}>


      <BigScreen>
      <div
      className={`${styles.ticketCard}`}
    >
      <div style={styless.filterItem}>{ticketnumber || "empty"}</div>
      <div style={styless.filterItem}>{title || "empty"}</div>
      <div style={styless.filterimages} onClick={changeVisability}>
        <div >
        <div >
          {active ===false ?
               <img style={{width:"90%",height: '100%'}}
               loading="lazy"
               src={"https://res.cloudinary.com/dbztvm0io/image/upload/v1741538281/%D8%B4%D9%83%D8%A7%D9%88%D9%8A_-_%D8%A7%D8%AF%D9%85%D9%86_-_%D9%85%D9%86%D8%AA%D9%87%D9%8A%D8%A9_%D8%B3%D9%87%D9%85_olzlrd.png"}
               className={styles.statusIcon}
               alt=""
             />:<img style={{width:"100%",height: '100%'}}
             loading="lazy"
             src={"https://res.cloudinary.com/dbztvm0io/image/upload/v1741538281/%D8%B4%D9%83%D8%A7%D9%88%D9%8A_-_%D8%A7%D8%AF%D9%85%D9%86_-_%D9%82%D9%8A%D8%AF_%D8%A7%D9%84%D9%85%D8%B1%D8%A7%D8%AC%D8%B9%D8%A9_%D8%B3%D9%87%D9%85_yyodba.png"}
             className={styles.statusIcon}
             alt=""
           />
        
        }
       
           
          </div>
          <button className={styles.button} >
       
          </button>


        </div>
      </div>
      <div style={styless.filterItem}>{formatTimestamp(createdAt)  ||"empty"}</div>
      <div style={styless.filterItem}>{formatTimestamp(updatedAt) ||"empty"}</div>
      <button className={styles.button} onClick={changeDetailsVisability}>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ba46c6258edc43c97407c644dd100193a11504a5317d3de870704110203e9b84?placeholderIfAbsent=true&apiKey=0b9472df8a3343138338e0b5d406ca16"
          className={styles.icon}
          alt=""
        />
      </button>
      </div>
      </BigScreen>
      <SmallScreen>
      <div style={{direction : 'rtl', display : 'flex' ,padding:"20px", alignItems: "center" , gap : '16px' , justifyContent : 'space-between' , flexDirection : 'row'}}>

     
      <div style={{width:"40%"}}> <div className={styles.title}> اسم الشكوي :<span style={{color : 'grey',display:"block"}}>{title||"empty"}  </span></div>

      
<div className={styles.ticketNumber}> رقم التذكرة :<span style={{color : 'grey',display:"block"}}> {ticketnumber||"empty"}</span></div></div>
     
             
         
          
<div style={{maxWidth:"125px",minWidth:"100px"}} onClick={changeVisability}>
        <div  style={{position:"relative"}}>
        <div >
          {active ===false ?
               <img style={{width:"90%",height: '100%'}}
               loading="lazy"
               src={"https://res.cloudinary.com/dbztvm0io/image/upload/v1741538281/%D8%B4%D9%83%D8%A7%D9%88%D9%8A_-_%D8%A7%D8%AF%D9%85%D9%86_-_%D9%85%D9%86%D8%AA%D9%87%D9%8A%D8%A9_%D8%B3%D9%87%D9%85_olzlrd.png"}
               className={styles.statusIcon}
               alt=""
             />:<img style={{width:"100%",height: '100%'}}
             loading="lazy"
             src={"https://res.cloudinary.com/dbztvm0io/image/upload/v1741538281/%D8%B4%D9%83%D8%A7%D9%88%D9%8A_-_%D8%A7%D8%AF%D9%85%D9%86_-_%D9%82%D9%8A%D8%AF_%D8%A7%D9%84%D9%85%D8%B1%D8%A7%D8%AC%D8%B9%D8%A9_%D8%B3%D9%87%D9%85_yyodba.png"}
             className={styles.statusIcon}
             alt=""
           />
        
        }
       
           
          </div >
          <button className={styles.button} >
       
          </button>


        </div>
      </div>
      <button className={styles.button} onClick={changeDetailsVisability}>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ba46c6258edc43c97407c644dd100193a11504a5317d3de870704110203e9b84?placeholderIfAbsent=true&apiKey=0b9472df8a3343138338e0b5d406ca16"
                    className={styles.icon}
                    alt=""
                  />
              </button>

          {/* </div> */}  </div>
      </SmallScreen>

      {seeDetails && 
            <TicketDetails className={styles.details}
            ticketid = {ticketid}
            username = {username}
            title={title}
            category = {category}
            images={images}
            message = {message}
            chat={chat}
            addCommenet = {addCommenet}
          />
      }

    </div>
  );
};
