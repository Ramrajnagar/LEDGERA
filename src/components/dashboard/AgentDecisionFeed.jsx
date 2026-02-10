
"use client";

import { Activity } from 'lucide-react';
import { useSimulation } from '@/context/SimulationContext';

const decisions = [
    { id: 1, time: '10:42:15', agent: 'LOGISTICS_OPT', action: 'REROUTE_INITIATED', target: 'SHIPMENT-892', reason: 'Weather System detected in Sector 7G. Delay probability 85%.', type: 'warning' },
    { id: 2, time: '10:41:02', agent: 'FINANCE_EXE', action: 'FUNDS_LOCKED', target: 'ESCROW-221', reason: 'Verification pending from Customs Node #4.', type: 'info' },
    { id: 3, time: '10:38:55', agent: 'SECURITY_AI', action: 'IDENTITY_VERIFIED', target: 'DRIVER-ORG-5', reason: 'Biometric handshake complete. Trust Score updated.', type: 'success' },
];

export default function AgentDecisionFeed() {
    const simulation = useSimulation();
    const systemAlerts = simulation?.systemAlerts || [];

    // Combine live alerts with static baseline
    const displayFeed = [...systemAlerts, ...decisions].slice(0, 10);

    return (
        <div className="flex flex-col h-full bg-control-panel border border-control-border">
            <div className="p-4 border-b border-control-border flex justify-between items-center bg-control-dark/50">
                <h3 className="text-xs font-mono text-control-muted uppercase flex items-center gap-2">
                    <Activity className="w-4 h-4 text-control-cyan" />
                    <span>Agent Decisions</span>
                </h3>
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-control-success animate-pulse" />
                    <span className="text-[10px] font-mono text-control-cyan tracking-wider">LIVE_STREAM</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono">
                {displayFeed.map((d) => (
                    <div key={d.id} className="relative pl-4 border-l border-control-border hover:border-control-cyan/50 transition-colors group">
                        <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-control-dark border border-control-border group-hover:border-control-cyan transition-colors" />

                        <div className="flex justify-between items-start mb-1">
                            <span className="text-[10px] text-control-muted">{d.time}</span>
                            <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded ${d.type === 'warning' ? 'bg-control-danger/20 text-control-danger' :
                                    d.type === 'success' ? 'bg-control-success/20 text-control-success' :
                                        d.type === 'error' ? 'bg-red-500/20 text-red-500' :
                                            'bg-control-cyan/10 text-control-cyan'
                                }`}>
                                {d.agent || 'SYSTEM_AI'}
                            </span>
                        </div>

                        <div className="text-xs font-medium text-control-text mb-1 group-hover:text-white">
                            {d.action || 'ALERT'} <span className="text-control-muted">::</span> {d.target || d.msg}
                        </div>

                        <div className="text-[10px] text-control-muted leading-relaxed">
                            {d.reason || d.msg}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
