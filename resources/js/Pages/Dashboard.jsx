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
        <div style={{ padding: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Dashboard</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span>Welcome, {user.name}</span>
                    <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>
                        Logout
                    </button>
                </div>
            </header>

            <div className="glass-card" style={{ padding: '2rem' }}>
                <h3>My Portfolio</h3>
                <p>Manage your details here. (This is a placeholder for the editor)</p>
                <br />
                <p>Email: {user.email}</p>
                <p>ID: {user.id}</p>
            </div>
        </div>
    );
};

export default Dashboard;
