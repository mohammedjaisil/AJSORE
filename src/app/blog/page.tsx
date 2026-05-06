import React from 'react';
import { BLOG_POSTS } from '@/lib/constants';

export default function BlogPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-32 space-y-20">
            <div className="text-center space-y-6">
                <div className="inline-block px-4 py-1.5 bg-indigo-50 rounded-full border border-indigo-100">
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.3em]">New Blog Post</p>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 uppercase tracking-tighter">buykko Blog</h1>
                <p className="text-slate-400 font-medium max-w-lg mx-auto text-sm leading-relaxed uppercase tracking-tight">Stay updated with the latest tech news, tips, and trends from the buykko team.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {BLOG_POSTS.map(post => (
                    <article key={post.id} className="group cursor-pointer space-y-8">
                        <div className="aspect-[16/10] bg-slate-50 rounded-[3rem] overflow-hidden shadow-sm group-hover:shadow-2xl group-hover:shadow-slate-900/5 transition-all duration-700 relative">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90 group-hover:opacity-100" />
                            <div className="absolute top-8 left-8">
                                <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-[9px] font-bold text-slate-900 uppercase tracking-widest shadow-sm">
                                    {post.date}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-4 px-2">
                            <div className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                                <p className="text-indigo-600 font-bold uppercase text-[9px] tracking-[0.2em]">Post #{post.id}</p>
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-500 tracking-tight leading-tight">{post.title}</h2>
                            <p className="text-slate-500 font-medium leading-relaxed text-sm line-clamp-2 uppercase tracking-tight opacity-80">{post.excerpt}</p>
                            <div className="pt-4 flex items-center gap-2 group/link">
                                <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest border-b-2 border-slate-900 group-hover/link:text-indigo-600 group-hover/link:border-indigo-600 transition-all">Read More</span>
                                <svg className="w-3 h-3 text-slate-900 group-hover/link:text-indigo-600 group-hover/link:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
