import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  duration = 3000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Show the toast
    setIsVisible(true);
    
    // Simulate loading for 1.5 seconds
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
    
    // Hide the toast after duration
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      
      // Call onClose callback after animation completes
      const closeTimer = setTimeout(() => {
        if (onClose) onClose();
      }, 300);
      
      return () => clearTimeout(closeTimer);
    }, duration);
    
    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, onClose]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: isSuccess ? '#4CAF50' : '#333',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '4px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
        opacity: isVisible ? 1 : 0,
        transition: 'transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease',
        zIndex: 1000,
      }}
    >
      {isLoading ? (
        <div
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderTopColor: 'white',
            animation: 'spin 1s linear infinite',
          }}
        />
      ) : (
        <div
          style={{
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              animation: 'checkmark 0.3s ease-in-out forwards',
            }}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      )}
      <span>{isSuccess ? message : 'Loading...'}</span>
    </div>
  );
};

const App = () => {
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Toast Notification Demo</h1>
      <button
        onClick={handleShowToast}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4361ee',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.2s',
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3a56d4'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4361ee'}
      >
        Show Toast Notification
      </button>
      
      {showToast && (
        <Toast 
          message="Operation completed successfully!" 
          duration={4000}
          onClose={handleCloseToast}
        />
      )}
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes checkmark {
            0% { transform: scale(0); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default App;