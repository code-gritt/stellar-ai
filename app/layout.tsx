import type { Metadata } from 'next';

import 'normalize.css/normalize.css';
import './globals.css';
import './grid.css';

export const metadata: Metadata = {
  title: 'Stellar | AI Note app',
  description: 'AI Note landing page',
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
