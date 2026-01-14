import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SuperAdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get('/api/admin/users');
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) {
        return <div style={{ padding: '2rem' }}>Loading users...</div>;
    }

    const subscribedCount = users.filter(u => u.subscription_status?.subscribed).length;
    const freeCount = users.filter(u => !u.subscription_status?.subscribed && !u.subscription_status?.on_trial).length;
    const portfolioCount = users.filter(u => u.portfolio).length;

    return (
        <div style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem' }}>
                User Management ({users.length} total)
            </h2>

            {/* Statistics Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '12px', color: 'white' }}>
                    <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Total Users</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginTop: '0.5rem' }}>{users.length}</div>
                </div>
                <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '12px', color: 'white' }}>
                    <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Active Subscribers</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginTop: '0.5rem' }}>{subscribedCount}</div>
                </div>
                <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', borderRadius: '12px', color: 'white' }}>
                    <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Free Users</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginTop: '0.5rem' }}>{freeCount}</div>
                </div>
                <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', borderRadius: '12px', color: 'white' }}>
                    <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Portfolios</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginTop: '0.5rem' }}>{portfolioCount}</div>
                </div>
            </div>

            {/* Users Table */}
            <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>User</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Portfolio</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Subscription</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Role</th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '1rem' }}>
                                    <div>
                                        <div style={{ fontWeight: '500', color: '#111827' }}>{user.name}</div>
                                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{user.email}</div>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    {user.portfolio ? (
                                        <div>
                                            <div style={{ fontWeight: '500', color: '#111827' }}>{user.portfolio.full_name}</div>
                                            <a
                                                href={`/${user.portfolio.slug}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ fontSize: '0.875rem', color: '#3b82f6', textDecoration: 'none' }}
                                            >
                                                /{user.portfolio.slug} →
                                            </a>
                                        </div>
                                    ) : (
                                        <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>No portfolio</span>
                                    )}
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    {user.subscription_status?.subscribed ? (
                                        <span style={{
                                            background: '#d1fae5',
                                            color: '#065f46',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '12px',
                                            fontSize: '0.875rem',
                                            fontWeight: '500'
                                        }}>
                                            ✓ Pro
                                        </span>
                                    ) : user.subscription_status?.on_trial ? (
                                        <span style={{
                                            background: '#fef3c7',
                                            color: '#92400e',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '12px',
                                            fontSize: '0.875rem',
                                            fontWeight: '500'
                                        }}>
                                            Trial
                                        </span>
                                    ) : (
                                        <span style={{
                                            background: '#f3f4f6',
                                            color: '#6b7280',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '12px',
                                            fontSize: '0.875rem',
                                            fontWeight: '500'
                                        }}>
                                            Free
                                        </span>
                                    )}
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    {user.is_admin ? (
                                        <span style={{
                                            background: '#dbeafe',
                                            color: '#1e40af',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '12px',
                                            fontSize: '0.875rem',
                                            fontWeight: '500'
                                        }}>
                                            Admin
                                        </span>
                                    ) : (
                                        <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>User</span>
                                    )}
                                </td>
                                <td style={{ padding: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
                                    {new Date(user.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SuperAdminUsers;
