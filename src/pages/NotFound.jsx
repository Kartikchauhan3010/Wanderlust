import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: 'calc(100vh - 64px)',
      textAlign: 'center', padding: '2rem',
    }}>
      <div style={{ fontSize: '5rem', marginBottom: '1.25rem' }}>🗺️</div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.5rem', fontFamily: 'Georgia, serif' }}>
        404 — Lost in Transit
      </h1>
      <p style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '2rem', maxWidth: '400px', lineHeight: 1.6 }}>
        This page doesn't exist. Let's get you back on track.
      </p>
      <button
        onClick={() => navigate('/')}
        style={{
          background: '#2563eb', color: '#fff', border: 'none', borderRadius: '12px',
          padding: '0.875rem 2rem', fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
        }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;
