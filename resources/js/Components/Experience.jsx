import React from 'react';

const Experience = ({ data }) => {
    return (
        <section id="experience" className="container" style={{ padding: '100px 0' }}>
            <h2 className="section-title">Work <span className="text-gradient">Experience</span></h2>
            <div className="timeline">
                {data.map((exp, index) => (
                    <div key={index} className="timeline-item">
                        <div className="timeline-dot"></div>

                        <div className="glass-card timeline-content">
                            <span className="timeline-date">{exp.start_date} - {exp.end_date || 'Present'}</span>
                            <h3 className="timeline-role">{exp.role}</h3>
                            <p className="timeline-company">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>

                            {exp.description && (
                                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>
                                    {exp.description}
                                </p>
                            )}

                            {exp.details && Array.isArray(exp.details) && (
                                <ul className="project-details">
                                    {exp.details.map((detail, dIdx) => (
                                        <li key={dIdx}>{detail}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
