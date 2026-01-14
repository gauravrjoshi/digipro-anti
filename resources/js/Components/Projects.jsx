import React from 'react';

const Projects = ({ data }) => {
    return (
        <section id="projects" className="container" style={{ padding: '100px 0' }}>
            <h2 className="section-title">My <span className="text-gradient">Projects</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {data.map((project, index) => (
                    <div key={index} className="glass-card" style={{ transition: 'transform 0.3s ease', cursor: 'pointer' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                        <h3 style={{ marginBottom: '1rem' }}>{project.title}</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{project.description}</p>
                        {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                Visit Site <span>→</span>
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
