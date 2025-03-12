import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

interface ApiResponse {
  message: string;
}

const HomePage: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [apiMessage, setApiMessage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/protected`,
          {
            headers: {
              Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        setApiMessage(data.message);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching protected data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProtectedData();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (err) {
      console.error('Error signing out:', err);
    }
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
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000
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
              fontSize: '16px'
            }}>
              {user?.email?.[0].toUpperCase()}
            </div>
            <span style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.email}
            </span>
          </div>
          
          <button
            onClick={handleSignOut}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{
        padding: '6rem 2rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2>Welcome to your Dashboard</h2>
          
          {loading ? (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '2rem'
            }}>
              <p>Loading...</p>
            </div>
          ) : error ? (
            <div style={{
              backgroundColor: '#ffebee',
              color: '#c62828',
              padding: '1rem',
              borderRadius: '4px',
              marginTop: '1rem'
            }}>
              <p>Error: {error}</p>
            </div>
          ) : (
            <div style={{
              backgroundColor: '#f5f5f5',
              padding: '1rem',
              borderRadius: '4px',
              marginTop: '1rem'
            }}>
              <p>API Response: <strong>{apiMessage}</strong></p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage; 