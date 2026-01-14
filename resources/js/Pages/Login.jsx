import React from 'react';
import { useForm, Link } from '@inertiajs/react';

const Login = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
            <div className="glass-card" style={{ padding: '2.5rem', width: '100%', maxWidth: '400px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        <img src="/images/sw-logo.png" alt="SW Logo" style={{ height: '40px', width: 'auto' }} />
                        <span style={{ color: 'white', background: 'linear-gradient(135deg, #2196F3 0%, #FF9800 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            DigiPro
                        </span>
                    </div>
                </div>
                <h2 style={{ marginBottom: '0.5rem', textAlign: 'center', color: 'white', fontSize: '1.875rem', fontWeight: 'bold' }}>Login</h2>
                <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '2rem' }}>Welcome back to your portfolio</p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e2e8f0', fontWeight: '500' }}>Email Address</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'white',
                                outline: 'none'
                            }}
                            required
                        />
                        {errors.email && <div style={{ color: '#f87171', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.email}</div>}
                    </div>
                    <div style={{ marginBottom: '1.75rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e2e8f0', fontWeight: '500' }}>Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'white',
                                outline: 'none'
                            }}
                            required
                        />
                        {errors.password && <div style={{ color: '#f87171', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.password}</div>}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.25rem' }}>
                        <Link href={route('password.request')} style={{ color: '#2196F3', textDecoration: 'none', fontSize: '0.875rem' }}>
                            Forgot your password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        style={{
                            width: '100%',
                            padding: '0.875rem',
                            borderRadius: '8px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #2196F3 0%, #FF9800 100%)',
                            color: 'white',
                            fontWeight: 'bold',
                            cursor: processing ? 'not-allowed' : 'pointer',
                            boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                            opacity: processing ? 0.7 : 1
                        }}
                    >
                        {processing ? 'Logging in...' : 'Login'}
                    </button>

                    <div style={{ marginTop: '1.5rem', textAlign: 'center', color: '#94a3b8' }}>
                        Don't have an account? {' '}
                        <Link href="/register" style={{ color: '#2196F3', textDecoration: 'none', fontWeight: '500' }}>
                            Sign Up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
