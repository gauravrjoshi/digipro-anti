import React from 'react';
import { Head } from '@inertiajs/react';

export default function Support() {
    return (
        <div>
            <Head title="Support - SW DigiPro" />

            <div style={{ padding: '6rem 5% 4rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1 className="text-premium" style={{
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        marginBottom: '2rem'
                    }}>
                        Contact Support
                    </h1>

                    <div style={{
                        background: 'rgba(255,255,255,0.03)',
                        padding: '2.5rem',
                        borderRadius: '20px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        marginBottom: '3rem'
                    }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Get in Touch</h2>
                        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: '1.7' }}>
                            We are here to help you with any questions or issues you may have. Please reach out to us using the contact details below.
                        </p>

                        <div style={{ display: 'grid', gap: '2rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#fff' }}>Registered Company Address</h3>
                                <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                                    {import.meta.env.VITE_COMPANY_ADDRESS}<br />
                                </p>
                            </div>

                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#fff' }}>Contact Number</h3>
                                <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                                    {import.meta.env.VITE_COMPANY_PHONE}
                                </p>
                            </div>

                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#fff' }}>Email</h3>
                                <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                                    {import.meta.env.VITE_COMPANY_EMAIL}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
