import { useEffect, useState } from 'react';
import { Users, Warehouse, Truck, Store } from 'lucide-react';
import './AgentFlow.css';

export default function AgentFlow({ currentStage = null }) {
  const [activeStage, setActiveStage] = useState(0);

  const agents = [
    { name: 'Supplier', icon: Users, color: '#3b82f6' },
    { name: 'Warehouse', icon: Warehouse, color: '#8b5cf6' },
    { name: 'Transport', icon: Truck, color: '#06b6d4' },
    { name: 'Retailer', icon: Store, color: '#10b981' }
  ];

  useEffect(() => {
    if (currentStage !== null) {
      const stageIndex = agents.findIndex(a => a.name === currentStage);
      if (stageIndex !== -1) {
        setActiveStage(stageIndex);
      }
    } else {
      // Auto-animate through stages for demo
      const interval = setInterval(() => {
        setActiveStage(prev => (prev + 1) % agents.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [currentStage]);

  return (
    <div className="agent-flow-container">
      <div className="agent-flow">
        {agents.map((agent, index) => {
          const Icon = agent.icon;
          const isActive = index === activeStage;
          const isPassed = index < activeStage;

          return (
            <div key={agent.name} className="agent-item-wrapper">
              <div
                className={`agent-item ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                style={{ '--agent-color': agent.color }}
              >
                <div className="agent-icon-wrapper">
                  <Icon className="agent-icon" size={32} />
                </div>
                <p className="agent-name">{agent.name}</p>
                {isActive && <div className="pulse-ring"></div>}
              </div>
              {index < agents.length - 1 && (
                <div className={`connection-line ${isPassed || isActive ? 'active' : ''}`}>
                  <div className="flow-animation"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
