import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSubscription } from '../../context/SubscriptionContext';

const DomainSettings = () => {
    const [domains, setDomains] = useState([]);
    const [newDomain, setNewDomain] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { subscriptionStatus } = useSubscription();

    useEffect(() => {
        fetchDomains();
    }, []);

    const fetchDomains = async () => {
        try {
            const { data } = await axios.get('/api/domains');
            setDomains(data);
        } catch (err) {
            console.error('Failed to fetch domains', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddDomain = async (e) => {
        e.preventDefault();
        setError('');

        if (!subscriptionStatus?.subscribed) {
            setError('Custom domains require a Pro subscription. Please upgrade to continue.');
            return;
        }

        try {
            await axios.post('/api/domains', { domain: newDomain });
            setNewDomain('');
            fetchDomains();
        } catch (err) {
            setError(err.response?.data?.errors?.domain?.[0] || err.response?.data?.error || 'Failed to add domain');
        }
    };

    const handleVerify = async (domainId) => {
        try {
            const { data } = await axios.post(`/api/domains/${domainId}/verify`);
            alert(data.message);
            fetchDomains();
        } catch (err) {
            alert('Verification failed. Please try again.');
        }
    };

    const handleDelete = async (domainId) => {
        if (!confirm('Are you sure you want to remove this domain?')) return;

        try {
            await axios.delete(`/api/domains/${domainId}`);
            fetchDomains();
        } catch (err) {
            alert('Failed to delete domain');
        }
    };

    if (loading) {
        return <div style={{ padding: '2rem' }}>Loading...</div>;
    }

    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Custom Domains</h1>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                Connect your own domain to your portfolio (Pro feature)
            </p>

            {/* Add Domain Form */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Add Custom Domain</h2>

                {!subscriptionStatus?.subscribed && (
                    <div style={{ background: '#fef3c7', color: '#92400e', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                        ⚠️ Custom domains are a Pro feature. <a href="/pricing" style={{ color: '#92400e', fontWeight: 'bold' }}>Upgrade now</a>
                    </div>
                )}

                <form onSubmit={handleAddDomain} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                        <input
                            type="text"
                            value={newDomain}
                            onChange={(e) => setNewDomain(e.target.value)}
                            placeholder="yourdomain.com"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '2px solid #e5e7eb',
                                borderRadius: '8px',
                                fontSize: '1rem'
                            }}
                            disabled={!subscriptionStatus?.subscribed}
                        />
                        {error && <div style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.5rem' }}>{error}</div>}
                    </div>
                    <button
                        type="submit"
                        disabled={!subscriptionStatus?.subscribed || !newDomain}
                        style={{
                            padding: '0.75rem 2rem',
                            background: subscriptionStatus?.subscribed ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#9ca3af',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: subscriptionStatus?.subscribed ? 'pointer' : 'not-allowed',
                            fontWeight: '600'
                        }}
                    >
                        Add Domain
                    </button>
                </form>
            </div>

            {/* Domains List */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Your Domains</h2>

                {domains.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
                        No custom domains added yet
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {domains.map((domain) => (
                            <div key={domain.id} style={{
                                padding: '1.5rem',
                                background: '#f9fafb',
                                borderRadius: '12px',
                                border: '1px solid #e5e7eb'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div>
                                        <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                                            {domain.domain}
                                        </div>
                                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '12px',
                                                background: domain.verified ? '#d1fae5' : '#fee2e2',
                                                color: domain.verified ? '#065f46' : '#991b1b',
                                                fontWeight: '500'
                                            }}>
                                                {domain.verified ? '✓ Verified' : '⚠ Not Verified'}
                                            </span>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '12px',
                                                background: domain.dns_configured ? '#dbeafe' : '#fef3c7',
                                                color: domain.dns_configured ? '#1e40af' : '#92400e',
                                                fontWeight: '500'
                                            }}>
                                                {domain.dns_configured ? 'DNS OK' : 'DNS Pending'}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            onClick={() => handleVerify(domain.id)}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                background: '#3b82f6',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                fontSize: '0.875rem'
                                            }}
                                        >
                                            Verify
                                        </button>
                                        <button
                                            onClick={() => handleDelete(domain.id)}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                background: '#ef4444',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                fontSize: '0.875rem'
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                {/* DNS Instructions */}
                                {!domain.verified && (
                                    <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', fontSize: '0.875rem' }}>
                                        <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                                            📋 DNS Configuration Required:
                                        </div>
                                        <div style={{ marginBottom: '0.75rem' }}>
                                            <strong>1. Add A Record:</strong>
                                            <div style={{ background: '#f3f4f6', padding: '0.5rem', borderRadius: '4px', marginTop: '0.25rem', fontFamily: 'monospace' }}>
                                                Type: A<br />
                                                Name: @ (or www)<br />
                                                Value: YOUR_SERVER_IP
                                            </div>
                                        </div>
                                        <div>
                                            <strong>2. Add TXT Record for Verification:</strong>
                                            <div style={{ background: '#f3f4f6', padding: '0.5rem', borderRadius: '4px', marginTop: '0.25rem', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                                                Type: TXT<br />
                                                Name: _portfolio-verify<br />
                                                Value: {domain.verification_token}
                                            </div>
                                        </div>
                                        <div style={{ marginTop: '0.75rem', color: '#6b7280' }}>
                                            💡 DNS changes can take up to 48 hours to propagate. Click "Verify" after adding these records.
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DomainSettings;
