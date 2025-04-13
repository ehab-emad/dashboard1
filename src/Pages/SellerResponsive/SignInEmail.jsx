import { useState, useEffect } from 'react';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { authenticateUser } from '../../store/reducers/firebasefunctions';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {setSellerId} from '../../store/reducers/sellerProductsReducer'
import { useNavigate } from 'react-router-dom';


const SignInEmail = ({ email: initialEmail = '', password: initialPassword = '', userType }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

  
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Just update the user state, no localStorage
    });
    return () => unsubscribe();
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('الرجاء ملء جميع الحقول');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('البريد الإلكتروني غير صالح');
      return;
    }

    try {
      const result = await authenticateUser(email, password, rememberMe);
     
      if (result.success) {
        userType === 'seller' ?
        localStorage.setItem('sellerId', result.userId):
        localStorage.setItem('customerId', result.userId)

       
        navigate(userType === 'seller' ? '/seller' : '/customer');
        setUser(auth.currentUser);         
        } else {
        throw new Error(result.error || 'Authentication failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message.includes('not registered') 
        ? error.message 
        : 'فشل تسجيل الدخول. الرجاء التحقق من بياناتك');
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Firebase will handle clearing the session
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>
        {userType === 'seller' ? 'Seller Login' : 'Customer Login'}
      </h1>

      {!user ? (
        <form onSubmit={handleLogin} style={{ display: 'grid', gap: '15px' }}>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            style={{
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
            required
          />

          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            style={{
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
            required
          />

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ marginRight: '10px' }}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>

          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          <button
            type="submit"
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
            Login
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
          <h2 style={{ color: '#2ecc71' }}>✅ Login Successful!</h2>
          <p style={{ marginTop: '10px', color: '#2c3e50' }}>
            You are now logged in as {userType}.
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


SignInEmail.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  userType: PropTypes.oneOf(['seller', 'customer']).isRequired,
  onLoginSuccess: PropTypes.func,
  onLogout: PropTypes.func
};

SignInEmail.defaultProps = {
  email: '',
  password: '',
  onLoginSuccess: () => {},
  onLogout: () => {}
};
export default SignInEmail;