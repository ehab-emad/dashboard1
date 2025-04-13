import * as React from "react";
import styles from "./CreateAndLoginInputs.module.css";
import SignInPhone from "./SignInPhone";
import SignInEmail from "./SignInEmail";


export default function LoginScreenTest() {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [validatedPhoneNumber, setValidatedPhoneNumber] = React.useState("");
  const [showOtpComponent, setShowOtpComponent] = React.useState(false);
  const [showEmailComponent, setShowEmailComponent] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userType, setUserType] = React.useState("customer"); // Default to customer

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailButtonClick = () => {
    setShowEmailComponent(true);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = () => {
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

    if (cleanedPhoneNumber.length === 9) {
      const fullPhoneNumber = `+966${cleanedPhoneNumber}`;
      setValidatedPhoneNumber(fullPhoneNumber);
      setShowOtpComponent(true);
    } else {
      alert("الرجاء إدخال رقم هاتف صحيح مكون من 9 أرقام");
    }
    setPhoneNumber("");
  };

  return (
    <div className={styles.main}>  

      <div className={styles.newrentry}> 
        <section className={styles.newentryinput}>
          {!showOtpComponent && !showEmailComponent ? (
            <>
              <header className={styles.header}>
                <button 
                  className={styles.title} 
                  onClick={() => window.location.assign("https://trent.sa/")}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color:'red' }}
                >
                  انتقل إلى التسجيل الجديد
                </button>
                <p className={styles.subtitle}>
                  سيتم ارسال رمز التحقق لرقم الموبايل المدخل
                </p>
              </header>

              {/* User Type Radio Buttons */}
              <div className={styles.userTypeContainer}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    value="customer"
                    checked={userType === "customer"}
                    onChange={handleUserTypeChange}
                    className={styles.radioInput}
                  />
                  عميل
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    value="seller"
                    checked={userType === "seller"}
                    onChange={handleUserTypeChange}
                    className={styles.radioInput}
                  />
                  بائع
                </label>
              </div>

              <div className={styles.inputSection}>
                <div className={styles.phoneInputWrapper}>
                  <span className={styles.countryCode}>(+966)</span>
                  <div className={styles.separator} />
                  <input
                    type="tel"
                    placeholder="مثال:55 5555 555"
                    className={styles.phoneInput}
                    aria-label="Phone number"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                </div>

                <button className={styles.submitButton} onClick={handleSubmit}>
                  التالي
                </button>
              </div>

              <div className={styles.dividerSection}>
                <div className={styles.dividerLine}>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4f506b6201afae0a7e73963ef34d38726ba9732224e97a6d651a7adad7b1d0fd?placeholderIfAbsent=true&apiKey=2e2b2f636cc34221b980cbf747a16fe6"
                    className={styles.dividerImage}
                    alt=""
                  />
                </div>
                <span className={styles.dividerText}>أو</span>
                <div className={styles.dividerLine}>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4f506b6201afae0a7e73963ef34d38726ba9732224e97a6d651a7adad7b1d0fd?placeholderIfAbsent=true&apiKey=2e2b2f636cc34221b980cbf747a16fe6"
                    className={styles.dividerImage}
                    alt=""
                  />
                </div>
              </div>

              <button className={styles.emailButton} onClick={handleEmailButtonClick}>
                <span className={styles.emailButtonText}>
                  المتابعة بالبريد الإلكتروني
                </span>
                <span className={styles.emailIcon} />
              </button>
            </>
          ) : showEmailComponent ? (
            <SignInEmail email={email} password={password} userType={userType} />
          ) : (
            <SignInPhone Number={validatedPhoneNumber} userType={userType} />
          )}
        </section>
      </div>
    </div>
  );
}