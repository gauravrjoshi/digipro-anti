import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileEditor = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        role_title: '',
        bio: '',
        address: '',
        phone: '',
        email: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch current profile data
        const fetchData = async () => {
            try {
                // We need an endpoint to get the *authenticated user's* portfolio
                // For now, we can cheat and fetch by slug 'gaurav' or add a new endpoint /api/user/portfolio
                const { data } = await axios.get('https://digipro.test/api/portfolio/gaurav');
                setFormData({
                    full_name: data.data.full_name,
                    role_title: data.data.role_title,
                    bio: data.data.bio,
                    address: data.data.contact.address,
                    phone: data.data.contact.phone,
                    email: data.data.contact.email
                });
            } catch (error) {
                console.error("Error loading profile", error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // We need a PUT endpoint. I'll need to create this in the backend next.
            // await axios.put('https://digipro.test/api/portfolio/gaurav', formData);
            setMessage('Profile updated successfully! (Mock)');
        } catch (error) {
            setMessage('Error updating profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 style={{ marginBottom: '2rem' }}>Edit Profile</h2>
            {message && <div style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', borderRadius: '8px' }}>{message}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem', maxWidth: '600px' }}>
                <div className="form-group">
                    <label style={labelStyle}>Full Name</label>
                    <input name="full_name" value={formData.full_name} onChange={handleChange} style={inputStyle} />
                </div>
                <div className="form-group">
                    <label style={labelStyle}>Role Title</label>
                    <input name="role_title" value={formData.role_title} onChange={handleChange} style={inputStyle} />
                </div>
                <div className="form-group">
                    <label style={labelStyle}>Bio</label>
                    <textarea name="bio" value={formData.bio} onChange={handleChange} style={{ ...inputStyle, minHeight: '100px' }} />
                </div>
                <div className="form-group">
                    <label style={labelStyle}>Address</label>
                    <input name="address" value={formData.address} onChange={handleChange} style={inputStyle} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                        <label style={labelStyle}>Phone</label>
                        <input name="phone" value={formData.phone} onChange={handleChange} style={inputStyle} />
                    </div>
                    <div className="form-group">
                        <label style={labelStyle}>Email</label>
                        <input name="email" value={formData.email} onChange={handleChange} style={inputStyle} />
                    </div>
                </div>

                <button type="submit" disabled={loading} style={{ padding: '1rem', background: 'var(--primary-color)', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

const labelStyle = { display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' };
const inputStyle = { width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white' };

export default ProfileEditor;
