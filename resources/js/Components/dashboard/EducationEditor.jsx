import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const EducationEditor = () => {
    const { user } = useAuth();
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newItem, setNewItem] = useState({ institution: '', degree: '', start_year: '', end_year: '' });

    const fetchEducation = async () => {
        try {
            const slug = user?.portfolio?.slug || 'gaurav';
            const { data } = await axios.get(`https://digipro.test/api/portfolio/${slug}`);
            setEducation(data.data.education);
        } catch (error) {
            console.error("Error loading education", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchEducation();
    }, [user]);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://digipro.test/api/education', {
                portfolio_id: user.portfolio.id,
                ...newItem
            });
            setNewItem({ institution: '', degree: '', start_year: '', end_year: '' });
            fetchEducation();
        } catch (error) {
            alert('Failed to add education');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`https://digipro.test/api/education/${id}`);
            fetchEducation();
        } catch (error) {
            alert('Failed to delete');
        }
    };

    return (
        <div>
            <h2>Manage Education</h2>

            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem', marginTop: '1rem' }}>
                <h3>Add New Education</h3>
                <form onSubmit={handleCreate} style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <input placeholder="Institution" value={newItem.institution} onChange={e => setNewItem({ ...newItem, institution: e.target.value })} style={inputStyle} required />
                        <input placeholder="Degree" value={newItem.degree} onChange={e => setNewItem({ ...newItem, degree: e.target.value })} style={inputStyle} required />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <input placeholder="Start Year" value={newItem.start_year} onChange={e => setNewItem({ ...newItem, start_year: e.target.value })} style={inputStyle} />
                        <input placeholder="End Year" value={newItem.end_year} onChange={e => setNewItem({ ...newItem, end_year: e.target.value })} style={inputStyle} />
                    </div>
                    <button type="submit" style={btnStyle}>Add</button>
                </form>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {education.map(edu => (
                    <div key={edu.id} style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4 style={{ margin: 0 }}>{edu.degree}</h4>
                            <p style={{ fontSize: '0.9rem', color: '#ccc' }}>{edu.institution}</p>
                            <p style={{ fontSize: '0.8rem', color: '#888' }}>{edu.start_year} - {edu.end_year}</p>
                        </div>
                        <button onClick={() => handleDelete(edu.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const inputStyle = { padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid #333', borderRadius: '4px', color: 'white' };
const btnStyle = { padding: '0.5rem 1rem', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };

export default EducationEditor;
