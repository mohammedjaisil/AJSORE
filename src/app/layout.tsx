import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ClientLayout from '@/components/ClientLayout';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'AJ STORE | Premium Tech Dropshipping',
    description: 'Premium tech products delivered to your doorstep',
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};



export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" data-scroll-behavior="smooth">

            <body className={`${inter.className} bg-white text-gray-900 overflow-x-hidden`}>
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    );

}
