'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumbs: React.FC = () => {
    const pathname = usePathname();
    const pathnames = pathname.split('/').filter((x) => x);

    if (pathname === '/') return null;

    return (
        <nav className="max-w-7xl mx-auto px-4 md:px-12 py-4 flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3 text-xs font-medium text-gray-400">
                <li className="inline-flex items-center">
                    <Link href="/" className="hover:text-[#005d32] transition-colors flex items-center">
                        <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        Home
                    </Link>
                </li>
                {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const label = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');

                    return (
                        <li key={to}>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                                {last ? (
                                    <span className="ml-1 md:ml-2 text-gray-900 font-bold">{label}</span>
                                ) : (
                                    <Link href={to} className="ml-1 md:ml-2 hover:text-[#005d32] transition-colors">
                                        {label}
                                    </Link>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
