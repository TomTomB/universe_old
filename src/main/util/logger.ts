/* eslint @typescript-eslint/no-explicit-any: off */

import log from 'electron-log';

export default class Logger {
  static verbose = (...params: any[]): void => {
    if (process.env.NODE_ENV === 'test') {
      return;
    }

    log.verbose(...params);
  };

  static info = (...params: any[]): void => {
    if (process.env.NODE_ENV === 'test') {
      return;
    }

    log.info(...params);
  };

  static warn = (...params: any[]): void => {
    if (process.env.NODE_ENV === 'test') {
      return;
    }

    log.warn(...params);
  };

  static error = (...params: any[]): void => {
    if (process.env.NODE_ENV === 'test') {
      return;
    }

    log.error(...params);
  };
}
