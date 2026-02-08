import { useApp } from '../context/AppContext';
import AgentFlow from '../components/AgentFlow';
import TrustScore from '../components/TrustScore';
import KPIBlock from '../components/KPIBlock';
import ThreeTruck from '../components/ThreeTruck';
import { Package, TrendingUp, Clock, DollarSign } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
    const { agents, orders, blockchain, isConnected, error } = useApp();

    const kpis = [
        { icon: Package, label: 'Total Orders', value: orders.length || 12, trend: 8 },
        { icon: TrendingUp, label: 'Success Rate', value: '95%', trend: 3 },
        { icon: Clock, label: 'Avg. Delivery', value: '2.3 days', trend: -5 },
        { icon: DollarSign, label: 'Cost Saved', value: '$45K', trend: 12 }
    ];

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1 className="gradient-text">Supply Chain Dashboard</h1>
                <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
                    <div className="status-dot"></div>
                    <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
                </div>
            </div>

            {error && (
                <div className="error-banner">
                    <span>⚠️ {error}</span>
                </div>
            )}

            <div className="kpi-grid grid-4">
                {kpis.map((kpi, index) => (
                    <KPIBlock key={index} {...kpi} />
                ))}
            </div>

            <div className="dashboard-grid">
                <div className="dashboard-section full-width">
                    <h2>Agent Workflow</h2>
                    <AgentFlow />
                </div>

                <div className="dashboard-section">
                    <h2>Performance Metrics</h2>
                    <TrustScore />
                </div>

                <div className="dashboard-section">
                    <h2>3D Visualization</h2>
                    <ThreeTruck />
                </div>

                <div className="dashboard-section full-width">
                    <h2>Active Agents</h2>
                    <div className="agents-grid">
                        {agents.length > 0 ? (
                            agents.map((agent, index) => (
                                <div key={index} className="agent-card card">
                                    <h4>{agent.role}</h4>
                                    <p className="agent-goal">{agent.goal}</p>
                                    <p className="agent-backstory">{agent.backstory}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted">Loading agents...</p>
                        )}
                    </div>
                </div>

                <div className="dashboard-section full-width">
                    <h2>Recent Orders</h2>
                    <div className="orders-list">
                        {orders.length > 0 ? (
                            orders.slice(-5).reverse().map((order, index) => (
                                <div key={index} className="order-item card">
                                    <div className="order-info">
                                        <strong>{order.product}</strong>
                                        <span className="order-id">#{order.order_id}</span>
                                    </div>
                                    <div className="order-destination">{order.destination}</div>
                                    <div className="order-status success">Delivered</div>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted">No orders yet. Create one from the Order page!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
