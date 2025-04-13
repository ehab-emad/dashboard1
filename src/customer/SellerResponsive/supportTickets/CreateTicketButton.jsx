import styles from "./TicketMainHeader.module.css";

function CreateTicketButton( {toggleform}) {
  return (
    <button className={styles.createTicketButton} onClick={toggleform}>
      <span className={styles.buttonText}>إنشاء تذكرة جديدة</span>
      <svg
        className={styles.addCircleIcon}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 15C11.866 15 15 11.866 15 8C15 4.134 11.866 1 8 1C4.134 1 1 4.134 1 8C1 11.866 4.134 15 8 15Z"
          stroke="#26969C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 5.33334V10.6667"
          stroke="#26969C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.33331 8H10.6666"
          stroke="#26969C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default CreateTicketButton;
