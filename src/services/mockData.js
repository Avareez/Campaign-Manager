export const TOWNS = [
    'Cracow', 'Warsaw', 'Los Angeles', 'New York', 'London',
    'Paris', 'Toronto', 'Madrit', 'Rome', 'Berlin',
];

export const KEYWORDS_SUGGESTIONS = [
    'electronics', 'smartphones', 'laptops', 'tablets', 'headphones',
    'cameras', 'gaming', 'accessories', 'sale', 'discount',
    'new arrivals', 'best sellers', 'premium', 'wireless', 'bluetooth',
];

export const INITIAL_BALANCE = 50000.00;

export const MOCK_CAMPAIGNS = [
    {
        id: crypto.randomUUID(),
        name: 'Summer Electronics Sale',
        keywords: ['electronics', 'sale', 'discount'],
        bidAmount: 1.50,
        campaignFund: 500.00,
        status: 'on',
        town: 'Cracow',
        radius: 25,
        createdAt: new Date().toISOString(),
    },
    {
        id: crypto.randomUUID(),
        name: 'Premium Smartphones',
        keywords: ['smartphones', 'premium', 'new arrivals'],
        bidAmount: 2.00,
        campaignFund: 750.00,
        status: 'on',
        town: 'London',
        radius: 15,
        createdAt: new Date().toISOString(),
    },
    {
        id: crypto.randomUUID(),
        name: 'Gaming Gear Promo',
        keywords: ['gaming', 'accessories', 'bluetooth'],
        bidAmount: 1.20,
        campaignFund: 300.00,
        status: 'off',
        town: 'Los Angeles',
        radius: 10,
        createdAt: new Date().toISOString(),
    },
];