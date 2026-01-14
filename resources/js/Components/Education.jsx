import React from 'react';

const Education = ({ data }) => {
    return (
        <section id="education" className="container" style={{ padding: '100px 0' }}>
            <h2 className="section-title">Education</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                {data.map((edu, index) => (
                    <div key={index} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.5rem' }}>{edu.degree}</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>{edu.institution}</p>
                            {edu.description && <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>{edu.description}</p>}
                        </div>
                        <div style={{ background: 'var(--primary-color)', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 'bold' }}>
                            {edu.start_year} - {edu.end_year}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Education;
