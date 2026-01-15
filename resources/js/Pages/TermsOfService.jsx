import React from 'react';
import { Head } from '@inertiajs/react';

export default function TermsOfService() {
    return (
        <div>
            <Head title="Terms of Service - SW DigiPro" />

            <div style={{ padding: '6rem 5% 4rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1 className="text-premium" style={{
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        marginBottom: '2rem'
                    }}>
                        Terms of Service
                    </h1>

                    <div style={{
                        background: 'rgba(255,255,255,0.03)',
                        padding: '2.5rem',
                        borderRadius: '20px',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <div style={{ color: '#94a3b8', lineHeight: '1.8' }}>
                            <p style={{ marginBottom: '1.5rem' }}>Last updated: {new Date().toLocaleDateString()}</p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#white', marginTop: '2rem' }}>1. Introduction</h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Welcome to SW DigiPro ("we," "our," or "us"). By accessing or using our website and services, you agree to be bound by these Terms of Service.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#white', marginTop: '2rem' }}>2. Use of Service</h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                You agree to use our platform for lawful purposes only. You must not use our service to transmit any malicious code or content that infringes upon the rights of others.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#white', marginTop: '2rem' }}>3. Accounts</h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                When you create an account with us, you must provide accurate and complete information. You are responsible for safeguarding the password that you use to access the service.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#white', marginTop: '2rem' }}>4. Cancellation and Refunds</h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Please refer to our separate <a href="/cancellation" style={{ color: '#667eea', textDecoration: 'none' }}>Cancellation & Refund Policy</a> for details regarding subscription cancellations and refund eligibility.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#white', marginTop: '2rem' }}>5. Limitation of Liability</h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                In no event shall SW DigiPro, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
