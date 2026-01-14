import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children, slug: propSlug }) => {
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams();

    useEffect(() => {
        const slug = propSlug || params.slug || 'gaurav';

        axios.get(`/api/portfolio/${slug}`)
            .then(response => {
                setPortfolio(response.data.data);
                setLoading(false);
                // Dynamically update title/theme if needed
                if (response.data.data.theme_color) {
                    document.documentElement.style.setProperty('--primary-color', response.data.data.theme_color);
                }
            })
            .catch(err => {
                console.error("Failed to fetch portfolio", err);
                setError("Failed to load portfolio data");
                setLoading(false);
            });
    }, []);

    return (
        <PortfolioContext.Provider value={{ portfolio, loading, error }}>
            {children}
        </PortfolioContext.Provider>
    );
};

export const usePortfolio = () => useContext(PortfolioContext);
