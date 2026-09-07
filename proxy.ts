import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';
import { NextRequest } from 'next/server';

const handleI18nRouting = createMiddleware({
  defaultLocale: 'en',
  locales: locales
});

export default function proxy(request: NextRequest) {
  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};