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
    const siteDescription = "Create a stunning portfolio website without coding. Showcase your projects, skills, and experience with our powerful SaaS platform.";
    const ogImage = `${appUrl}/images/sw-logo.png`;

    return (
        <div style={{ minHeight: '100vh', background: '#0f172a', color: 'white' }}>
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
            {/* Navigation */}
            <nav className="nav-container">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    <img src="/images/sw-logo.png" alt="SW Logo" style={{ height: '40px', width: 'auto' }} />
                    <span style={{ background: 'linear-gradient(135deg, #2196F3 0%, #FF9800 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        DigiPro
                    </span>
                </div>
                <div className="nav-links">
                    <Link href={route('pricing')} style={{ color: '#94a3b8', textDecoration: 'none', padding: '0.5rem 1rem' }}>
                        Pricing
                    </Link>
                    <Link href={route('login')} style={{ color: '#94a3b8', textDecoration: 'none', padding: '0.5rem 1rem' }}>
                        Login
                    </Link>
                    <Link
                        href={route('register')}
                        style={{
                            background: 'linear-gradient(135deg, #2196F3 0%, #FF9800 100%)',
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
            <section className="hero-section">
                <h1 className="hero-title">
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
                <div className="hero-buttons" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link
                        href={route('register')}
                        style={{
                            background: 'linear-gradient(135deg, #2196F3 0%, #FF9800 100%)',
                            color: 'white',
                            padding: '1rem 2.5rem',
                            fontSize: '1.125rem',
                            borderRadius: '12px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: '600',
                            textDecoration: 'none',
                            boxShadow: '0 10px 30px rgba(33, 150, 243, 0.3)'
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
                <h2 style={{ fontSize: '3rem', fontWeight: '800', textAlign: 'center', marginBottom: '1.5rem', background: 'linear-gradient(to right, #60a5fa, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
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
                            background: '#334155',
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
                            background: '#60a5fa',
                            borderRadius: '50%',
                            position: 'absolute',
                            top: '3px',
                            left: billingCycle === 'monthly' ? '3px' : '31px',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }} />
                    </button>
                    <span style={{ color: billingCycle === 'yearly' ? '#fff' : '#94a3b8', fontWeight: '600' }}>
                        Yearly
                    </span>
                    {billingCycle === 'yearly' && (
                        <span style={{
                            background: 'rgba(34, 197, 94, 0.2)',
                            color: '#4ade80',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold'
                        }}>
                            SAVE ₹189
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
                    <div style={{
                        background: '#1e293b',
                        padding: '2.5rem',
                        borderRadius: '24px',
                        border: '1px solid #334155',
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
                                        <circle cx="10" cy="10" r="10" fill="#334155" />
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
                                border: '2px solid #334155',
                                borderRadius: '12px',
                                color: '#f8fafc',
                                textDecoration: 'none',
                                fontWeight: '600',
                                transition: 'all 0.2s'
                            }}
                        >
                            {free.cta}
                        </Link>
                    </div>

                    {/* Pro Plan */}
                    <div style={{
                        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                        padding: '2.5rem',
                        borderRadius: '24px',
                        border: '2px solid #60a5fa',
                        position: 'relative',
                        transform: 'scale(1.05)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        zIndex: 1
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '-14px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: '#60a5fa',
                            color: '#0f172a',
                            padding: '0.4rem 1.2rem',
                            borderRadius: '20px',
                            fontSize: '0.875rem',
                            fontWeight: '800',
                            whiteSpace: 'nowrap'
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
                                        <circle cx="10" cy="10" r="10" fill="#60a5fa" />
                                        <path d="M6 10L9 13L14 7" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                                padding: '1.1rem',
                                background: '#60a5fa',
                                borderRadius: '12px',
                                color: '#0f172a',
                                textDecoration: 'none',
                                fontWeight: '800',
                                transition: 'all 0.2s'
                            }}
                        >
                            {pro.cta}
                        </Link>
                        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8', marginTop: '1rem' }}>
                            Upgrade Anytime – No Credit Card Required
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                padding: '4rem 5%',
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(255, 152, 0, 0.1) 100%)'
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
                        background: 'linear-gradient(135deg, #2196F3 0%, #FF9800 100%)',
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
