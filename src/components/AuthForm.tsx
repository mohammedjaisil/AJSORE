'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginAction, signupAction, socialLoginAction } from '@/actions/auth';
import { useFormStatus } from 'react-dom';

interface SocialModalProps {
    platform: 'Google' | 'Apple';
    onSelect: () => void;
    onClose: () => void;
}

const SocialSelectorModal: React.FC<SocialModalProps> = ({ platform, onSelect, onClose }) => {
    const isGoogle = platform === 'Google';

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-500" onClick={onClose} />
            <div className={`relative w-full max-w-sm rounded-5xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500 ${isGoogle ? 'bg-white' : 'bg-zinc-950 text-white'}`}>
                <div className="p-10 space-y-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${isGoogle ? 'bg-[#F9F9F9]' : 'bg-white/5 border border-white/10'}`}>
                                <img
                                    src={isGoogle ? "https://www.google.com/favicon.ico" : "https://www.apple.com/favicon.ico"}
                                    alt={platform}
                                    className="w-6 h-6"
                                />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight">
                                {platform}
                            </h3>
                        </div>
                        <button onClick={onClose} className={`p-2 rounded-full transition-colors ${isGoogle ? 'hover:bg-gray-100' : 'hover:bg-white/10'}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <p className={`text-sm leading-relaxed ${isGoogle ? 'text-text-muted' : 'text-white/50'}`}>
                        Securely connect your {platform} account with <strong>buykko</strong> to continue your premium shopping experience.
                    </p>

                    <button
                        onClick={onSelect}
                        className={`w-full py-5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all transform active:scale-95 shadow-xl ${isGoogle
                            ? 'bg-black text-white hover:bg-zinc-800 shadow-black/10'
                            : 'bg-white text-black hover:bg-gray-100 shadow-white/5'
                            }`}
                    >
                        Continue with {platform}
                    </button>
                </div>
            </div>
        </div>
    );
};

function SubmitButton({ text }: { text: string }) {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-black text-white py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-zinc-800 transition-all transform active:scale-95 disabled:opacity-30 shadow-xl shadow-black/10"
        >
            {pending ? 'Processing...' : text}
        </button>
    );
}

interface AuthFormProps {
    type: 'login' | 'signup' | 'forgot-password';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
    const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);
    const [activeSocialModal, setActiveSocialModal] = useState<'Google' | 'Apple' | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const startSocialFlow = (platform: 'Google' | 'Apple') => {
        setActiveSocialModal(platform);
    };

    const finalizeSocialLogin = async () => {
        if (activeSocialModal) {
            await socialLoginAction(activeSocialModal.toLowerCase());
        }
    };

    const handleForm = async (formData: FormData) => {
        setMessage(null);
        if (type === 'login') {
            // For login, the server action handles the redirect internally via signIn(redirectTo).
            // Any return means an error occurred (success causes a redirect, not a return).
            const res = await loginAction(formData);
            if (res?.error) {
                setMessage({ type: 'error', text: res.error });
            }
        } else {
            const res = await signupAction(formData);
            if (res?.success) {
                setMessage({ type: 'success', text: 'Account created! Redirecting to sign in...' });
                setTimeout(() => router.push('/login'), 1500);
            } else if (res?.error) {
                setMessage({ type: 'error', text: res.error });
            }
        }
    };

    return (
        <div className="bg-[#F9F9F9] min-h-screen flex items-center justify-center px-6 py-20">
            <div className="max-w-md w-full space-y-10">
                {activeSocialModal && (
                    <SocialSelectorModal
                        platform={activeSocialModal}
                        onClose={() => setActiveSocialModal(null)}
                        onSelect={finalizeSocialLogin}
                    />
                )}

                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-bold tracking-tighter text-text-main uppercase">
                        {type === 'login' ? 'Sign In' : type === 'signup' ? 'Join Us' : 'Reset'}
                    </h1>
                    <p className="text-text-muted text-sm max-w-[280px] mx-auto leading-relaxed">
                        {type === 'login' ? 'Access your curated collection and personalized preferences.' : type === 'signup' ? 'Create an account to start your premium journey.' : 'Enter your email to receive a recovery link.'}
                    </p>
                </div>

                <div className="bg-white p-10 md:p-12 rounded-5xl border border-gray-50 shadow-sm space-y-8">
                    {message && (
                        <div className={`p-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-center ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-accent-sage/10 text-accent-sage'}`}>
                            {message.text}
                        </div>
                    )}
                    
                    <form action={handleForm} className="space-y-6">
                        {type === 'signup' && (
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Full Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Alex Johnson"
                                    className="w-full bg-[#F9F9F9] border border-transparent rounded-2xl px-6 py-4 text-sm font-medium focus:bg-white focus:border-black transition-all outline-none"
                                />
                            </div>
                        )}
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="alex@example.com"
                                className="w-full bg-[#F9F9F9] border border-transparent rounded-2xl px-6 py-4 text-sm font-medium focus:bg-white focus:border-black transition-all outline-none"
                            />
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Password</label>
                                {type === 'login' && (
                                    <Link href="/forgot-password" className="text-[9px] font-bold uppercase tracking-widest text-accent-sage hover:underline">Forgot?</Link>
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="••••••••"
                                    className="w-full bg-[#F9F9F9] border border-transparent rounded-2xl px-6 py-4 text-sm font-medium focus:bg-white focus:border-black transition-all outline-none pr-14"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-text-muted hover:text-black transition-colors"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.888 9.888L3 3m18 18l-6.879-6.879" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="pt-4">
                            <SubmitButton text={type === 'login' ? 'Sign In' : type === 'signup' ? 'Create Account' : 'Reset'} />
                        </div>
                    </form>

                    <div className="flex items-center gap-4 py-2">
                        <div className="h-[1px] bg-gray-100 flex-1" />
                        <span className="text-[9px] font-bold text-text-muted uppercase tracking-[0.2em]">Or continue with</span>
                        <div className="h-[1px] bg-gray-100 flex-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => startSocialFlow('Google')}
                            className="flex items-center justify-center gap-3 py-4 rounded-2xl border border-gray-100 hover:border-black transition-all group"
                        >
                            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 grayscale group-hover:grayscale-0 transition-all" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted group-hover:text-black">Google</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => startSocialFlow('Apple')}
                            className="flex items-center justify-center gap-3 py-4 rounded-2xl border border-gray-100 hover:border-black transition-all group"
                        >
                            <img src="https://www.apple.com/favicon.ico" alt="Apple" className="w-4 h-4 grayscale group-hover:grayscale-0 transition-all" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted group-hover:text-black">Apple</span>
                        </button>
                    </div>
                </div>

                <div className="text-center">
                    {type === 'login' ? (
                        <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                            New here? <Link href="/signup" className="text-black hover:underline ml-2">Create Account</Link>
                        </p>
                    ) : (
                        <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                            Already a member? <Link href="/login" className="text-black hover:underline ml-2">Sign In</Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
