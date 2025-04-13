import { TicketCard } from "./TicketCard";
import { useEffect, useState } from "react";
import styles from "./SupportTickets.module.css";
import { useDispatch, useSelector } from "react-redux";
import { GetAllTickets ,addcommentAdmin} from "../../../store/reducers/sellerStuffReducer";
import { newstateActive } from "../../../store/reducers/sellerProductsReducer";
import TicketTopHeader from "./TicketTopHeader";
import { TicketHeader } from "./TicketHeader";

export const SupportTickets = () => {
  const sellerid = localStorage.getItem('sellerId');

  const dispatch = useDispatch();
  const {  seller_tickets } = useSelector((state) => state.seller_stuff);
  const {  Add_comment } = useSelector((state) => state.seller_products);

 

const userid=sellerid


  useEffect(() => {

    dispatch(GetAllTickets(userid));
     
  }, [dispatch,Add_comment]);

  const [ticketDataDetails , setTicketData] = useState(seller_tickets)

  const changeState = async(ticketid , newstate) => {
     const user = seller_tickets.find(user => user.id === ticketid); 
     
         if (!user) return seller_tickets;
     
         const sellerData = { ...user, active:newstate}; 
           
         dispatch(newstateActive({ticketid,sellerData}))
       dispatch(GetAllTickets(sellerid));

        
  }

  const addCommenet = (id , comment) => {
    setTicketData((prevTickets) =>
      prevTickets.map(ticket =>
        ticket.id === id
              ?   dispatch(addcommentAdmin({ 
                ...ticket, 
                supportResponse: Array.isArray(ticket.supportResponse) 
                  ? [...ticket.supportResponse, comment] 
                  : [comment] 
              }))
              : ticket
      )
  );
  }

  return (
    <div className={styles.container}>
   

      <TicketTopHeader />
      <div className={styles.searchBar}>
        <input
          type="search"
          className={styles.searchInput}
          placeholder="ابحث برقم التذكرة"
          aria-label="Search by ticket number"
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c16e7c36789f1ecfbecb76264816c8a0dd7f44ccb1a69b7e111f7288fd98ba80?placeholderIfAbsent=true&apiKey=0b9472df8a3343138338e0b5d406ca16"
          className={styles.searchIcon}
          alt=""
        />
      </div>

      <TicketHeader/>

      {seller_tickets.map((ticket, index) => (
        <TicketCard key={index} {...ticket} changeStatus = {changeState} addCommenet = {addCommenet} />
      ))}
    </div>
  );
};
