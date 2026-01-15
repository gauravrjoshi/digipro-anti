export const PRICING_CONFIG = {
    free: {
        id: 'free',
        name: 'Free',
        price: 0,
        cta: 'Create Your Portfolio Free',
        features: [
            'Basic portfolio',
            'Up to 5 projects',
            'Standard themes',
            'Subdomain (yoursite.com/username)',
            'Platform branding visible'
        ]
    },
    pro: {
        id: 'pro',
        name: 'Pro',
        monthlyPrice: 99,
        yearlyPrice: 999,
        cta: 'Upgrade to Pro',
        features: [
            'Unlimited projects',
            'Premium themes',
            'Custom subdomain',
            'Analytics dashboard',
            'Remove branding',
            'Email support'
        ]
    }
};
