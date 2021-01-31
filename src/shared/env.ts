export const isProd = process.env.NODE_ENV === 'production';
export const isDev = process.env.NODE_ENV === 'development';
export const isTest = process.env.NODE_ENV === 'test';

export const isWindows = process.platform === 'win32';

export const sentryURL =
  'https://7a7bda98ee08405485c17ba4004e77a0@o512127.ingest.sentry.io/5610895';
