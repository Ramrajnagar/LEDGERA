"use client";

import dynamic from 'next/dynamic';
import AgentDecisionFeed from '@/components/dashboard/AgentDecisionFeed';
import TrustScoreWidget from '@/components/dashboard/TrustScoreWidget';
import EscrowTimeline from '@/components/dashboard/EscrowTimeline';
import FadeIn from '@/components/ui/FadeIn';
// import DigitalTwinWidget from '@/components/dashboard/DigitalTwinWidget';
const DigitalTwinWidget = dynamic(() => import('../../components/dashboard/DigitalTwinWidget'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-control-panel animate-pulse" />
});

// const MapWidget = dynamic(() => import('../../components/dashboard/MapWidget'), {
//     ssr: false,
//     loading: () => <div className="w-full h-full bg-control-panel animate-pulse" />
// });

// Using relative import for now as per previous fix
const MapWidget = dynamic(() => import('../../components/dashboard/MapWidget'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-control-panel animate-pulse" />
});


export default function DashboardPage() {
    return (
        <div className="p-6 h-screen flex flex-col overflow-hidden bg-control-dark font-sans text-control-text selection:bg-control-cyan/30">
            <header className="flex-none mb-6 flex justify-between items-end border-b border-control-border/50 pb-4">
                <div>
                    <h1 className="text-2xl font-mono font-medium tracking-tight text-white mb-1 drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]">CONTROL_ROOM</h1>
                    <p className="text-xs font-mono text-control-muted uppercase tracking-widest">System Status: Nominal</p>
                </div>
                <div className="flex gap-4">
                    <div className="px-3 py-1 border border-control-border rounded bg-control-panel text-xs font-mono flex items-center gap-2 shadow-[0_0_5px_rgba(34,211,238,0.1)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-control-success animate-pulse shadow-[0_0_8px_rgba(72,187,120,0.8)]" />
                        NETWORK_ACTIVE
                    </div>
                </div>
            </header>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 min-h-0">
                {/* Main Map View */}
                <div className="col-span-1 md:col-span-12 lg:col-span-8 flex flex-col gap-6 min-h-0">
                    <div className="flex-[3] bg-control-panel border border-control-border relative overflow-hidden flex flex-col shadow-lg min-h-0">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-control-cyan/50 to-transparent opacity-50" />
                        <MapWidget />
                    </div>
                </div>


                {/* Side Panel Widgets */}
                <div className="col-span-1 md:col-span-12 lg:col-span-4 flex flex-col gap-6 min-h-0">
                    {/* Digital Twin & Feed Group */}
                    <div className="flex-1 min-h-0 grid grid-rows-2 gap-6">
                        <FadeIn delay={0.2} className="relative group h-full">
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-control-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded blur" />
                            <DigitalTwinWidget />
                        </FadeIn>
                        <FadeIn delay={0.3} className="relative group min-h-0 h-full">
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-control-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded blur" />
                            <AgentDecisionFeed />
                        </FadeIn>
                    </div>

                    {/* Lower Widgets */}
                    <div className="flex-none h-[200px] flex flex-col gap-6">
                        <FadeIn delay={0.4} className="flex-1 relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-control-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded blur" />
                            <EscrowTimeline />
                        </FadeIn>
                        <FadeIn delay={0.5} className="flex-none h-[80px] relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-control-success/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded blur" />
                            <TrustScoreWidget />
                        </FadeIn>
                    </div>
                </div>
            </div>
        </div>
    );
}
