import React from 'react';
import { useForm, usePage, router } from '@inertiajs/react';
import DashboardLayout from '../../Layouts/DashboardLayout';

const ExperienceEditor = () => {
    const { auth, flash } = usePage().props;
    const portfolio = auth.user?.portfolio || {};
    const experiences = portfolio.experiences || [];

    const { data, setData, post, processing, reset, errors } = useForm({
        company: '',
        role: '',
        location: '',
        description: '',
        start_date: '',
        end_date: '',
    });

    const handleCreate = (e) => {
        e.preventDefault();
        post(route('dashboard.experience.store'), {
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (id) => {
        if (confirm('Delete this experience?')) {
            router.delete(route('dashboard.experience.destroy', id));
        }
    };

    return (
        <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '2rem' }}>Work Experience</h2>

            {flash.message && (
                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', borderRadius: '10px', border: '1px solid rgba(74, 222, 128, 0.2)' }}>
                    {flash.message}
                </div>
            )}

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Add Experience</h3>
                <form onSubmit={handleCreate} style={{ display: 'grid', gap: '1.25rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="form-group">
                            <label style={labelStyle}>Company</label>
                            <input value={data.company} onChange={e => setData('company', e.target.value)} style={inputStyle} placeholder="Google" required />
                        </div>
                        <div className="form-group">
                            <label style={labelStyle}>Role / Position</label>
                            <input
                                value={data.role}
                                onChange={e => setData('role', e.target.value)}
                                style={inputStyle}
                                placeholder="Lead Developer"
                                required
                            />
                            {errors.role && <div style={errorStyle}>{errors.role}</div>}
                        </div>
                        <div className="form-group">
                            <label style={labelStyle}>Location</label>
                            <input
                                value={data.location}
                                onChange={e => setData('location', e.target.value)}
                                style={inputStyle}
                                placeholder="Remote / NY"
                            />
                            {errors.location && <div style={errorStyle}>{errors.location}</div>}
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="form-group">
                            <label style={labelStyle}>Start Date</label>
                            <input value={data.start_date} onChange={e => setData('start_date', e.target.value)} style={inputStyle} placeholder="Jan 2020" required />
                        </div>
                        <div className="form-group">
                            <label style={labelStyle}>End Date</label>
                            <input value={data.end_date} onChange={e => setData('end_date', e.target.value)} style={inputStyle} placeholder="Present / Dec 2023" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label style={labelStyle}>Description</label>
                        <textarea value={data.description} onChange={e => setData('description', e.target.value)} style={{ ...inputStyle, minHeight: '80px' }} placeholder="Describe your responsibilities..." />
                    </div>
                    <button type="submit" disabled={processing} style={{ padding: '0.8rem 1.5rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', justifySelf: 'start' }}>
                        Add Experience
                    </button>
                </form>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {experiences.map(exp => (
                    <div key={exp.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>{exp.role}</h4>
                            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>{exp.company} {exp.location && `• ${exp.location}`} • {exp.start_date} - {exp.end_date || 'Present'}</p>
                            <p style={{ fontSize: '0.9rem', color: '#ccc', marginTop: '0.5rem' }}>{exp.description}</p>
                        </div>
                        <button onClick={() => handleDelete(exp.id)} style={{ padding: '0.5rem 1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const labelStyle = { display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.875rem' };
const inputStyle = { width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none' };

ExperienceEditor.layout = page => <DashboardLayout children={page} />;

export default ExperienceEditor;
