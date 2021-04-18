import { nextTick } from 'vue';
import { createI18n, I18n, I18nOptions } from 'vue-i18n';

export const SUPPORT_LOCALES = ['en-US', 'de-DE'];
export type SupportedLocale = 'en-US' | 'de-DE';

export function setupI18n(
  options: I18nOptions
): I18n<unknown, unknown, unknown, true> {
  const i18n = createI18n(options);
  setI18nLanguage(i18n, options.locale as SupportedLocale);
  return i18n;
}

export function setI18nLanguage(
  i18n: I18n<unknown, unknown, unknown, true>,
  locale: SupportedLocale
): void {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (i18n.global.locale as any).value = locale;
  }

  document.documentElement.setAttribute('lang', locale);
}

export async function loadLocaleMessages(
  i18n: I18n<unknown, unknown, unknown, true>,
  locale: SupportedLocale
): Promise<void> {
  const messages = await import(
    /* webpackChunkName: "locale-[request]" */ `./locales/${locale}.json`
  );

  i18n.global.setLocaleMessage(locale, messages.default);

  return nextTick();
}
