"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        q: "How does the autonomous agent system work?",
        a: "LEDGERA deploys specialized agents (Logistics, Finance, Security) that monitor your supply chain in real-time. Each agent follows deterministic rules — for example, if temperature exceeds 4°C in a cold chain shipment, the Logistics Agent triggers a reroute while the Finance Agent holds escrow release until new conditions are met.",
    },
    {
        q: "Is my data actually on a blockchain?",
        a: "Critical state changes (delivery confirmations, payment releases, dispute resolutions) are anchored to an immutable ledger. Bulk telemetry data stays in Supabase for performance. You get cryptographic proof where it matters without sacrificing speed.",
    },
    {
        q: "What happens if an agent makes a mistake?",
        a: "Every agent action is logged and auditable. The system operates in 'human-in-the-loop' mode by default — significant actions like releasing funds over $10,000 require operator approval. Over time, as trust builds, you can escalate agent autonomy levels.",
    },
    {
        q: "How long does implementation take?",
        a: "Most teams are live within 2-4 weeks. We integrate with your existing ERP and logistics systems via our API. The LEDGERA Control Room goes live immediately, and agents are progressively activated as you calibrate rules to your operations.",
    },
    {
        q: "Can I integrate with my existing ERP?",
        a: "Yes. LEDGERA connects to SAP, Oracle, NetSuite, and custom systems via REST API and webhooks. The platform normalizes your data into a unified graph, so agents can reason across all your systems.",
    },
    {
        q: "What about data security?",
        a: "End-to-end encryption at rest and in transit. SOC2 Type II compliant. Zero-knowledge architecture means we can't read your data even if we wanted to. Enterprise customers can deploy on-premise.",
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="py-32 px-6 bg-white" id="faq">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                    >
                        <h2 className="text-3xl font-bold tracking-tight mb-4">
                            Questions, answered
                        </h2>
                        <p className="text-neutral-600 text-lg">
                            Everything you need to know about LEDGERA.
                        </p>
                    </motion.div>
                </div>

                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            className="border border-neutral-100 rounded-xl overflow-hidden hover:border-neutral-200 transition-colors"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between px-6 py-5 text-left"
                            >
                                <span className="font-medium text-neutral-900 pr-4">{faq.q}</span>
                                <ChevronDown
                                    className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-200 ${
                                        openIndex === i ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-5 text-sm text-neutral-600 leading-relaxed">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
