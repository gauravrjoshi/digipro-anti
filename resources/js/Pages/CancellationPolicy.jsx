import React from 'react';
import { Head } from '@inertiajs/react';

export default function CancellationPolicy() {
    return (
        <div>
            <Head title="Cancellation & Refund Policy - SW DigiPro" />

            <div style={{ padding: '6rem 5% 4rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1 className="text-premium" style={{
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        marginBottom: '2rem'
                    }}>
                        Cancellation & Refund Policy
                    </h1>

                    <div style={{
                        background: 'rgba(255,255,255,0.03)',
                        padding: '2.5rem',
                        borderRadius: '20px',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <div style={{ color: '#94a3b8', lineHeight: '1.8' }}>
                            <p style={{ marginBottom: '1.5rem' }}>Last updated: {new Date().toLocaleDateString()}</p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#white', marginTop: '2rem' }}>1. Subscription Cancellation</h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                You may cancel your subscription at any time by visiting your account settings or contacting our support team. Your cancellation will take effect at the end of the current billing cycle.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#white', marginTop: '2rem' }}>2. Refund Policy</h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                We offer a 100% money-back guarantee for payments made within the last 7 days. If you are not satisfied with our service, please contact us within 7 days of your purchase to request a full refund.
                            </p>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Refunds for subscriptions cancelled after 7 days will be processed on a pro-rata basis for the remaining, unused period of the subscription, subject to our discretion.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#white', marginTop: '2rem' }}>3. Processing of Refunds</h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Approved refunds will be processed within 5-7 business days and credited back to the original method of payment.
                            </p>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#white', marginTop: '2rem' }}>4. Contact Us</h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                If you have any questions about our Cancellation and Refund Policy, please contact us at {import.meta.env.VITE_COMPANY_EMAIL}.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
