import React, { useEffect } from 'react';
import { useForm, Head } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.update'));
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
            <Head title="Reset Password" />
            <div className="glass-card" style={{ padding: '2.5rem', width: '100%', maxWidth: '400px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        <img src="/images/sw-logo.png" alt="SW Logo" style={{ height: '40px', width: 'auto' }} />
                        <span style={{ color: 'white', background: 'linear-gradient(135deg, #2196F3 0%, #FF9800 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            DigiPro
                        </span>
                    </div>
                </div>
                <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', color: 'white', fontSize: '1.875rem', fontWeight: 'bold' }}>Set New Password</h2>

                <form onSubmit={submit}>
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

                    <div style={{ marginBottom: '1.25rem' }}>
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
                            autoFocus
                        />
                        {errors.password && <div style={{ color: '#f87171', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.password}</div>}
                    </div>

                    <div style={{ marginBottom: '1.75rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e2e8f0', fontWeight: '500' }}>Confirm Password</label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
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
                        {errors.password_confirmation && <div style={{ color: '#f87171', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.password_confirmation}</div>}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
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
                                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                                opacity: processing ? 0.7 : 1
                            }}
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
