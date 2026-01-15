import React, { useEffect } from 'react';
import Hero from '../Components/Hero';
import Experience from '../Components/Experience';
import Projects from '../Components/Projects';
import Skills from '../Components/Skills';
import Education from '../Components/Education';
import Contact from '../Components/Contact';
import axios from 'axios';
import { Head, Link, usePage } from '@inertiajs/react';

const Portfolio = ({ portfolio }) => {
    const { auth } = usePage().props;

    useEffect(() => {
        // Track view
        if (portfolio?.slug) {
            axios.post(`/api/track/view/${portfolio.slug}`).catch(err => console.error('Tracking failed:', err));
        }
    }, [portfolio?.slug]);

    if (!portfolio) return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: 'white' }}>
            Portfolio not found
        </div>
    );

    return (
        <div className="portfolio-container" style={{ background: '#080a11', color: 'white', minHeight: '100vh', position: 'relative' }}>
            <Head title={portfolio.full_name} />

            {auth.user && (
                <div className="dashboard-nav-container">
                    <Link
                        href={route('dashboard')}
                        className="btn-premium dashboard-nav-link"
                    >
                        <span>🏠</span>
                        <span className="btn-text">{auth.user.id === portfolio.user_id ? 'Edit Portfolio' : 'My Dashboard'}</span>
                    </Link>
                </div>
            )}

            <Hero data={portfolio} />
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                <Experience data={portfolio.experiences || []} />
                <Projects data={portfolio.projects || []} />
                <Skills data={portfolio.skills || []} />
                <Education data={portfolio.education || []} />
                <Contact data={portfolio.contact || {}} />
            </div>

            <footer style={{ textAlign: 'center', padding: '4rem 2rem', color: '#64748b', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
                <p>© {new Date().getFullYear()} {portfolio.full_name}. All rights reserved.</p>
                <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Built with SW DigiPro</p>
            </footer>
        </div>
    );
};

export default Portfolio;
