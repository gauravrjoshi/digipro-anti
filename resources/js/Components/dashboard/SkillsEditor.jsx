import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const SkillsEditor = () => {
    const { user } = useAuth();
    const [skillsMap, setSkillsMap] = useState({});
    const [loading, setLoading] = useState(true);
    // Default category to Languages
    const [newItem, setNewItem] = useState({ name: '', category: 'Languages', proficiency: 50 });

    const fetchSkills = async () => {
        alert('Fetching skills');
        try {
            const slug = user?.portfolio?.slug || 'gaurav';
            const { data } = await axios.get(`https://digipro.test/api/portfolio/${slug}`);
            console.log(data);
            // The API returns skills grouped by category. We can use that directly.
            setSkillsMap(data.data.skills);
        } catch (error) {
            console.error("Error loading skills", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchSkills();
    }, [user]);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://digipro.test/api/skills', {
                portfolio_id: user.portfolio.id,
                ...newItem
            });
            setNewItem({ ...newItem, name: '' }); // keep category same
            fetchSkills();
        } catch (error) {
            alert('Failed to add skill');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`https://digipro.test/api/skills/${id}`);
            fetchSkills();
        } catch (error) {
            alert('Failed to delete');
        }
    };

    return (
        <div>
            <h2>Manage Skills</h2>

            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem', marginTop: '1rem' }}>
                <h3>Add New Skill</h3>
                <form onSubmit={handleCreate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '1rem', marginTop: '1rem' }}>
                    <input placeholder="Skill Name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} style={inputStyle} required />
                    <select value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })} style={inputStyle}>
                        <option value="Languages">Languages</option>
                        <option value="Frameworks">Frameworks</option>
                        <option value="Databases">Databases</option>
                        <option value="Tools & DevOps">Tools & DevOps</option>
                        <option value="Testing & Architecture">Testing & Architecture</option>
                        <option value="CMS">CMS</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="number" placeholder="Proficiency %" value={newItem.proficiency} onChange={e => setNewItem({ ...newItem, proficiency: e.target.value })} style={inputStyle} />
                    <button type="submit" style={btnStyle}>Add</button>
                </form>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                {Object.keys(skillsMap).map(category => (
                    <div key={category}>
                        <h4 style={{ borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '1rem' }}>{category}</h4>
                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                            {skillsMap[category].map(skill => (
                                <div key={skill.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '4px' }}>
                                    <span>{skill.name}</span>
                                    <button onClick={() => handleDelete(skill.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const inputStyle = { padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid #333', borderRadius: '4px', color: 'white' };
const btnStyle = { padding: '0.5rem 1rem', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };

export default SkillsEditor;
