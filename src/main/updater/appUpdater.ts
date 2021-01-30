import { app } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import { Logger } from '../util';

import './events';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    this.startCheck();
  }

  private startCheck = () => {
    if (!app.isPackaged) {
      Logger.info('Skipping update check. App is in dev mode...');
      return;
    }

    const FOUR_HOURS = 1000 * 60 * 60 * 4;
    setInterval(() => {
      Logger.info('Update interval (4h) expired. Checking for updates...');
      autoUpdater.checkForUpdates();
    }, FOUR_HOURS);
    autoUpdater.checkForUpdates();
  };
}
