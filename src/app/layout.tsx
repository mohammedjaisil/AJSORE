import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import ClientLayout from '@/components/ClientLayout';
import './globals.css';

const outfit = Outfit({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-outfit',
});

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

import { getSiteSettings } from '@/actions/admin-settings';

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();
    const branding = settings?.branding || {};
    const seo = settings?.seo || {};
    return {
        title: seo.title || 'buykko | Premium Tech & Lifestyle Store',
        description: seo.description || 'Fast delivery for premium tech and lifestyle products across India.',
        icons: {
             icon: branding.favicon_url || '/favicon.ico',
        }
    };
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const settings = await getSiteSettings();
    const branding = settings?.branding || {
        logo_url: '',
        social_instagram: '',
        social_facebook: '',
        social_twitter: ''
    };

    return (
        <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
            </head>

            <body className={`${outfit.variable} ${inter.variable} font-sans bg-[#F9F9F9] text-text-main antialiased overflow-x-hidden`} suppressHydrationWarning>
                <ClientLayout branding={branding}>
                    {children}
                </ClientLayout>
            </body>
        </html>
    );

}
