
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Map, Activity, Shield, Package, Settings, LogOut } from "lucide-react";

const navItems = [
    { href: "/dashboard", label: "OVERVIEW", icon: LayoutDashboard },
    { href: "/dashboard/map", label: "LIVE_MAP", icon: Map },
    { href: "/dashboard/decisions", label: "AGENT_LOGS", icon: Activity },
    { href: "/dashboard/escrow", label: "ESCROW", icon: Shield },
    { href: "/dashboard/shipments", label: "CARGO", icon: Package },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-full w-64 border-r border-control-border bg-control-panel flex flex-col z-50">
            <div className="h-16 flex items-center px-6 border-b border-control-border">
                <div className="w-2 h-2 bg-control-cyan mr-3 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                <span className="font-mono font-bold tracking-wider text-control-text">LEDGERA</span>
            </div>

            <nav className="flex-1 py-6 px-3 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-sm transition-all group ${isActive
                                    ? "bg-control-border text-control-cyan border-l-2 border-control-cyan"
                                    : "text-control-muted hover:text-control-text hover:bg-control-border/30"
                                }`}
                        >
                            <item.icon className={`w-4 h-4 ${isActive ? "text-control-cyan" : "text-control-muted group-hover:text-control-text"}`} />
                            <span className="font-mono text-xs tracking-wider">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-control-border">
                <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-8 h-8 rounded bg-control-border flex items-center justify-center text-xs font-mono">
                        OP
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <div className="text-xs font-mono text-control-text truncate">OPERATOR_01</div>
                        <div className="text-[10px] font-mono text-control-muted truncate">LEVEL_5_ACCESS</div>
                    </div>
                    <button className="text-control-muted hover:text-control-danger transition-colors">
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </aside>
    );
}
