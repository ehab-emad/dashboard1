import React, { useState } from 'react';
import ResendCodeCustomer from './ResendCodeSeller';

const styles = {
  container: {
    borderRadius: '24px',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    maxWidth: '544px',
    flexDirection: 'column',
    fontFamily: 'Expo Arabic, sans-serif',
    justifyContent: 'center',
    padding: '40px',
    gap: '32px'
    
  },
  containertop :{

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Expo Arabic, sans-serif',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',

    },
  header: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'start',
  },
  title: {
    color: 'var(--Text, #252422)',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: '600',
    alignSelf: 'end',
  },
  phoneContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    gap: '4px',
    fontSize: '14px',
    justifyContent: 'end',
    direction: 'rtl', // Set direction to RTL

  },
  phoneNumber: {
    color: 'rgba(0, 47, 54, 1)',
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'stretch',
    margin: 'auto 0',
  },
  instruction: {
    color: 'var(--Paragraph, #736e67)',
    textAlign: 'right',
    fontWeight: '400',
    lineHeight: '1',
    alignSelf: 'stretch',
    margin: 'auto 0',
  },
  verificationSection: {
    alignSelf: 'center',
    display: 'flex',
    marginTop: '32px',
    width: '100%',
    maxWidth: '464px',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
  },
  codeInputContainer: {
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '20px',
    color: 'var(--Text, #252422)',
    fontWeight: '400',
    lineHeight: '1',
    justifyContent: 'center',
    direction: 'rtl', // Set direction to RTL

  },
  input: {
    width: '80px',
    height: '80px',
    borderRadius: '16px',
    border: '0.5px solid var(--Text, #252422)',
    opacity: '0.5',
    textAlign: 'center',
    fontSize: '20px',
  },
  submitButton: {
    alignSelf: 'stretch',
    borderRadius: '50px',
    background: 'var(--Blue, #27989e)',
    marginTop: '24px',
    width: '100%',
    padding: '16px 40px',
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '600',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
  },
  resendCode: {
    alignSelf: 'stretch',
    width: '100%',
    fontSize: '16px',
    color: 'rgba(39, 152, 158, 1)',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: '1',
    cursor: 'pointer',
  },
  visuallyHidden: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0',
  },
  '@media (max-width: 991px)': {
    container: {
      padding: '0 20px',
    },
    header: {
      maxWidth: '100%',
    },
    phoneContainer: {
      maxWidth: '100%',
    },
    verificationSection: {
      maxWidth: '100%',
      whiteSpace: 'initial',
    },
    codeInputContainer: {
      maxWidth: '100%',
    },
    submitButton: {
      maxWidth: '100%',
      padding: '0 20px',
    },
    resendCode: {
      maxWidth: '100%',
    },
  },
};

const VerificationCode = ({close}) => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '']);
  const [resend , setresend] = useState(false);



  const handleCodeChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      
      if (value && index < 4) {
        const nextInput = document.getElementById(`code-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };



  return (
    <div
    style={styles.containertop}
    role="dialog"
    aria-labelledby="dialog-title"
    aria-modal="true"
  >
    <form style={styles.container} onSubmit={(e) => e.preventDefault()}>
      <div style={styles.header}>
        <h1 style={styles.title}>تفعيل رقم الجوال</h1>
        <div style={styles.phoneContainer}>
          <span style={styles.phoneNumber}>+966 123 456 789</span>
          <span style={styles.instruction}>
            قم بإدخال رمز التحقق المكون من 5 أرقام المرسل لرقم
          </span>
        </div>
      </div>

      <div style={styles.verificationSection}>
        <div style={styles.codeInputContainer}>
          {verificationCode.map((digit, index) => (
            <React.Fragment key={index}>
              <label htmlFor={`code-input-${index}`} style={styles.visuallyHidden}>
                Verification digit {index + 1}
              </label>
              <input
                id={`code-input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                style={styles.input}
                aria-label={`Digit ${index + 1} of verification code`}
              />
            </React.Fragment>
          ))}
        </div>
        <button onClick={close} type="submit" style={styles.submitButton}>
          التالي
        </button>
      </div>
      {!resend ?  <button onClick={setresend} type="button" style={styles.resendCode}>
        ارسل كود جديد
      </button> : <ResendCodeCustomer  />  }

    </form>
  </div>
  );
};

export default VerificationCode;