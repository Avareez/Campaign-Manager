const CAMPAIGNS_KEY = 'campaigns';
const BALANCE_KEY = 'emeraldBalance';

export const storageService = {
    getCampaigns() {
        const data = localStorage.getItem(CAMPAIGNS_KEY);
        return data ? JSON.parse(data) : [];
    },

    saveCampaigns(campaigns) {
        localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(campaigns));
    },

    getBalance() {
        const data = localStorage.getItem(BALANCE_KEY);
        return data ? parseFloat(data) : 50000.00;
    },

    saveBalance(balance) {
        localStorage.setItem(BALANCE_KEY, balance.toFixed(2));
    },

    addCampaign(campaign) {
        const campaigns = this.getCampaigns();
        const newCampaign = {
            ...campaign,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
        };
        campaigns.push(newCampaign);
        this.saveCampaigns(campaigns);
        return newCampaign;
    },

    updateCampaign(id, updatedData) {
        const campaigns = this.getCampaigns();
        const index = campaigns.findIndex((c) => c.id === id);
        if (index === -1) return null;
        campaigns[index] = { ...campaigns[index], ...updatedData };
        this.saveCampaigns(campaigns);
        return campaigns[index];
    },

    deleteCampaign(id) {
        const campaigns = this.getCampaigns();
        const filtered = campaigns.filter((c) => c.id !== id);
        this.saveCampaigns(filtered);
    },
};