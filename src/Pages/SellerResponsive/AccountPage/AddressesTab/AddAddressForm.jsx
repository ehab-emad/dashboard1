
import {  useState } from "react";

  const style = `
   .overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Expo Arabic', sans-serif; /* Corrected property name */
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
}
    .addressCard {
      border-radius: 24px;
      background: var(--White, #fff);
      box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.04);
      display: flex;
      width: auto;
      height: auto;
      flex-direction: column;
      padding: 24px;
      font: 14px Expo Arabic, sans-serif;
    }
    
    .header {
      padding-bottom: 8px;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--line-saperator, rgba(0, 47, 54, 0.08));
      display: flex;
      width: 100%;
      gap: 8px;
      font-size: 24px;
      color: var(--Text, #252422);
      font-weight: 600;
      text-align: right;
    }
    
    .headerIcon {
      width: 32px;
      height: 32px;
      cursor: pointer;

    }
    
    .closeIcon {
      width: 24px;
      height: 24px;
    }
    
    .formContent {
      display: flex;
      margin-top: 32px;
      width: auto;
      height: auto;      
      flex-direction: column;
    }
    
    .formRow {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 16px;
      justify-content: flex-end;
      flex-wrap: wrap;
    }
    
    .inputContainer {
      flex: 1;
      min-width: 240px;
      min-height: 80px;
    }
    
    .inputLabel {
      color: var(--Text, #252422);
      font-weight: 400;
      text-align: right;
    }
    
    .inputWrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 16px;
      background: var(--BG-gray, #f6f5f5);
      margin-top: 8px;
      padding: 16px;
      gap: 8px;
    }
    
    .inputField {
      width: 100%;
      border: none;
      background: transparent;
      color: var(--Paragraph, #736e67);
      font-weight: 300;
      text-align: right;



    }
    
    .inputIcon {
      width: 16px;
      height: 16px;
    }
    
    .defaultAddressSection {
      display: flex;
      margin-top: 32px;
      width: 100%;
      align-items: start;
      gap: 8px;
      justify-content: flex-end;
    }
    
    .defaultAddressContent {
      display: flex;
      min-width: 240px;
      flex-direction: column;
      align-items: flex-end;
    }
    
    .defaultAddressTitle {
      color: var(--Text, #252422);
    }
    
    .defaultAddressDescription {
      color: var(--Paragraph, #736e67);
      text-align: right;
      margin-top: 4px;
    }
    
    .submitButton {
      align-self: stretch;
      border-radius: 50px;
      background: var(--Cool, #8d8883);
      margin-top: 32px;
      padding: 16px;
      color: var(--White, #fff);
      font-size: 16px;
      font-weight: 500;
      text-align: center;
      border: none;
      cursor: pointer;
    }
          
    .submitButtoncomplete {
      align-self: stretch;
      border-radius: 50px;
      background: var(--Cool, #26969C);
      margin-top: 32px;
      padding: 16px;
      color: var(--White, #fff);
      font-size: 16px;
      font-weight: 500;
      text-align: center;
      border: none;
      cursor: pointer;
    }
    
  
      
      .formContent,
      .formRow,
      .submitButton {
        width: auto;
      height: auto;
      }
    }
  `;


export default function AddressForm({toggleAddAddress,addNewAddress,toggleDefaultAddress}) {

  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [city, setcity] = useState('');
  const [isValid, setIsFormValid] = useState(false);
  const [isChecked, setIsChecked] = useState(false);


  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
  };
  
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };


  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
  
    const updatedData = {
      address: input1,
      default: isChecked,
      city: city,
   
  };
    // Validate form before creating updatedData
    validateForm(updatedData);


};

    const validateForm = (updatedData) => {
      if (isEmptyObject(updatedData)) {
        console.log("The data object is empty.");
        return false; // or handle the empty object case
      }
      console.log("The data object is valid.");
      setIsFormValid(!isValid);
          addNewAddress(updatedData);
    console.log(updatedData); // Log the updated data
    toggleAddAddress(); 

          
    };  

  return (
    <>
      <style>{style}</style>
    <div className="overlay">
      <form className="addressCard">
        <div className="header">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fb43f0ec22f61106d427136218441ce984b7921030f9b56a82d061372921d41e?placeholderIfAbsent=true&apiKey=57830d6d22374b3392882ad918f38de5"
            alt=""
            className="headerIcon"
            onClick={toggleAddAddress}
          />
        <div> 
          <span>إضافة عنوان</span>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/115ed74eb9d58350991a1288c6c71a40941ff6121e3a579972e0d885f8b2a860?placeholderIfAbsent=true&apiKey=57830d6d22374b3392882ad918f38de5"
            alt=""
            className="closeIcon"
          />
        </div>
        </div>
        
        <div className="formContent">
          <div className="formRow">
          

      

<div className="inputContainer">
      <div className="inputLabel">المدينة</div>
      <div className="inputWrapper">
    
        <select 
          type="text"
          className="inputField"
          placeholder="اختر المدينة"
          aria-label="المدينة"
          onChange={(e) => setcity(e.target.value)}
          >
          <option  className="inputField" value="الرياض">الرياض</option>
          <option  className="inputField" value="جدة">جدة</option>
          <option  className="inputField"value="الدمام">الدمام</option>
        </select>

      </div>
    </div>
          </div>
                <div className="inputContainer">
                    <div className="inputLabel">وصف العنوان</div>
                    <div className="inputWrapper">
                
                      <input 
                        type="text"
                        className="inputField"
                        placeholder="قم بكتابة العنوان كاملاً"
                        onChange={(e) => setInput1(e.target.value)}
                      />
                    </div>
                </div>
     
   
         
     
    
       </div>

       <div className="defaultAddressSection">
          <div className="defaultAddressContent">
            <div className="defaultAddressTitle">تعيين كعنوان افتراضي</div>
            <div className="defaultAddressDescription">
              سيقوم ترنت بتخزين بيانات هذا العنوان كعنوان افتراضي
            </div>
          </div>
          <input
            type="checkbox"
            className="defaultCheckbox"
            id="defaultAddressCheckbox"
            onChange={handleCheckboxChange}

            // Optionally, add an onChange handler to manage checkbox state
          />
          <label htmlFor="defaultAddressCheckbox" className="checkboxLabel">
            {/* Optional: Add a label for better accessibility */}
          </label>
        </div>

        <button onClick={handleSubmit} type="submit"    className={ "submitButtoncomplete" }>
          حفظ العنوان
        </button>
      </form>
      </div>
    </>
  );
}