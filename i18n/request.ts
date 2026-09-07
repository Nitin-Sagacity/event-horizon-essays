import {getRequestConfig} from 'next-intl/server';
 
export const locales = ['en', 'fr', 'ar', 'ja', 'pt', 'es', 'de', 'zh-CN', 'ko', 'hi', 'ru'];
 
export default getRequestConfig(async (params: any) => {
  // Safely handle the asynchronous Next.js 16 data delivery
  const resolvedLocale = params.requestLocale 
    ? await params.requestLocale 
    : params.locale;

  // The Safety Net: If it can't find a valid language, default to 'en' instead of crashing to a 404
  const finalLocale = locales.includes(resolvedLocale) ? resolvedLocale : 'en';

  return {
    locale: finalLocale,
    messages: (await import(`../messages/${finalLocale}.json`)).default
  };
});