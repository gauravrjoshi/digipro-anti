import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import DashboardLayout from '../../Layouts/DashboardLayout';
import ProfilePictureManager from '../../Components/ProfilePictureManager';

const ProfileEditor = () => {
    const { auth, flash } = usePage().props;
    const portfolio = auth.user?.portfolio || {};

    const { data, setData, post, processing, errors } = useForm({
        full_name: portfolio.full_name || '',
        role_title: portfolio.role_title || '',
        bio: portfolio.bio || '',
        email: portfolio.email || auth.user?.email || '',
        phone: portfolio.phone || '',
        address: portfolio.contact?.address || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('dashboard.profile.update'));
    };

    return (
        <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '2rem' }}>Edit Profile Details</h2>

            <ProfilePictureManager initialData={portfolio.profile_picture} />

            {flash.message && (
                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', borderRadius: '10px', border: '1px solid rgba(74, 222, 128, 0.2)' }}>
                    {flash.message}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem', maxWidth: '700px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="form-group">
                        <label style={labelStyle}>Full Name</label>
                        <input
                            name="full_name"
                            value={data.full_name}
                            onChange={e => setData('full_name', e.target.value)}
                            style={inputStyle}
                            placeholder="Your full name"
                        />
                        {errors.full_name && <div style={errorStyle}>{errors.full_name}</div>}
                    </div>
                    <div className="form-group">
                        <label style={labelStyle}>Professional Title</label>
                        <input
                            name="role_title"
                            value={data.role_title}
                            onChange={e => setData('role_title', e.target.value)}
                            style={inputStyle}
                            placeholder="e.g. Senior Software Engineer"
                        />
                        {errors.role_title && <div style={errorStyle}>{errors.role_title}</div>}
                    </div>
                </div>

                <div className="form-group">
                    <label style={labelStyle}>Bio / Self-Introduction</label>
                    <textarea
                        name="bio"
                        value={data.bio}
                        onChange={e => setData('bio', e.target.value)}
                        style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
                        placeholder="Tell the world about yourself..."
                    />
                    {errors.bio && <div style={errorStyle}>{errors.bio}</div>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="form-group">
                        <label style={labelStyle}>Contact Email</label>
                        <input
                            name="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            style={inputStyle}
                            placeholder="email@example.com"
                        />
                        {errors.email && <div style={errorStyle}>{errors.email}</div>}
                    </div>
                    <div className="form-group">
                        <label style={labelStyle}>Phone Number</label>
                        <input
                            name="phone"
                            value={data.phone}
                            onChange={e => setData('phone', e.target.value)}
                            style={inputStyle}
                            placeholder="+1 (555) 000-0000"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label style={labelStyle}>Address / Location</label>
                    <input
                        name="address"
                        value={data.address}
                        onChange={e => setData('address', e.target.value)}
                        style={inputStyle}
                        placeholder="e.g. San Francisco, CA"
                    />
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <button
                        type="submit"
                        disabled={processing}
                        className="btn-premium"
                        style={{
                            opacity: processing ? 0.7 : 1
                        }}
                    >
                        {processing ? 'Saving Changes...' : 'Save Profile Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
};

const labelStyle = { display: 'block', marginBottom: '0.6rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: '600' };
const inputStyle = { width: '100%', padding: '0.875rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white', outline: 'none', transition: 'all 0.3s ease' };
const errorStyle = { color: '#f87171', fontSize: '0.85rem', marginTop: '0.35rem', fontWeight: '500' };

ProfileEditor.layout = page => <DashboardLayout children={page} />;

export default ProfileEditor;
