import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const ExperienceEditor = () => {
    const { user } = useAuth();
    const [expenses, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newItem, setNewItem] = useState({ company: '', role: '', start_date: '', end_date: '', details: '' }); // details as string for textarea, will split by newline

    const fetchExperience = async () => {
        try {
            const slug = user?.portfolio?.slug || 'gaurav';
            const { data } = await axios.get(`https://digipro.test/api/portfolio/${slug}`);
            setExperiences(data.data.experiences);
        } catch (error) {
            console.error("Error loading experience", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchExperience();
    }, [user]);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            // Split details by newline to create array
            const detailsArray = newItem.details.split('\n').filter(line => line.trim() !== '');

            await axios.post('https://digipro.test/api/experiences', {
                portfolio_id: user.portfolio.id,
                ...newItem,
                details: detailsArray
            });
            setNewItem({ company: '', role: '', start_date: '', end_date: '', details: '' });
            fetchExperience();
        } catch (error) {
            alert('Failed to add experience');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`https://digipro.test/api/experiences/${id}`);
            fetchExperience();
        } catch (error) {
            alert('Failed to delete');
        }
    };

    return (
        <div>
            <h2>Manage Experience</h2>

            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem', marginTop: '1rem' }}>
                <h3>Add New Experience</h3>
                <form onSubmit={handleCreate} style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <input placeholder="Company" value={newItem.company} onChange={e => setNewItem({ ...newItem, company: e.target.value })} style={inputStyle} required />
                        <input placeholder="Role" value={newItem.role} onChange={e => setNewItem({ ...newItem, role: e.target.value })} style={inputStyle} required />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <input placeholder="Start Date (e.g. Jan 2023)" value={newItem.start_date} onChange={e => setNewItem({ ...newItem, start_date: e.target.value })} style={inputStyle} />
                        <input placeholder="End Date (e.g. Present)" value={newItem.end_date} onChange={e => setNewItem({ ...newItem, end_date: e.target.value })} style={inputStyle} />
                    </div>
                    <textarea placeholder="Details (Bullet points - one per line)" value={newItem.details} onChange={e => setNewItem({ ...newItem, details: e.target.value })} style={{ ...inputStyle, minHeight: '100px' }} />
                    <button type="submit" style={btnStyle}>Add Experience</button>
                </form>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {expenses.map(exp => (
                    <div key={exp.id} style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h4 style={{ margin: 0 }}>{exp.role} at {exp.company}</h4>
                            <p style={{ fontSize: '0.9rem', color: '#ccc', margin: '0.5rem 0' }}>{exp.start_date} - {exp.end_date}</p>
                            <ul style={{ paddingLeft: '1rem', fontSize: '0.9rem', color: '#aaa' }}>
                                {exp.details && exp.details.map((d, i) => <li key={i}>{d}</li>)}
                            </ul>
                        </div>
                        <button onClick={() => handleDelete(exp.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const inputStyle = { padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid #333', borderRadius: '4px', color: 'white' };
const btnStyle = { padding: '0.5rem 1rem', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };

export default ExperienceEditor;
