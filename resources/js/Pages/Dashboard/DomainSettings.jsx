import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { usePage, router } from '@inertiajs/react';
import DashboardLayout from '../../Layouts/DashboardLayout';

const DomainSettings = () => {
    const { auth } = usePage().props;
    const [domains, setDomains] = useState([]);
    const [newDomain, setNewDomain] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const isSubscribed = auth.user?.is_subscribed;

    useEffect(() => {
        fetchDomains();
    }, []);

    const fetchDomains = async () => {
        try {
            const { data } = await axios.get(route('domains.index'));
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

        if (!isSubscribed) {
            setError('Custom domains require a Pro subscription. Please upgrade to continue.');
            return;
        }

        try {
            await axios.post(route('domains.store'), { domain: newDomain });
            setNewDomain('');
            fetchDomains();
        } catch (err) {
            setError(err.response?.data?.errors?.domain?.[0] || err.response?.data?.error || 'Failed to add domain');
        }
    };

    const handleVerify = async (domainId) => {
        try {
            const { data } = await axios.post(route('domains.verify', { id: domainId }));
            alert(data.message);
            fetchDomains();
        } catch (err) {
            alert('Verification failed. Please try again.');
        }
    };

    const handleDelete = async (domainId) => {
        if (!confirm('Are you sure you want to remove this domain?')) return;

        try {
            await axios.delete(route('domains.destroy', { id: domainId }));
            fetchDomains();
        } catch (err) {
            alert('Failed to delete domain');
        }
    };

    if (loading) {
        return <div style={{ color: '#94a3b8' }}>Loading domain configuration...</div>;
    }

    return (
        <div>
            <div style={{ marginBottom: '2.5rem' }}>
                <h2 className="text-premium" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Custom Domains</h2>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.25rem' }}>Connect your own domain to your portfolio</p>
            </div>

            {!isSubscribed && (
                <div style={{ background: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(251, 191, 36, 0.2)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>⚠️</span>
                    <div>
                        <strong>Pro Feature:</strong> Custom domains are only available on the Pro plan.
                        <a href="/pricing" style={{ color: '#fbbf24', fontWeight: 'bold', marginLeft: '0.5rem', textDecoration: 'none', borderBottom: '2px solid rgba(251, 191, 36, 0.3)' }}>Upgrade now →</a>
                    </div>
                </div>
            )}

            {/* Add Domain Form */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'white' }}>Add New Domain</h3>
                <form onSubmit={handleAddDomain} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '280px' }}>
                        <input
                            type="text"
                            value={newDomain}
                            onChange={(e) => setNewDomain(e.target.value)}
                            placeholder="e.g. yourportfolio.com"
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '10px',
                                color: 'white',
                                outline: 'none',
                                transition: 'all 0.2s'
                            }}
                            className="premium-input-refinement"
                            disabled={!isSubscribed}
                        />
                        {error && <div style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.5rem' }}>{error}</div>}
                    </div>
                    <button
                        type="submit"
                        disabled={!isSubscribed || !newDomain}
                        className={isSubscribed ? "btn-premium" : ""}
                        style={!isSubscribed ? {
                            padding: '0.8rem 2rem',
                            background: 'rgba(255,255,255,0.1)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: 'not-allowed',
                            fontWeight: 'bold',
                            opacity: 0.5
                        } : {}}
                    >
                        {isSubscribed ? 'Add Domain' : 'Upgrade to Add'}
                    </button>
                </form>
            </div>

            {/* Domains List */}
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'white' }}>Connected Domains</h3>
            {domains.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px' }}>
                    <p style={{ color: '#64748b' }}>No custom domains added yet.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {domains.map((domain) => (
                        <div key={domain.id} style={{
                            padding: '2rem',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '16px',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                                <div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '0.75rem' }}>
                                        {domain.domain}
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '20px',
                                            fontSize: '0.75rem',
                                            background: domain.verified ? 'rgba(74, 222, 128, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            color: domain.verified ? '#4ade80' : '#f87171',
                                            border: `1px solid ${domain.verified ? 'rgba(74, 222, 128, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
                                        }}>
                                            {domain.verified ? '✓ Verified' : '⚠ Action Required'}
                                        </span>
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '20px',
                                            fontSize: '0.75rem',
                                            background: domain.dns_configured ? 'rgba(59, 130, 246, 0.1)' : 'rgba(251, 191, 36, 0.1)',
                                            color: domain.dns_configured ? '#60a5fa' : '#fbbf24',
                                            border: `1px solid ${domain.dns_configured ? 'rgba(59, 130, 246, 0.2)' : 'rgba(251, 191, 36, 0.2)'}`
                                        }}>
                                            {domain.dns_configured ? 'DNS Active' : 'DNS Pending'}
                                        </span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <button
                                        onClick={() => handleVerify(domain.id)}
                                        style={{ padding: '0.6rem 1.25rem', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.875rem', transition: 'all 0.2s' }}
                                        onMouseOver={e => e.target.style.filter = 'brightness(1.1)'}
                                        onMouseOut={e => e.target.style.filter = 'none'}
                                    >
                                        Check Status
                                    </button>
                                    <button
                                        onClick={() => handleDelete(domain.id)}
                                        style={{ padding: '0.6rem 1.25rem', background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '10px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 'bold', transition: 'all 0.2s' }}
                                        onMouseOver={e => e.target.style.background = 'rgba(239, 68, 68, 0.2)'}
                                        onMouseOut={e => e.target.style.background = 'rgba(239, 68, 68, 0.1)'}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>

                            {/* DNS Instructions */}
                            {!domain.verified && (
                                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', fontSize: '0.9rem' }}>
                                    <div style={{ fontWeight: 'bold', marginBottom: '1rem', color: '#e2e8f0' }}>📋 Configuration Guide</div>
                                    <div style={{ marginBottom: '1.25rem' }}>
                                        <p style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>1. Add an A Record to point your domain to our server:</p>
                                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '8px', fontFamily: 'monospace', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            Type: A | Name: @ | Value: 127.0.0.1 (Local)
                                        </div>
                                    </div>
                                    <div>
                                        <p style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>2. Add a TXT Record to verify ownership:</p>
                                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '8px', fontFamily: 'monospace', border: '1px solid rgba(255,255,255,0.05)', wordBreak: 'break-all' }}>
                                            Type: TXT | Name: _portfolio-verify | Value: {domain.verification_token}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

DomainSettings.layout = page => <DashboardLayout children={page} />;

export default DomainSettings;
