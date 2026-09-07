import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import '../globals.css';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Await the params before extracting the locale
  const { locale } = await params;
  
  const messages = await getMessages();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';
 
  return (
    <html lang={locale} dir={direction} className="bg-void text-moonwhite">
      <body className="font-body selection:bg-orchid selection:text-void">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}