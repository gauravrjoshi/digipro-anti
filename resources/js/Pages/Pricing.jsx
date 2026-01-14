import React, { useState } from 'react';
import { usePage, router, Link } from '@inertiajs/react';

const Pricing = () => {
    const { auth } = usePage().props;
    const [loading, setLoading] = useState(false);

    const handleSubscribe = () => {
        if (!auth.user) {
            router.visit(route('login'));
            return;
        }

        setLoading(true);
        // We call the API endpoint which now returns an Inertia external redirect
        router.post(route('subscription.checkout'), {}, {
            onFinish: () => setLoading(false),
            onError: () => {
                alert('Failed to start checkout. Please try again.');
                setLoading(false);
            }
        });
    };

    const isSubscribed = auth.user?.is_subscribed;

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '4rem 2rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
                        Choose Your Plan
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)' }}>
                        Create a stunning portfolio that stands out
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
                    {/* Free Plan */}
                    <div style={{
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '20px',
                        padding: '2rem',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: 'white'
                    }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Free</h3>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                            $0<span style={{ fontSize: '1rem', fontWeight: 'normal' }}>/month</span>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>✓ Basic Portfolio</li>
                            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>✓ Up to 5 projects</li>
                            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>✓ Standard theme</li>
                            <li style={{ padding: '0.5rem 0' }}>✓ yoursit.com/username</li>
                        </ul>
                        <button
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'rgba(255,255,255,0.2)',
                                border: 'none',
                                borderRadius: '10px',
                                color: 'white',
                                cursor: 'not-allowed',
                                fontSize: '1rem'
                            }}
                            disabled
                        >
                            {auth.user && !isSubscribed ? 'Current Plan' : 'Free Plan'}
                        </button>
                    </div>

                    {/* Pro Plan */}
                    <div style={{
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        borderRadius: '20px',
                        padding: '2rem',
                        border: '2px solid white',
                        color: 'white',
                        transform: 'scale(1.05)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
                    }}>
                        <div style={{
                            background: 'rgba(255,255,255,0.3)',
                            display: 'inline-block',
                            padding: '0.25rem 1rem',
                            borderRadius: '20px',
                            fontSize: '0.875rem',
                            marginBottom: '1rem'
                        }}>
                            MOST POPULAR
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Pro</h3>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                            $10<span style={{ fontSize: '1rem', fontWeight: 'normal' }}>/month</span>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>✓ Custom Domain Support</li>
                            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>✓ Unlimited Projects</li>
                            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>✓ Advanced Themes</li>
                            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>✓ Premium Analytics</li>
                            <li style={{ padding: '0.5rem 0' }}>✓ Priority Support</li>
                        </ul>
                        <button
                            onClick={handleSubscribe}
                            disabled={loading || isSubscribed}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'white',
                                border: 'none',
                                borderRadius: '10px',
                                color: '#f5576c',
                                cursor: loading || isSubscribed ? 'not-allowed' : 'pointer',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                opacity: loading || isSubscribed ? 0.6 : 1
                            }}
                        >
                            {isSubscribed ? 'Already Subscribed' : loading ? 'Redirecting to Stripe...' : 'Upgrade Now'}
                        </button>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <Link
                        href={auth.user ? route('dashboard') : route('register')}
                        style={{
                            display: 'inline-block',
                            padding: '0.75rem 2rem',
                            background: 'rgba(255,255,255,0.2)',
                            border: '1px solid white',
                            borderRadius: '10px',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            textDecoration: 'none'
                        }}
                    >
                        {auth.user ? 'Back to Dashboard' : 'Sign Up for Free'}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
