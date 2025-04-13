import  { useState } from "react";
import styles from "./TicketMainHeader.module.css";
import CreateTicketButton from "./CreateTicketButton";
import ModalOverlay from "./ModalOverlay";

function TicketTopHeader() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <header className={styles.ticketHeaderContainer}>
      <CreateTicketButton toggleform={toggleForm} />
      <h1 className={styles.ticketTitle}>تذاكر الدعم</h1>

      {showForm && <ModalOverlay toggleform={toggleForm}/>}
    </header>
  );
}

export default TicketTopHeader;