import React from 'react';
import { useForm, usePage, router } from '@inertiajs/react';
import DashboardLayout from '../../Layouts/DashboardLayout';

const SkillsEditor = () => {
    const { auth, flash } = usePage().props;
    const portfolio = auth.user?.portfolio || {};
    const skills = portfolio.skills || [];

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        proficiency: 80,
        category: 'Technical',
    });

    const handleCreate = (e) => {
        e.preventDefault();
        post(route('dashboard.skills.store'), {
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (id) => {
        if (confirm('Delete this skill?')) {
            router.delete(route('dashboard.skills.destroy', id));
        }
    };

    return (
        <div>
            <h2 className="text-premium" style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '2rem' }}>Professional Skills</h2>

            {flash.message && (
                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', borderRadius: '10px', border: '1px solid rgba(74, 222, 128, 0.2)' }}>
                    {flash.message}
                </div>
            )}

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'white' }}>Add New Skill</h3>
                <form onSubmit={handleCreate} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    <div className="form-group">
                        <label style={labelStyle}>Skill Name</label>
                        <input value={data.name} onChange={e => setData('name', e.target.value)} style={inputStyle} placeholder="e.g. React" required className="premium-input-refinement" />
                    </div>
                    <div className="form-group">
                        <label style={labelStyle}>Proficiency (%)</label>
                        <input type="number" value={data.proficiency} onChange={e => setData('proficiency', e.target.value)} style={inputStyle} min="0" max="100" required className="premium-input-refinement" />
                        {errors.proficiency && <div style={errorStyle}>{errors.proficiency}</div>}
                    </div>
                    <div className="form-group">
                        <label style={labelStyle}>Category</label>
                        <select value={data.category} onChange={e => setData('category', e.target.value)} style={inputStyle} className="premium-input-refinement">
                            <option value="Technical">Technical</option>
                            <option value="Soft Skills">Soft Skills</option>
                            <option value="Tools">Tools</option>
                            <option value="Languages">Languages</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <button type="submit" disabled={processing} className="btn-premium" style={{ width: '100%' }}>
                            {processing ? 'Adding...' : 'Add Skill'}
                        </button>
                    </div>
                </form>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                {skills.map(skill => (
                    <div key={skill.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', paddingRight: '1rem' }}>
                                <span style={{ fontWeight: '600', color: 'white' }}>{skill.name}</span>
                                <span style={{ color: 'var(--primary-color)', fontSize: '0.875rem', fontWeight: 'bold' }}>{skill.proficiency}%</span>
                            </div>
                            <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginRight: '1rem' }}>
                                <div style={{ width: `${skill.proficiency}%`, height: '100%', background: 'var(--premium-gradient)', borderRadius: '3px', boxShadow: '0 0 10px rgba(14, 165, 233, 0.3)' }}></div>
                            </div>
                        </div>
                        <button onClick={() => handleDelete(skill.id)} style={{ padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', transition: 'all 0.2s' }} onMouseOver={e => e.target.style.background = 'rgba(239, 68, 68, 0.2)'} onMouseOut={e => e.target.style.background = 'rgba(239, 68, 68, 0.1)'}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const labelStyle = { display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.875rem', fontWeight: '500' };
const inputStyle = { width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', color: 'white', outline: 'none', transition: 'all 0.2s' };

SkillsEditor.layout = page => <DashboardLayout children={page} />;

export default SkillsEditor;
