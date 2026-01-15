import React from 'react';

const Experience = ({ data }) => {
    return (
        <section id="experience" className="container" style={{ padding: '100px 0' }}>
            <h2 className="text-premium" style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center' }}>Experience</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {data.map((exp, idx) => (
                    <div key={idx} style={{
                        background: 'rgba(255,255,255,0.02)',
                        padding: '2rem',
                        borderRadius: '20px',
                        border: '1px solid rgba(255,255,255,0.05)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--premium-gradient)' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'white' }}>{exp.job_role || exp.role}</h3>
                                <p style={{ color: 'var(--primary-color)', fontWeight: '600', marginBottom: '0.5rem' }}>{exp.company_name || exp.company}</p>
                            </div>
                            <div style={{ padding: '0.4rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50px', fontSize: '0.85rem', color: '#94a3b8' }}>
                                {exp.duration || (exp.start_date + ' - ' + (exp.end_date || 'Present'))}
                            </div>
                        </div>
                        <p style={{ color: '#94a3b8', marginTop: '1rem', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
