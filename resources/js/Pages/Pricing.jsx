import React, { useState } from 'react';
import { usePage, router, Link } from '@inertiajs/react';
import { PRICING_CONFIG } from '../Config/pricing';

const Pricing = () => {
    const { auth } = usePage().props;
    const [loading, setLoading] = useState(false);
    const [billingCycle, setBillingCycle] = useState('yearly'); // Default to yearly

    const handleSubscribe = (planType) => {
        if (!auth.user) {
            router.visit(route('login'));
            return;
        }

        if (planType === 'free') {
            router.visit(route('dashboard'));
            return;
        }

        setLoading(true);
        router.post(route('subscription.checkout'), {
            plan: billingCycle
        }, {
            onFinish: () => setLoading(false),
            onError: (errors) => {
                console.error(errors);
                alert('Failed to start checkout. Please try again.');
                setLoading(false);
            }
        });
    };

    const isSubscribed = auth.user?.is_subscribed;
    const { free, pro } = PRICING_CONFIG;

    const currentProPrice = billingCycle === 'yearly' ? pro.yearlyPrice : pro.monthlyPrice;
    const periodLabel = billingCycle === 'yearly' ? '/ year' : '/ month';
    const savings = billingCycle === 'yearly' ? (pro.monthlyPrice * 12 - pro.yearlyPrice) : 0;

    return (
        <div style={{
            minHeight: '100vh',
            background: '#080a11',
            padding: '4rem 1rem',
            fontFamily: "'Inter', sans-serif",
            color: '#f8fafc'
        }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {/* Header Section */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="text-premium" style={{
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                        fontWeight: '800',
                        marginBottom: '1.5rem'
                    }}>
                        Simple, Transparent Pricing
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                        Build your professional portfolio in minutes. Choose the plan that works for you.
                    </p>

                    {/* Billing Toggle */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        marginBottom: '1rem'
                    }}>
                        <span style={{ color: billingCycle === 'monthly' ? '#fff' : '#94a3b8', fontWeight: '600' }}>Monthly</span>
                        <button
                            onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                            style={{
                                width: '56px',
                                height: '28px',
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: '20px',
                                position: 'relative',
                                border: '1px solid rgba(255,255,255,0.1)',
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
                                top: '2px',
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
                                SAVE 15%+
                            </span>
                        )}
                    </div>
                </div>

                {/* Pricing Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2.5rem',
                    padding: '1rem'
                }}>
                    {/* Free Plan */}
                    <div className="glass-card" style={{
                        padding: '2.5rem',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#f8fafc' }}>{free.name}</h3>
                        <div style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                            ₹{free.price}
                        </div>
                        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Always free to get started</p>

                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2.5rem', flexGrow: 1 }}>
                            {free.features.map((feature, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#cbd5e1' }}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="10" cy="10" r="10" fill="#334155" />
                                        <path d="M6 10L9 13L14 7" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => handleSubscribe('free')}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                color: '#f8fafc',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: '600',
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                            onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.03)'}
                        >
                            {auth.user && !isSubscribed ? 'Continue with Free' : free.cta}
                        </button>
                    </div>

                    {/* Pro Plan */}
                    <div className="glass-card" style={{
                        padding: '2.5rem',
                        border: '2px solid #0ea5e9',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        transform: 'scale(1.05)',
                        boxShadow: '0 25px 60px rgba(14, 165, 233, 0.15)',
                        zIndex: 1
                    }}>
                        <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)' }}>
                            <span className="bg-premium" style={{
                                color: 'white',
                                padding: '0.4rem 1.2rem',
                                borderRadius: '20px',
                                fontSize: '0.875rem',
                                fontWeight: '800',
                                whiteSpace: 'nowrap',
                                boxShadow: '0 5px 15px rgba(139, 92, 246, 0.4)'
                            }}>
                                {billingCycle === 'yearly' ? 'MOST POPULAR' : 'BEST VALUE'}
                            </span>
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
                            {pro.features.map((feature, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#f8fafc' }}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="10" cy="10" r="10" fill="rgba(14, 165, 233, 0.2)" />
                                        <path d="M6 10L9 13L14 7" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => handleSubscribe('pro')}
                            disabled={loading || isSubscribed}
                            className="btn-premium"
                            style={{
                                width: '100%',
                                opacity: loading || isSubscribed ? 0.7 : 1
                            }}
                        >
                            {isSubscribed ? 'Active Subscription' : loading ? 'Processing...' : pro.cta}
                        </button>
                        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8', marginTop: '1rem' }}>
                            Upgrade Anytime – No Credit Card Required
                        </p>
                    </div>
                </div>

                {/* Footer Links */}
                <div style={{ textAlign: 'center', marginTop: '5rem', borderTop: '1px solid #1e293b', paddingTop: '3rem' }}>
                    <Link
                        href={auth.user ? route('dashboard') : route('home')}
                        style={{
                            color: '#94a3b8',
                            textDecoration: 'none',
                            fontSize: '1rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to {auth.user ? 'Dashboard' : 'Home'}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
