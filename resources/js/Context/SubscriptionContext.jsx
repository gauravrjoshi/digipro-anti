import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
    const { user } = useAuth();
    const [subscriptionStatus, setSubscriptionStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchStatus = async () => {
        if (!user) {
            setSubscriptionStatus(null);
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.get('/api/subscription/status');
            setSubscriptionStatus(data);
        } catch (error) {
            console.error('Failed to fetch subscription status', error);
            setSubscriptionStatus(null);
        } finally {
            setLoading(false);
        }
    };

    const createCheckout = async () => {
        try {
            const { data } = await axios.post('/api/subscription/checkout');
            window.location.href = data.checkout_url;
        } catch (error) {
            console.error('Failed to create checkout session', error);
            throw error;
        }
    };

    const openBillingPortal = async () => {
        try {
            const { data } = await axios.post('/api/subscription/portal');
            window.location.href = data.url;
        } catch (error) {
            console.error('Failed to open billing portal', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchStatus();
    }, [user]);

    return (
        <SubscriptionContext.Provider value={{
            subscriptionStatus,
            loading,
            createCheckout,
            openBillingPortal,
            refetch: fetchStatus
        }}>
            {children}
        </SubscriptionContext.Provider>
    );
};

export const useSubscription = () => useContext(SubscriptionContext);
