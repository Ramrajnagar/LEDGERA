
"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Shield, Activity, Globe, Zap, Box, Lock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import SmoothScroll from '@/components/ui/SmoothScroll';
import NetworkHero from '@/components/landing/NetworkHero';
import MagneticButton from '@/components/ui/MagneticButton';

export default function LandingPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <SmoothScroll>
      <div className={`min-h-screen bg-white text-neutral-900 selection:bg-cyan-100 theme-light font-sans`}>

        {/* Fixed Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Box className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold tracking-tight text-lg">LEDGERA</span>
            </div>
            <div className="hidden md:flex gap-8 text-sm font-medium text-neutral-600">
              <a href="#features" className="hover:text-black transition-colors">Features</a>
              <a href="#system" className="hover:text-black transition-colors">System</a>
              <a href="#security" className="hover:text-black transition-colors">Security</a>
            </div>
            <div className="flex gap-4">
              <Link href="/login" className="text-sm font-medium px-4 py-2 hover:bg-neutral-50 rounded-full transition-colors">
                Sign In
              </Link>
              <MagneticButton>
                <Link href="/login" className="text-sm font-medium px-5 py-2 bg-black text-white rounded-full hover:bg-neutral-800 transition-colors flex items-center gap-2">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </MagneticButton>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-screen pt-32 pb-20 px-6 flex flex-col justify-center overflow-hidden">
          <NetworkHero /> {/* 3D Background */}

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
            <motion.div
              style={{ y: y1 }}
              className="flex flex-col justify-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-medium mb-6 w-fit">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                SYSTEM OPTIMAL
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
                Supply Chain <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Orchestration</span>
              </h1>
              <p className="text-xl text-neutral-600 mb-10 max-w-lg leading-relaxed">
                A unified ledger for global logistics. Track, verify, and settle shipments in real-time with zero-trust architecture.
              </p>
              <div className="flex flex-wrap gap-4">
                <MagneticButton strength={0.2}>
                  <Link href="/dashboard" className="px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-neutral-800 transition-all flex items-center gap-2 shadow-xl shadow-black/10">
                    Launch Prototype <Zap className="w-4 h-4" />
                  </Link>
                </MagneticButton>
                <MagneticButton strength={0.1}>
                  <Link href="/architecture" className="px-8 py-4 bg-white border border-neutral-200 text-neutral-900 rounded-full font-medium hover:bg-neutral-50 transition-all">
                    View Architecture
                  </Link>
                </MagneticButton>
              </div>
            </motion.div>

            <motion.div
              style={{ y: y2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 bg-white/90 backdrop-blur-xl rounded-2xl border border-neutral-200 shadow-2xl p-6 md:p-8 max-w-md ml-auto mt-20 rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                <div className="flex justify-between items-center mb-8 border-b border-neutral-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                      <Globe className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">Shipment #8839</div>
                      <div className="text-xs text-neutral-500">In Transit • Pacific Ocean</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono text-neutral-400">ETA</div>
                    <div className="font-mono font-medium">14:00</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-1 pt-1">
                      <div className="w-2 h-2 rounded-full bg-cyan-500" />
                      <div className="w-px h-full bg-neutral-100" />
                    </div>
                    <div className="pb-6">
                      <div className="text-sm font-medium mb-1">Customs Cleared</div>
                      <div className="text-xs text-neutral-500">Verified by Smart Contract 0x8f...2a</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-1 pt-1">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <div className="w-px h-full bg-neutral-100" />
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Payment Released</div>
                      <div className="text-xs text-neutral-500">Escrow condition met. Fund transfer initiated.</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-100 flex justify-between items-center">
                  <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Trust Score</div>
                  <div className="text-2xl font-bold text-neutral-900">98.4</div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-1/2 -right-12 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-2xl opacity-20 animate-pulse" />
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-10" />
        </section>

        {/* Stats Band */}
        <div className="border-y border-neutral-100 bg-neutral-50/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Nodes", value: "8,920" },
              { label: "Daily Volume", value: "$4.2B" },
              { label: "Smart Contracts", value: "142k" },
              { label: "Uptime", value: "99.99%" },
            ].map((stat, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="text-3xl font-bold tracking-tight mb-1">{stat.value}</div>
                <div className="text-sm text-neutral-500 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <section id="features" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Orchestrate with Precision</h2>
              <p className="text-neutral-600 text-lg">
                Replacing fragmented systems with a single source of truth. Validated by cryptography, executed by code.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Activity,
                  title: "Real-time Telemetry",
                  desc: "Live tracking of location, temperature, and humidity. IoT signals are verified on-chain instantly."
                },
                {
                  icon: Shield,
                  title: "Zero-Trust Security",
                  desc: "No single point of failure. Every transaction is signed, every state change is immutable."
                },
                {
                  icon: Lock,
                  title: "Automated Escrow",
                  desc: "Smart contracts hold funds until delivery conditions are mathematically proven."
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-neutral-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-neutral-100 flex items-center justify-center mb-6 text-neutral-900">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Deep Dive / Sticky Scroll */}
        <section id="system" className="py-32 bg-neutral-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold tracking-tight mb-6">The Control Room</h2>
                <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
                  Your central nervous system for global logistics. Monitor shipments, manage agents, and verify transactions from a single, secure interface.
                </p>
                <ul className="space-y-4">
                  {[
                    "Live 3D Digital Twins",
                    "Automated Dispute Resolution",
                    "Cryptographic Proof Generation",
                    "Multi-Party Computation"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-cyan-400" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <MagneticButton strength={0.2} className="inline-block">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                      Enter Dashboard <ArrowRight className="w-4 h-4" />
                    </Link>
                  </MagneticButton>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-neutral-800 rounded-xl p-2 shadow-2xl border border-neutral-700">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                    {/* Abstract Dashboard Preview */}
                    <div className="absolute inset-0 opacity-50 flex items-center justify-center">
                      <div className="text-neutral-600 font-mono text-xs">DASHBOARD_PREVIEW_SIGNAL_LOST</div>
                    </div>
                    <div className="p-4 grid grid-cols-3 gap-4 h-full opacity-30">
                      <div className="col-span-2 bg-neutral-800 rounded animate-pulse"></div>
                      <div className="bg-neutral-800 rounded animate-pulse delay-75"></div>
                      <div className="col-span-3 bg-neutral-800 rounded h-20 animate-pulse delay-150"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-neutral-100 pt-20 pb-10 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                    <Box className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold tracking-tight">LEDGERA</span>
                </div>
                <p className="text-neutral-500 max-w-xs">
                  The world's first decentralized operating system for supply chain orchestration.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Platform</h4>
                <ul className="space-y-3 text-sm text-neutral-500">
                  <li><a href="#" className="hover:text-black">Features</a></li>
                  <li><a href="#" className="hover:text-black">Security</a></li>
                  <li><a href="#" className="hover:text-black">Enterprise</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Legal</h4>
                <ul className="space-y-3 text-sm text-neutral-500">
                  <li><a href="#" className="hover:text-black">Privacy</a></li>
                  <li><a href="#" className="hover:text-black">Terms</a></li>
                  <li><a href="#" className="hover:text-black">Smart Contracts</a></li>
                </ul>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm text-neutral-400">
              <div>© 2026 Ledgera Network. All rights reserved.</div>
              <div className="flex gap-6">
                <a href="#" className="hover:text-black">Twitter</a>
                <a href="#" className="hover:text-black">GitHub</a>
                <a href="#" className="hover:text-black">Discord</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
