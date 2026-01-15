import React from 'react';
import { useForm, Head } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#080a11' }}>
            <Head title="Forgot Password" />
            <div className="glass-card" style={{ padding: '2.5rem', width: '100%', maxWidth: '400px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        <img src="/images/sw-logo.png" alt="SW Logo" style={{ height: '32px', width: 'auto' }} />
                        <span className="text-premium">
                            DigiPro
                        </span>
                    </div>
                </div>
                <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', color: 'white', fontSize: '1.875rem', fontWeight: 'bold' }}>Reset Password</h2>

                <div style={{ marginBottom: '1.5rem', fontSize: '0.875rem', color: '#94a3b8', lineHeight: '1.5' }}>
                    Forgot your password? No problem. Just let us know your email address and we will email you a password reset link.
                </div>

                {status && <div style={{ marginBottom: '1rem', fontWeight: '500', fontSize: '0.875rem', color: '#4ade80' }}>{status}</div>}

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
                                background: 'rgba(255,255,255,0.03)',
                                color: 'white',
                                outline: 'none'
                            }}
                            required
                            autoFocus
                        />
                        {errors.email && <div style={{ color: '#f87171', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.email}</div>}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button
                            type="submit"
                            disabled={processing}
                            className="btn-premium"
                            style={{
                                width: '100%',
                                opacity: processing ? 0.7 : 1
                            }}
                        >
                            Email Password Reset Link
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
