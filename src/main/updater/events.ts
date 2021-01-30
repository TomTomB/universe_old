import { ipcMain } from 'electron';
import { autoUpdater, UpdateInfo } from 'electron-updater';
import { DownloadProgress } from '../../types/electron';
import { Logger, Window } from '../util';

ipcMain.on('install-update-and-restart', () => {
  Logger.info('UPDATER > install-update-and-restart');
  autoUpdater.quitAndInstall(false, true);
});

autoUpdater.on('update-downloaded', (info: UpdateInfo) => {
  Logger.info('UPDATER > update-downloaded', info);
  const mainWindow = Window.getMainWindow();
  mainWindow?.webContents.send('UPDATER:downloaded', info);
});

autoUpdater.on('checking-for-update', () => {
  Logger.info('UPDATER > checking-for-update');
  const mainWindow = Window.getMainWindow();
  mainWindow?.webContents.send('UPDATER:checking');
});

autoUpdater.on('update-available', (info: UpdateInfo) => {
  Logger.info('UPDATER > update-available', info);
  const mainWindow = Window.getMainWindow();
  mainWindow?.webContents.send('UPDATER:found-update', info);
});

autoUpdater.on('update-not-available', () => {
  Logger.info('UPDATER > update-not-available');
  const mainWindow = Window.getMainWindow();
  mainWindow?.webContents.send('UPDATER:up-to-date');
});

autoUpdater.on('before-quit-for-update', () => {
  Logger.info('UPDATER > before-quit-for-update');
  const mainWindow = Window.getMainWindow();
  mainWindow?.webContents.send('UPDATER:before-quit-for-update');
});

autoUpdater.on(
  'download-progress',
  (progress, bytesPerSecond, percent, total, transferred) => {
    const progressObj: DownloadProgress = {
      progress,
      bytesPerSecond,
      percent,
      total,
      transferred,
    };
    Logger.info('UPDATER > download-progress', progressObj);
    const mainWindow = Window.getMainWindow();
    mainWindow?.webContents.send('UPDATER:download-progress', progressObj);
  }
);

autoUpdater.on('error', (error) => {
  Logger.info('UPDATER > error', error);
  const mainWindow = Window.getMainWindow();
  mainWindow?.webContents.send('UPDATER:error', error);
});
