import React from 'react';
import { Link } from '@inertiajs/react';

const LandingPage = () => {
    return (
        <div style={{ minHeight: '100vh', background: '#0f172a', color: 'white' }}>
            {/* Navigation */}
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.5rem 5%',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    SW DigiPro
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <Link href={route('pricing')} style={{ color: '#94a3b8', textDecoration: 'none', padding: '0.5rem 1rem' }}>
                        Pricing
                    </Link>
                    <Link href={route('login')} style={{ color: '#94a3b8', textDecoration: 'none', padding: '0.5rem 1rem' }}>
                        Login
                    </Link>
                    <Link
                        href={route('register')}
                        style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: '600'
                        }}
                    >
                        Get Started Free
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section style={{
                textAlign: 'center',
                padding: '6rem 5% 4rem',
                background: 'radial-gradient(circle at top, rgba(102, 126, 234, 0.1) 0%, transparent 50%)'
            }}>
                <h1 style={{
                    fontSize: '4rem',
                    fontWeight: 'bold',
                    marginBottom: '1.5rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: '1.2'
                }}>
                    Build Your Professional<br />Portfolio in Minutes
                </h1>
                <p style={{
                    fontSize: '1.5rem',
                    color: '#94a3b8',
                    marginBottom: '3rem',
                    maxWidth: '700px',
                    margin: '0 auto 3rem'
                }}>
                    Create a stunning portfolio website without coding. Showcase your projects, skills, and experience with our powerful SaaS platform.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link
                        href={route('register')}
                        style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            padding: '1rem 2.5rem',
                            fontSize: '1.125rem',
                            borderRadius: '12px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: '600',
                            textDecoration: 'none',
                            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
                        }}
                    >
                        Start Building Free →
                    </Link>
                    <Link
                        href={route('pricing')}
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            color: 'white',
                            padding: '1rem 2.5rem',
                            fontSize: '1.125rem',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.2)',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            fontWeight: '600'
                        }}
                    >
                        View Pricing
                    </Link>
                </div>
                <p style={{ marginTop: '1.5rem', color: '#64748b', fontSize: '0.875rem' }}>
                    ✓ No credit card required  •  ✓ Free forever plan  •  ✓ Upgrade anytime
                </p>
            </section>

            {/* Features Section */}
            <section style={{ padding: '4rem 5%', background: 'rgba(255,255,255,0.02)' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
                    Everything You Need to Shine
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {[
                        { icon: '🎨', title: 'Beautiful Themes', desc: 'Choose from multiple professionally designed themes' },
                        { icon: '📊', title: 'Analytics Dashboard', desc: 'Track views, clicks, and engagement in real-time' },
                        { icon: '🔗', title: 'Custom Domains', desc: 'Connect your own domain for a professional look' },
                        { icon: '⚡', title: 'Lightning Fast', desc: 'Optimized for speed and performance' },
                        { icon: '📱', title: 'Mobile Responsive', desc: 'Looks perfect on all devices' },
                        { icon: '🚀', title: 'SEO Optimized', desc: 'Built-in SEO best practices' }
                    ].map((feature, index) => (
                        <div key={index} style={{
                            background: 'rgba(255,255,255,0.03)',
                            padding: '2rem',
                            borderRadius: '16px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            transition: 'transform 0.2s',
                            cursor: 'pointer'
                        }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{feature.title}</h3>
                            <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pricing Section */}
            <section style={{ padding: '4rem 5%' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>
                    Simple, Transparent Pricing
                </h2>
                <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '3rem', fontSize: '1.125rem' }}>
                    Start free, upgrade when you're ready
                </p>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    maxWidth: '900px',
                    margin: '0 auto'
                }}>
                    {/* Free Plan */}
                    <div style={{
                        background: 'rgba(255,255,255,0.03)',
                        padding: '2.5rem',
                        borderRadius: '20px',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Free</h3>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                            $0<span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#94a3b8' }}>/month</span>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                            {['Basic portfolio', 'Up to 5 projects', 'Standard themes', 'yoursite.com/username'].map((item, i) => (
                                <li key={i} style={{ padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#94a3b8' }}>
                                    ✓ {item}
                                </li>
                            ))}
                        </ul>
                        <Link
                            href={route('register')}
                            style={{
                                display: 'block',
                                textAlign: 'center',
                                width: '100%',
                                padding: '1rem',
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '10px',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                textDecoration: 'none',
                                fontWeight: '600'
                            }}
                        >
                            Get Started Free
                        </Link>
                    </div>

                    {/* Pro Plan */}
                    <div style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        padding: '2.5rem',
                        borderRadius: '20px',
                        border: '2px solid #667eea',
                        position: 'relative',
                        transform: 'scale(1.05)',
                        boxShadow: '0 20px 60px rgba(102, 126, 234, 0.3)'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '-12px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: '#fbbf24',
                            color: '#000',
                            padding: '0.25rem 1rem',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold'
                        }}>
                            MOST POPULAR
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Pro</h3>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                            $10<span style={{ fontSize: '1rem', fontWeight: 'normal', opacity: 0.9 }}>/month</span>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                            {['Everything in Free', 'Unlimited projects', 'All premium themes', 'Custom subdomain', 'Analytics dashboard', 'Custom domain support', 'Priority support'].map((item, i) => (
                                <li key={i} style={{ padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                                    ✓ {item}
                                </li>
                            ))}
                        </ul>
                        <Link
                            href={route('register')}
                            style={{
                                display: 'block',
                                textAlign: 'center',
                                width: '100%',
                                padding: '1rem',
                                background: 'white',
                                border: 'none',
                                borderRadius: '10px',
                                color: '#667eea',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                textDecoration: 'none',
                                fontWeight: 'bold'
                            }}
                        >
                            Start Pro Trial
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                padding: '4rem 5%',
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
            }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                    Ready to Build Your Portfolio?
                </h2>
                <p style={{ fontSize: '1.25rem', color: '#94a3b8', marginBottom: '2rem' }}>
                    Join thousands of professionals showcasing their work
                </p>
                <Link
                    href={route('register')}
                    style={{
                        display: 'inline-block',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        padding: '1rem 3rem',
                        fontSize: '1.125rem',
                        borderRadius: '12px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '600',
                        textDecoration: 'none',
                        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
                    }}
                >
                    Get Started Free →
                </Link>
            </section>

            {/* Footer */}
            <footer style={{
                padding: '3rem 5%',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(0,0,0,0.2)'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1200px',
                    margin: '0 auto 2rem'
                }}>
                    <div>
                        <h4 style={{ marginBottom: '1rem', fontWeight: '600' }}>Product</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <Link href={route('pricing')} style={{ color: '#94a3b8', textDecoration: 'none' }}>Pricing</Link>
                            <Link href={route('register')} style={{ color: '#94a3b8', textDecoration: 'none' }}>Sign Up</Link>
                        </div>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: '1rem', fontWeight: '600' }}>Company</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <a href='https://statelyworld.com/about-us/' target="_blank" style={{ color: '#94a3b8', textDecoration: 'none' }}>About</a>
                            <a href={route('support')} style={{ color: '#94a3b8', textDecoration: 'none' }}>Support</a>
                        </div>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: '1rem', fontWeight: '600' }}>Legal</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <a href={route('privacy')} style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a>
                            <a href={route('terms')} style={{ color: '#94a3b8', textDecoration: 'none' }}>Terms of Service</a>
                            <a href={route('cancellation')} style={{ color: '#94a3b8', textDecoration: 'none' }}>Cancellation Policy</a>
                        </div>
                    </div>
                </div>
                <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', color: '#64748b' }}>
                    © {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME}. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
