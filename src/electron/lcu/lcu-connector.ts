/* eslint global-require: off, no-console: off */

import * as cp from 'child_process';
import * as util from 'util';
import * as fs from 'fs';
import { FSWatcher, watch } from 'chokidar';
import { BrowserWindow } from 'electron';
import log from 'electron-log';
import { COMMAND, INSTALL_REGEX } from './constants';

const exec = util.promisify(cp.exec);
const readFile = util.promisify(fs.readFile);

let foundProcess = false;
let lockfileWatcher: FSWatcher | undefined;
let processWatcher: NodeJS.Timeout | undefined;

const decryptLockfile = (file: string) => {
  const credentialArray = file.split(':');

  const credentials = {
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

const watchLockfile = async (fullPath: string) => {
  return watch(fullPath).on('all', async (eventName) => {
    if (eventName !== 'add' && eventName !== 'unlink') {
      return;
    }

    const allWindows = BrowserWindow.getAllWindows();

    if (!allWindows.length) {
      log.error('LCU CONNECTOR > No windows found');
      return;
    }

    const mainWindow = allWindows[0];

    if (eventName === 'add') {
      const credentialString = await readFile(fullPath, 'utf8');
      const credentialObj = decryptLockfile(credentialString);

      mainWindow.webContents.send('lcu-connect', credentialObj);
      log.info('LCU CONNECTOR > lcu-connect', credentialObj);
    } else {
      mainWindow.webContents.send('lcu-disconnect');
      log.info('LCU CONNECTOR > lcu-disconnect');
    }
  });
};

const watchProcess = async () => {
  try {
    const { stdout } = await exec(COMMAND);

    if (foundProcess) {
      return;
    }
    foundProcess = true;

    const parts = stdout.match(INSTALL_REGEX) || [];
    const installPath = parts[1];
    const fullPath = `${installPath}\\lockfile`;

    if (lockfileWatcher) {
      lockfileWatcher.close();
    }

    lockfileWatcher = await watchLockfile(fullPath);
  } catch {
    if (lockfileWatcher) {
      lockfileWatcher.close();
    }
    foundProcess = false;
  }
};

export default async () => {
  foundProcess = false;

  if (processWatcher) {
    processWatcher.unref();
  }

  watchProcess();
  processWatcher = setInterval(async () => {
    watchProcess();
  }, 5000);
};
