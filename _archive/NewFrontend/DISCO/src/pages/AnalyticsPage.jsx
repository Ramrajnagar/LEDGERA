import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Database, TrendingUp, Activity } from 'lucide-react';
import './AnalyticsPage.css';

export default function AnalyticsPage() {
    const { blockchain, fetchBlockchain } = useApp();

    useEffect(() => {
        fetchBlockchain();
    }, []);

    // Sample performance data
    const performanceData = [
        { month: 'Jan', orders: 45, delivered: 42, cost: 12000 },
        { month: 'Feb', orders: 52, delivered: 50, cost: 15000 },
        { month: 'Mar', orders: 48, delivered: 47, cost: 13500 },
        { month: 'Apr', orders: 61, delivered: 58, cost: 17000 },
        { month: 'May', orders: 55, delivered: 54, cost: 16000 },
        { month: 'Jun', orders: 67, delivered: 65, cost: 19000 }
    ];

    const trustData = [
        { metric: 'On-Time', score: 92 },
        { metric: 'Cost Eff.', score: 88 },
        { metric: 'Success', score: 95 },
        { metric: 'Quality', score: 91 }
    ];

    return (
        <div className="analytics-page-container">
            <h1 className="gradient-text">Analytics & Insights</h1>

            <div className="analytics-grid">
                <div className="chart-section card full-width">
                    <div className="section-header">
                        <TrendingUp size={24} />
                        <h2>Performance Overview</h2>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={performanceData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="month" stroke="var(--color-text-secondary)" />
                            <YAxis stroke="var(--color-text-secondary)" />
                            <Tooltip
                                contentStyle={{
                                    background: 'var(--color-bg-tertiary)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: 'var(--radius-md)'
                                }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} />
                            <Line type="monotone" dataKey="delivered" stroke="#10b981" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-section card">
                    <div className="section-header">
                        <Activity size={24} />
                        <h2>Trust Metrics</h2>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={trustData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="metric" stroke="var(--color-text-secondary)" />
                            <YAxis stroke="var(--color-text-secondary)" />
                            <Tooltip
                                contentStyle={{
                                    background: 'var(--color-bg-tertiary)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: 'var(--radius-md)'
                                }}
                            />
                            <Bar dataKey="score" fill="url(#colorGradient)" />
                            <defs>
                                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#8b5cf6" />
                                </linearGradient>
                            </defs>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="blockchain-section card">
                    <div className="section-header">
                        <Database size={24} />
                        <h2>Blockchain Explorer</h2>
                    </div>
                    <div className="blockchain-list">
                        {blockchain && blockchain.length > 0 ? (
                            blockchain.slice().reverse().map((block, index) => (
                                <div key={block.index} className="block-card">
                                    <div className="block-header">
                                        <span className="block-index">Block #{block.index}</span>
                                        <span className="block-time">
                                            {new Date(block.timestamp * 1000).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="block-data">
                                        <strong>Event:</strong> {block.data?.event || 'N/A'}
                                    </div>
                                    <div className="block-hash">
                                        <strong>Hash:</strong> {block.hash?.substring(0, 16)}...
                                    </div>
                                    {block.data?.trust_score && (
                                        <div className="block-trust">
                                            Trust Score: {block.data.trust_score}
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-muted">No blockchain data available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
