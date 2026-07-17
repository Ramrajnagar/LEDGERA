"use client";

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
    {
        quote: "LEDGERA eliminated 90% of our disputes. When every state change is on-chain, there's nothing to argue about.",
        author: "Sarah Chen",
        role: "VP Operations, Pacific Freight",
        avatar: "SC",
    },
    {
        quote: "We went from 3-day settlement cycles to real-time. Our capital turnover improved by 40% in the first quarter.",
        author: "Marcus Rivera",
        role: "CFO, GlobalTrade Corp",
        avatar: "MR",
    },
    {
        quote: "The autonomous agents handle customs clearance while we sleep. I wake up to verified deliveries and released escrow.",
        author: "Aisha Patel",
        role: "Logistics Director, Nexus Shipping",
        avatar: "AP",
    },
    {
        quote: "Zero-trust isn't a buzzword here. Every transaction is cryptographically signed. Our auditors love it.",
        author: "Jake Morrison",
        role: "CTO, SecureLogistics",
        avatar: "JM",
    },
];

const colors = ["#22d3ee", "#06b6d4", "#0891b2", "#0e7490"];

export default function TestimonialsSection() {
    return (
        <section className="py-32 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                    >
                        <h2 className="text-3xl font-bold tracking-tight mb-4">
                            Trusted by operations leaders
                        </h2>
                        <p className="text-neutral-600 text-lg">
                            Companies shipping billions in goods rely on LEDGERA for verified execution.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            className="relative p-8 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-neutral-200 hover:shadow-lg transition-all duration-300"
                        >
                            <Quote className="w-8 h-8 text-neutral-200 mb-4" />
                            <p className="text-neutral-700 leading-relaxed mb-6 text-[15px]">
                                &ldquo;{t.quote}&rdquo;
                            </p>
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
                                    style={{ backgroundColor: colors[i] }}
                                >
                                    {t.avatar}
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-neutral-900">{t.author}</div>
                                    <div className="text-xs text-neutral-500">{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
