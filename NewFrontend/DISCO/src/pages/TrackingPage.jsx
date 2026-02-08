import { useState, useEffect } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import MapView from '../components/MapView';
import AgentFlow from '../components/AgentFlow';
import { Navigation, Clock, Package } from 'lucide-react';
import './TrackingPage.css';

export default function TrackingPage() {
    const { isConnected, lastMessage } = useWebSocket('/ws/tracking');
    const [trackingData, setTrackingData] = useState([]);
    const [currentStage, setCurrentStage] = useState(null);

    useEffect(() => {
        if (lastMessage) {
            setTrackingData(prev => [...prev, lastMessage]);

            if (lastMessage.stage) {
                setCurrentStage(lastMessage.stage);
            }
        }
    }, [lastMessage]);

    const markers = [
        { lat: 28.6139, lng: 77.2090, name: 'Supplier', description: 'Delhi, India' },
        { lat: 19.0760, lng: 72.8777, name: 'Warehouse', description: 'Mumbai, India' },
        { lat: 13.0827, lng: 80.2707, name: 'Distribution', description: 'Chennai, India' }
    ];

    return (
        <div className="tracking-page-container">
            <h1 className="gradient-text">Real-Time Order Tracking</h1>

            <div className="tracking-layout">
                <div className="tracking-main">
                    <div className="map-section card">
                        <div className="section-header">
                            <Navigation size={24} />
                            <h2>Route Visualization</h2>
                        </div>
                        <MapView markers={markers} />
                    </div>

                    <div className="workflow-section card">
                        <div className="section-header">
                            <Package size={24} />
                            <h2>Workflow Progress</h2>
                        </div>
                        <AgentFlow currentStage={currentStage} />
                    </div>
                </div>

                <div className="tracking-sidebar">
                    <div className="connection-card card">
                        <h3>WebSocket Status</h3>
                        <div className={`ws-status ${isConnected ? 'connected' : 'disconnected'}`}>
                            <div className="status-dot"></div>
                            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
                        </div>
                    </div>

                    <div className="timeline-card card">
                        <div className="section-header">
                            <Clock size={24} />
                            <h3>Tracking Timeline</h3>
                        </div>
                        <div className="timeline">
                            {trackingData.length > 0 ? (
                                trackingData.map((item, index) => (
                                    <div key={index} className="timeline-item">
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-content">
                                            <strong>{item.stage || item.type}</strong>
                                            <p>{item.status || item.message}</p>
                                            {item.progress && (
                                                <div className="progress-bar">
                                                    <div
                                                        className="progress-fill"
                                                        style={{ width: `${item.progress}%` }}
                                                    ></div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted">Waiting for tracking updates...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
