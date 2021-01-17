/* eslint @typescript-eslint/no-explicit-any: off */

import log from 'electron-log';

const IS_TEST = process.env.NODE_ENV === 'test';

export default class Logger {
  static info = (...params: any[]) => {
    if (IS_TEST) {
      return;
    }

    log.info(params);
  };

  static warn = (...params: any[]) => {
    if (IS_TEST) {
      return;
    }

    log.warn(params);
  };

  static error = (...params: any[]) => {
    if (IS_TEST) {
      return;
    }

    log.error(params);
  };
}
