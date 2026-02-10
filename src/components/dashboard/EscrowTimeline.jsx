
import { CheckCircle, Circle, Clock, DollarSign } from 'lucide-react';

const steps = [
    { id: 1, label: 'FUNDS_LOCKED', status: 'completed', time: '08:00', amount: '$45,000' },
    { id: 2, label: 'CARRIER_PICKUP', status: 'completed', time: '09:30', hash: '0x8f...2a' },
    { id: 3, label: 'CUSTOMS_CLEARANCE', status: 'progress', time: '11:15', eta: '30m' },
    { id: 4, label: 'DELIVERY_PROOF', status: 'pending' },
    { id: 5, label: 'FUNDS_RELEASE', status: 'pending' },
];

export default function EscrowTimeline() {
    return (
        <div className="bg-control-panel border border-control-border p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-mono text-control-muted uppercase flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-control-cyan" />
                    <span>Smart Contract Escrow</span>
                </h3>
                <div className="text-xs font-mono text-control-text bg-control-dark px-2 py-1 rounded border border-control-border">
                    TX: #9928-ALPHA
                </div>
            </div>

            <div className="flex-1 relative">
                {/* Vertical Line */}
                <div className="absolute left-3 top-2 bottom-2 w-px bg-control-border" />

                <div className="space-y-6">
                    {steps.map((step) => {
                        const isCompleted = step.status === 'completed';
                        const isProgress = step.status === 'progress';
                        const isPending = step.status === 'pending';

                        return (
                            <div key={step.id} className="relative pl-10 group">
                                {/* Dot */}
                                <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all bg-control-panel z-10 ${isCompleted ? 'border-control-success text-control-success' :
                                        isProgress ? 'border-control-cyan text-control-cyan shadow-[0_0_10px_rgba(34,211,238,0.4)]' :
                                            'border-control-border text-control-muted'
                                    }`}>
                                    {isCompleted && <CheckCircle className="w-3 h-3" />}
                                    {isProgress && <Clock className="w-3 h-3 animate-pulse" />}
                                    {isPending && <Circle className="w-2 h-2" />}
                                </div>

                                {/* Content */}
                                <div className={`${isPending ? 'opacity-50' : 'opacity-100'}`}>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className={`text-xs font-mono font-bold tracking-wide ${isProgress ? 'text-control-cyan' : 'text-control-text'}`}>
                                            {step.label}
                                        </span>
                                        {step.time && <span className="text-[10px] text-control-muted">{step.time}</span>}
                                    </div>

                                    <div className="text-[10px] text-control-muted h-4">
                                        {step.amount && <span className="text-control-success">{step.amount} USDC</span>}
                                        {step.hash && <span>Hash: {step.hash}</span>}
                                        {step.eta && <span>ETA: {step.eta}</span>}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
