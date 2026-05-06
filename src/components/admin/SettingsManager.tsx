'use client';

import React, { useState, useCallback } from 'react';
import { updateSiteSettings } from '@/actions/admin-settings';
import { uploadImage } from '@/actions/admin-upload';
import { useToast } from '@/lib/toast-store';
import { useDropzone } from 'react-dropzone';

interface Props {
    initialSettings: any;
}

export default function SettingsManager({ initialSettings }: Props) {
    const { addToast } = useToast();
    const [activeTab, setActiveTab] = useState<'payments' | 'shipping' | 'seo' | 'branding' | 'notifications'>('payments');
    const [settings, setSettings] = useState(initialSettings || {
        payments: { stripe_enabled: true, razorpay_enabled: false, cod_enabled: true, stripe_publishable_key: '', stripe_secret_key: '', razorpay_key_id: '', razorpay_key_secret: '' },
        shipping: { flat_rate: 49, free_threshold: 499 },
        tax: { gst_rate: 18 },
        seo: { title: 'buykko', description: 'Premium Tech & Lifestyle Store', keywords: 'E-commerce, Premium, India' },
        branding: { logo_url: '/logo.png', favicon_url: '/favicon.ico', primary_color: '#6366f1', social_instagram: '', social_facebook: '', social_twitter: '' },
        notifications: { email_orders: true, sms_orders: false, email_stock: true, webhook_url: '' }
    });
    const [isPending, setIsPending] = useState(false);

    const handleSave = async () => {
        setIsPending(true);
        const res = await updateSiteSettings(settings);
        if (res.error) addToast(res.error, 'error');
        else addToast("Settings saved successfully!", 'success');
        setIsPending(false);
    };

    const handleFileUpload = useCallback(async (acceptedFiles: File[], type: 'logo' | 'favicon') => {
        const file = acceptedFiles[0];
        if (!file) return;

        // Ensure proper filename for supbase
        const timestamp = Date.now();
        const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '');
        const filename = `${type}-${timestamp}-${cleanName}`;

        const reader = new FileReader();
        reader.onloadend = async () => {
             const base64data = reader.result as string;
             addToast(`Uploading ${type}...`, 'success');
             setIsPending(true);

             const res = await uploadImage(base64data, filename);
             
             if (res.error) {
                 addToast(res.error, 'error');
             } else if (res.url) {
                 setSettings((prev: any) => ({
                     ...prev,
                     branding: {
                         ...prev.branding,
                         [type === 'logo' ? 'logo_url' : 'favicon_url']: res.url
                     }
                 }));
                 addToast(`${type.toUpperCase()} uploaded successfully!`, 'success');
             }
             setIsPending(false);
        }
        reader.readAsDataURL(file);
    }, [addToast]);

    const { getRootProps: getLogoProps, getInputProps: getLogoInputProps, isDragActive: isLogoActive } = useDropzone({
        onDrop: (files) => handleFileUpload(files, 'logo'),
        accept: { 'image/*': [] },
        maxFiles: 1
    });

    const { getRootProps: getFaviconProps, getInputProps: getFaviconInputProps, isDragActive: isFaviconActive } = useDropzone({
        onDrop: (files) => handleFileUpload(files, 'favicon'),
        accept: { 'image/*': ['.png', '.ico', '.svg', '.jpg', '.jpeg'] },
        maxFiles: 1
    });

    const inputClass = "w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-bold uppercase tracking-widest focus:ring-4 focus:ring-[#6366f1]/5 outline-none transition-all";
    const labelClass = "text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block px-1";

    const TabButton = ({ id, label, icon }: { id: typeof activeTab, label: string, icon: string }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-semibold transition-all ${
                activeTab === id 
                    ? 'bg-[#1a1a1a] text-white' 
                    : 'text-[#4a4a4a] hover:bg-[#f6f6f7]'
            }`}
        >
            <span className="text-sm">{icon}</span>
            <span className="hidden sm:inline">{label}</span>
        </button>
    );

    return (
        <div className="space-y-10">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#f0f0f0]">
                <div className="space-y-1">
                    <h2 className="text-heading">Settings</h2>
                    <p className="text-label">Manage your store configuration, payments and shipping</p>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={isPending}
                    className="bg-[#1a1a1a] text-white px-5 py-2 rounded-lg text-xs font-semibold hover:bg-black transition-all disabled:opacity-50"
                >
                    {isPending ? 'Saving...' : 'Save settings'}
                </button>
            </div>

            <div className="p-1 bg-[#f6f6f7] rounded-xl border border-[#e5e5e5] flex gap-1">
                <TabButton id="payments" label="Payments" icon="💰" />
                <TabButton id="shipping" label="Shipping" icon="🚚" />
                <TabButton id="seo" label="SEO" icon="🌐" />
                <TabButton id="branding" label="Branding" icon="🏷️" />
                <TabButton id="notifications" label="Notifications" icon="🔔" />
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e5e5e5] shadow-sm relative overflow-hidden min-h-[400px]">
                {activeTab === 'payments' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-top-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h4 className="card-title">Payment gateways</h4>
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <Toggle label="Enable Stripe integration" checked={settings.payments?.stripe_enabled} onChange={v => setSettings({...settings, payments: {...settings.payments, stripe_enabled: v}})} />
                                        {settings.payments?.stripe_enabled && (
                                            <div className="pl-4 border-l-2 border-[#1a1a1a] space-y-3 pt-1 pb-2">
                                                <div>
                                                    <label className="text-label text-[#4a4a4a] mb-1.5 block">Publishable Key</label>
                                                    <input value={settings.payments?.stripe_publishable_key || ''} onChange={e => setSettings({...settings, payments: {...settings.payments, stripe_publishable_key: e.target.value}})} className="w-full bg-[#f6f6f7] border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm font-medium focus:border-[#1a1a1a] outline-none transition-all" placeholder="pk_test_..." />
                                                </div>
                                                <div>
                                                    <label className="text-label text-[#4a4a4a] mb-1.5 block">Secret Key</label>
                                                    <input type="password" value={settings.payments?.stripe_secret_key || ''} onChange={e => setSettings({...settings, payments: {...settings.payments, stripe_secret_key: e.target.value}})} className="w-full bg-[#f6f6f7] border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm font-medium focus:border-[#1a1a1a] outline-none transition-all" placeholder="sk_test_..." />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <Toggle label="Enable Razorpay" checked={settings.payments?.razorpay_enabled} onChange={v => setSettings({...settings, payments: {...settings.payments, razorpay_enabled: v}})} />
                                        {settings.payments?.razorpay_enabled && (
                                            <div className="pl-4 border-l-2 border-[#1a1a1a] space-y-3 pt-1 pb-2">
                                                <div>
                                                    <label className="text-label text-[#4a4a4a] mb-1.5 block">Key ID</label>
                                                    <input value={settings.payments?.razorpay_key_id || ''} onChange={e => setSettings({...settings, payments: {...settings.payments, razorpay_key_id: e.target.value}})} className="w-full bg-[#f6f6f7] border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm font-medium focus:border-[#1a1a1a] outline-none transition-all" placeholder="rzp_test_..." />
                                                </div>
                                                <div>
                                                    <label className="text-label text-[#4a4a4a] mb-1.5 block">Key Secret</label>
                                                    <input type="password" value={settings.payments?.razorpay_key_secret || ''} onChange={e => setSettings({...settings, payments: {...settings.payments, razorpay_key_secret: e.target.value}})} className="w-full bg-[#f6f6f7] border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm font-medium focus:border-[#1a1a1a] outline-none transition-all" placeholder="..." />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <Toggle label="Enable Cash on Delivery" checked={settings.payments?.cod_enabled} onChange={v => setSettings({...settings, payments: {...settings.payments, cod_enabled: v}})} />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h4 className="card-title">Taxes</h4>
                                <div>
                                    <label className="text-label text-[#4a4a4a] mb-1.5 block">GST rate (%)</label>
                                    <input type="number" value={settings.tax?.gst_rate || 0} onChange={e => setSettings({...settings, tax: {gst_rate: Number(e.target.value)}})} className="w-full bg-[#f6f6f7] border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm font-medium focus:border-[#1a1a1a] outline-none transition-all" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'shipping' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-top-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h4 className="card-title">Shipping rates</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-label text-[#4a4a4a] mb-1.5 block">Flat shipping rate (₹)</label>
                                        <input type="number" value={settings.shipping?.flat_rate || 0} onChange={e => setSettings({...settings, shipping: {...settings.shipping, flat_rate: Number(e.target.value)}})} className="w-full bg-[#f6f6f7] border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm font-medium focus:border-[#1a1a1a] outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="text-label text-[#4a4a4a] mb-1.5 block">Free shipping threshold (₹)</label>
                                        <input type="number" value={settings.shipping?.free_threshold || 0} onChange={e => setSettings({...settings, shipping: {...settings.shipping, free_threshold: Number(e.target.value)}})} className="w-full bg-[#f6f6f7] border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm font-medium focus:border-[#1a1a1a] outline-none transition-all" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#f6f6f7] p-6 rounded-xl border border-[#e5e5e5] flex flex-col justify-center">
                                <p className="text-xs font-bold text-[#1a1a1a] uppercase mb-1">Shipping tip</p>
                                <p className="text-sm text-gray-500 leading-relaxed italic">"Free shipping thresholds can help increase your average order value."</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'notifications' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-top-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h4 className="card-title">Notification settings</h4>
                                <div className="space-y-4">
                                    <Toggle label="Email: New Order Received" checked={settings.notifications?.email_orders} onChange={v => setSettings({...settings, notifications: {...settings.notifications, email_orders: v}})} />
                                    <Toggle label="SMS: Order Shipped" checked={settings.notifications?.sms_orders} onChange={v => setSettings({...settings, notifications: {...settings.notifications, sms_orders: v}})} />
                                    <Toggle label="Email: Low Stock Alert" checked={settings.notifications?.email_stock} onChange={v => setSettings({...settings, notifications: {...settings.notifications, email_stock: v}})} />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h4 className="card-title">Webhooks</h4>
                                <div>
                                    <label className="text-label text-[#4a4a4a] mb-1.5 block">Webhook URL</label>
                                    <input placeholder="https://api.external.service/webhook" value={settings.notifications?.webhook_url || ''} onChange={e => setSettings({...settings, notifications: {...settings.notifications, webhook_url: e.target.value}})} className="w-full bg-[#f6f6f7] border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm font-medium focus:border-[#1a1a1a] outline-none transition-all" />
                                </div>
                                <p className="text-label text-[#9c9c9c]">
                                    Connect external automations (Zapier, Slack) to your store events via secure webhooks.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'seo' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-top-2">
                        <h4 className="card-title">Search engine optimization</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="text-label text-[#4a4a4a] mb-1.5 block">Website title</label>
                                    <input value={settings.seo?.title || ''} onChange={e => setSettings({...settings, seo: {...settings.seo, title: e.target.value}})} className="w-full bg-[#f6f6f7] border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm font-medium focus:border-[#1a1a1a] outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="text-label text-[#4a4a4a] mb-1.5 block">Meta keywords (CSV)</label>
                                    <input value={settings.seo?.keywords || ''} onChange={e => setSettings({...settings, seo: {...settings.seo, keywords: e.target.value}})} className="w-full bg-[#f6f6f7] border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm font-medium focus:border-[#1a1a1a] outline-none transition-all" />
                                </div>
                            </div>
                            <div>
                                <label className="text-label text-[#4a4a4a] mb-1.5 block">Meta description</label>
                                <textarea value={settings.seo?.description || ''} onChange={e => setSettings({...settings, seo: {...settings.seo, description: e.target.value}})} className="w-full bg-[#f6f6f7] border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm font-medium focus:border-[#1a1a1a] outline-none transition-all h-32 resize-none" />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'branding' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-top-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <h4 className="card-title mb-4">Store identity</h4>
                                <div className="space-y-4">
                                    <div 
                                        {...getLogoProps()} 
                                        className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${isLogoActive ? 'border-black bg-gray-50' : 'border-[#e5e5e5] bg-[#fafafa] hover:bg-white'}`}
                                    >
                                        <input {...getLogoInputProps()} />
                                        <span className="text-2xl mb-2">📷</span>
                                        <p className="text-xs font-semibold text-[#1a1a1a]">Upload logo</p>
                                        <p className="text-[10px] text-gray-500 mt-1">PNG, JPG or SVG up to 2MB</p>
                                    </div>
                                    <input value={settings.branding?.logo_url || ''} onChange={e => setSettings({...settings, branding: {...settings.branding, logo_url: e.target.value}})} className="w-full bg-[#f6f6f7] border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm font-medium focus:border-[#1a1a1a] outline-none transition-all" placeholder="Enter logo URL" />
                                    {settings.branding?.logo_url && (
                                        <div className="h-20 bg-[#fafafa] border border-[#e5e5e5] rounded-xl flex items-center justify-center p-3">
                                            <img src={settings.branding?.logo_url} alt="Logo" className="max-w-full max-h-full object-contain" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h4 className="card-title mb-4">Favicon & color</h4>
                                <div className="space-y-6">
                                    <div 
                                        {...getFaviconProps()} 
                                        className={`w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${isFaviconActive ? 'border-black bg-gray-50' : 'border-[#e5e5e5] bg-[#fafafa] hover:bg-white'}`}
                                    >
                                        <input {...getFaviconInputProps()} />
                                        <p className="text-xs font-semibold text-[#1a1a1a]">Upload favicon</p>
                                        <p className="text-[10px] text-gray-500 mt-1">.ico or .png (32x32)</p>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <div className="w-12 h-12 rounded-lg border border-[#e5e5e5] p-1 shrink-0" style={{ backgroundColor: settings.branding?.primary_color }}>
                                            <input type="color" value={settings.branding?.primary_color || '#1a1a1a'} onChange={e => setSettings({...settings, branding: {...settings.branding, primary_color: e.target.value}})} className="w-full h-full opacity-0 cursor-pointer" />
                                        </div>
                                        <input value={settings.branding?.primary_color || ''} onChange={e => setSettings({...settings, branding: {...settings.branding, primary_color: e.target.value}})} className="w-full bg-[#f6f6f7] border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm font-medium focus:border-[#1a1a1a] outline-none transition-all" placeholder="#1a1a1a" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-[#f0f0f0]">
                            <h4 className="card-title mb-6">Social profiles</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="text-label text-[#4a4a4a] mb-1.5 block">Instagram</label>
                                    <input placeholder="https://instagram.com/..." value={settings.branding?.social_instagram || ''} onChange={e => setSettings({...settings, branding: {...settings.branding, social_instagram: e.target.value}})} className="w-full bg-[#f6f6f7] border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm font-medium focus:border-[#1a1a1a] outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="text-label text-[#4a4a4a] mb-1.5 block">Facebook</label>
                                    <input placeholder="https://facebook.com/..." value={settings.branding?.social_facebook || ''} onChange={e => setSettings({...settings, branding: {...settings.branding, social_facebook: e.target.value}})} className="w-full bg-[#f6f6f7] border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm font-medium focus:border-[#1a1a1a] outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="text-label text-[#4a4a4a] mb-1.5 block">Twitter</label>
                                    <input placeholder="https://x.com/..." value={settings.branding?.social_twitter || ''} onChange={e => setSettings({...settings, branding: {...settings.branding, social_twitter: e.target.value}})} className="w-full bg-[#f6f6f7] border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm font-medium focus:border-[#1a1a1a] outline-none transition-all" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function Toggle({ label, checked, onChange }: { label: string, checked: boolean, onChange: (v: boolean) => void }) {
    return (
        <label className="flex items-center justify-between cursor-pointer group">
            <span className="text-xs font-semibold text-gray-500 group-hover:text-black transition-colors">{label}</span>
            <div 
                onClick={() => onChange(!checked)}
                className={`w-10 h-5 rounded-full relative transition-all duration-300 ${checked ? 'bg-black' : 'bg-gray-200'}`}
            >
                <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 ${checked ? 'left-6' : 'left-1'}`} />
            </div>
        </label>
    );
}
