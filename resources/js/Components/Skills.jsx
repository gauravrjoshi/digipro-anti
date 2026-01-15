import React from 'react';

const Skills = ({ data }) => {
    return (
        <section id="skills" className="container" style={{ padding: '100px 0' }}>
            <h2 className="text-premium" style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center' }}>Skills & Expertise</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                {data.map((skill, idx) => (
                    <div key={idx} style={{
                        padding: '0.75rem 1.75rem',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '100px',
                        border: '1px solid rgba(255,255,255,0.08)',
                        transition: 'all 0.3s ease',
                        cursor: 'default',
                        fontWeight: '500',
                        color: '#cbd5e1'
                    }}
                        onMouseOver={e => {
                            e.currentTarget.style.background = 'rgba(14, 165, 233, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.3)';
                            e.currentTarget.style.color = 'white';
                        }}
                        onMouseOut={e => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                            e.currentTarget.style.color = '#cbd5e1';
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span>{skill.name}</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--primary-color)', opacity: 0.8 }}>{skill.proficiency}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
