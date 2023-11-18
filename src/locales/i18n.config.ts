export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'de'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale: locale }));
}
