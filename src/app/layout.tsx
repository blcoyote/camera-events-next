import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import './globals.css';
import Header from '@/components/Header';
import { serverConfig } from '@/config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Camera Events',
  description: 'Nextjs version of camera events',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // added
  const session = cookies().get(serverConfig.cookieName)?.value || null;
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header session={session} /> 
          {children}
      </body>
    </html>
  );
}