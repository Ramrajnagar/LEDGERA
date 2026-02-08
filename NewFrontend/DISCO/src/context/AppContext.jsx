import { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    const [agents, setAgents] = useState([]);
    const [blockchain, setBlockchain] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    // Fetch agents on mount
    useEffect(() => {
        fetchAgents();
        checkConnection();
    }, []);

    const checkConnection = async () => {
        try {
            await apiService.healthCheck();
            setIsConnected(true);
            setError(null);
        } catch (err) {
            setIsConnected(false);
            setError('Cannot connect to backend');
            console.error('Backend connection failed:', err);
        }
    };

    const fetchAgents = async () => {
        try {
            setLoading(true);
            const data = await apiService.getAgents();
            setAgents(data.agents || []);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to fetch agents');
            console.error('Error fetching agents:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchBlockchain = async () => {
        try {
            setLoading(true);
            const data = await apiService.getBlockchain();
            setBlockchain(data.chain || []);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to fetch blockchain');
            console.error('Error fetching blockchain:', err);
        } finally {
            setLoading(false);
        }
    };

    const createOrder = async (orderData) => {
        try {
            setLoading(true);
            setError(null);
            const result = await apiService.createOrder(orderData);

            // Add order to local state
            setOrders(prev => [...prev, { ...orderData, result }]);

            // Refresh blockchain
            await fetchBlockchain();

            return result;
        } catch (err) {
            setError(err.message || 'Failed to create order');
            console.error('Error creating order:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        agents,
        blockchain,
        orders,
        loading,
        error,
        isConnected,
        fetchAgents,
        fetchBlockchain,
        createOrder,
        checkConnection,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
