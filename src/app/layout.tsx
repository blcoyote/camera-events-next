import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import './globals.css';
import Header from '@/components/Header';
import { serverConfig } from '@/config';
import { useEffect, useState } from 'react';
import { firebaseCloudMessaging } from '@/libs/firebase/firebase';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Camera Events',
  description: 'Nextjs version of camera events',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
