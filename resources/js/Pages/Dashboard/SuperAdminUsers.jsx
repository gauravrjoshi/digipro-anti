import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../../Layouts/DashboardLayout';

const SuperAdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        active_subs: 0,
        trialing: 0
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get(route('admin.users'));
            setUsers(data.users || []);
            setStats({
                total: data.total_users || 0,
                active_subs: data.active_subscriptions || 0,
                trialing: 0
            });
        } catch (error) {
            console.error('Failed to fetch users', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div style={{ color: '#94a3b8' }}>Loading user directory...</div>;

    return (
        <div>
            <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>User Management</h2>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.25rem' }}>Overview of all registered users and their status</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <StatCard title="Total Users" value={stats.total} color="#667eea" />
                <StatCard title="Active Pro Subs" value={stats.active_subs} color="#4ade80" />
                <StatCard title="New This Week" value="5" color="#f5576c" />
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <th style={thStyle}>User</th>
                            <th style={thStyle}>Portfolio</th>
                            <th style={thStyle}>Status</th>
                            <th style={thStyle}>Joined</th>
                            <th style={thStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                <td style={tdStyle}>
                                    <div style={{ fontWeight: '600' }}>{user.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{user.email}</div>
                                </td>
                                <td style={tdStyle}>
                                    {user.portfolio_slug ? (
                                        <a href={`/${user.portfolio_slug}`} target="_blank" style={{ color: '#667eea', textDecoration: 'none' }}>
                                            {user.portfolio_slug} ↗
                                        </a>
                                    ) : <span style={{ color: '#475569' }}>None</span>}
                                </td>
                                <td style={tdStyle}>
                                    <span style={{
                                        padding: '0.2rem 0.6rem',
                                        borderRadius: '20px',
                                        fontSize: '0.7rem',
                                        background: user.subscription_status === 'Active' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(255,255,255,0.05)',
                                        color: user.subscription_status === 'Active' ? '#4ade80' : '#94a3b8'
                                    }}>
                                        {user.subscription_status}
                                    </span>
                                </td>
                                <td style={tdStyle}>{user.registered_at}</td>
                                <td style={tdStyle}>
                                    <button style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, color }) => (
    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{title}</p>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: color }}>{value}</h3>
    </div>
);

const thStyle = { padding: '1.25rem 1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b' };
const tdStyle = { padding: '1.25rem 1.5rem', fontSize: '0.9rem' };

SuperAdminUsers.layout = page => <DashboardLayout children={page} />;

export default SuperAdminUsers;
