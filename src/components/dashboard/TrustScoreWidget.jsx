
import { TrendingUp, ShieldCheck } from 'lucide-react';

export default function TrustScoreWidget() {
    return (
        <div className="flex flex-col h-full justify-center items-center bg-control-panel border border-control-border p-6 relative overflow-hidden group">

            {/* Background decoration */}
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShieldCheck className="w-24 h-24 text-control-success" />
            </div>

            <div className="text-center z-10">
                <div className="text-xs font-mono text-control-muted uppercase mb-2">Global Trust Health</div>

                <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-mono font-bold text-control-text tracking-tighter shadow-green-500 drop-shadow-lg">98.4</span>
                    <span className="text-sm font-mono text-control-muted">/100</span>
                </div>

                <div className="flex items-center justify-center gap-2 mt-4 text-xs font-mono text-control-success bg-control-success/10 px-3 py-1 rounded-full border border-control-success/20">
                    <TrendingUp className="w-3 h-3" />
                    <span>TRENDING_UP [+0.8%]</span>
                </div>
            </div>
        </div>
    );
}
