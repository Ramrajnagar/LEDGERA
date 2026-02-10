
"use client";

import { createContext, useContext, useEffect, useState } from 'react';

const SimulationContext = createContext(null);

export function SimulationProvider({ children }) {
    const [recentBlocks, setRecentBlocks] = useState([]);
    const [systemAlerts, setSystemAlerts] = useState([]);
    const [networkLoad, setNetworkLoad] = useState(45); // %

    // Simulate Network Load Fluctuation
    useEffect(() => {
        const interval = setInterval(() => {
            setNetworkLoad(prev => {
                const change = (Math.random() - 0.5) * 10;
                return Math.min(Math.max(prev + change, 20), 98);
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Simulate Block Mining
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.3) return; // Only 70% chance

            const newBlock = {
                hash: '0x' + Math.random().toString(16).substr(2, 8) + '...',
                timestamp: new Date().toLocaleTimeString(),
                transactions: Math.floor(Math.random() * 50) + 1,
                validator: 'Node-' + Math.floor(Math.random() * 100)
            };

            setRecentBlocks(prev => [newBlock, ...prev].slice(0, 5));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Simulate IoT Alerts
    useEffect(() => {
        const alerts = [
            { type: 'warning', msg: 'Temp deviation detected on R-204' },
            { type: 'success', msg: 'Shipment #8839 Customs Cleared' },
            { type: 'info', msg: 'New node joined the network' },
            { type: 'error', msg: 'Connection timeout: Node-42 (Retrying)' }
        ];

        const interval = setInterval(() => {
            if (Math.random() > 0.4) return;

            const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
            const alertWithId = { ...randomAlert, id: Date.now(), time: new Date().toLocaleTimeString() };

            setSystemAlerts(prev => [alertWithId, ...prev].slice(0, 8));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <SimulationContext.Provider value={{ recentBlocks, systemAlerts, networkLoad }}>
            {children}
        </SimulationContext.Provider>
    );
}

export const useSimulation = () => useContext(SimulationContext);
