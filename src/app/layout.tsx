import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import Header from '@/components/Header';
import { serverConfig } from '@/config';
import './globals.css';
import { ClientThemeWrapper, ThemeProvider } from '@/components/theme';
import { Analytics } from "@vercel/analytics/react"

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
  const session = cookies().get(serverConfig.cookieName)?.value ?? null;

  return (
    <html lang='en'>
      <body className={inter.className}>
        <Analytics />
        <ThemeProvider>
          <ClientThemeWrapper>
            <Header session={session} />
            {children}
          </ClientThemeWrapper>
          </ThemeProvider>
      </body>
    </html>
  );
}
