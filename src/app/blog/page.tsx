import React from 'react';
import { BLOG_POSTS } from '@/lib/constants';

export default function BlogPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-20 space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-black text-[#005d32] uppercase tracking-tighter">AJ Journal</h1>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Insights from our tech laboratory</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {BLOG_POSTS.map(post => (
                    <article key={post.id} className="group cursor-pointer">
                        <div className="aspect-video bg-gray-100 rounded-[3rem] overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <p className="text-[#005d32] font-black uppercase text-[10px] tracking-widest mb-2">{post.date}</p>
                        <h2 className="text-2xl font-black text-gray-900 group-hover:text-[#005d32] transition-colors mb-4">{post.title}</h2>
                        <p className="text-gray-500 font-medium leading-relaxed line-clamp-2">{post.excerpt}</p>
                    </article>
                ))}
            </div>
        </div>
    );
}
