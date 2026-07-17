"use client";

import { motion } from 'framer-motion';
import { Link2, Cpu, Rocket } from 'lucide-react';

const steps = [
    {
        number: "01",
        icon: Link2,
        title: "Connect your systems",
        description: "We integrate with your ERP, TMS, and IoT sensors. Build a unified knowledge base from day one.",
        detail: "SAP, Oracle, NetSuite, custom APIs",
    },
    {
        number: "02",
        icon: Cpu,
        title: "Set up your agents",
        description: "Configure autonomous agents for logistics, finance, and security. Define rules, thresholds, and approval workflows.",
        detail: "Human-in-the-loop by default",
    },
    {
        number: "03",
        icon: Rocket,
        title: "Deploy with your team",
        description: "Onboard your operators to the Control Room. Agents handle routine decisions, your team handles exceptions.",
        detail: "2-4 weeks from kickoff to live",
    },
];

export default function HowItWorksSection() {
    return (
        <section className="py-32 px-6 bg-white" id="platform">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                    >
                        <h2 className="text-3xl font-bold tracking-tight mb-4">
                            Live in weeks, not months
                        </h2>
                        <p className="text-neutral-600 text-lg">
                            Three steps from onboarding to autonomous execution.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className="relative"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center">
                                    <step.icon className="w-5 h-5 text-cyan-600" />
                                </div>
                                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                                    Step {step.number}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 mb-2">
                                {step.title}
                            </h3>
                            <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                                {step.description}
                            </p>
                            <span className="text-xs text-neutral-400 font-mono">
                                {step.detail}
                            </span>

                            {i < steps.length - 1 && (
                                <div className="hidden md:block absolute top-5 -right-4 z-10">
                                    <div className="h-6 w-6 rounded-full bg-white border border-neutral-200 flex items-center justify-center">
                                        <span className="text-[10px] text-neutral-400">&rarr;</span>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
