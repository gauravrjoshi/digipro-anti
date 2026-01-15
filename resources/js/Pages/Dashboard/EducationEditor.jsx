import React from 'react';
import { useForm, usePage, router } from '@inertiajs/react';
import DashboardLayout from '../../Layouts/DashboardLayout';

const EducationEditor = () => {
    const { auth, flash } = usePage().props;
    const portfolio = auth.user?.portfolio || {};
    const education = portfolio.education || [];

    const { data, setData, post, processing, reset, errors } = useForm({
        institution: '',
        degree: '',
        description: '',
        start_year: '',
        end_year: '',
    });

    const handleCreate = (e) => {
        e.preventDefault();
        post(route('dashboard.education.store'), {
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (id) => {
        if (confirm('Delete this education entry?')) {
            router.delete(route('dashboard.education.destroy', id));
        }
    };

    return (
        <div>
            <h2 className="text-premium" style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '2rem' }}>Education & Certification</h2>

            {flash.message && (
                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', borderRadius: '10px', border: '1px solid rgba(74, 222, 128, 0.2)' }}>
                    {flash.message}
                </div>
            )}

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'white' }}>Add Education</h3>
                <form onSubmit={handleCreate} style={{ display: 'grid', gap: '1.25rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="form-group">
                            <label style={labelStyle}>Institution</label>
                            <input value={data.institution} onChange={e => setData('institution', e.target.value)} style={inputStyle} placeholder="University of Technology" required className="premium-input-refinement" />
                            {errors.institution && <div style={errorStyle}>{errors.institution}</div>}
                        </div>
                        <div className="form-group">
                            <label style={labelStyle}>Degree / Certificate</label>
                            <input value={data.degree} onChange={e => setData('degree', e.target.value)} style={inputStyle} placeholder="B.Sc. in Computer Science" required className="premium-input-refinement" />
                            {errors.degree && <div style={errorStyle}>{errors.degree}</div>}
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="form-group">
                            <label style={labelStyle}>Start Year</label>
                            <input
                                value={data.start_year}
                                onChange={e => setData('start_year', e.target.value)}
                                style={inputStyle}
                                placeholder="2018"
                                required
                                className="premium-input-refinement"
                            />
                            {errors.start_year && <div style={errorStyle}>{errors.start_year}</div>}
                        </div>
                        <div className="form-group">
                            <label style={labelStyle}>End Year (or Expected)</label>
                            <input
                                value={data.end_year}
                                onChange={e => setData('end_year', e.target.value)}
                                style={inputStyle}
                                placeholder="2022"
                                className="premium-input-refinement"
                            />
                            {errors.end_year && <div style={errorStyle}>{errors.end_year}</div>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label style={labelStyle}>Description / Field of Study</label>
                        <input
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            style={inputStyle}
                            placeholder="Computer Science"
                            className="premium-input-refinement"
                        />
                        {errors.description && <div style={errorStyle}>{errors.description}</div>}
                    </div>
                    <button type="submit" disabled={processing} className="btn-premium">
                        {processing ? 'Adding...' : 'Add Education'}
                    </button>
                </form>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {education.map(edu => (
                    <div key={edu.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', color: 'white' }}>{edu.degree}</h4>
                            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>{edu.institution} • {edu.start_year} - {edu.end_year || 'Present'}</p>
                            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.25rem' }}>{edu.description}</p>
                        </div>
                        <button onClick={() => handleDelete(edu.id)} style={{ padding: '0.5rem 1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', cursor: 'pointer', fontSize: '0.875rem', transition: 'all 0.2s' }} onMouseOver={e => e.target.style.background = 'rgba(239, 68, 68, 0.2)'} onMouseOut={e => e.target.style.background = 'rgba(239, 68, 68, 0.1)'}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const labelStyle = { display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.875rem', fontWeight: '500' };
const inputStyle = { width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', color: 'white', outline: 'none', transition: 'all 0.2s' };

EducationEditor.layout = page => <DashboardLayout children={page} />;

export default EducationEditor;
