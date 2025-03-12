import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { signInWithGoogle, session, loading } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);


  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column'
      }}>
        <p>Loading...</p>
      </div>
    );
  }


  if (session) {
    return <Navigate to="/protected" />;
  }

  const handleGoogleSignIn = async () => {
    setIsLoggingIn(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Failed to sign in:', error);
      setIsLoggingIn(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column'
    }}>
      <h1>Login</h1>
      <button 
        onClick={handleGoogleSignIn}
        disabled={isLoggingIn}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: isLoggingIn ? 'not-allowed' : 'pointer',
          backgroundColor: isLoggingIn ? '#ccc' : '#4285F4',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        {isLoggingIn ? 'Signing in...' : 'Sign in with Google'}
      </button>
    </div>
  );
};

export default LoginPage;