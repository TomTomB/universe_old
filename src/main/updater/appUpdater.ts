import './events';
import { Logger } from '../util';
import { app } from 'electron';
import { autoUpdater } from '@imjs/electron-differential-updater';
import log from 'electron-log';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
  }

  start = (): void => {
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
