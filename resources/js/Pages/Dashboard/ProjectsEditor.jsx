import React from 'react';
import { useForm, usePage, router } from '@inertiajs/react';
import DashboardLayout from '../../Layouts/DashboardLayout';

const ProjectsEditor = () => {
    const { auth, flash } = usePage().props;
    const portfolio = auth.user?.portfolio || {};
    const projects = portfolio.projects || [];

    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        description: '',
        link: '',
    });

    const handleCreate = (e) => {
        e.preventDefault();
        post(route('dashboard.projects.store'), {
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this project?')) {
            router.delete(route('dashboard.projects.destroy', id));
        }
    };

    return (
        <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '2rem' }}>Portfolio Projects</h2>

            {flash.message && (
                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', borderRadius: '10px', border: '1px solid rgba(74, 222, 128, 0.2)' }}>
                    {flash.message}
                </div>
            )}

            {/* Create Form */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Add New Project</h3>
                <form onSubmit={handleCreate} style={{ display: 'grid', gap: '1.25rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="form-group">
                            <label style={labelStyle}>Project Title</label>
                            <input
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                style={inputStyle}
                                placeholder="Awesome App"
                                required
                            />
                            {errors.title && <div style={errorStyle}>{errors.title}</div>}
                        </div>
                        <div className="form-group">
                            <label style={labelStyle}>Project Link (Optional)</label>
                            <input
                                value={data.link}
                                onChange={e => setData('link', e.target.value)}
                                style={inputStyle}
                                placeholder="https://..."
                            />
                            {errors.link && <div style={errorStyle}>{errors.link}</div>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label style={labelStyle}>Description</label>
                        <textarea
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            style={{ ...inputStyle, minHeight: '80px' }}
                            placeholder="Briefly describe what this project is about..."
                        />
                        {errors.description && <div style={errorStyle}>{errors.description}</div>}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        style={{
                            padding: '0.8rem 1.5rem',
                            background: '#667eea',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            cursor: processing ? 'not-allowed' : 'pointer',
                            justifySelf: 'start',
                            opacity: processing ? 0.7 : 1
                        }}
                    >
                        {processing ? 'Adding...' : 'Add Project'}
                    </button>
                </form>
            </div>

            {/* List */}
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.25rem' }}>Existing Projects ({projects.length})</h3>
            <div style={{ display: 'grid', gap: '1.25rem' }}>
                {projects.length === 0 ? (
                    <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>No projects added yet.</p>
                ) : (
                    projects.map(proj => (
                        <div key={proj.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>{proj.title}</h4>
                                <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '0.25rem' }}>{proj.description}</p>
                                {proj.link && <a href={proj.link} target="_blank" style={{ fontSize: '0.8rem', color: '#667eea', textDecoration: 'none', marginTop: '0.5rem', display: 'block' }}>Visit Project →</a>}
                            </div>
                            <button
                                onClick={() => handleDelete(proj.id)}
                                style={{ padding: '0.5rem 1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s' }}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const labelStyle = { display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' };
const inputStyle = { width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none' };
const errorStyle = { color: '#f87171', fontSize: '0.8rem', marginTop: '0.25rem' };

ProjectsEditor.layout = page => <DashboardLayout children={page} />;

export default ProjectsEditor;
