/* eslint @typescript-eslint/no-explicit-any: off */

import log from 'electron-log';

export default class Logger {
  static verbose = (...params: any[]): void => {
    log.verbose(...params);
  };

  static info = (...params: any[]): void => {
    log.info(...params);
  };

  static warn = (...params: any[]): void => {
    log.warn(...params);
  };

  static error = (...params: any[]): void => {
    log.error(...params);
  };
}
