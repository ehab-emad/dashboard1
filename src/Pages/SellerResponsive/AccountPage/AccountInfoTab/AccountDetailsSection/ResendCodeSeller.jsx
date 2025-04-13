import { useState, useEffect } from 'react';

const styles = {
  resendCodeContainer: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Expo Arabic, sans-serif',
    justifyContent: 'center',
  },
  timer: {
    color:  '#FF8945',
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 1,
    alignSelf: 'stretch',
    margin: 'auto 0'
  },
  resendText: {
    color: '#252422',
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1,
    alignSelf: 'stretch',
    margin: '8 0',
  }
};

const ResendCodeSeller = () => {
  const [timeLeft, setTimeLeft] = useState(295);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div style={styles.resendCodeContainer}>
      <span style={styles.timer}>{formatTime(timeLeft)}</span>
      <span style={styles.resendText}>إعادة ارسال الكود بعد </span>
    </div>
  );
}

export default ResendCodeSeller;