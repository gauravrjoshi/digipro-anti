import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div style={{ padding: '2rem', background: '#080a11', minHeight: '100vh', color: 'white' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <h1 className="text-premium" style={{ fontSize: '2rem', fontWeight: '800' }}>Dashboard</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <span style={{ color: '#94a3b8', fontWeight: '500' }}>Welcome, <span style={{ color: 'white' }}>{user.name}</span></span>
                    <button
                        onClick={handleLogout}
                        style={{
                            padding: '0.6rem 1.2rem',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'white',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.08)'}
                        onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                    >
                        Logout
                    </button>
                </div>
            </header>

            <div className="glass-card" style={{ padding: '2.5rem' }}>
                <h3 style={{ marginBottom: '1.25rem', fontSize: '1.25rem' }}>My Portfolio</h3>
                <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>Manage your details here. (This is a placeholder for the editor)</p>
                <div style={{ marginTop: '2rem', display: 'grid', gap: '1rem' }}>
                    <p style={{ color: '#e2e8f0' }}><strong style={{ color: '#0ea5e9' }}>Email:</strong> {user.email}</p>
                    <p style={{ color: '#e2e8f0' }}><strong style={{ color: '#0ea5e9' }}>ID:</strong> {user.id}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
