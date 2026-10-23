import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'https://promptsystem-pro.vercel.app'
  ),
  title: {
    default: 'PromptSystem Pro — Production AI Prompt Chains & Operating Systems for High-Impact Roles',
    template: '%s | PromptSystem Pro',
  },
  description:
    'Stop using generic $5 prompts. Deploy multi-step Chain-of-Thought AI systems, Claude Project knowledge bases, and executive prompt workflows engineered specifically for your professional role.',
  keywords: [
    'AI Prompts',
    'Claude Projects',
    'Custom GPTs',
    'Prompt Engineering',
    'Enterprise AI Workflows',
    'Chain of Thought',
    'Role-Specific AI Systems',
    'B2B AI Automation',
  ],
  authors: [{ name: 'PromptSystem Pro Systems' }],
  creator: 'PromptSystem Pro',
  publisher: 'PromptSystem Pro',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://promptsystem-pro.vercel.app',
    siteName: 'PromptSystem Pro',
    title: 'PromptSystem Pro — Production AI Prompt Chains & Operating Systems for High-Impact Roles',
    description:
      'Multi-step Chain-of-Thought AI prompt chains, Claude Project knowledge bases, and executive workflow automations for 50+ professional roles.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PromptSystem Pro — Production AI Prompt Chains for High-Impact Roles',
    description:
      'Multi-step Chain-of-Thought AI prompt chains, Claude Project setups, and executive workflows for 50+ professional roles.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google4a281205e868ab2c',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased selection:bg-emerald-500 selection:text-slate-950">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
