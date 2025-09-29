import type { Metadata } from 'next';

import 'normalize.css/normalize.css';
import './globals.css';
import './grid.css';

export const metadata: Metadata = {
  title: 'Stellar | AI-Powered Form Builder',
  description:
    'Create, customize, and manage dynamic AI-generated forms effortlessly with Stellar.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
