import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

const HomePage: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const token = await (await supabase.auth.getSession()).data.session?.access_token;
        
        if (!token) {
          throw new Error('No access token available');
        }
        
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/protected`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch protected data');
        }
        
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error('Error fetching protected data:', error);
        setMessage('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchProtectedData();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav style={{
        padding: '1rem',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0 }}>Basic Login</h1>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {/* User Avatar */}
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#4285F4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              {user?.email?.[0].toUpperCase()}
            </div>
            <span>{user?.email}</span>
          </div>
          
          <button
            onClick={handleSignOut}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2>Protected Content</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px'
          }}>
            <p>Response from protected API: <strong>{message}</strong></p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage; 