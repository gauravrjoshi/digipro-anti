import React from 'react';

const Hero = ({ data }) => {
  return (
    <section id="hero" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', padding: '0 1rem' }}>
      {data.profile_picture?.show_on_portfolio && data.profile_picture?.url && (
        <div style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          overflow: 'hidden',
          marginBottom: '2rem',
          border: '4px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 0 30px rgba(0,0,0,0.3)',
          background: 'rgba(255, 255, 255, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src={data.profile_picture.url}
            alt={data.full_name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
      )}
      <h1 style={{ fontSize: '4.5rem', fontWeight: 'bold', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
        Hi, I'm <span className="text-premium">{data.full_name}</span>
      </h1>
      <h2 style={{ fontSize: '2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        {data.role_title}
      </h2>
      <p style={{ maxWidth: '600px', fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
        {data.bio}
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <a href="#contact" className="btn-premium" style={{ padding: '0.9rem 2.5rem', textDecoration: 'none' }}>
          Contact Me
        </a>
        {data.resume?.has_resume && data.resume?.show_on_portfolio && (
          <a
            href={data.resume.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.9rem 2.5rem',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'white',
              borderRadius: '50px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Download Resume
          </a>
        )}
      </div>
      {!data.resume?.has_resume && (
        <p style={{ marginTop: '1.5rem', color: '#64748b', fontSize: '0.9rem' }}>
          Resume not added yet
        </p>
      )}
    </section>
  );
};

export default Hero;
