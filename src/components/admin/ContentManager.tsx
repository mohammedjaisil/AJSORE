'use client';

import React, { useState } from 'react';
import { updateSiteContent } from '@/actions/admin-content';
import { useToast } from '@/lib/toast-store';

interface Props {
    initialContent: any;
    initialTab?: string;
}

export default function ContentManager({ initialContent, initialTab = 'pages' }: Props) {
    const { addToast } = useToast();
    const [content, setContent] = useState(initialContent || {
        hero: { title: 'Welcome to buykko', subtitle: 'Modern products for your everyday life', cta: 'Shop Now' },
        featured_category: 'Featured Categories',
        announcement: 'FREE SHIPPING ON ALL ORDERS OVER ₹999',
        footer_links: [
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Contact Us', href: '/contact' }
        ]
    });
    const [isPending, setIsPending] = useState(false);

    const handleSave = async () => {
        setIsPending(true);
        const res = await updateSiteContent(content);
        if (res.error) addToast(res.error, 'error');
        else addToast("Website content updated!", 'success');
        setIsPending(false);
    };

    const inputClass = "w-full bg-[#f6f6f7] border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm font-medium focus:border-[#1a1a1a] outline-none transition-all";
    const labelClass = "text-label text-[#4a4a4a] mb-1.5 block";
    
    // Use the initialTab passed from the server component
    const validTabs: ('pages' | 'themes' | 'nav')[] = ['pages', 'themes', 'nav'];
    const resolveTab = (tab: string) => validTabs.includes(tab as any) ? tab as 'pages' | 'themes' | 'nav' : 'pages';
    
    const [activeTab, setActiveTab] = useState<'pages' | 'themes' | 'nav'>(resolveTab(initialTab));

    // Listen to changes in initialTab (i.e., when user navigates using the sidebar while component is mounted)
    React.useEffect(() => {
        setActiveTab(resolveTab(initialTab));
    }, [initialTab]);

    const TabButton = ({ id, label }: { id: typeof activeTab, label: string }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex-1 py-2 text-sm font-medium transition-all relative ${
                activeTab === id ? 'text-[#1a1a1a]' : 'text-[#6c6c6c] hover:text-[#1a1a1a]'
            }`}
        >
            {label}
            {activeTab === id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a1a1a]" />}
        </button>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-[#f0f0f0]">
                <div className="space-y-1">
                    <h2 className="text-heading">Online Store Content</h2>
                    <p className="text-label">Manage your homepage banners, announcements and links</p>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={isPending}
                    className="bg-[#1a1a1a] text-white px-5 py-2 rounded-lg text-xs font-semibold hover:bg-black transition-all disabled:opacity-50"
                >
                    {isPending ? 'Saving...' : 'Save changes'}
                </button>
            </div>

            <div className="flex items-center border-b border-[#f0f0f0] mb-6">
                <TabButton id="themes" label="Themes" />
                <TabButton id="nav" label="Navigation" />
                <TabButton id="pages" label="Pages" />
            </div>

            {activeTab === 'pages' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2">
                    {/* Hero Section */}
                    <div className="bg-white p-6 rounded-xl border border-[#e5e5e5] shadow-sm space-y-6">
                        <div className="space-y-1">
                            <h3 className="card-title">Hero Section</h3>
                            <p className="text-label text-[#9c9c9c]">Main homepage banner settings</p>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className={labelClass}>Main Title</label>
                                <input 
                                    value={content.hero?.title}
                                    onChange={e => setContent({...content, hero: {...content.hero, title: e.target.value}})}
                                    className={inputClass} 
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Sub-headline</label>
                                <textarea 
                                    value={content.hero?.subtitle}
                                    onChange={e => setContent({...content, hero: {...content.hero, subtitle: e.target.value}})}
                                    className={`${inputClass} resize-none h-24`} 
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Button Text</label>
                                <input 
                                    value={content.hero?.cta}
                                    onChange={e => setContent({...content, hero: {...content.hero, cta: e.target.value}})}
                                    className={inputClass} 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Announcements */}
                        <div className="bg-white p-6 rounded-xl border border-[#e5e5e5] shadow-sm space-y-6">
                            <div className="space-y-1">
                                <h3 className="card-title">Announcements</h3>
                                <p className="text-label text-[#9c9c9c]">Top bar notification text</p>
                            </div>
                            <div>
                                <label className={labelClass}>Ticker Message</label>
                                <input 
                                    value={content.announcement}
                                    onChange={e => setContent({...content, announcement: e.target.value})}
                                    className={inputClass} 
                                />
                            </div>
                        </div>

                        {/* Footer Links */}
                        <div className="bg-white p-6 rounded-xl border border-[#e5e5e5] shadow-sm space-y-6">
                            <div className="space-y-1">
                                <h3 className="card-title">Footer Links</h3>
                                <p className="text-label text-[#9c9c9c]">Quick links in the footer</p>
                            </div>
                            <div className="space-y-3">
                                {content.footer_links?.map((link: any, i: number) => (
                                    <div key={i} className="flex gap-3">
                                        <div className="flex-1">
                                            {i === 0 && <label className={labelClass}>Label</label>}
                                            <input 
                                                placeholder="Label"
                                                value={link.label}
                                                onChange={e => {
                                                    const newLinks = [...content.footer_links];
                                                    newLinks[i].label = e.target.value;
                                                    setContent({...content, footer_links: newLinks});
                                                }}
                                                className={inputClass} 
                                            />
                                        </div>
                                        <div className="flex-1">
                                            {i === 0 && <label className={labelClass}>Link URL</label>}
                                            <input 
                                                placeholder="/url"
                                                value={link.href}
                                                onChange={e => {
                                                    const newLinks = [...content.footer_links];
                                                    newLinks[i].href = e.target.value;
                                                    setContent({...content, footer_links: newLinks});
                                                }}
                                                className={inputClass} 
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'themes' && (
                <div className="bg-white p-12 rounded-xl border border-[#e5e5e5] shadow-sm text-center animate-in fade-in slide-in-from-top-2">
                    <div className="w-16 h-16 bg-[#f6f6f7] rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🎨</span>
                    </div>
                    <h3 className="text-sm font-semibold text-[#1a1a1a] mb-2">Theme customization</h3>
                    <p className="text-xs text-[#6c6c6c]">Your current theme is "buykko Minimal". Additional themes will be available soon.</p>
                </div>
            )}

            {activeTab === 'nav' && (
                <div className="bg-white p-12 rounded-xl border border-[#e5e5e5] shadow-sm text-center animate-in fade-in slide-in-from-top-2">
                    <div className="w-16 h-16 bg-[#f6f6f7] rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🧭</span>
                    </div>
                    <h3 className="text-sm font-semibold text-[#1a1a1a] mb-2">Navigation menus</h3>
                    <p className="text-xs text-[#6c6c6c]">Configure your main menu and footer menus. This feature is currently in preview.</p>
                </div>
            )}
        </div>
    );
}
