import { useEffect, useState } from "react";
import styles from "./TicketDetails.module.css";
import styled , { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addcommentAdmin, GetAllTickets } from "../../../store/reducers/sellerStuffReducer";



const DetailsContainer = styled.div`
  ${css`
    @media (max-width: 880px) {
      border-top: 10px;
      margin-top: 10px;
      border-top: 1px solid grey;
    }
  `}
`;
const ReplySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background-color: #f9f9f9;
  border-top: 1px solid #ddd;
`;

const ReplyInput = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 12px;
  direction: rtl !important;

  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ReplyButton = styled.button`
  align-self: flex-end;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #0056b3;
  }
`;

export const TicketDetails = ({ ticketid, username, title, category, images, message, chat }) => {
  const sellerid = localStorage.getItem('sellerId');

  const dispatch = useDispatch();
   const [newChatMessages, setReply] = useState("");
   const [chatMessages, setChatMessages] = useState(chat || []); // حفظ المحادثات محليًا
   const {  add_comment } = useSelector((state) => state.seller_products);
  //  console.log("Redux State:", state);
   useEffect(() => {
    
  }, [add_comment]);
  
   const handleSendComment = async () => {


    
      if (newChatMessages.trim() === "") return; // منع الإرسال إذا كان فارغًا

      try {
         dispatch(addcommentAdmin({ ticketid, newChatMessages }));
         dispatch(GetAllTickets(sellerid));

        // تحديث المحادثات محليًا فورًا
        setChatMessages(prevChat => [...prevChat, newChatMessages]);

        setReply(""); // مسح الإدخال بعد الإرسال
      } catch (error) {
        console.error("فشل في إرسال التعليق:", error);
      }
   };

  return (
    <DetailsContainer className={styles.detailsContainer}>
      <div className={styles.summary}>
        <div className={styles.summaryTitle}>ملخص التذكرة</div>
      </div>

      <div className={styles.content}>
        <div className={styles.infoGrid}>
          <InfoField label="اسم العميل" value={username || "empty"} />
          <InfoField label="عنوان التذكرة" value={title} />
          <InfoField label="تصنيف المشكلة" value={category || "empty"} />
        </div>

        <div className={styles.mediaSection}>
          <div className={styles.descriptionContainer}>
            <label className={styles.descriptionLabel}>وصف المشكلة</label>
            <div className={styles.description}>{message || "empty"}</div>
          </div>

          <div className={styles.imagesContainer}>
            <label className={styles.imagesLabel}>الصور المرفقة للمشكلة</label>
            <div className={styles.imageGrid}>
              {images.map((src, index) => (
                <img
                  key={index}
                  src={src || "https://res.cloudinary.com/dbztvm0io/image/upload/v1741680484/default_image_o2gbgq.jpg"}
                  className={styles.attachedImage}
                  alt={`Attached image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {chatMessages.length !== 0 && (
          <div className={styles.supportResponse}>
            <label className={styles.responseLabel}>رد فريق الدعم</label>
            {chatMessages.map((response, index) => (
              <div key={index} className={styles.responseText}>{response}</div>
            ))}
          </div>
        )}
      </div>

      <ReplySection>
      <ReplyInput
        placeholder={chatMessages.length !== 0 ? "كتابة رد اخر" : "كتابة رد"}
        aria-label="Write a reply"
        value={newChatMessages}
        onChange={(e) => setReply(e.target.value)}
      />
      <ReplyButton onClick={handleSendComment} disabled={!newChatMessages.trim()}>
        إرسال
      </ReplyButton>
    </ReplySection>
    </DetailsContainer>
  );
};

const InfoField = ({ label, value }) => (
  <div className={styles.infoField}>
    <label className={styles.fieldLabel}>{label}</label>
    <div className={styles.fieldValue}>{value}</div>
  </div>
);
