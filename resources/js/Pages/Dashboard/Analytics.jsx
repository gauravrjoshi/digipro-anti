import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../../Layouts/DashboardLayout';

const Analytics = () => {
    const [overview, setOverview] = useState(null);
    const [viewsData, setViewsData] = useState([]);
    const [clicksData, setClicksData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [days, setDays] = useState(30);

    useEffect(() => {
        fetchAnalytics();
    }, [days]);

    const fetchAnalytics = async () => {
        try {
            const [overviewRes, viewsRes, clicksRes] = await Promise.all([
                axios.get(route('analytics.overview')),
                axios.get(route('analytics.views', { days })),
                axios.get(route('analytics.clicks'))
            ]);

            setOverview(overviewRes.data);
            setViewsData(viewsRes.data);
            setClicksData(clicksRes.data);
        } catch (error) {
            console.error('Failed to fetch analytics', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div style={{ color: '#94a3b8' }}>Loading performance data...</div>;
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 className="text-premium" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Performance Analytics</h2>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.25rem' }}>Track your portfolio engagement and visitor trends</p>
                </div>
                <select
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    style={{ padding: '0.6rem 1rem', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', outline: 'none', cursor: 'pointer' }}
                    className="premium-input-refinement"
                >
                    <option value={7}>Last 7 days</option>
                    <option value={30}>Last 30 days</option>
                    <option value={90}>Last 90 days</option>
                </select>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <StatCard title="Total Views" value={overview?.total_views || 0} sub={`${overview?.views_last_30_days || 0} recently`} color="var(--primary-color)" />
                <StatCard title="Unique Visitors" value={overview?.unique_visitors || 0} sub="Distinct audiences" color="var(--secondary-color)" />
                <StatCard title="Total Clicks" value={overview?.total_clicks || 0} sub="Links & Projects" color="#8b5cf6" />
                <StatCard title="Engagement Rate" value={`${overview?.total_views > 0 ? ((overview.total_clicks / overview.total_views) * 100).toFixed(1) : 0}%`} sub="Clicks per view" color="#10b981" />
            </div>

            {/* Main Chart */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '2rem', color: 'white' }}>Traffic Trends</h3>
                {viewsData.length > 0 ? (
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', height: '250px' }}>
                        {viewsData.map((item, index) => {
                            const maxCount = Math.max(...viewsData.map(v => v.count), 1);
                            const height = (item.count / maxCount) * 100;
                            return (
                                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                                    <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                                        <div
                                            style={{
                                                width: '100%',
                                                background: 'var(--premium-gradient)',
                                                borderRadius: '6px 6px 2px 2px',
                                                height: `${Math.max(height, 5)}%`,
                                                opacity: item.count > 0 ? 1 : 0.2,
                                                transition: 'all 0.3s ease',
                                                boxShadow: item.count > 0 ? '0 0 15px rgba(14, 165, 233, 0.2)' : 'none'
                                            }}
                                            title={`${item.count} views on ${item.date}`}
                                        />
                                    </div>
                                    <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '1rem', width: 'max-content', transform: 'rotate(-45deg)', height: '40px' }}>
                                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>No traffic data available.</div>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {/* Top Links */}
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'white' }}>Popular Engagements</h3>
                    {clicksData.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {clicksData.map((click, index) => (
                                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '10px' }}>
                                    <div style={{ overflow: 'hidden' }}>
                                        <div style={{ fontWeight: '600', color: '#e2e8f0', marginBottom: '0.2rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {click.link_label || click.link_url}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{click.link_type}</div>
                                    </div>
                                    <div style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '1.1rem' }}>{click.count}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>No clicks tracked yet.</p>
                    )}
                </div>

                {/* Referrers */}
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'white' }}>Top Referrers</h3>
                    {overview?.top_referrers?.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {overview.top_referrers.map((ref, index) => (
                                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                    <span style={{ color: '#94a3b8' }}>{ref.referrer || 'Direct'}</span>
                                    <span style={{ fontWeight: 'bold', color: 'var(--secondary-color)' }}>{ref.count}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>No referrer data available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, sub, color }) => (
    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.05)', transition: 'transform 0.3s ease', cursor: 'default' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: '500' }}>{title}</p>
        <h3 style={{ fontSize: '2.25rem', fontWeight: '800', color: color, letterSpacing: '-0.02em' }}>{value}</h3>
        <p style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: color }}></span>
            {sub}
        </p>
    </div>
);

Analytics.layout = page => <DashboardLayout children={page} />;

export default Analytics;
