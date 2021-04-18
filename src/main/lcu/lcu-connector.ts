/* eslint global-require: off, no-console: off */

import * as cp from 'child_process';
import * as fs from 'fs';
import * as util from 'util';
import { COMMAND, INSTALL_REGEX } from './constants';
import { FSWatcher, watch } from 'chokidar';
import { Credentials } from '@universe/types/lcu';
import { Window } from '../util';
import log from '../util/logger';

export default class LCUConnector {
  private exec = util.promisify(cp.exec);

  private readFile = util.promisify(fs.readFile);

  foundProcess = false;

  lockfileWatcher: FSWatcher | undefined;

  processWatcher: NodeJS.Timeout | undefined;

  start = async (): Promise<void> => {
    this.foundProcess = false;

    if (this.processWatcher) {
      this.processWatcher.unref();
    }

    this.watchProcess();
    this.processWatcher = setInterval(async () => {
      this.watchProcess();
    }, 5000);
  };

  stop = async (): Promise<void> => {
    if (this.processWatcher) {
      this.processWatcher.unref();
    }

    if (this.lockfileWatcher) {
      await this.lockfileWatcher.close();
    }

    this.foundProcess = false;
  };

  watchLockfile = async (fullPath: string): Promise<FSWatcher> => {
    return watch(fullPath).on('all', async (eventName) => {
      if (eventName !== 'add' && eventName !== 'unlink') {
        return;
      }

      const mainWindow = Window.getMainWindow();

      if (!mainWindow) {
        log.error('LCU CONNECTOR > Main window found');
        return;
      }

      if (eventName === 'add') {
        const credentialString = await this.readFile(fullPath, 'utf8');
        const credentials = this.decryptLockfile(credentialString);

        if (credentials) {
          mainWindow.webContents.send('lcu-connect', credentials);
          log.info('LCU CONNECTOR > lcu-connect', credentials);
        }
      } else {
        mainWindow.webContents.send('lcu-disconnect');
        log.info('LCU CONNECTOR > lcu-disconnect');
      }
    });
  };

  watchProcess = async (): Promise<void> => {
    try {
      const { stdout } = await this.exec(COMMAND);

      if (this.foundProcess) {
        return;
      }

      const parts = stdout.match(INSTALL_REGEX) || [];
      const installPath = parts[1];
      const fullPath = `${installPath}\\lockfile`;

      if (!installPath) {
        return;
      }

      this.foundProcess = true;

      if (this.lockfileWatcher) {
        await this.lockfileWatcher.close();
      }

      this.lockfileWatcher = await this.watchLockfile(fullPath);
    } catch {
      if (this.lockfileWatcher) {
        await this.lockfileWatcher.close();
      }
      this.foundProcess = false;
    }
  };

  decryptLockfile = (file: string): Credentials | null => {
    const credentialArray = file.split(':');

    if (credentialArray.length !== 5) {
      log.error(
        `LCU CONNECTOR > Credential array has invalid length. Has ${credentialArray.length}!`
      );
      return null;
    }

    const credentials: Credentials = {
      username: 'riot',
      process: credentialArray[0],
      address: '127.0.0.1',
      PID: +credentialArray[1],
      port: +credentialArray[2],
      password: credentialArray[3],
      protocol: credentialArray[4],
    };

    return credentials;
  };
}
