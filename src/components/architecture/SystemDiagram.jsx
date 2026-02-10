
export default function SystemDiagram() {
    return (
        <svg viewBox="0 0 800 500" className="w-full h-auto text-control-text font-mono text-xs">
            <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="currentColor" fillOpacity="0.5" />
                </marker>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1" />
                </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Nodes */}
            <g transform="translate(50, 200)">
                <rect x="0" y="0" width="120" height="80" rx="4" fill="#0a0a0a" stroke="#22d3ee" strokeWidth="1" />
                <text x="60" y="45" textAnchor="middle" fill="#22d3ee">IoT SENSORS</text>
                <text x="60" y="65" textAnchor="middle" fill="#555" fontSize="10">Edge Telemetry</text>
            </g>

            <g transform="translate(250, 200)">
                <rect x="0" y="0" width="140" height="80" rx="4" fill="#0a0a0a" stroke="#fff" strokeWidth="1" />
                <text x="70" y="35" textAnchor="middle" fill="#fff" fontWeight="bold">SUPABASE</text>
                <text x="70" y="55" textAnchor="middle" fill="#888">REALTIME</text>
            </g>

            <g transform="translate(500, 100)">
                <rect x="0" y="0" width="140" height="80" rx="4" fill="#0a0a0a" stroke="#48bb78" strokeWidth="1" />
                <text x="70" y="35" textAnchor="middle" fill="#48bb78">AGENT ENGINE</text>
                <text x="70" y="55" textAnchor="middle" fill="#555">Deterministic Logic</text>
            </g>

            <g transform="translate(500, 300)">
                <rect x="0" y="0" width="140" height="80" rx="4" fill="#0a0a0a" stroke="#f56565" strokeWidth="1" />
                <text x="70" y="35" textAnchor="middle" fill="#f56565">SMART CONTRACT</text>
                <text x="70" y="55" textAnchor="middle" fill="#555">Escrow & Audit</text>
            </g>

            {/* Connections using paths */}
            <path d="M170 240 L250 240" stroke="currentColor" strokeWidth="1" markerEnd="url(#arrow)" strokeDasharray="5,5" />
            <path d="M390 240 L450 240 L450 140 L500 140" stroke="currentColor" strokeWidth="1" markerEnd="url(#arrow)" />
            <path d="M450 240 L450 340 L500 340" stroke="currentColor" strokeWidth="1" markerEnd="url(#arrow)" />

            {/* Labels */}
            <text x="210" y="230" textAnchor="middle" fill="#555">MQTT / WS</text>
            <text x="450" y="190" textAnchor="middle" fill="#555" transform="rotate(-90, 440, 190)">STATE SYNC</text>

        </svg>
    );
}
