import React from 'react';
import DashboardLayout from '../../Layouts/DashboardLayout';
import { usePage, Link } from '@inertiajs/react';

const Home = () => {
    const { auth } = usePage().props;
    const user = auth.user;
    const portfolio = user?.portfolio;

    return (
        <div>
            {/* Welcome Section */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(255, 152, 0, 0.1) 100%)',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid rgba(33, 150, 243, 0.2)',
                marginBottom: '2.5rem'
            }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Welcome back, {user?.name}! 👋
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
                    {portfolio ? 'Your portfolio is live and ready to share!' : 'Complete your profile to activate your portfolio.'}
                </p>
                {portfolio && (
                    <Link
                        href={`/${portfolio.slug}`}
                        target="_blank"
                        style={{
                            display: 'inline-block',
                            marginTop: '1rem',
                            padding: '0.75rem 1.5rem',
                            background: 'linear-gradient(135deg, #2196F3 0%, #FF9800 100%)',
                            color: 'white',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)'
                        }}
                    >
                        View Live Portfolio →
                    </Link>
                )}
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <StatCard
                    title="Portfolio Status"
                    value={portfolio ? 'Active' : 'Inactive'}
                    color={portfolio ? '#4ade80' : '#f87171'}
                    icon="✓"
                />
                <StatCard
                    title="Projects"
                    value={portfolio?.projects?.length || 0}
                    color="#2196F3"
                    icon="📁"
                />
                <StatCard
                    title="Skills"
                    value={portfolio?.skills?.length || 0}
                    color="#FF9800"
                    icon="⚡"
                />
                <StatCard
                    title="Subscription"
                    value={user?.is_subscribed ? 'Pro' : 'Free'}
                    color={user?.is_subscribed ? '#fbbf24' : '#94a3b8'}
                    icon={user?.is_subscribed ? '⭐' : '📦'}
                />
            </div>

            {/* Quick Actions */}
            <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '1.5rem' }}>Quick Actions</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <QuickActionCard
                        title="Edit Profile"
                        description="Update your bio and info"
                        href={route('dashboard.profile')}
                        icon="👤"
                    />
                    <QuickActionCard
                        title="Add Project"
                        description="Showcase your work"
                        href={route('dashboard.projects')}
                        icon="➕"
                    />
                    <QuickActionCard
                        title="View Analytics"
                        description="Track your visitors"
                        href={route('dashboard.analytics')}
                        icon="📊"
                    />
                    {!user?.is_subscribed && (
                        <QuickActionCard
                            title="Upgrade to Pro"
                            description="Unlock premium features"
                            href={route('pricing')}
                            icon="🚀"
                            highlight={true}
                        />
                    )}
                </div>
            </div>

            {/* Tips Section */}
            <div style={{
                padding: '1.5rem',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    💡 Quick Tips
                </h3>
                <ul style={{ color: '#94a3b8', paddingLeft: '1.25rem', lineHeight: '1.8' }}>
                    <li>Ensure your profile has a bio and professional title</li>
                    <li>Add images to your projects to make them stand out</li>
                    <li>Keep your skills and experience up to date</li>
                    {!user?.is_subscribed && (
                        <li style={{ color: '#fbbf24' }}>Upgrade to Pro to connect a custom domain</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, color, icon }) => (
    <div style={{
        background: 'rgba(255,255,255,0.03)',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.05)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'default'
    }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
        }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{title}</p>
            <span style={{ fontSize: '1.5rem' }}>{icon}</span>
        </div>
        <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: color }}>{value}</h3>
    </div>
);

const QuickActionCard = ({ title, description, href, icon, highlight }) => (
    <Link
        href={href}
        style={{
            display: 'block',
            padding: '1.25rem',
            background: highlight ? 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(255, 152, 0, 0.1) 100%)' : 'rgba(255,255,255,0.03)',
            borderRadius: '12px',
            border: highlight ? '1px solid rgba(33, 150, 243, 0.3)' : '1px solid rgba(255,255,255,0.05)',
            textDecoration: 'none',
            transition: 'all 0.2s',
            cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.borderColor = '#2196F3';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = highlight ? 'rgba(33, 150, 243, 0.3)' : 'rgba(255,255,255,0.05)';
        }}
    >
        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{icon}</div>
        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: 'white', marginBottom: '0.25rem' }}>{title}</h4>
        <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{description}</p>
    </Link>
);

Home.layout = page => <DashboardLayout children={page} />;

export default Home;
