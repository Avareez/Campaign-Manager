import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { storageService } from "../services/storage";
import { MOCK_CAMPAIGNS } from "../services/mockData";

const AppContext = createContext(null);

export function AppProvider({ children }) {
    const [campaigns, setCampaigns] = useState([]);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const stored = storageService.getCampaigns();
        if (stored.length === 0) {
            storageService.saveCampaigns(MOCK_CAMPAIGNS);
            setCampaigns(MOCK_CAMPAIGNS);
        } else {
            setCampaigns(stored);
        }
        setBalance(storageService.getBalance());
    }, []);

    const addCampaign = useCallback((campaignData) => {
        const newCampaign = storageService.addCampaign(campaignData);
        const newBalance = balance - campaignData.campaignFund;
        storageService.saveBalance(newBalance);
        setBalance(newBalance);
        setCampaigns((prev) => [...prev, newCampaign]);
        return newCampaign;
    }, [balance]);

    const updateCampaign = useCallback((id, updatedData, originalFund) => {
        const fundDiff = updatedData.campaignFund - originalFund;
        const newBalance = balance - fundDiff;
        storageService.saveBalance(newBalance);
        storageService.updateCampaign(id, updatedData);
        setBalance(newBalance);
        setCampaigns((prev) =>
            prev.map((c) => (c.id === id ? { ...c, ...updatedData } : c))
        );
    }, [balance]);

    const deleteCampaign = useCallback((id) => {
        const campaign = campaigns.find((c) => c.id === id);
        if (!campaign) return;
        const newBalance = balance + campaign.campaignFund;
        storageService.saveBalance(newBalance);
        storageService.deleteCampaign(id);
        setBalance(newBalance);
        setCampaigns((prev) => prev.filter((c) => c.id !== id));
    }, [balance, campaigns]);

    return (
        <AppContext.Provider value={{ campaigns, balance, addCampaign, updateCampaign, deleteCampaign }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used within AppProvider');
    return context;
}