import React from 'react';
import { Head } from '@inertiajs/react';

export default function PrivacyPolicy() {
    return (
        <div>
            <Head title="Privacy Policy - SW DigiPro" />

            <div style={{ padding: '6rem 5% 4rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1 className="text-premium" style={{
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        marginBottom: '2rem'
                    }}>
                        Privacy Policy
                    </h1>

                    <div style={{
                        background: 'rgba(255,255,255,0.03)',
                        padding: '2.5rem',
                        borderRadius: '20px',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <div style={{ color: '#94a3b8', lineHeight: '1.8' }}>
                            <p style={{ marginBottom: '1.5rem' }}>Last updated: {new Date().toLocaleDateString()}</p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#white', marginTop: '2rem' }}>1. Information We Collect</h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                We collect information you provide directly to us when you create an account, update your profile, or communicate with us. This may include your name, email address, phone number, and payment information.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#white', marginTop: '2rem' }}>2. How We Use Information</h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to communicate with you about products, services, offers, and events.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#white', marginTop: '2rem' }}>3. Disclosure of Information</h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                We may share your information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf. We do not sell your personal information to third parties.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#white', marginTop: '2rem' }}>4. Security</h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#white', marginTop: '2rem' }}>5. Contact Us</h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                If you have any questions about this Privacy Policy, please contact us at {import.meta.env.VITE_COMPANY_EMAIL}.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
