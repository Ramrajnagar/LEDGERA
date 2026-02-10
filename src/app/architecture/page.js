
import Link from 'next/link';
import { ArrowLeft, Cpu, Database, Globe, Lock, ShieldCheck } from 'lucide-react';
import SystemDiagram from '@/components/architecture/SystemDiagram';

export default function ArchitecturePage() {
    return (
        <main className="min-h-screen bg-control-dark text-control-text p-8 md:p-16">
            <div className="max-w-4xl mx-auto">
                <header className="mb-16">
                    <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-control-muted hover:text-control-cyan mb-6 transition-colors">
                        <ArrowLeft className="w-3 h-3" />
                        RETURN_ROOT
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-mono font-bold tracking-tight mb-4">SYSTEM_BLUEPRINT</h1>
                    <p className="text-control-muted text-lg">
                        A decentralized operating system for global trade execution.
                    </p>
                </header>

                <section className="mb-20 border border-control-border bg-control-panel/20 p-8 rounded-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-sm font-mono text-control-muted uppercase">High-Level Topology</h2>
                        <div className="flex gap-2 text-[10px] font-mono text-control-muted">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-control-cyan"></span> LIVE DATA</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full border border-current"></span> IMMUTABLE</span>
                        </div>
                    </div>
                    <SystemDiagram />
                </section>

                <section className="space-y-16">
                    <Section
                        number="01"
                        title="The Control Plane"
                        text="LEDGERA acts as the authoritative state machine for supply chain events. It does not replace ERPs but orchestrates them, ensuring a single source of truth for shipment status, payment conditions, and risk assessment."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card
                            icon={Database}
                            title="Cryptographic Ledger"
                            description="All state transitions (pickup, customs, delivery) are signed and hashed. Immutable audit logs prevent dispute and fraud."
                        />
                        <Card
                            icon={Cpu}
                            title="Agent Runtime"
                            description="Deterministic agents execute logic based on real-time telemetry. If temp > 4C, trigger insurance claim automatically."
                        />
                        <Card
                            icon={Lock}
                            title="Smart Escrow"
                            description="Funds are locked in non-custodial smart contracts. Release occurs only when cryptographic proof of delivery is verified."
                        />
                        <Card
                            icon={ShieldCheck}
                            title="Identity & Trust"
                            description="DID-based entity resolution allows permissioned access while preserving privacy. Trust scores evolve based on performance."
                        />
                    </div>

                    <Section
                        number="02"
                        title="Data Flow"
                        text="IoT sensors push telemetry to the Edge Gateway. Data is normalized and pushed to the Supabase Realtime cluster. The Agent Engine subscribes to these streams, evaluating rules and committing decisions back to the database and blockchain anchor."
                    />
                </section>

            </div>
        </main>
    );
}

function Section({ number, title, text }) {
    return (
        <div className="border-l border-control-border pl-6 relative">
            <span className="absolute -left-3 top-0 bg-control-dark font-mono text-control-muted text-xs px-1">{number}</span>
            <h2 className="text-2xl font-medium mb-4 text-control-text">{title}</h2>
            <p className="text-control-muted leading-relaxed max-w-2xl">{text}</p>
        </div>
    )
}

function Card({ icon: Icon, title, description }) {
    return (
        <div className="p-6 border border-control-border bg-control-panel/30 hover:bg-control-panel/50 transition-colors">
            <Icon className="w-8 h-8 text-control-cyan mb-4" />
            <h3 className="text-lg font-mono font-medium mb-2">{title}</h3>
            <p className="text-sm text-control-muted leading-relaxed">{description}</p>
        </div>
    )
}
