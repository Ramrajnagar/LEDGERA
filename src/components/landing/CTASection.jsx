"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

export default function CTASection() {
    return (
        <section className="relative py-32 px-6 bg-neutral-900 text-white overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-3xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                        See how you can stay ahead
                    </h2>
                    <p className="text-lg text-neutral-400 mb-10 max-w-lg mx-auto leading-relaxed">
                        30-minute call to see how LEDGERA can transform your supply chain operations.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/login"
                            className="group inline-flex items-center gap-2.5 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-neutral-100 transition-all shadow-xl shadow-white/10"
                        >
                            <Zap className="w-4 h-4" />
                            Get started
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                        <Link
                            href="/architecture"
                            className="inline-flex items-center gap-2 px-6 py-4 text-sm font-medium text-neutral-400 hover:text-white border border-white/10 hover:border-white/20 rounded-full transition-all"
                        >
                            View architecture
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
