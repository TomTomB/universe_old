/* eslint-disable no-console, global-require */

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import LCUConnector from './lcu/lcu-connector';
import Logger from './util/logger';

const isDev =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
let lcuConnector: LCUConnector | null = null;

const installExtensions = () => {
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
  } = require('electron-devtools-installer');

  return installExtension(REACT_DEVELOPER_TOOLS)
    .then((name: string) => console.log(`Added Extension:  ${name}`))
    .catch((err: unknown) => console.log('An error occurred: ', err));
};

const createWindow = async () => {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string =>
    path.join(RESOURCES_PATH, ...paths);

  mainWindow = new BrowserWindow({
    show: false,
    width: 1280,
    height: 720,
    frame: false,
    resizable: false,
    icon: getAssetPath('icon.ico'),
    backgroundColor: '#010a13',
    center: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (isDev) {
    const port = process.env.PORT || 1212;
    mainWindow.loadURL(`http://localhost:${port}/dist`);
  } else {
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
  }

  if (isDev) {
    await installExtensions();
    mainWindow.webContents.openDevTools();
  }

  mainWindow.webContents.once('did-finish-load', () => {
    if (!mainWindow) {
      Logger.error('Main window is null');
      return;
    }

    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }

    lcuConnector = new LCUConnector();
    lcuConnector.start();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // eslint-disable-next-line
  new AppUpdater();
};

app
  .whenReady()
  .then(() => {
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    return true;
  })
  .catch((e) => Logger.error(e));

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('second-instance', () => {
  if (mainWindow?.isMinimized()) {
    mainWindow?.restore();
  }

  mainWindow?.show();
});

ipcMain.on('window-close', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('window-hide', () => {
  mainWindow?.minimize();
});