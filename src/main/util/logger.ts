/* eslint @typescript-eslint/no-explicit-any: off */

import { isTest } from '@shared/env';
import log from 'electron-log';

export default class Logger {
  static verbose = (...params: any[]) => {
    if (isTest) {
      return;
    }

    log.verbose(...params);
  };

  static info = (...params: any[]) => {
    if (isTest) {
      return;
    }

    log.info(...params);
  };

  static warn = (...params: any[]) => {
    if (isTest) {
      return;
    }

    log.warn(...params);
  };

  static error = (...params: any[]) => {
    if (isTest) {
      return;
    }

    log.error(...params);
  };
}
