import { useEffect, useRef, useState, useCallback } from 'react';
import { createWebSocket } from '../services/api';

export const useWebSocket = (path = '/ws/tracking') => {
    const [isConnected, setIsConnected] = useState(false);
    const [lastMessage, setLastMessage] = useState(null);
    const [error, setError] = useState(null);
    const wsRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);

    const connect = useCallback(() => {
        try {
            const ws = createWebSocket(path);

            ws.onopen = () => {
                console.log('WebSocket connected');
                setIsConnected(true);
                setError(null);
            };

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    console.log('WebSocket message:', data);
                    setLastMessage(data);
                } catch (err) {
                    console.error('Error parsing WebSocket message:', err);
                }
            };

            ws.onerror = (err) => {
                console.error('WebSocket error:', err);
                setError('WebSocket connection error');
            };

            ws.onclose = () => {
                console.log('WebSocket disconnected');
                setIsConnected(false);

                // Attempt to reconnect after 3 seconds
                reconnectTimeoutRef.current = setTimeout(() => {
                    console.log('Attempting to reconnect...');
                    connect();
                }, 3000);
            };

            wsRef.current = ws;
        } catch (err) {
            console.error('Error creating WebSocket:', err);
            setError(err.message);
        }
    }, [path]);

    const disconnect = useCallback(() => {
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
        }
        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }
    }, []);

    const sendMessage = useCallback((message) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(typeof message === 'string' ? message : JSON.stringify(message));
        } else {
            console.warn('WebSocket is not connected');
        }
    }, []);

    useEffect(() => {
        connect();
        return () => {
            disconnect();
        };
    }, [connect, disconnect]);

    return {
        isConnected,
        lastMessage,
        error,
        sendMessage,
        reconnect: connect,
    };
};
