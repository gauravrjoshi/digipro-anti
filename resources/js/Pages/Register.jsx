import React from 'react';
import { useForm, Link } from '@inertiajs/react';

const Register = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2.5rem', borderRadius: '20px', width: '100%', maxWidth: '450px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        <img src="/images/sw-logo.png" alt="SW Logo" style={{ height: '40px', width: 'auto' }} />
                        <span style={{ color: 'white', background: 'linear-gradient(135deg, #2196F3 0%, #FF9800 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            DigiPro
                        </span>
                    </div>
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'white' }}>Create Account</h2>
                <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Start building your portfolio today</p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e2e8f0', fontWeight: '500' }}>Full Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                            placeholder="John Doe"
                        />
                        {errors.name && <div style={{ color: '#f87171', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.name}</div>}
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e2e8f0', fontWeight: '500' }}>Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                            placeholder="john@example.com"
                        />
                        {errors.email && <div style={{ color: '#f87171', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.email}</div>}
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e2e8f0', fontWeight: '500' }}>Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            minLength={8}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                            placeholder="••••••••"
                        />
                        {errors.password && <div style={{ color: '#f87171', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.password}</div>}
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e2e8f0', fontWeight: '500' }}>Confirm Password</label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                            minLength={8}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: 'linear-gradient(135deg, #2196F3 0%, #FF9800 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: processing ? 'not-allowed' : 'pointer',
                            opacity: processing ? 0.7 : 1
                        }}
                    >
                        {processing ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#94a3b8' }}>
                    Already have an account?{' '}
                    <Link href="/login" style={{ color: '#2196F3', fontWeight: '500', textDecoration: 'none' }}>
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
