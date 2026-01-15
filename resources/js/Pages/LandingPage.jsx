import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import { PRICING_CONFIG } from '../Config/pricing';

const LandingPage = () => {
    const [billingCycle, setBillingCycle] = useState('yearly');
    const { free, pro } = PRICING_CONFIG;

    const currentProPrice = billingCycle === 'yearly' ? pro.yearlyPrice : pro.monthlyPrice;
    const periodLabel = billingCycle === 'yearly' ? '/ year' : '/ month';
    const savings = billingCycle === 'yearly' ? (pro.monthlyPrice * 12 - pro.yearlyPrice) : 0;

    const appUrl = import.meta.env.VITE_APP_URL || window.location.origin;
    const siteTitle = "Build Your Professional Portfolio in Minutes";
    const siteDescription = "Create a stunning portfolio website without coding. Showcase your projects, skills, and experience with our powerful SaaS platform designed for professionals.";
    const ogImage = `${appUrl}/images/sw-logo.png`;

    const premiumGradient = 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #f59e0b 100%)';

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div style={{ minHeight: '100vh', background: '#080a11', color: 'white', overflowX: 'hidden' }}>
            <Head>
                <title>{siteTitle}</title>
                <meta name="description" content={siteDescription} />
                <meta name="keywords" content="portfolio builder, professional portfolio, developer portfolio, resume builder, saas" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={appUrl} />
                <meta property="og:title" content={siteTitle} />
                <meta property="og:description" content={siteDescription} />
                <meta property="og:image" content={ogImage} />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={appUrl} />
                <meta property="twitter:title" content={siteTitle} />
                <meta property="twitter:description" content={siteDescription} />
                <meta property="twitter:image" content={ogImage} />
            </Head>

            {/* Navigation Overlay */}
            <div
                className={`drawer-overlay ${isMenuOpen ? 'open' : ''}`}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Drawer */}
            <div className={`mobile-drawer ${isMenuOpen ? 'open' : ''}`}>
                <Link href={route('pricing')} className="nav-link" onClick={() => setIsMenuOpen(false)}>
                    Pricing
                </Link>
                <Link href={route('login')} className="nav-link" onClick={() => setIsMenuOpen(false)}>
                    Login
                </Link>
                <Link
                    href={route('register')}
                    className="btn-premium"
                    style={{
                        padding: '1rem',
                        textAlign: 'center'
                    }}
                    onClick={() => setIsMenuOpen(false)}
                >
                    Get Started Free
                </Link>
            </div>

            {/* Navigation */}
            <nav className="nav-container" style={{ backdropFilter: 'blur(10px)', background: 'rgba(8, 10, 17, 0.8)', position: 'fixed', top: 0, width: '100%', zIndex: 100, boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    <img src="/images/sw-logo.png" alt="SW Logo" style={{ height: '32px', width: 'auto' }} />
                    <span style={{ background: premiumGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        DigiPro
                    </span>
                </div>
                <div className="nav-links">
                    <Link href={route('pricing')} style={{ color: '#94a3b8', textDecoration: 'none', padding: '0.5rem 1rem', fontWeight: '500' }}>
                        Pricing
                    </Link>
                    <Link href={route('login')} style={{ color: '#94a3b8', textDecoration: 'none', padding: '0.5rem 1rem', fontWeight: '500' }}>
                        Login
                    </Link>
                    <Link
                        href={route('register')}
                        className="btn-premium"
                        style={{
                            padding: '0.7rem 1.5rem',
                            fontSize: '0.95rem'
                        }}
                    >
                        Get Started Free
                    </Link>
                </div>

                {/* Hamburger Button */}
                <button
                    className="mobile-menu-toggle"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    )}
                </button>
            </nav>

            <div style={{ height: '70px' }} /> {/* Spacer for fixed nav */}

            {/* Hero Section */}
            <section className="hero-section" style={{ position: 'relative', overflow: 'hidden' }}>
                {/* Decorative background blur */}
                <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '60%', height: '40%', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }} />

                <h1 className="hero-title" style={{ background: premiumGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', position: 'relative', zIndex: 1 }}>
                    Build Your Professional<br />Portfolio in Minutes
                </h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: '#94a3b8',
                    marginBottom: '3rem',
                    maxWidth: '800px',
                    margin: '0 auto 3rem',
                    lineHeight: '1.6',
                    position: 'relative',
                    zIndex: 1
                }}>
                    Create a stunning portfolio website without coding. Showcase your projects, skills, and experience with our powerful SaaS platform designed for professionals.
                </p>
                <div className="hero-buttons" style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                    <Link
                        href={route('register')}
                        className="btn-premium"
                        style={{
                            padding: '1.1rem 2.8rem',
                            fontSize: '1.1rem'
                        }}
                    >
                        Start Building Free →
                    </Link>
                    <Link
                        href={route('pricing')}
                        style={{
                            background: 'rgba(255,255,255,0.03)',
                            color: 'white',
                            padding: '1.1rem 2.8rem',
                            fontSize: '1.1rem',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            fontWeight: '600',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
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
            <section style={{ padding: '6rem 5%', background: '#080a11', position: 'relative' }}>
                <h2 style={{ fontSize: '3rem', fontWeight: '800', textAlign: 'center', marginBottom: '1.5rem', background: premiumGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Simple, Transparent Pricing
                </h2>
                <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '3rem', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                    Choose the plan that's right for you. Start free and upgrade to unlock premium features.
                </p>

                {/* Billing Toggle */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginBottom: '4rem'
                }}>
                    <span style={{ color: billingCycle === 'monthly' ? '#fff' : '#94a3b8', fontWeight: '600' }}>Monthly</span>
                    <button
                        onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                        style={{
                            width: '56px',
                            height: '28px',
                            background: '#1e293b',
                            borderRadius: '20px',
                            position: 'relative',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background 0.3s'
                        }}
                    >
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: '#0ea5e9',
                            borderRadius: '50%',
                            position: 'absolute',
                            top: '3px',
                            left: billingCycle === 'monthly' ? '3px' : '31px',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: '0 0 10px rgba(14, 165, 233, 0.5)'
                        }} />
                    </button>
                    <span style={{ color: billingCycle === 'yearly' ? '#fff' : '#94a3b8', fontWeight: '600' }}>
                        Yearly
                    </span>
                    {billingCycle === 'yearly' && (
                        <span style={{
                            background: 'rgba(34, 197, 94, 0.15)',
                            color: '#4ade80',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            border: '1px solid rgba(34, 197, 94, 0.2)'
                        }}>
                            SAVE 20%
                        </span>
                    )}
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2.5rem',
                    maxWidth: '1000px',
                    margin: '0 auto',
                    padding: '1rem'
                }}>
                    {/* Free Plan */}
                    <div className="glass-card" style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>{free.name}</h3>
                        <div style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                            ₹{free.price}
                        </div>
                        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Always free to get started</p>
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2.5rem', flexGrow: 1 }}>
                            {free.features.map((item, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#cbd5e1' }}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="10" cy="10" r="10" fill="rgba(148, 163, 184, 0.1)" />
                                        <path d="M6 10L9 13L14 7" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Link
                            href={route('register')}
                            style={{
                                display: 'block',
                                textAlign: 'center',
                                padding: '1rem',
                                background: 'transparent',
                                border: '2px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                color: '#f8fafc',
                                textDecoration: 'none',
                                fontWeight: '600',
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#94a3b8'; }}
                            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                        >
                            {free.cta}
                        </Link>
                    </div>

                    {/* Pro Plan */}
                    <div className="glass-card" style={{
                        border: '2px solid #0ea5e9',
                        position: 'relative',
                        transform: 'scale(1.05)',
                        boxShadow: '0 20px 50px rgba(14, 165, 233, 0.15)',
                        display: 'flex',
                        flexDirection: 'column',
                        zIndex: 1
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '-14px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: premiumGradient,
                            color: 'white',
                            padding: '0.4rem 1.2rem',
                            borderRadius: '20px',
                            fontSize: '0.8125rem',
                            fontWeight: '800',
                            whiteSpace: 'nowrap',
                            boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)'
                        }}>
                            {billingCycle === 'yearly' ? 'MOST POPULAR' : 'BEST VALUE'}
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>{pro.name}</h3>
                        <div style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '0.25rem' }}>
                            ₹{currentProPrice}<span style={{ fontSize: '1.25rem', fontWeight: '500', color: '#94a3b8' }}>{periodLabel}</span>
                        </div>
                        {billingCycle === 'yearly' && (
                            <p style={{ color: '#4ade80', fontSize: '0.94rem', fontWeight: '600', marginBottom: '2rem' }}>
                                Save ₹{savings} (2 months free)
                            </p>
                        )}
                        {billingCycle === 'monthly' && (
                            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Billed monthly</p>
                        )}
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2.5rem', flexGrow: 1 }}>
                            {pro.features.map((item, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#f8fafc' }}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="10" cy="10" r="10" fill="rgba(14, 165, 233, 0.2)" />
                                        <path d="M6 10L9 13L14 7" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Link
                            href={route('register')}
                            className="btn-premium"
                            style={{
                                display: 'block',
                                textAlign: 'center',
                                padding: '1.1rem'
                            }}
                        >
                            {pro.cta}
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                padding: '6rem 5%',
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)',
                borderTop: '1px solid rgba(255,255,255,0.05)'
            }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>
                    Ready to Build Your Portfolio?
                </h2>
                <p style={{ fontSize: '1.25rem', color: '#94a3b8', marginBottom: '2.5rem' }}>
                    Join thousands of professionals showcasing their work
                </p>
                <Link
                    href={route('register')}
                    className="btn-premium"
                    style={{
                        display: 'inline-block',
                        padding: '1.1rem 3.5rem',
                        fontSize: '1.125rem'
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
