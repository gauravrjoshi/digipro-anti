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
                background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(245, 158, 11, 0.1) 100%)',
                padding: '2.5rem',
                borderRadius: '24px',
                border: '1px solid rgba(14, 165, 233, 0.15)',
                marginBottom: '2.5rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.75rem', color: 'white' }}>
                        Welcome back, {user?.name}! 👋
                    </h2>
                    <p style={{ color: '#94a3b8', fontSize: '1.1rem', fontWeight: '500' }}>
                        {portfolio ? 'Your portfolio is live and ready to share!' : 'Complete your profile to activate your portfolio.'}
                    </p>
                    {portfolio && (
                        <Link
                            href={`/${portfolio.slug}`}
                            target="_blank"
                            className="btn-premium"
                            style={{
                                marginTop: '1.5rem'
                            }}
                        >
                            View Live Portfolio →
                        </Link>
                    )}
                </div>
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
                    color="#0ea5e9"
                    icon="📁"
                />
                <StatCard
                    title="Skills"
                    value={portfolio?.skills?.length || 0}
                    color="#f59e0b"
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
        background: 'rgba(255,255,255,0.02)',
        padding: '1.75rem',
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.05)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'default'
    }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.3)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
        }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', fontWeight: '600' }}>{title}</p>
            <span style={{ fontSize: '1.5rem', opacity: 0.8 }}>{icon}</span>
        </div>
        <h3 style={{ fontSize: '2.25rem', fontWeight: '800', color: color }}>{value}</h3>
    </div>
);

const QuickActionCard = ({ title, description, href, icon, highlight }) => (
    <Link
        href={href}
        style={{
            display: 'block',
            padding: '1.5rem',
            background: highlight ? 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)' : 'rgba(255,255,255,0.02)',
            borderRadius: '20px',
            border: highlight ? '1px solid rgba(14, 165, 233, 0.3)' : '1px solid rgba(255,255,255,0.05)',
            textDecoration: 'none',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.borderColor = highlight ? '#0ea5e9' : 'rgba(255,255,255,0.2)';
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = highlight ? 'rgba(14, 165, 233, 0.3)' : 'rgba(255,255,255,0.05)';
            e.currentTarget.style.boxShadow = 'none';
        }}
    >
        <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{icon}</div>
        <h4 style={{ fontSize: '1.125rem', fontWeight: '700', color: 'white', marginBottom: '0.35rem' }}>{title}</h4>
        <p style={{ fontSize: '0.875rem', color: '#94a3b8', fontWeight: '500', lineHeight: '1.5' }}>{description}</p>
    </Link>
);

Home.layout = page => <DashboardLayout children={page} />;

export default Home;
