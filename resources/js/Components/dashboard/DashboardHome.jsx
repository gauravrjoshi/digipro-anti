import React from 'react';
import { useAuth } from '../../context/AuthContext';

const DashboardHome = () => {
    const { user } = useAuth();
    return (
        <div>
            <h2>Welcome back, {user?.name}!</h2>
            <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Select a section from the sidebar to start editing your portfolio.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                <StatCard title="Total Projects" value="6" />
                <StatCard title="Skills Listed" value="24" />
                <StatCard title="Experience Entries" value="3" />
            </div>
        </div>
    );
};

const StatCard = ({ title, value }) => (
    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{value}</h3>
        <p style={{ color: '#94a3b8' }}>{title}</p>
    </div>
);

export default DashboardHome;
