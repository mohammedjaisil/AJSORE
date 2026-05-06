'use client';

import React from 'react';
import Link from 'next/link';

const Footer: React.FC<{ branding?: any }> = ({ branding }) => {
    const siteName = branding?.site_name || 'BUYKKO';
    const logoUrl = branding?.logo_url;

    return (
        <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
            <div className="max-w-[1600px] mx-auto px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-16 mb-20 font-sans">
                    {/* Brand */}
                    <div className="lg:col-span-2 space-y-8">
                        <Link href="/" className="group inline-block">
                             {logoUrl ? (
                                 <img src={logoUrl} alt={siteName} className="h-10 w-auto object-contain" />
                             ) : (
                                 <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white text-lg font-bold transition-all group-hover:scale-105">
                                     {siteName.charAt(0)}
                                 </div>
                             )}
                        </Link>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                            We have clothes that suits your style and which you&apos;re proud to wear. From women to men.
                        </p>
                        <div className="flex items-center gap-4">
                            {['twitter', 'facebook', 'instagram', 'github'].map(social => (
                                <Link key={social} href="#" className="w-9 h-9 rounded-full border border-gray-100 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-sm">
                                    <i className={`fab fa-${social} text-sm`} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-[13px] font-bold uppercase tracking-widest text-black mb-8">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link href="/about" className="hover:text-black transition-colors">About</Link></li>
                            <li><Link href="/features" className="hover:text-black transition-colors">Features</Link></li>
                            <li><Link href="/works" className="hover:text-black transition-colors">Works</Link></li>
                            <li><Link href="/career" className="hover:text-black transition-colors">Career</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[13px] font-bold uppercase tracking-widest text-black mb-8">Help</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link href="/contact" className="hover:text-black transition-colors">Customer Support</Link></li>
                            <li><Link href="/shipping-policy" className="hover:text-black transition-colors">Delivery Details</Link></li>
                            <li><Link href="/terms" className="hover:text-black transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/privacy-policy" className="hover:text-black transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[13px] font-bold uppercase tracking-widest text-black mb-8">FAQ</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link href="/account" className="hover:text-black transition-colors">Account</Link></li>
                            <li><Link href="/track" className="hover:text-black transition-colors">Manage Deliveries</Link></li>
                            <li><Link href="/orders" className="hover:text-black transition-colors">Orders</Link></li>
                            <li><Link href="/payments" className="hover:text-black transition-colors">Payments</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[13px] font-bold uppercase tracking-widest text-black mb-8">Resources</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link href="/blog" className="hover:text-black transition-colors">Free eBooks</Link></li>
                            <li><Link href="/blog" className="hover:text-black transition-colors">Development Tutorial</Link></li>
                            <li><Link href="/blog" className="hover:text-black transition-colors">How to - Blog</Link></li>
                            <li><Link href="/blog" className="hover:text-black transition-colors">YouTube Playlist</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 font-sans">
                    <p className="text-sm text-gray-400">
                        {siteName} © 2024, All Rights Reserved
                    </p>
                    <div className="flex items-center gap-4">
                        <img src="https://img.icons8.com/color/48/000000/visa.png" className="h-6 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" alt="Visa" />
                        <img src="https://img.icons8.com/color/48/000000/mastercard.png" className="h-6 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" alt="Mastercard" />
                        <img src="https://img.icons8.com/color/48/000000/paypal.png" className="h-6 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" alt="Paypal" />
                        <img src="https://img.icons8.com/color/48/000000/apple-pay.png" className="h-6 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" alt="ApplePay" />
                        <img src="https://img.icons8.com/color/48/000000/google-pay.png" className="h-6 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" alt="GPay" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
