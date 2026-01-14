import React, { useState, useRef } from 'react';
import axios from 'axios';

const ProfilePictureManager = ({ initialData }) => {
    const [profilePic, setProfilePic] = useState(initialData?.url || null);
    const [showOnPortfolio, setShowOnPortfolio] = useState(initialData?.show_on_portfolio || false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Simple validation
        if (!file.type.startsWith('image/')) {
            setMessage({ type: 'error', text: 'Please select an image file.' });
            return;
        }

        const formData = new FormData();
        formData.append('profile_picture', file);

        setUploading(true);
        setMessage(null);

        try {
            const response = await axios.post('/api/profile-picture', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setProfilePic(response.data.profile_picture.url);
            setMessage({ type: 'success', text: 'Profile picture uploaded!' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Upload failed. Please try again.' });
        } finally {
            setUploading(false);
        }
    };

    const handleToggleVisibility = async () => {
        const newValue = !showOnPortfolio;
        try {
            await axios.post('/api/profile-picture/toggle-visibility', {
                show_profile_picture: newValue
            });
            setShowOnPortfolio(newValue);
            setMessage({ type: 'success', text: newValue ? 'Profile picture is now visible.' : 'Profile picture hidden.' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update visibility.' });
        }
    };

    const handleDelete = async () => {
        if (!confirm('Delete profile picture?')) return;
        try {
            await axios.delete('/api/profile-picture');
            setProfilePic(null);
            setShowOnPortfolio(false);
            setMessage({ type: 'success', text: 'Profile picture removed.' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Delete failed.' });
        }
    };

    return (
        <div style={{
            padding: '1.5rem',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '2rem',
            maxWidth: '700px'
        }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Profile Picture</h3>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                {/* Preview Circle */}
                <div
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '2px dashed rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        position: 'relative'
                    }}
                >
                    {profilePic ? (
                        <img src={profilePic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <span style={{ color: '#64748b', fontSize: '0.8rem', textAlign: 'center', padding: '10px' }}>
                            Click to upload
                        </span>
                    )}
                    {uploading && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: 'white', fontSize: '0.8rem' }}>...</span>
                        </div>
                    )}
                </div>

                <div style={{ flex: 1, minWidth: '200px' }}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        accept="image/*"
                    />

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            style={{
                                padding: '0.5rem 1rem',
                                background: 'var(--primary-color)',
                                border: 'none',
                                borderRadius: '6px',
                                color: 'white',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Change Photo
                        </button>
                        {profilePic && (
                            <button
                                onClick={handleDelete}
                                style={{
                                    padding: '0.5rem 1rem',
                                    background: 'rgba(248, 113, 113, 0.1)',
                                    border: '1px solid rgba(248, 113, 113, 0.2)',
                                    borderRadius: '6px',
                                    color: '#f87171',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Remove
                            </button>
                        )}
                    </div>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={showOnPortfolio}
                            onChange={handleToggleVisibility}
                            disabled={!profilePic}
                            style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#667eea' }}
                        />
                        <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Show on my portfolio</span>
                    </label>
                </div>
            </div>

            {message && (
                <div style={{
                    marginTop: '1.5rem',
                    fontSize: '0.85rem',
                    color: message.type === 'success' ? '#4ade80' : '#f87171'
                }}>
                    {message.text}
                </div>
            )}
        </div>
    );
};

export default ProfilePictureManager;
