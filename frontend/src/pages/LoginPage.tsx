import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { signInWithGoogle, session, loading } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    return <Navigate to="/home" />;
  }

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      setIsLoggingIn(true);
      await signInWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
      console.error('Failed to sign in:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <h1 style={{ marginBottom: '2rem' }}>Basic Login</h1>
        
        {error && (
          <div style={{
            backgroundColor: '#ffebee',
            color: '#c62828',
            padding: '1rem',
            borderRadius: '4px',
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}

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
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            transition: 'background-color 0.2s'
          }}
        >
          {isLoggingIn ? 'Signing in...' : 'Sign in with Google'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;