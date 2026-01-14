import React from 'react';

const Hero = ({ data }) => {
  return (
    <section id="hero" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', padding: '0 1rem' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>
        Hi, I'm <span className="text-gradient">{data.full_name}</span>
      </h1>
      <h2 style={{ fontSize: '2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        {data.role_title}
      </h2>
      <p style={{ maxWidth: '600px', fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
        {data.bio}
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <a href="#contact" style={{ padding: '0.8rem 2rem', background: 'var(--primary-color)', color: 'white', borderRadius: '50px', fontWeight: '600' }}>
          Contact Me
        </a>
      </div>
    </section>
  );
};

export default Hero;
