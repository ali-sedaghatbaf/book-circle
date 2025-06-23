import {
  createLocalizedPathnamesNavigation,
  Pathnames
} from 'next-intl/navigation';
 
export const locales = ['en', 'es'] as const;
export const localePrefix = 'always'; // Default
 
// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  // If all locales use the same path, a single
  // external path can be used for all locales.
  '/': '/',
 
  // If locales use different paths, you can
  // specify each external path per locale.
  '/login': {
    en: '/login',
    es: '/iniciar-sesion'
  },
  '/signup': {
    en: '/signup',
    es: '/registro'
  },
  '/dashboard': {
    en: '/dashboard',
    es: '/panel'
  },
  '/add-book': {
    en: '/add-book',
    es: '/anadir-libro'
  },
  '/my-threads': {
    en: '/my-threads',
    es: '/mis-hilos'
  },
  '/reading-list': {
    en: '/reading-list',
    es: '/lista-de-lectura'
  },
  '/profile': {
    en: '/profile',
    es: '/perfil'
  },

  // Dynamic params are supported via square brackets
  '/books/[id]': {
    en: '/books/[id]',
    es: '/libros/[id]'
  },
  '/threads/[id]': {
    en: '/threads/[id]',
    es: '/hilos/[id]'
  }
} satisfies Pathnames<typeof locales>;
 
export const {Link, redirect, usePathname, useRouter} =
  createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});