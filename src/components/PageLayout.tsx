import React from 'react';

const PageLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="max-w-4xl mx-auto px-4 py-20 space-y-12">
        <div className="space-y-4 text-center">
            <h1 className="text-5xl font-black text-[#005d32] uppercase tracking-tighter">{title}</h1>
            <div className="h-1.5 w-24 bg-[#005d32] mx-auto rounded-full" />
        </div>
        <div className="prose prose-emerald max-w-none text-gray-600 space-y-8 leading-relaxed text-lg">
            {children}
        </div>
    </div>
);

export default PageLayout;
