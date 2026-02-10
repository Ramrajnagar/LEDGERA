
import Sidebar from "@/components/layout/Sidebar";

import { SimulationProvider } from "@/context/SimulationContext";
import CommandPalette from "@/components/dashboard/CommandPalette";

export default function DashboardLayout({ children }) {
    return (
        <SimulationProvider>
            <div className="min-h-screen bg-control-dark text-control-text font-sans selection:bg-control-cyan selection:text-control-dark">
                <CommandPalette />
                <Sidebar />
                <main className="pl-64 min-h-screen relative">
                    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-control-border via-transparent to-transparent" />
                    {children}
                </main>
            </div>
        </SimulationProvider>
    );
}
