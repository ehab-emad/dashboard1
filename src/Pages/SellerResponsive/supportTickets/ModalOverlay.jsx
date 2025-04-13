import styles from "./ModalOverlay.module.css";
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from "./CloseIcon";
import { MessageIcon } from "./MessageIcon";
import { UploadIcon } from "./UploadIcon";
import { uploadImages, createTicket } from "../../../store/reducers/firebasefunctions";
import { GetAllTickets } from "../../../store/reducers/sellerStuffReducer";
import { toast } from "react-toastify";
import { Timestamp } from "firebase/firestore";

const FormGroup = ({ label, children }) => (
  <div className={styles.formGroup}>
    <label className={styles.formLabel}>{label}</label>
    {children}
  </div>
);

function ModalOverlay({ toggleform }) {
  const sellerid = localStorage.getItem('sellerId');
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState(''); // Fixed initialization
  const selectRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getFirebaseTimestamp = () => {
    return Timestamp.fromDate(new Date());
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const imagesarray = [];
      
      if (uploadedFile) {
        const fileUrl = await uploadImages(uploadedFile);
        imagesarray.push(fileUrl);
      }

      const ticketData = {
        title: title,
        category: selectedCategory,
        message: message,
        chat: [],
        userid: sellerid,
        createdAt: getFirebaseTimestamp(),
        useremail: "",
        usertype: 'seller',
        images: imagesarray,
        active: true
      };

      await createTicket(ticketData);
      dispatch(GetAllTickets(sellerid));

      // Reset form
      setTitle('');
      setSelectedCategory('');
      setMessage('');
      setUploadedFile(null);
      
      toast.success('تم إرسال التذكرة بنجاح');
      toggleform();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('نعتذر حاول مرة أخرى لاحقًا');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <main className={styles.modalContainer}>
        <header className={styles.modalHeader}>
          <button aria-label="Close modal" onClick={toggleform}>
            <CloseIcon />
          </button>
          <h1 className={styles.modalTitle}>عمل شكوى جديدة</h1>
          <MessageIcon />
        </header>

        <form onSubmit={handleSubmit} className={styles.modalContent}>
          <FormGroup label="عنون الشكوى">
            <input
              type="text"
              className={styles.formInput}
              placeholder="عنون الشكوى"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </FormGroup>

          <FormGroup label="تصنيف الشكوى">
            <select
              ref={selectRef}
              className={styles.formInputdropdown}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              disabled={isSubmitting}
              required
            >
              <option value="" disabled>اختر تصنيف الشكوى</option>
              <option value="category1">التصنيف الأول</option>
              <option value="category2">التصنيف الثاني</option>
              <option value="category3">التصنيف الثالث</option>
            </select>
          </FormGroup>

          <FormGroup label="رفع ملفات">
            <button
              type="button"
              className={styles.formInput2}
              onClick={handleButtonClick}
              disabled={isSubmitting}
            >
              <UploadIcon />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept="image/*"
              disabled={isSubmitting}
            />
            {uploadedFile && (
              <div className={styles.uploadedFileInfo}>
                <p>تم رفع الملف: {uploadedFile.name}</p>
              </div>
            )}
          </FormGroup>

          <FormGroup label="رسالتك">
            <textarea
              className={styles.formInputmessage}
              placeholder="رسالتك ..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </FormGroup>

          {isSubmitting && <div>جاري التحميل...</div>}
          
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            ارسال الشكوى
          </button>
        </form>
      </main>
    </div>
  );
}

export default ModalOverlay;