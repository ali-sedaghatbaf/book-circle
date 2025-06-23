import type {Metadata} from 'next';
import {NextIntlClientProvider, useMessages} from 'next-intl';
import { Toaster } from "@/components/ui/toaster"
import '../globals.css';
import {getMessages} from 'next-intl/server';

export const metadata: Metadata = {
  title: 'BookCircle',
  description: 'A community to discuss your favorite books, one chapter at a time.',
};

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
