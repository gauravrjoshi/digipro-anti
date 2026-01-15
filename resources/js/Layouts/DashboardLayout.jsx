import React from 'react';
import { Link, usePage, router, Head } from '@inertiajs/react';

const DashboardLayout = ({ children }) => {
    const pageTitle = getPageTitle();
    const { auth } = usePage().props;
    const user = auth.user;

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };


    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#080a11', color: 'white' }}>
            <Head title={pageTitle} />
            {/* Sidebar */}
            <aside style={{ width: '250px', background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.1)', padding: '2rem 1rem' }}>
                <Link href={route('dashboard')} style={{ textDecoration: 'none', display: 'block', marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', paddingLeft: '0.75rem' }}>
                        <img src="/images/sw-logo.png" alt="SW Logo" style={{ height: '32px', width: 'auto' }} />
                        <span className="text-premium" style={{ fontSize: '1.5rem', fontWeight: '800' }}>
                            DigiPro
                        </span>
                    </div>
                </Link>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Link href={route('dashboard')} style={navLinkStyle(route().current('dashboard'))}>Home</Link>
                    <Link href={route('dashboard.profile')} style={navLinkStyle(route().current('dashboard.profile'))}>Profile & Bio</Link>
                    <Link href={route('dashboard.projects')} style={navLinkStyle(route().current('dashboard.projects'))}>Projects</Link>
                    <Link href={route('dashboard.skills')} style={navLinkStyle(route().current('dashboard.skills'))}>Skills</Link>
                    <Link href={route('dashboard.experience')} style={navLinkStyle(route().current('dashboard.experience'))}>Experience</Link>
                    <Link href={route('dashboard.education')} style={navLinkStyle(route().current('dashboard.education'))}>Education</Link>
                    <Link href={route('dashboard.resume')} style={navLinkStyle(route().current('dashboard.resume'))}>Resume</Link>
                    <Link href={route('dashboard.analytics')} style={navLinkStyle(route().current('dashboard.analytics'))}>Analytics</Link>
                    <Link href={route('dashboard.domains')} style={navLinkStyle(route().current('dashboard.domains'))}>Custom Domains</Link>
                    {user?.is_admin === 1 && (
                        <Link
                            href={route('dashboard.users')}
                            style={{ ...navLinkStyle(route().current('dashboard.users')), color: '#fca5a5' }}
                        >
                            Manage Users (Admin)
                        </Link>
                    )}
                    <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                        <a href={`/${user?.portfolio?.slug}`} target="_blank" style={{ ...navLinkStyle(false), color: '#4ade80' }}>View Live Site →</a>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <h1 className="text-premium" style={{ fontSize: '1.8rem', fontWeight: '800' }}>
                        {pageTitle}
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '1rem', fontWeight: '600', color: 'white' }}>{user?.name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '500' }}>{user?.is_subscribed ? 'Pro Member' : 'Free Plan'}</div>
                        </div>
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
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', minHeight: 'calc(100vh - 180px)' }}>
                    {children}
                </div>
            </main>
        </div>
    );
};

const navLinkStyle = (isActive) => ({
    display: 'block',
    padding: '0.8rem 1rem',
    color: isActive ? 'white' : '#94a3b8',
    background: isActive ? 'rgba(14, 165, 233, 0.08)' : 'transparent',
    textDecoration: 'none',
    borderRadius: '10px',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    fontWeight: isActive ? '600' : '500',
    borderLeft: isActive ? '3px solid #0ea5e9' : '3px solid transparent'
});


const getPageTitle = () => {
    const titles = {
        'dashboard.profile': 'Profile Editor',
        'dashboard.projects': 'Projects Editor',
        'dashboard.skills': 'Skills Editor',
        'dashboard.experience': 'Experience Editor',
        'dashboard.education': 'Education Editor',
        'dashboard.resume': 'Resume Manager',
        'dashboard.analytics': 'Analytics',
        'dashboard.domains': 'Domain Settings',
        'dashboard.users': 'User Management',
        'portfolio.show': 'Dashboard',
    };

    console.log(route().current());

    return Object.entries(titles).find(([routeName]) =>
        route().current(routeName)
    )?.[1] ?? 'Dashboard';
}




export default DashboardLayout;
