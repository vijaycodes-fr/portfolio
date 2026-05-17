import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Shakti Vijay A S — Full Stack Developer & AI Engineer',
  description: 'Portfolio of Shakti Vijay A S — Full Stack Developer and AI Engineer based in Chennai, India. Building AI-powered products and full-stack systems.',
  keywords: ['Full Stack Developer', 'AI Engineer', 'LLM', 'React', 'Next.js', 'Chennai'],
  authors: [{ name: 'Shakti Vijay A S' }],
  openGraph: {
    title: 'Shakti Vijay A S — Full Stack Developer & AI Engineer',
    description: 'Building AI-powered products and full-stack systems that ship.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
