import { app } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import { Logger } from '../util';

import './events';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    this.start();
  }

  start = () => {
    if (!app.isPackaged) {
      Logger.info('UPDATER > Skipping update check. App is not packaged.');
      return;
    }

    const FOUR_HOURS = 1000 * 60 * 60 * 4;
    setInterval(() => {
      Logger.info(
        'UPDATER > Update interval (4h) expired. Checking for updates.'
      );
      autoUpdater.checkForUpdates();
    }, FOUR_HOURS);

    autoUpdater.checkForUpdates();
  };
}
