
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Shield, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [mode, setMode] = useState('signin'); // 'signin' | 'signup'

    const handleAuth = async (e) => {
        e.preventDefault();
        if (!supabase) {
            setError("Supabase not configured. Check environment variables.");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            if (mode === 'signup') {
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                setSuccess(true);
            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                // Redirect to dashboard
                window.location.href = '/dashboard';
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-control-dark font-sans text-control-text flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-control-panel border border-control-border relative z-10 shadow-2xl"
            >
                <div className="h-1 w-full bg-gradient-to-r from-control-cyan via-blue-500 to-control-cyan" />

                <div className="p-8">
                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 bg-control-dark rounded-full flex items-center justify-center border border-control-border shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                            <Lock className="w-8 h-8 text-control-cyan" />
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-mono font-bold tracking-tight text-white mb-2">ACCESS_CONTROL</h1>
                        <p className="text-sm text-control-muted">Identify yourself to proceed to the Control Room.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-900/20 border border-red-900/50 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500 flex-none mt-0.5" />
                            <p className="text-sm text-red-400">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 bg-green-900/20 border border-green-900/50 flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-none mt-0.5" />
                            <p className="text-sm text-green-400">Confirmation sent to your email. Please verify to sign in.</p>
                        </div>
                    )}

                    <form onSubmit={handleAuth} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-mono uppercase text-control-muted">Identity (Email)</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-control-dark border border-control-border p-3 text-sm focus:outline-none focus:border-control-cyan focus:ring-1 focus:ring-control-cyan transition-all text-white placeholder-neutral-700"
                                placeholder="agent@ledgera.network"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-mono uppercase text-control-muted">Passcode</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-control-dark border border-control-border p-3 text-sm focus:outline-none focus:border-control-cyan focus:ring-1 focus:ring-control-cyan transition-all text-white placeholder-neutral-700"
                                placeholder="••••••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-control-cyan text-black font-bold font-mono text-sm tracking-wide hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {mode === 'signin' ? 'AUTHENTICATE' : 'INITIATE_IDENTITY'}
                        </button>
                    </form>

                    <div className="mt-6 flex justify-between items-center text-xs font-mono">
                        <button
                            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                            className="text-control-muted hover:text-white transition-colors underline decoration-dotted"
                        >
                            {mode === 'signin' ? 'Request Access (Sign Up)' : 'Return to Login'}
                        </button>
                        <Link href="/" className="text-control-muted hover:text-white transition-colors flex items-center gap-1">
                            <ArrowLeft className="w-3 h-3" /> Abort
                        </Link>
                    </div>
                </div>

                {/* Footer decoration */}
                <div className="h-2 bg-control-dark border-t border-control-border flex items-center justify-between px-2">
                    <div className="flex gap-1">
                        <div className="w-1 h-1 bg-control-muted rounded-full" />
                        <div className="w-1 h-1 bg-control-muted rounded-full" />
                        <div className="w-1 h-1 bg-control-muted rounded-full" />
                    </div>
                    <div className="text-[10px] text-control-muted font-mono">SECURE_CONNECTION_V1.2</div>
                </div>
            </motion.div>
        </div>
    );
}
