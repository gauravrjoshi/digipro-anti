import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const ProjectsEditor = () => {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newItem, setNewItem] = useState({ title: '', description: '', link: '' });

    // Fetch projects via the main portfolio endpoint for now, or we could make a specific endpoint
    const fetchProjects = async () => {
        try {
            // Assuming user has a portfolio. In real app, check user.portfolio.slug
            const slug = user?.portfolio?.slug || 'gaurav';
            const { data } = await axios.get(`https://digipro.test/api/portfolio/${slug}`);
            setProjects(data.data.projects);
        } catch (error) {
            console.error("Error loading projects", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchProjects();
    }, [user]);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://digipro.test/api/projects', {
                portfolio_id: user.portfolio.id, // We need to ensure user object has portfolio loaded
                ...newItem
            });
            setNewItem({ title: '', description: '', link: '' });
            fetchProjects();
        } catch (error) {
            alert('Failed to create project');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`https://digipro.test/api/projects/${id}`);
            fetchProjects();
        } catch (error) {
            alert('Failed to delete');
        }
    };

    return (
        <div>
            <h2>Manage Projects</h2>

            {/* Create Form */}
            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem', marginTop: '1rem' }}>
                <h3>Add New Project</h3>
                <form onSubmit={handleCreate} style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                    <input placeholder="Project Title" value={newItem.title} onChange={e => setNewItem({ ...newItem, title: e.target.value })} style={inputStyle} required />
                    <textarea placeholder="Description" value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.target.value })} style={inputStyle} />
                    <input placeholder="Link URL" value={newItem.link} onChange={e => setNewItem({ ...newItem, link: e.target.value })} style={inputStyle} />
                    <button type="submit" style={btnStyle}>Add Project</button>
                </form>
            </div>

            {/* List */}
            <div style={{ display: 'grid', gap: '1rem' }}>
                {projects.map(proj => (
                    <div key={proj.id} style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4 style={{ margin: 0 }}>{proj.title}</h4>
                            <p style={{ fontSize: '0.9rem', color: '#ccc' }}>{proj.description}</p>
                        </div>
                        <button onClick={() => handleDelete(proj.id)} style={{ ...btnStyle, background: '#ef4444' }}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const inputStyle = { padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid #333', borderRadius: '4px', color: 'white' };
const btnStyle = { padding: '0.5rem 1rem', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };

export default ProjectsEditor;
