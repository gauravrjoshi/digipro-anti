import React from 'react';

const Education = ({ data }) => {
    return (
        <section id="education" className="container" style={{ padding: '100px 0' }}>
            <h2 className="text-premium" style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center' }}>Education & Certs</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {data.map((edu, idx) => (
                    <div key={idx} style={{
                        background: 'rgba(255,255,255,0.03)',
                        padding: '2rem',
                        borderRadius: '20px',
                        border: '1px solid rgba(255,255,255,0.05)',
                        transition: 'transform 0.3s ease'
                    }}
                        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>{edu.degree}</h3>
                        <p style={{ color: 'var(--primary-color)', fontWeight: '500', marginTop: '0.25rem' }}>{edu.institution}</p>
                        <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.5rem' }}>{edu.year_range}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Education;
