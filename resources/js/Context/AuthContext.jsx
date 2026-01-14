import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';
axios.defaults.headers.common['Accept'] = 'application/json';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const csrf = async () => {
        await axios.get('/sanctum/csrf-cookie'); // Still need this to set the session cookie
        const { data } = await axios.get('/csrf-token'); // Get the token value manually
        console.log(data);
        axios.defaults.headers.common['X-CSRF-TOKEN'] = data.token; // Set it globally as X-CSRF-TOKEN (Raw)
    };

    const getUser = async () => {
        try {
            const { data } = await axios.get('/api/user');
            setUser(data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        await csrf();
        await axios.post('/login', credentials);
        await getUser();
    };

    const register = async (userData) => {
        await csrf();
        await axios.post('/register', userData);
        await getUser();
    };

    const logout = async () => {
        await axios.post('/logout');
        setUser(null);
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
