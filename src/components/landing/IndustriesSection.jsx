"use client";

import { motion } from 'framer-motion';
import { Truck, Factory, Zap, Wrench, Building2, UtensilsCrossed, Package, Shirt } from 'lucide-react';

const industries = [
    { name: "Industrial", icon: Factory },
    { name: "Electrical", icon: Zap },
    { name: "Plumbing", icon: Wrench },
    { name: "HVAC", icon: Wrench },
    { name: "Building Materials", icon: Building2 },
    { name: "Foodservice", icon: UtensilsCrossed },
    { name: "Consumer Goods", icon: Package },
    { name: "Textile & Apparel", icon: Shirt },
];

export default function IndustriesSection() {
    return (
        <section className="py-32 px-6 bg-neutral-50 border-y border-neutral-100" id="industries">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                    >
                        <h2 className="text-3xl font-bold tracking-tight mb-4">
                            Built for supply chain across sectors
                        </h2>
                        <p className="text-neutral-600 text-lg">
                            From industrial wholesale to cold chain logistics.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {industries.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            className="group flex items-center gap-4 p-5 rounded-xl bg-white border border-neutral-100 hover:border-neutral-200 hover:shadow-md transition-all duration-300"
                        >
                            <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-cyan-50 transition-colors">
                                <item.icon className="w-5 h-5 text-neutral-500 group-hover:text-cyan-600 transition-colors" />
                            </div>
                            <span className="text-sm font-medium text-neutral-700">{item.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
