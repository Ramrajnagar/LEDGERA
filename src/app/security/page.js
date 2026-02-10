
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, FileKey, UserCheck } from 'lucide-react';

export default function SecurityPage() {
    return (
        <main className="min-h-screen bg-control-dark text-control-text p-8 md:p-16">
            <div className="max-w-4xl mx-auto">
                <header className="mb-16">
                    <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-control-muted hover:text-control-cyan mb-6 transition-colors">
                        <ArrowLeft className="w-3 h-3" />
                        RETURN_ROOT
                    </Link>
                    <div className="flex items-center gap-3 mb-4">
                        <Shield className="w-10 h-10 text-control-cyan" />
                        <h1 className="text-4xl md:text-5xl font-mono font-bold tracking-tight">SECURITY_MODEL</h1>
                    </div>
                    <p className="text-control-muted text-lg border-l-2 border-control-cyan pl-4 py-2 bg-control-cyan/5">
                        Zero-trust architecture. Every interaction is cryptographically verified.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <SecuritySection
                        icon={Lock}
                        title="Non-Custodial Escrow"
                        text="Funds are held in smart contracts governed by multi-sig logic. LEDGERA orchestrates the release but cannot seize funds. Release requires: (1) Carrier Proof + (2) Customs Clearance + (3) Buyer Sign-off."
                    />
                    <SecuritySection
                        icon={FileKey}
                        title="Immutable Audit Log"
                        text="All system events (decision logs, sensor readings, location pings) are hashed and anchored to the ledger. This creates a tamper-proof history accessible for dispute resolution."
                    />
                    <SecuritySection
                        icon={UserCheck}
                        title="Identity (DID)"
                        text="Entities authenticate via Decentralized Identifiers (DIDs). Reputation is attached to the DID, making trust portable and persistent across the network."
                    />
                </div>

                <section className="mt-20 p-8 border border-control-border bg-control-panel/30">
                    <h2 className="text-xl font-mono mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 bg-control-danger rounded-full animate-pulse" />
                        THREAT_MODEL_MITIGATION
                    </h2>
                    <div className="space-y-4 text-sm text-control-muted font-mono">
                        <div className="flex justify-between border-b border-control-border/50 pb-2">
                            <span>GPS Spoofing</span>
                            <span className="text-control-success">MITIGATED (Multi-oracle consensus)</span>
                        </div>
                        <div className="flex justify-between border-b border-control-border/50 pb-2">
                            <span>Sybil Attack</span>
                            <span className="text-control-success">MITIGATED (Stake-based registry)</span>
                        </div>
                        <div className="flex justify-between border-b border-control-border/50 pb-2">
                            <span>Replay Attack</span>
                            <span className="text-control-success">MITIGATED (Nonce + Timestamp)</span>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}

function SecuritySection({ icon: Icon, title, text }) {
    return (
        <div>
            <div className="flex items-center gap-3 mb-4 text-control-text">
                <Icon className="w-6 h-6 text-control-cyan" />
                <h3 className="text-xl font-medium">{title}</h3>
            </div>
            <p className="text-control-muted leading-relaxed">
                {text}
            </p>
        </div>
    )
}
