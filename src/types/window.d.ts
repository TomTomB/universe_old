export declare global {
  interface Window {
    universe?: UniverseAPI;
  }
}

declare interface UniverseAPI {
  doAThing: () => null;
  isProd: boolean;
  isDev: boolean;
  isTest: boolean;
}
