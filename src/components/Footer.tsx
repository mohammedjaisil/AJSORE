'use client';

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-12 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Info */}
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="bg-[#005d32] p-2.5 rounded-xl text-white shadow-lg shadow-[#005d32]/20">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-black text-[#005d32] tracking-tighter">AJ STORE</span>
                        </Link>
                        <p className="text-gray-500 leading-relaxed font-medium">
                            Curating the future of lifestyle technology. Premium electronics and designer gadgets delivered globally with uncompromising quality.
                        </p>
                        <div className="flex gap-4">
                            {['𝕏', 'IG', 'FB'].map(social => (
                                <button key={social} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[10px] font-black text-gray-400 hover:bg-[#005d32] hover:text-white transition-all shadow-sm">{social}</button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Nav */}
                    <div>
                        <h4 className="font-black text-[10px] uppercase text-gray-400 tracking-[0.2em] mb-8">Navigation</h4>
                        <ul className="space-y-4 text-sm font-bold text-gray-600">
                            <li><Link href="/shop" className="hover:text-[#005d32] transition-colors">Shop All</Link></li>
                            <li><Link href="/categories" className="hover:text-[#005d32] transition-colors">Categories</Link></li>
                            <li><Link href="/deals" className="hover:text-[#005d32] transition-colors">Offers & Deals</Link></li>
                            <li><Link href="/blog" className="hover:text-[#005d32] transition-colors">Tech Blog</Link></li>
                            <li><Link href="/about" className="hover:text-[#005d32] transition-colors">Our Story</Link></li>
                            <li><Link href="/contact" className="hover:text-[#005d32] transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Account & Help */}
                    <div>
                        <h4 className="font-black text-[10px] uppercase text-gray-400 tracking-[0.2em] mb-8">Member Area</h4>
                        <ul className="space-y-4 text-sm font-bold text-gray-600">
                            <li><Link href="/account" className="hover:text-[#005d32] transition-colors">My Account</Link></li>
                            <li><Link href="/account" className="hover:text-[#005d32] transition-colors">Order Tracking</Link></li>
                            <li><Link href="/account" className="hover:text-[#005d32] transition-colors">Wishlist</Link></li>
                            <li><Link href="/faq" className="hover:text-[#005d32] transition-colors">Help Center (FAQ)</Link></li>
                            <li><Link href="/shipping-policy" className="hover:text-[#005d32] transition-colors">Shipping Info</Link></li>
                            <li><Link href="/returns" className="hover:text-[#005d32] transition-colors">Refund Policy</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-black text-[10px] uppercase text-gray-400 tracking-[0.2em] mb-8">Legal Docs</h4>
                        <ul className="space-y-4 text-sm font-bold text-gray-600">
                            <li><Link href="/privacy-policy" className="hover:text-[#005d32] transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-[#005d32] transition-colors">Terms of Service</Link></li>
                            <li><Link href="/shipping-policy" className="hover:text-[#005d32] transition-colors">Cookie Policy</Link></li>
                            <li><Link href="/404" className="hover:text-[#005d32] transition-colors">Report Bug</Link></li>
                        </ul>
                        <div className="mt-10 p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Verified Safe</p>
                            <div className="flex gap-4 items-center opacity-60">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-3" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-3" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
                    <p>© 2024 AJ STORE LTD. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-8">
                        <span className="cursor-help">V2.4.0 STABLE</span>
                        <span className="text-[#005d32]">EMERALD CLOUD SECURE</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
