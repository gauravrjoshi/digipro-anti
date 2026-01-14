import React from 'react';
import DashboardLayout from '../../Layouts/DashboardLayout';
import { usePage } from '@inertiajs/react';

const Home = () => {
    const { auth } = usePage().props;
    const user = auth.user;
    const portfolio = user?.portfolio;

    return (
        <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Welcome back, {user?.name}!</h2>
            <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Select a section from the sidebar to start editing your portfolio.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginTop: '2.5rem' }}>
                <StatCard title="Portfolio Status" value={portfolio ? 'Active' : 'Missing'} color="#4ade80" />
                <StatCard title="Projects" value={portfolio?.projects?.length || 0} color="#667eea" />
                <StatCard title="Subscription" value={user?.is_subscribed ? 'Pro' : 'Free'} color={user?.is_subscribed ? '#fbbf24' : '#94a3b8'} />
            </div>

            <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>Quick Tips</h3>
                <ul style={{ color: '#94a3b8', paddingLeft: '1.25rem', lineHeight: '1.8' }}>
                    <li>Ensure your profile has a bio and professional title.</li>
                    <li>Add images to your projects to make them stand out.</li>
                    <li>Connect a custom domain in the Domain Settings (Pro only).</li>
                </ul>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, color }) => (
    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{title}</p>
        <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: color }}>{value}</h3>
    </div>
);

Home.layout = page => <DashboardLayout children={page} />;

export default Home;
