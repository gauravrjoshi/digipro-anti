import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import DashboardLayout from '../../Layouts/DashboardLayout';
import axios from 'axios';

const ResumeManager = () => {
    const { auth } = usePage().props;
    const [resumeData, setResumeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploadType, setUploadType] = useState('upload'); // 'upload' or 'url'
    const [selectedFile, setSelectedFile] = useState(null);
    const [resumeUrl, setResumeUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState('modern');

    useEffect(() => {
        fetchResumeData();
    }, []);

    const fetchResumeData = async () => {
        try {
            const response = await axios.get('/api/resume');
            setResumeData(response.data);
        } catch (error) {
            console.error('Error fetching resume:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!validTypes.includes(file.type)) {
                setMessage({ type: 'error', text: 'Please upload a PDF, DOC, or DOCX file.' });
                return;
            }
            // Validate file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                setMessage({ type: 'error', text: 'File size must be less than 5MB.' });
                return;
            }
            setSelectedFile(file);
            setMessage(null);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileSelect({ target: { files: [file] } });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!resumeData?.is_pro) {
            setMessage({ type: 'error', text: 'This feature is only available for Pro users.' });
            return;
        }

        setUploading(true);
        setMessage(null);

        try {
            const formData = new FormData();
            formData.append('type', uploadType);

            if (uploadType === 'upload') {
                if (!selectedFile) {
                    setMessage({ type: 'error', text: 'Please select a file to upload.' });
                    setUploading(false);
                    return;
                }
                formData.append('resume_file', selectedFile);
            } else if (uploadType === 'url') {
                if (!resumeUrl) {
                    setMessage({ type: 'error', text: 'Please enter a resume URL.' });
                    setUploading(false);
                    return;
                }
                formData.append('resume_url', resumeUrl);
            } else {
                // Generated
                formData.append('resume_template', selectedTemplate);
            }

            const response = await axios.post('/api/resume', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage({ type: 'success', text: response.data.message });
            setSelectedFile(null);
            setResumeUrl('');
            fetchResumeData();
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.response?.data?.errors?.resume_file?.[0] || error.response?.data?.errors?.resume_url?.[0] || 'Failed to save resume. Please try again.';
            setMessage({ type: 'error', text: errorMsg });
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete your resume?')) {
            return;
        }

        try {
            await axios.delete('/api/resume');
            setMessage({ type: 'success', text: 'Resume deleted successfully.' });
            fetchResumeData();
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to delete resume.' });
        }
    };

    const handleToggleVisibility = async (e) => {
        const isChecked = e.target.checked;

        try {
            await axios.post('/api/resume/toggle-visibility', {
                show_on_portfolio: isChecked
            });

            setResumeData(prev => ({
                ...prev,
                show_on_portfolio: isChecked
            }));

            setMessage({
                type: 'success',
                text: isChecked ? 'Resume is now visible on your portfolio' : 'Resume is now hidden from your portfolio'
            });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update visibility setting.' });
            // Revert checkbox on error
            e.target.checked = !isChecked;
        }
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>Loading...</div>;
    }

    return (
        <div>
            <h2 className="text-premium" style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Resume Management</h2>
            <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '0.9rem' }}>
                Upload your resume or add a link to make it accessible from your portfolio.
                {!resumeData?.is_pro && ' (Pro feature)'}
            </p>

            {message && (
                <div style={{
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    background: message.type === 'success' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)',
                    color: message.type === 'success' ? '#4ade80' : '#f87171',
                    borderRadius: '10px',
                    border: `1px solid ${message.type === 'success' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(248, 113, 113, 0.2)'}`
                }}>
                    {message.text}
                </div>
            )}

            {!resumeData?.is_pro && (
                <div style={{
                    padding: '1.5rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    marginBottom: '2rem',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--premium-gradient)' }}></div>
                    <h3 className="text-premium" style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        🌟 Upgrade to Pro
                    </h3>
                    <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
                        Resume management is a Pro feature. Upgrade now to add your resume to your portfolio.
                    </p>
                    <button
                        onClick={() => router.visit('/pricing')}
                        className="btn-premium"
                        style={{ padding: '0.75rem 2rem' }}
                    >
                        View Pricing
                    </button>
                </div>
            )}

            {resumeData?.is_pro && (
                <div style={{
                    padding: '1.5rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    marginBottom: '2rem'
                }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white' }}>
                        ✨ Generate Resume from Portfolio
                    </h3>
                    <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        Automatically generate a professional resume using the data from your portfolio.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                        {['modern', 'classic', 'minimal'].map((template) => (
                            <div
                                key={template}
                                onClick={() => setSelectedTemplate(template)}
                                style={{
                                    border: selectedTemplate === template ? '2px solid var(--primary-color)' : '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '12px',
                                    padding: '1rem',
                                    cursor: 'pointer',
                                    background: selectedTemplate === template ? 'rgba(14, 165, 233, 0.05)' : 'transparent',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div style={{
                                    textTransform: 'capitalize',
                                    fontWeight: 'bold',
                                    color: selectedTemplate === template ? 'var(--primary-color)' : 'white',
                                    marginBottom: '0.5rem'
                                }}>
                                    {template}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                                    {template === 'modern' && 'Clean & colorful. Best for digital roles.'}
                                    {template === 'classic' && 'Traditional & formal. Best for corporate.'}
                                    {template === 'minimal' && 'Simple & elegant. Focus on content.'}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a
                            href={`/portfolio/${resumeData?.portfolio_id || auth.user.id}/resume-download?template=${selectedTemplate}&mode=view`}
                            target="_blank"
                            className="btn-secondary"
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '10px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                color: 'white',
                                textDecoration: 'none',
                                fontWeight: '500',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            👁️ Preview
                        </a>
                        <a
                            href={`/portfolio/${resumeData?.portfolio_id || auth.user.id}/resume-download?template=${selectedTemplate}&mode=download`}
                            className="btn-premium"
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '10px',
                                textDecoration: 'none',
                                display: 'inline-block'
                            }}
                        >
                            ⬇️ Download PDF
                        </a>
                    </div>
                </div>
            )}

            {resumeData?.has_resume && (
                <div style={{
                    padding: '1.5rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    marginBottom: '2rem'
                }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Current Resume</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div>
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                                Type: <span style={{ color: 'white', fontWeight: '500' }}>
                                    {resumeData.type === 'upload' ? 'File Upload' : (resumeData.type === 'generated' ? 'System Generated' : 'URL Link')}
                                </span>
                            </p>
                            {resumeData.type === 'upload' && (
                                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                                    File: <span style={{ color: 'white', fontWeight: '500' }}>{resumeData.file_name}</span>
                                </p>
                            )}
                            {resumeData.type === 'url' && (
                                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                                    URL: <a href={resumeData.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'none', borderBottom: '1px solid rgba(14, 165, 233, 0.3)' }}>
                                        {resumeData.url}
                                    </a>
                                </p>
                            )}
                            {resumeData.type === 'generated' && (
                                <div style={{ marginTop: '0.25rem' }}>
                                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                                        Template: <span style={{ color: 'white', fontWeight: '500', textTransform: 'capitalize' }}>{resumeData.template || 'Modern'}</span>
                                    </p>
                                    <p style={{ color: '#4ade80', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                                        ✓ Automatically updates with your portfolio
                                    </p>
                                </div>
                            )}
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            {resumeData.type === 'upload' && (
                                <a
                                    href={resumeData.download_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        padding: '0.5rem 1.25rem',
                                        background: 'rgba(14, 165, 233, 0.1)',
                                        border: '1px solid rgba(14, 165, 233, 0.2)',
                                        borderRadius: '10px',
                                        color: 'var(--primary-color)',
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                        fontWeight: 'bold',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseOver={e => e.target.style.background = 'rgba(14, 165, 233, 0.15)'}
                                    onMouseOut={e => e.target.style.background = 'rgba(14, 165, 233, 0.1)'}
                                >
                                    Download
                                </a>
                            )}
                            <button
                                onClick={handleDelete}
                                style={{
                                    padding: '0.5rem 1.25rem',
                                    background: 'rgba(248, 113, 113, 0.08)',
                                    border: '1px solid rgba(248, 113, 113, 0.15)',
                                    borderRadius: '10px',
                                    color: '#f87171',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseOver={e => e.target.style.background = 'rgba(248, 113, 113, 0.15)'}
                                onMouseOut={e => e.target.style.background = 'rgba(248, 113, 113, 0.08)'}
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                    {/* Show on Portfolio Toggle */}
                    <div style={{
                        marginTop: '1rem',
                        paddingTop: '1rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            cursor: 'pointer',
                            color: '#94a3b8'
                        }}>
                            <input
                                type="checkbox"
                                checked={resumeData.show_on_portfolio ?? true}
                                onChange={handleToggleVisibility}
                                style={{
                                    width: '18px',
                                    height: '18px',
                                    cursor: 'pointer',
                                    accentColor: 'var(--primary-color)'
                                }}
                            />
                            <span style={{ fontSize: '0.9rem' }}>
                                Show resume on public portfolio
                            </span>
                        </label>
                        <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.5rem', marginLeft: '1.75rem' }}>
                            When enabled, visitors can download your resume from your portfolio page
                        </p>
                    </div>
                </div>
            )}

            {resumeData?.is_pro && (
                <form onSubmit={handleSubmit} style={{ maxWidth: '700px' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.75rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: '500' }}>
                            Choose Upload Method
                        </label>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <button
                                type="button"
                                onClick={() => setUploadType('upload')}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    background: uploadType === 'upload' ? 'rgba(14, 165, 233, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                                    border: `1px solid ${uploadType === 'upload' ? 'rgba(14, 165, 233, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
                                    borderRadius: '12px',
                                    color: uploadType === 'upload' ? 'var(--primary-color)' : '#94a3b8',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    minWidth: '140px'
                                }}
                            >
                                📄 Upload File
                            </button>
                            <button
                                type="button"
                                onClick={() => setUploadType('url')}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    background: uploadType === 'url' ? 'rgba(14, 165, 233, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                                    border: `1px solid ${uploadType === 'url' ? 'rgba(14, 165, 233, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
                                    borderRadius: '12px',
                                    color: uploadType === 'url' ? 'var(--primary-color)' : '#94a3b8',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    minWidth: '140px'
                                }}
                            >
                                🔗 Add URL
                            </button>
                            <button
                                type="button"
                                onClick={() => setUploadType('generated')}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    background: uploadType === 'generated' ? 'rgba(14, 165, 233, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                                    border: `1px solid ${uploadType === 'generated' ? 'rgba(14, 165, 233, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
                                    borderRadius: '12px',
                                    color: uploadType === 'generated' ? 'var(--primary-color)' : '#94a3b8',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    minWidth: '140px'
                                }}
                            >
                                ✨ System Generated
                            </button>
                        </div>
                    </div>

                    {uploadType === 'upload' ? (
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.75rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: '500' }}>
                                Upload Resume File
                            </label>
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                style={{
                                    padding: '2rem',
                                    background: isDragging ? 'rgba(14, 165, 233, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                                    border: `2px dashed ${isDragging ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.1)'}`,
                                    borderRadius: '16px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                                onClick={() => document.getElementById('file-input').click()}
                            >
                                <input
                                    id="file-input"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileSelect}
                                    style={{ display: 'none' }}
                                />
                                {selectedFile ? (
                                    <div>
                                        <p style={{ color: '#4ade80', fontSize: '1rem', marginBottom: '0.5rem' }}>✓ {selectedFile.name}</p>
                                        <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <p style={{ color: 'white', fontSize: '1rem', marginBottom: '0.5rem' }}>
                                            📁 Drag & drop your resume here
                                        </p>
                                        <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                                            or click to browse (PDF, DOC, DOCX - Max 5MB)
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : uploadType === 'url' ? (
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.75rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: '500' }}>
                                Resume URL
                            </label>
                            <input
                                type="url"
                                value={resumeUrl}
                                onChange={(e) => setResumeUrl(e.target.value)}
                                placeholder="https://example.com/my-resume.pdf"
                                className="premium-input-refinement"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: '10px',
                                    color: 'white',
                                    outline: 'none',
                                    transition: 'all 0.2s'
                                }}
                            />
                            <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                                Enter a link to your resume hosted on Google Drive, Dropbox, or any other service.
                            </p>
                        </div>
                    ) : (
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.75rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: '500' }}>
                                Select Template
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                {['modern', 'classic', 'minimal'].map((template) => (
                                    <div
                                        key={template}
                                        onClick={() => setSelectedTemplate(template)}
                                        style={{
                                            border: selectedTemplate === template ? '2px solid var(--primary-color)' : '1px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: '12px',
                                            padding: '1rem',
                                            cursor: 'pointer',
                                            background: selectedTemplate === template ? 'rgba(14, 165, 233, 0.05)' : 'transparent',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <div style={{
                                            textTransform: 'capitalize',
                                            fontWeight: 'bold',
                                            color: selectedTemplate === template ? 'var(--primary-color)' : 'white',
                                            marginBottom: '0.5rem'
                                        }}>
                                            {template}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                                            {template === 'modern' && 'Clean & colorful. Best for digital roles.'}
                                            {template === 'classic' && 'Traditional & formal. Best for corporate.'}
                                            {template === 'minimal' && 'Simple & elegant. Focus on content.'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ padding: '1rem', background: 'rgba(14, 165, 233, 0.05)', borderRadius: '8px', border: '1px solid rgba(14, 165, 233, 0.1)' }}>
                                <p style={{ fontSize: '0.9rem', color: 'var(--primary-color)' }}>
                                    💡 This will automatically generate a PDF resume from your portfolio data whenever visitors click "Download Resume" on your public site.
                                </p>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={uploading}
                        className="btn-premium"
                        style={uploading ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                    >
                        {uploading ? 'Saving...' : 'Save Preference'}
                    </button>
                </form>
            )}
        </div>
    );
};

ResumeManager.layout = page => <DashboardLayout children={page} />;

export default ResumeManager;
