import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  // eslint-disable-next-line typesafe/no-await-without-trycatch
  messages: (await import(`locales/langs/en.json`)).default,
}));
