import { useState, useEffect, useRef } from 'react';
import { firestore, auth } from '../../firebaseConfig';
import { signInWithPhoneNumber, RecaptchaVerifier, onAuthStateChanged } from 'firebase/auth';
import {verifyPhoneOTP} from '../../store/reducers/firebasefunctions'
import {setSellerId} from '../../store/reducers/sellerProductsReducer'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const SignInPhone = ({Number,userType}) => {

  const dispatch = useDispatch();
      const navigate = useNavigate();
  

  const [phoneNumber, setPhoneNumber] = useState(Number);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [user, setUser] = useState(null);
  const otpRefs = useRef([]);
  const recaptchaVerifierRef = useRef(null);


  useEffect(() => {

        // Check if the user is already signed in
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, get the ID token
        const idToken = await user.getIdToken();
        localStorage.setItem('firebaseIdToken', idToken); // Store the ID token (optional)
        setUser(user);
      } else {
        // User is not signed in, clear any stored token
        localStorage.removeItem('firebaseIdToken');
        setUser(null);
      }
    });

    // Initialize reCAPTCHA
    if (!firestore || !auth) {
      console.error('Firestore or Auth is not initialized');
      return;
    }

    recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'normal',
      callback: () => alert('reCAPTCHA verified!'),
    });

    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
      }
      unsubscribe(); // Clean up the auth state listener
    };


  }, [auth, firestore]);

  const handlePhoneChange = (value) => {
    const cleaned = value
      .replace(/[^\d+]/g, '')
      .replace(/(?!^\+)\+/g, '')
      .slice(0, 16);
    setPhoneNumber(cleaned);
  };

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text/plain');
    const digits = pasted.replace(/\D/g, '').split('').slice(0, 6);
    const newOtp = [...digits, ...Array(6 - digits.length).fill('')];
    setOtp(newOtp);
  };

  const handleSendOtp = async () => {
    try {
      const cleanPhone = phoneNumber.replace(/[^\d+]/g, '');
      if (!cleanPhone.startsWith('+')) {
        alert('Please enter a valid international number starting with +');
        return;
      }

      const result = await signInWithPhoneNumber(
        auth,
        cleanPhone,
        recaptchaVerifierRef.current
      );

      setConfirmationResult(result);
      alert('OTP sent! Check your phone.');
    } catch (error) {
      console.error('OTP send error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      if (!confirmationResult) {
        throw new Error('Please send OTP first');
      }

      const fullOtp = otp.join('').replace(/\D/g, '');
      if (fullOtp.length !== 6) {
        alert('Please enter 6-digit code');
        return;
      }

      const result = await verifyPhoneOTP(confirmationResult, otp);
    
      if (result.success) {
        userType === 'seller' ?
        localStorage.setItem('sellerId', result.userId):
        localStorage.setItem('customerId', result.userId)
        
        navigate(userType === 'seller' ? '/seller' : '/customer');

        setUser(auth.currentUser); 
        alert('Verification successful!');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Verification failed:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('firebaseIdToken');
      setUser(null);
      alert('Logged out successfully.');
    } catch (error) {
      console.error('Logout error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Phone Verification</h1>
      <div id="recaptcha-container" style={{ margin: '20px 0' }}></div>

      {!user ? (
        <form onSubmit={handleVerifyOtp} style={{ display: 'grid', gap: '15px' }}>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder="+1234567890"
            style={{
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
            inputMode="tel"
          />

          <button
            type="button"
            onClick={handleSendOtp}
            style={{
              padding: '12px',
              background: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Send OTP
          </button>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                ref={(el) => (otpRefs.current[index] = el)}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onPaste={handlePaste}
                style={{
                  width: '45px',
                  height: '45px',
                  textAlign: 'center',
                  fontSize: '18px',
                  border: '2px solid #3498db',
                  borderRadius: '8px'
                }}
              />
            ))}
          </div>

          <button
            type="submit"
            style={{
              padding: '12px',
              background: '#2ecc71',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Verify OTP
          </button>
        </form>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '25px',
          background: '#ecf0f1',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#2ecc71' }}>✅ Verification Complete!</h2>
          <p style={{ marginTop: '10px', color: '#2c3e50' }}>
            User data successfully stored in admin collection
          </p>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              background: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              marginTop: '15px'
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default SignInPhone;