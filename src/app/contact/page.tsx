import React from 'react';

export default function ContactPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-20 flex flex-col lg:flex-row gap-16">
            <div className="flex-1 space-y-10">
                <div className="space-y-4">
                    <h1 className="text-6xl font-black text-[#005d32] uppercase tracking-tighter">Get in Touch</h1>
                    <p className="text-gray-500 text-lg font-medium leading-relaxed">Our concierge team is standing by to help you with orders, shipping, or technical questions. Expect a response within 24 hours.</p>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-6 p-8 bg-gray-50 rounded-[2rem] border border-transparent hover:border-[#005d32]/10 transition-all">
                        <span className="text-4xl">📍</span>
                        <div>
                            <p className="font-black text-gray-900 uppercase text-xs tracking-widest">Global HQ</p>
                            <p className="text-gray-500 font-medium">123 Tech Lane, Silicon Valley, CA</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 p-8 bg-gray-50 rounded-[2rem] border border-transparent hover:border-[#005d32]/10 transition-all">
                        <span className="text-4xl">📧</span>
                        <div>
                            <p className="font-black text-gray-900 uppercase text-xs tracking-widest">Email Support</p>
                            <p className="text-gray-500 font-medium">support@ajstore.com</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1">
                <form className="bg-white border border-gray-100 p-12 rounded-[4rem] shadow-2xl shadow-[#005d32]/5 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Your Name</label>
                            <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-3xl px-8 py-4 focus:bg-white focus:outline-[#005d32] transition-all" placeholder="Alex J." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Order ID (Opt)</label>
                            <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-3xl px-8 py-4 focus:bg-white focus:outline-[#005d32] transition-all" placeholder="#ORD-234" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Subject</label>
                        <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-3xl px-8 py-4 focus:bg-white focus:outline-[#005d32] transition-all" placeholder="Question about shipping" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Message</label>
                        <textarea className="w-full bg-gray-50 border border-gray-100 rounded-[2.5rem] px-8 py-6 h-40 focus:bg-white focus:outline-[#005d32] transition-all" placeholder="How can we help?"></textarea>
                    </div>
                    <button type="button" className="w-full bg-[#005d32] text-white py-6 rounded-full font-black uppercase tracking-widest text-sm hover:scale-[1.02] transition-all shadow-xl shadow-[#005d32]/20 active:scale-95">Send Message</button>
                </form>
            </div>
        </div>
    );
}
