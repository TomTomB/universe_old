import { ipcMain } from 'electron';
import { autoUpdater, UpdateInfo } from 'electron-updater';
import { Window } from '../util';

ipcMain.on('install-update', () => {
  autoUpdater.quitAndInstall(false, true);
});

autoUpdater.on('update-downloaded', (info: UpdateInfo) => {
  const mainWindow = Window.getMainWindow();
  mainWindow?.webContents.send('update-downloaded', info);
});

autoUpdater.on('checking-for-update', () => {
  const mainWindow = Window.getMainWindow();
  mainWindow?.webContents.send('checking-for-update');
});

autoUpdater.on('update-available', (info: UpdateInfo) => {
  const mainWindow = Window.getMainWindow();
  mainWindow?.webContents.send('update-available', info);
});

autoUpdater.on('update-not-available', () => {
  const mainWindow = Window.getMainWindow();
  mainWindow?.webContents.send('update-not-available');
});

autoUpdater.on('before-quit-for-update', () => {
  const mainWindow = Window.getMainWindow();
  mainWindow?.webContents.send('before-quit-for-update');
});

autoUpdater.on(
  'download-progress',
  (progress, bytesPerSecond, percent, total, transferred) => {
    const mainWindow = Window.getMainWindow();
    mainWindow?.webContents.send('update-download-progress', {
      progress,
      bytesPerSecond,
      percent,
      total,
      transferred,
    });
  }
);

autoUpdater.on('error', (error) => {
  const mainWindow = Window.getMainWindow();
  mainWindow?.webContents.send('update-error', error);
});
