import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a', color: 'white' }}>
            {/* Sidebar */}
            <aside style={{ width: '250px', background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.1)', padding: '2rem 1rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', paddingLeft: '1rem', color: 'var(--primary-color)' }}>DigiPro</h2>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Link to="/dashboard" style={navLinkStyle}>Home</Link>
                    <Link to="/dashboard/profile" style={navLinkStyle}>Profile & Bio</Link>
                    <Link to="/dashboard/projects" style={navLinkStyle}>Projects</Link>
                    <Link to="/dashboard/skills" style={navLinkStyle}>Skills</Link>
                    <Link to="/dashboard/experience" style={navLinkStyle}>Experience</Link>
                    <Link to="/dashboard/education" style={navLinkStyle}>Education</Link>
                    <Link to="/dashboard/analytics" style={navLinkStyle}>📊 Analytics</Link>
                    <Link to="/dashboard/domains" style={navLinkStyle}>🔗 Custom Domains</Link>
                    {user?.is_admin && (
                        <Link to="/dashboard/users" style={{ ...navLinkStyle, color: '#fca5a5' }}>Manage Users (Admin)</Link>
                    )}
                    <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                        <Link to={`/${user?.portfolio?.slug || 'gaurav'}`} target="_blank" style={{ ...navLinkStyle, color: '#4ade80' }}>View Live Site →</Link>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '1.8rem' }}>Dashboard</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span>{user?.name}</span>
                        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>
                            Logout
                        </button>
                    </div>
                </header>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

const navLinkStyle = {
    display: 'block',
    padding: '0.8rem 1rem',
    color: '#94a3b8',
    textDecoration: 'none',
    borderRadius: '8px',
    transition: 'all 0.2s'
};

export default DashboardLayout;
