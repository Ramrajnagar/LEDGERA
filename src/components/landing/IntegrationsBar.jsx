"use client";

import { motion } from 'framer-motion';
import { Box } from 'lucide-react';

const logos = [
    { name: "SAP", color: "#0070F2" },
    { name: "Oracle", color: "#C74634" },
    { name: "NetSuite", color: "#1A1A1A" },
    { name: "Salesforce", color: "#00A1E0" },
    { name: "HubSpot", color: "#FF7A59" },
    { name: "QuickBooks", color: "#2CA01C" },
    { name: "Stripe", color: "#635BFF" },
    { name: "AWS", color: "#FF9900" },
];

export default function IntegrationsBar() {
    return (
        <section className="py-20 px-6 border-y border-neutral-100 bg-neutral-50/50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-center mb-12"
                >
                    <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">
                        Works with the systems you already run
                    </p>
                </motion.div>

                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                    {logos.map((logo, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            className="flex items-center gap-2 text-neutral-400 hover:text-neutral-600 transition-colors"
                        >
                            <Box className="w-5 h-5" style={{ color: logo.color }} />
                            <span className="text-sm font-medium">{logo.name}</span>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <a
                        href="mailto:hello@ledgera.io?subject=Custom%20integration%20request"
                        className="text-sm text-neutral-500 hover:text-black transition-colors"
                    >
                        + Request a custom integration
                    </a>
                </div>
            </div>
        </section>
    );
}
