'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
            <div className={`relative w-full max-w-sm rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300 ${isGoogle ? 'bg-white' : 'bg-[#1a1a1a] text-white'}`}>
                <div className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <img
                                src={isGoogle ? "https://www.google.com/favicon.ico" : "https://www.apple.com/favicon.ico"}
                                alt={platform}
                                className="w-6 h-6"
                            />
                            <h3 className={`text-lg font-black uppercase tracking-tighter ${isGoogle ? 'text-gray-900' : 'text-white'}`}>
                                Sign in with {platform}
                            </h3>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100/10">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <p className={`text-xs font-medium ${isGoogle ? 'text-gray-500' : 'text-gray-400'}`}>
                        To continue, {platform} will share your name, email address, and profile picture with <strong>AJ STORE</strong>.
                    </p>

                    <div className="space-y-3">
                        <button
                            onClick={onSelect}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left group ${isGoogle
                                ? 'border-gray-100 hover:bg-gray-50'
                                : 'border-white/10 hover:bg-white/5'
                                }`}
                        >
                            <div className="w-10 h-10 rounded-full border-2 border-transparent bg-gray-200 group-hover:border-[#005d32] transition-colors flex items-center justify-center">
                                👤
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-black truncate">Continue with {platform}</p>
                                <p className="text-[10px] font-bold opacity-50 truncate uppercase tracking-widest">Connect Account</p>
                            </div>
                            <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {!isGoogle && (
                    <div className="px-8 py-4 bg-white/5 flex items-center justify-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Encrypted with FaceID</span>
                        <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    </div>
                )}
            </div>
        </div>
    );
};

interface AuthFormProps {
    type: 'login' | 'signup';
}

function SubmitButton({ text }: { text: string }) {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-[#005d32] text-white py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#004a28] shadow-xl shadow-[#005d32]/20 transition-all transform active:scale-95 btn-haptic disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {pending ? 'Processing...' : text}
        </button>
    );
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
    const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);
    const [activeSocialModal, setActiveSocialModal] = useState<'Google' | 'Apple' | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const startSocialFlow = (platform: 'Google' | 'Apple') => {
        setActiveSocialModal(platform);
    };

    const finalizeSocialLogin = async () => {
        if (activeSocialModal) {
            // In a client component, we can call the server action wrapper
            await socialLoginAction(activeSocialModal.toLowerCase());
        }
    };

    const handleForm = async (formData: FormData) => {
        setMessage(null);
        const res = type === 'login' ? await loginAction(formData) : await signupAction(formData);

        if (res?.success) {
            // Hard redirect to clear any old session state in the browser
            window.location.href = '/account';
        } else if (res?.error) {
            setMessage({ type: 'error', text: res.error });
        }
    };

    return (
        <div className="max-w-md mx-auto px-4 py-20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {activeSocialModal && (
                <SocialSelectorModal
                    platform={activeSocialModal}
                    onClose={() => setActiveSocialModal(null)}
                    onSelect={finalizeSocialLogin}
                />
            )}

            <div className="text-center">
                <h1 className="text-4xl font-black text-[#005d32] mb-2 uppercase tracking-tighter">
                    {type === 'login' ? 'Welcome Back' : 'Join AJ Store'}
                </h1>
                <p className="text-gray-400 font-medium">
                    {type === 'login' ? 'Enter your details to access your account.' : 'Create an account for a premium tech experience.'}
                </p>
            </div>

            <div className="bg-white p-10 border rounded-[2.5rem] shadow-sm space-y-6 relative overflow-hidden">
                {message && (
                    <div className={`p-4 rounded-2xl text-xs font-black uppercase tracking-widest text-center ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        {message.text}
                    </div>
                )}
                <form action={handleForm} className="space-y-6">
                    {type === 'signup' && (
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Full Name</label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Alex Johnson"
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#005d32]/10 focus:bg-white transition-all text-sm font-medium"
                            />
                        </div>
                    )}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="alex@example.com"
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#005d32]/10 focus:bg-white transition-all text-sm font-medium"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Password</label>
                            {type === 'login' && (
                                <Link
                                    href="/forgot-password"
                                    className="text-[9px] font-black text-[#005d32] uppercase hover:underline"
                                >
                                    Forgot?
                                </Link>
                            )}
                        </div>
                        <div className="relative">
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="••••••••"
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#005d32]/10 focus:bg-white transition-all text-sm font-medium pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#005d32]"
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.888 9.888L3 3m18 18l-6.879-6.879" /></svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <SubmitButton text={type === 'login' ? 'Sign In Now' : 'Create Account'} />
                </form>

                <div className="flex items-center gap-4 py-2">
                    <div className="h-px bg-gray-100 flex-1" />
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Or continue with</span>
                    <div className="h-px bg-gray-100 flex-1" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => startSocialFlow('Google')}
                        className="relative py-4 border border-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-50 transition-all btn-haptic"
                    >
                        <div className="flex items-center gap-2">
                            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Google</span>
                        </div>
                    </button>
                    <button
                        type="button"
                        onClick={() => startSocialFlow('Apple')}
                        className="relative py-4 border border-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-50 transition-all btn-haptic"
                    >
                        <div className="flex items-center gap-2">
                            <img src="https://www.apple.com/favicon.ico" alt="Apple" className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Apple ID</span>
                        </div>
                    </button>
                </div>
            </div>

            <div className="text-center">
                {type === 'login' ? (
                    <p className="text-sm font-medium text-gray-400">
                        New to AJ Store? <Link href="/signup" className="text-[#005d32] font-black hover:underline ml-1 btn-haptic">Create an account</Link>
                    </p>
                ) : (
                    <p className="text-sm font-medium text-gray-400">
                        Already have an account? <Link href="/login" className="text-[#005d32] font-black hover:underline ml-1 btn-haptic">Sign in here</Link>
                    </p>
                )}
            </div>
        </div>
    );
};

export default AuthForm;
