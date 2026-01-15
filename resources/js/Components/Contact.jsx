import React from 'react';

const socialIcons = {
    x: '𝕏',
    github: '🐙',
    linkedin: '💼',
    website: '🌐'
};


const Contact = ({ data }) => {
    console.log(data);
    return (
        <section id="contact" className="container contact-section">
            <h2 className="text-premium" style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center' }}>Get In Touch</h2>
            <div className="contact-grid">
                <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Contact Info</h3>
                    <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Feel free to reach out for collaborations or just a friendly hello!</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {data.email && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '40px', height: '40px', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>📧</div>
                                <div>
                                    <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Email</p>
                                    <p style={{ fontWeight: '500' }}>{data.email}</p>
                                </div>
                            </div>
                        )}
                        {data.phone && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '40px', height: '40px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>📞</div>
                                <div>
                                    <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Phone</p>
                                    <p style={{ fontWeight: '500' }}>{data.phone}</p>
                                </div>
                            </div>
                        )}
                        {data.address && data.address.length > 0 && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '40px', height: '40px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🏚️</div>
                                <div>
                                    <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Address</p>
                                    <p style={{ fontWeight: '500' }}>{data.address}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="contact-form-row">
                        <input type="text" placeholder="Name" style={{ padding: '0.8rem 1.2rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white', outline: 'none' }} />
                        <input type="email" placeholder="Email" style={{ padding: '0.8rem 1.2rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white', outline: 'none' }} />
                    </div>
                    <textarea placeholder="Message" rows="5" style={{ padding: '0.8rem 1.2rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white', outline: 'none', resize: 'none' }}></textarea>
                    <button type="button" className="btn-premium" style={{ padding: '1rem', marginTop: '1rem' }}>Send Message</button>
                </form> */}
            </div>
            {data.social_links && data.social_links.length > 0 && (
                <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                    {data.social_links.map((link, index) => (
                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', fontSize: '1.5rem', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = 'var(--primary-color)'} onMouseOut={e => e.target.style.color = '#94a3b8'}>
                            {link.platform}
                        </a>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Contact;
