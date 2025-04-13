import { TicketCard } from "./TicketCard";
import { useEffect, useState } from "react";
import styles from "./SupportTickets.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addcommentAdmin} from "../../../store/reducers/sellerStuffReducer";
import { newstateActive } from "../../../store/reducers/sellerProductsReducer";
import TicketTopHeader from "./TicketTopHeader";
import { TicketHeader } from "./TicketHeader";
import { GetAllTicketsCustomer } from "../../../store/reducers/customerStuffReducer";

export const SupportTickets = () => {

  const customerid = localStorage.getItem('customerId');

  const dispatch = useDispatch();
  const {  customer_tickets } = useSelector((state) => state.customer_stuff);
  const {  Add_comment } = useSelector((state) => state.seller_products);

 

const userid=customerid


  useEffect(() => {

    dispatch(GetAllTicketsCustomer(userid));
     
  }, [dispatch,Add_comment]);

  const [ticketDataDetails , setTicketData] = useState(customer_tickets)

  const changeState = async(ticketid , newstate) => {
     const user = customer_tickets.find(user => user.id === ticketid); 
     
         if (!user) return customer_tickets;
     
         const sellerData = { ...user, active:newstate}; 
           console.log(ticketid)
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

      {customer_tickets.map((ticket, index) => (
        <TicketCard key={index} {...ticket} changeStatus = {changeState} addCommenet = {addCommenet} />
      ))}
    </div>
  );
};
