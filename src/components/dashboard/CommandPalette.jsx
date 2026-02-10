
"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Map, Activity, Shield, LogOut, Command } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const router = useRouter();

    useEffect(() => {
        const down = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const actions = [
        { icon: Map, name: "View Live Map", shortcut: "G M", action: () => router.push('/dashboard') },
        { icon: Activity, name: "System Analytics", shortcut: "G A", action: () => router.push('/analytics') }, // Mock path
        { icon: Shield, name: "Security Protocols", shortcut: "G S", action: () => router.push('/security') },
        { icon: LogOut, name: "Log Out", shortcut: "L O", action: () => router.push('/login') },
    ];

    const filteredActions = actions.filter(action =>
        action.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden"
                    >
                        <div className="flex items-center px-4 py-3 border-b border-neutral-800">
                            <Search className="w-5 h-5 text-neutral-500 mr-3" />
                            <input
                                type="text"
                                placeholder="Type a command or search..."
                                className="w-full bg-transparent text-white placeholder-neutral-500 focus:outline-none text-lg"
                                autoFocus
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <div className="text-xs font-mono text-neutral-600 border border-neutral-800 rounded px-1.5 py-0.5">ESC</div>
                        </div>

                        <div className="py-2 max-h-[300px] overflow-y-auto">
                            {filteredActions.length > 0 ? (
                                <div className="px-2 text-xs font-medium text-neutral-500 mb-1">Suggestions</div>
                            ) : (
                                <div className="px-4 py-8 text-center text-neutral-500">No results found.</div>
                            )}

                            {filteredActions.map((action, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        action.action();
                                        setOpen(false);
                                    }}
                                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-neutral-800 transition-colors text-left group"
                                >
                                    <div className="flex items-center gap-3 text-neutral-300 group-hover:text-white">
                                        <action.icon className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                                        <span>{action.name}</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {action.shortcut.split(' ').map((key, k) => (
                                            <span key={k} className="text-[10px] font-mono bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded border border-neutral-700 min-w-[20px] text-center">
                                                {key}
                                            </span>
                                        ))}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="px-4 py-2 bg-neutral-950 border-t border-neutral-800 flex justify-between items-center text-xs text-neutral-500">
                            <span>Press <kbd className="font-sans">↵</kbd> to select</span>
                            <div className="flex items-center gap-1">
                                <Command className="w-3 h-3" />
                                <span>LEDGERA OS</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
