import React from 'react';

const Skills = ({ data }) => {
    // data comes grouped by category from the API Resource: {"Languages": [...], "Frameworks": [...]}
    // We need to iterate over keys
    return (
        <section id="skills" className="container" style={{ padding: '100px 0' }}>
            <h2 className="section-title">Technical <span className="text-gradient">Skills</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {Object.keys(data).map((category, index) => (
                    <div key={index} className="glass-card">
                        <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>{category}</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                            {data[category].map((skill, sIdx) => (
                                <span key={sIdx} style={{
                                    padding: '0.5rem 1rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '50px',
                                    fontSize: '0.9rem',
                                    border: '1px solid var(--glass-border)'
                                }}>
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
